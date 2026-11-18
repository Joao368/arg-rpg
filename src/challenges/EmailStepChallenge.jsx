import { useState } from 'react'
import { validateAnswer } from '../services/validation.js'
import './EmailStepChallenge.css'

const EMAIL = 'coisasdehistorias@gmail.com'

export default function EmailStepChallenge({ challenge, onSuccess }) {
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | error | success

  async function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim() || status === 'loading') return

    setStatus('loading')
    const correct = await validateAnswer(input, challenge.expectedHash, challenge.normOptions)

    if (correct) {
      setStatus('success')
      setTimeout(() => onSuccess(), 800)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  return (
    <div className="es-page">
      <p className="es-instruction">
        envie um email para{' '}
        <a className="es-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
      </p>

      <form className="challenge-form es-form" onSubmit={handleSubmit}>
        <input
          className={`challenge-input ${status === 'error' ? 'input-error' : ''}`}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Sua resposta..."
          disabled={status === 'loading' || status === 'success'}
          autoComplete="off"
          spellCheck="false"
        />
        <button
          className="challenge-btn"
          type="submit"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Verificando...' : 'Enviar'}
        </button>

        {status === 'error' && (
          <p className="feedback feedback-error">Resposta incorreta. Tente novamente.</p>
        )}
        {status === 'success' && (
          <p className="feedback feedback-success">Correto. Avançando...</p>
        )}
      </form>
    </div>
  )
}
