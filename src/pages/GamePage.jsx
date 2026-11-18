import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { PAGES } from '../data/pages.js'
import { CHALLENGES } from '../data/challenges.js'
import { useProgress } from '../hooks/useProgress.js'
import ChallengeRenderer from '../components/Challenge/ChallengeRenderer.jsx'
import FinalPage from './FinalPage.jsx'
import './GamePage.css'

export default function GamePage() {
  const { stepId } = useParams()
  const navigate = useNavigate()
  const { canAccess, isCompleted, completeStep, currentStepId } = useProgress()

  const page = PAGES.find(p => p.id === stepId)

  if (!page) return <Navigate to="/" replace />
  if (!canAccess(stepId)) return <Navigate to={`/etapa/${currentStepId}`} replace />

  const challenge = page.challengeId ? CHALLENGES[page.challengeId] : null
  const done = isCompleted(stepId)
  const pageIndex = PAGES.findIndex(p => p.id === stepId)
  const isFinalPage = !PAGES[pageIndex + 1]

  function handleSuccess() {
    completeStep(stepId)
    const next = PAGES[pageIndex + 1]
    if (next) navigate(`/etapa/${next.id}`)
  }

  // Etapa final: renderiza a página de conclusão
  if (page.isFinal) {
    return <FinalPage />
  }

  // Etapa com isLanding ou isCentered: layout centralizado, sem sidebar
  if (page.isLanding || page.isCentered) {
    return (
      <div className="landing-page">
        {page.title && <h1 className="landing-title">{page.title}</h1>}

        {page.media?.type === 'image' && (
          <img className="centered-media-img" src={page.media.src} alt={page.media.alt ?? ''} />
        )}

        {challenge && !done && (
          <ChallengeRenderer
            key={page.challengeId}
            challenge={challenge}
            onSuccess={handleSuccess}
          />
        )}
        {done && (
          <button
            className="btn-primary"
            onClick={() => navigate(`/etapa/${PAGES[pageIndex + 1].id}`)}
          >
            Continuar
          </button>
        )}
      </div>
    )
  }

  // Layout padrão de etapa narrativa
  const contentLines = page.content
    ? page.content.split('\n').map((line, i) =>
        line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
      )
    : null

  return (
    <article className="game-page">
      <header className="game-header">
        <span className="game-step-num">
          {String(pageIndex + 1).padStart(2, '0')} / {String(PAGES.length).padStart(2, '0')}
        </span>
        <h1 className="game-title">{page.title}</h1>
        {done && !isFinalPage && (
          <span className="game-badge-done">Concluída</span>
        )}
      </header>

      {page.media && (
        <div className="game-media">
          {page.media.type === 'image' && <img src={page.media.src} alt={page.media.alt ?? ''} />}
          {page.media.type === 'audio' && <audio controls src={page.media.src} />}
          {page.media.type === 'video' && <video controls src={page.media.src} />}
        </div>
      )}

      {contentLines && (
        <div className="game-content">{contentLines}</div>
      )}

      {challenge && !done && (
        <section className="game-challenge">
          {contentLines && <div className="challenge-divider" />}
          <ChallengeRenderer
            key={page.challengeId}
            challenge={challenge}
            onSuccess={handleSuccess}
          />
        </section>
      )}

      {done && !isFinalPage && (
        <div className="game-next">
          <button
            className="btn-primary"
            onClick={() => navigate(`/etapa/${PAGES[pageIndex + 1].id}`)}
          >
            Próxima etapa
          </button>
        </div>
      )}

      {isFinalPage && (
        <div className="game-final">
          <p className="final-msg">Transmissão encerrada.</p>
        </div>
      )}
    </article>
  )
}
