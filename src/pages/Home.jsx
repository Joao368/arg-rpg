import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useProgress } from '../hooks/useProgress.js'
import { PAGES } from '../data/pages.js'

/**
 * Home redireciona direto para a primeira etapa.
 * O jogo começa imediatamente — não há tela de boas-vindas separada.
 */
export default function Home() {
  const navigate = useNavigate()
  const { progress } = useProgress()

  useEffect(() => {
    // Se já tem progresso, vai para a etapa atual; senão começa do início
    const target = progress.currentStepId ?? PAGES[0].id
    navigate(`/etapa/${target}`, { replace: true })
  }, [])

  return null
}
