import { REGISTRY } from '../../challenges/registry.js'

/**
 * ChallengeRenderer
 *
 * Recebe um objeto `challenge` e um callback `onSuccess`.
 * Busca o componente correto no registry e o renderiza.
 *
 * Props:
 *   challenge  - objeto do desafio (de challenges.js)
 *   onSuccess  - função chamada quando o jogador acerta
 */
export default function ChallengeRenderer({ challenge, onSuccess }) {
  if (!challenge) return null

  const Component = REGISTRY[challenge.type]

  if (!Component) {
    return (
      <p className="feedback feedback-error">
        Tipo de desafio desconhecido: "{challenge.type}"
      </p>
    )
  }

  return <Component challenge={challenge} onSuccess={onSuccess} />
}
