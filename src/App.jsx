import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home.jsx'
import GamePage from './pages/GamePage.jsx'
import NotFound from './pages/NotFound.jsx'

/**
 * HashRouter garante compatibilidade com GitHub Pages:
 * todas as rotas ficam no hash (#/etapa/slug),
 * evitando 404 ao recarregar ou acessar URL diretamente.
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Rota raiz — layout sem sidebar */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="etapa/:stepId" element={<GamePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
