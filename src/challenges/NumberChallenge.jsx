import { useState } from 'react'
import { validateAnswer } from '../services/validation.js'

export default function NumberChallenge({ challenge, onSuccess }) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle')
  const [showHint, setShowHint] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || status === 'loading') return

    setStatus('loading')
    const correct = await validateAnswer(String(input), challenge.expectedHash, challenge.normOptions)

    if (correct) {
      setStatus('success')
      setTimeout(() => onSuccess(), 800)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return (
    <form className="challenge-form" onSubmit={handleSubmit}>
      <input
        className={`challenge-input ${status === 'error' ? 'input-error' : ''}`}
        type="number"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder={challenge.placeholder ?? 'Digite o número...'}
        disabled={status === 'loading' || status === 'success'}
      />
      <button
        className="challenge-btn"
        type="submit"
        disabled={status === 'loading' || status === 'success'}
      >
        {status === 'loading' ? 'Verificando...' : 'Confirmar'}
      </button>

      {status === 'error' && (
        <p className="feedback feedback-error">Número incorreto. Tente novamente.</p>
      )}
      {status === 'success' && (
        <p className="feedback feedback-success">Correto. Avançando...</p>
      )}

      {challenge.hint && !showHint && status !== 'success' && (
        <button type="button" className="hint-btn" onClick={() => setShowHint(true)}>
          Ver dica
        </button>
      )}
      {showHint && <p className="hint-text">Dica: {challenge.hint}</p>}
    </form>
  )
}
