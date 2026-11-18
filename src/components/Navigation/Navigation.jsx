import { Link, useParams } from 'react-router-dom'
import { PAGES } from '../../data/pages.js'
import { useProgress } from '../../hooks/useProgress.js'
import './Navigation.css'

export default function Navigation() {
  const { stepId } = useParams()
  const { canAccess, isCompleted } = useProgress()

  return (
    <nav className="sidebar-nav" aria-label="Etapas da investigação">
      <p className="nav-label">Investigação</p>
      <ul className="nav-list">
        {PAGES.map((page, i) => {
          const accessible = canAccess(page.id)
          const completed = isCompleted(page.id)
          const active = page.id === stepId

          return (
            <li key={page.id} className="nav-item">
              {accessible ? (
                <Link
                  to={`/etapa/${page.id}`}
                  className={`nav-link ${active ? 'nav-active' : ''} ${completed ? 'nav-done' : ''}`}
                >
                  <span className="nav-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="nav-title">{page.title}</span>
                  {completed && <span className="nav-check" aria-label="Concluída">✓</span>}
                </Link>
              ) : (
                <span className="nav-link nav-locked" aria-disabled="true">
                  <span className="nav-index">{String(i + 1).padStart(2, '0')}</span>
                  <span className="nav-title">{page.title}</span>
                  <span className="nav-lock" aria-label="Bloqueada">⬛</span>
                </span>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
