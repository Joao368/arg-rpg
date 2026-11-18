import { useState } from 'react'
import { validateAnswer } from '../services/validation.js'
import './VotingMachine.css'

const CANDIDATE = {
  number: '22190',
  name: 'Deputado Marcelo Dino',
  partido: 'Candidato Honesto',
}

export default function VotingMachineChallenge({ challenge, onSuccess }) {
  const [digits, setDigits] = useState('')          // sequência digitada
  const [confirmed, setConfirmed] = useState(false) // CONFIRMA pressionado
  const [status, setStatus] = useState('idle')      // idle | error | success
  const [flash, setFlash] = useState(false)         // flash no botão pressionado
  const [lastKey, setLastKey] = useState(null)

  function pressKey(key) {
    if (confirmed) return
    triggerFlash(key)

    if (key === 'BRANCO') {
      setDigits('')
      return
    }
    if (key === 'CORRIGE') {
      setDigits(prev => prev.slice(0, -1))
      return
    }
    if (key === 'CONFIRMA') {
      handleConfirm()
      return
    }
    // Dígito numérico — máximo 5
    if (digits.length < 5) {
      setDigits(prev => prev + key)
    }
  }

  function triggerFlash(key) {
    setLastKey(key)
    setFlash(true)
    setTimeout(() => setFlash(false), 150)
  }

  async function handleConfirm() {
    if (digits.length === 0) return
    setConfirmed(true)

    const correct = await validateAnswer(digits, challenge.expectedHash, challenge.normOptions)
    if (correct) {
      setStatus('success')
      setTimeout(() => onSuccess(), 1800)
    } else {
      setStatus('error')
      setTimeout(() => {
        setStatus('idle')
        setConfirmed(false)
        setDigits('')
      }, 2000)
    }
  }

  // Monta o display de dígitos: _ _ _ _ _
  const displayDigits = Array.from({ length: 5 }, (_, i) => digits[i] ?? '_')

  // Mostra o candidato quando os 5 dígitos batem com o número correto
  const showCandidate = digits === CANDIDATE.number

  return (
    <div className="vm-wrapper">
      <p className="vm-header-text">vote no candidato honesto</p>

      <div className="vm-machine">
        {/* ── Lado esquerdo: display ── */}
        <div className="vm-left">
          <div className="vm-screen">
            <div className="vm-screen-header">
              <span className="vm-je-label">JUSTIÇA ELEITORAL</span>
              <span className="vm-cargo">Deputado Federal</span>
            </div>

            <div className="vm-screen-body">
              {!confirmed || status === 'idle' ? (
                <>
                  <p className="vm-screen-label">Número do candidato</p>
                  <div className="vm-digits">
                    {displayDigits.map((d, i) => (
                      <span key={i} className={`vm-digit ${d === '_' ? 'vm-digit-empty' : ''}`}>
                        {d}
                      </span>
                    ))}
                  </div>

                  {showCandidate && (
                    <div className="vm-candidate-info">
                      <p className="vm-candidate-num">{CANDIDATE.number}</p>
                      <p className="vm-candidate-name">{CANDIDATE.name}</p>
                      <p className="vm-candidate-partido">{CANDIDATE.partido}</p>
                    </div>
                  )}

                  {!showCandidate && digits.length > 0 && (
                    <p className="vm-screen-hint">continue digitando...</p>
                  )}
                </>
              ) : status === 'success' ? (
                <div className="vm-result vm-result-ok">
                  <p className="vm-result-title">VOTO CONFIRMADO</p>
                  <p className="vm-result-name">{CANDIDATE.name}</p>
                </div>
              ) : (
                <div className="vm-result vm-result-err">
                  <p className="vm-result-title">CANDIDATO NÃO ENCONTRADO</p>
                  <p className="vm-result-hint">Verifique o número e tente novamente.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Lado direito: teclado ── */}
        <div className="vm-right">
          <div className="vm-je-badge">
            <span className="vm-je-badge-text">JUSTIÇA<br/>ELEITORAL</span>
          </div>

          <div className="vm-keypad">
            {['1','2','3','4','5','6','7','8','9'].map(k => (
              <button
                key={k}
                className={`vm-key vm-key-num ${flash && lastKey === k ? 'vm-key-flash' : ''}`}
                onClick={() => pressKey(k)}
                type="button"
              >
                {k}
              </button>
            ))}
            <div className="vm-key-spacer" />
            <button
              className={`vm-key vm-key-num ${flash && lastKey === '0' ? 'vm-key-flash' : ''}`}
              onClick={() => pressKey('0')}
              type="button"
            >
              0
            </button>
            <div className="vm-key-spacer" />
          </div>

          <div className="vm-action-keys">
            <button
              className={`vm-key vm-key-branco ${flash && lastKey === 'BRANCO' ? 'vm-key-flash' : ''}`}
              onClick={() => pressKey('BRANCO')}
              type="button"
            >
              BRANCO
            </button>
            <button
              className={`vm-key vm-key-corrige ${flash && lastKey === 'CORRIGE' ? 'vm-key-flash' : ''}`}
              onClick={() => pressKey('CORRIGE')}
              type="button"
            >
              CORRIGE
            </button>
            <button
              className={`vm-key vm-key-confirma ${flash && lastKey === 'CONFIRMA' ? 'vm-key-flash' : ''}`}
              onClick={() => pressKey('CONFIRMA')}
              type="button"
            >
              CONFIRMA
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
