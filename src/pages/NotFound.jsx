import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound-page">
      <span className="notfound-code">404</span>
      <p className="notfound-msg">Esta página não existe ou foi apagada.</p>
      <Link to="/" className="btn-ghost">Voltar ao início</Link>
    </div>
  )
}
