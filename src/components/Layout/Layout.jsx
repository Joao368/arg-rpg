import { Outlet, useParams } from 'react-router-dom'
import Navigation from '../Navigation/Navigation.jsx'
import { PAGES } from '../../data/pages.js'
import './Layout.css'

export default function Layout() {
  const { stepId } = useParams()

  // Mostra a sidebar em todas as etapas, exceto na página final
  const page = PAGES.find(p => p.id === stepId)
  const showNav = !!stepId && !page?.isFinal

  return (
    <div className="app-shell">
      {showNav && <Navigation />}
      <main className={`main-content ${!showNav ? 'main-full' : ''}`}>
        <Outlet />
      </main>
    </div>
  )
}
