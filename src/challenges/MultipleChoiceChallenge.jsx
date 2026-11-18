import { useState } from 'react'
import { validateMultipleChoice } from '../services/validation.js'

export default function MultipleChoiceChallenge({ challenge, onSuccess }) {
  const [selected, setSelected] = useState([])
  const [status, setStatus] = useState('idle')
  const [showHint, setShowHint] = useState(false)

  function toggleOption(id) {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (selected.length === 0 || status === 'loading') return

    setStatus('loading')
    const correct = await validateMultipleChoice(selected, challenge.expectedHash)

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
      <div className="mc-options">
        {challenge.options.map(opt => (
          <label
            key={opt.id}
            className={`mc-option ${selected.includes(opt.id) ? 'mc-selected' : ''}`}
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.id)}
              onChange={() => toggleOption(opt.id)}
              disabled={status === 'loading' || status === 'success'}
            />
            {opt.label}
          </label>
        ))}
      </div>

      <button
        className="challenge-btn"
        type="submit"
        disabled={selected.length === 0 || status === 'loading' || status === 'success'}
      >
        {status === 'loading' ? 'Verificando...' : 'Confirmar'}
      </button>

      {status === 'error' && (
        <p className="feedback feedback-error">Seleção incorreta. Tente novamente.</p>
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
