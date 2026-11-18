import { useState, useMemo, useRef } from 'react'
import { sha256 } from '../services/validation.js'
import './PoemWordsChallenge.css'

const Sayori = [
  "Amor", "Alma", "Aventura", "Apaixonada", "Amplexo", "Alegria", "Arco-Íris", "Amigos",
  "Bailar", "Beleza", "Barulhenta", "Brincar", "Cama", "Calma", "Charme", "Cor", "Conforto",
  "Calamidade", "Choro", "Casamento", "Cantar", "Cicatrizes", "Desvaneio", "Desajeitada",
  "Derrotar", "Deprimida", "Devaneio", "Deslumbrante", "Deleite", "Divertir-se",
  "Desafortunada", "Escuro", "Especial", "Expectativa", "Ensolarado", "Entusiasmo",
  "Feriado", "Folga", "Festa", "Felicidade", "Ferida", "Incorrespondido", "Incompetente",
  "Impressionante", "Juntos", "Juventude", "Medo", "Meiga", "Morte", "Melodia", "Maravilhoso",
  "Nuvens de Chuva", "Oceano", "Passado", "Pirotecnia", "Precioso", "Pranto", "Prazer",
  "Pesar", "Perdoar", "Poente", "Prece", "Promessa", "Parentes", "Plumagem", "Quebrado",
  "Quente", "Rosa", "Risada", "Romance", "Reluzir", "Relaxada", "Sensacional", "Sozinha",
  "Sorriso", "Sortuda", "Surpreendente", "Serena", "Sofrimento", "Tristeza", "Tesouro",
  "Vagalumes", "Vergonha", "Voar", "Vazio"
]

const Natsuki = [
  "Anime", "Assobio", "Adocicado", "Bonitinha", "Batom", "Bochechas", "Boop", "Biquíni",
  "Brilhante", "Bolhas", "Baunilha", "Beicinho", "Beijo", "Coelho", "Camisola", "Cobertor",
  "Cabelo", "Compras", "Calor", "Chocolate", "Cachoeira", "Camundongo", "Cachorrinhos",
  "Doce", "Doki Doki", "E-mail", "Fita", "Fofa", "Fones", "Fantasia", "Grudenta", "Gatinho",
  "Girando", "Jogos", "Kawaii", "Leite", "Morango", "Marshmallow", "Meias", "Mordiscar",
  "Nuvens", "Nervosa", "Namorados", "Pirulito", "Papai", "Pulso", "Pura", "Paz", "Parfait",
  "Playground", "Poof", "Raiva", "Roseira", "Risadinha", "Rodopio", "Sussurros", "Salto",
  "Saia", "Saltitando"
]

const Yuri = [
  "Aura", "Afterimage", "Assustador", "Animada", "Ambiente", "Agonizante", "Ansiedade",
  "Apodrecer", "Cativa", "Clímax", "Cerne", "Contentamento", "Contaminada", "Desejo",
  "Desastre", "Desarmonia", "Desorientada", "Desordem", "Destino", "Discernimento",
  "Desprezar", "Determinada", "Expiar", "Extremo", "Eternidade", "Escassez", "Eterno",
  "Explodir", "Estudo", "Enrubescer", "Entropia", "Eletricidade", "Estranho", "Fugir",
  "Filosofia", "Horror", "Infinito", "Incongruentes", "Irrefreado", "Incapaz", "Ira",
  "Incontrolado", "Intelectual", "Inferno", "Inconstante", "Jornada", "Jaula", "Julgamento",
  "Libidinoso", "Massacre", "Noite Estrelada", "Oportuno", "Persistente", "Perfeita",
  "Pingo de Chuva", "Questionar", "Retrato", "Realidade", "Respirar", "Renegar", "Reservada",
  "Resplandecente", "Sentimento", "Suicidar", "Sonho", "Sepultura", "Tempo", "Universo",
  "Vibrante", "Vitalidade", "Vivaz"
]

const SAYORI_SET = new Set(Sayori)

function normalizeWord(w) {
  return w.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

// Embaralha um array (Fisher-Yates)
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function PoemWordsChallenge({ challenge, onSuccess }) {
  // Todos os botões embaralhados uma vez na montagem
  const allWords = useMemo(() => shuffle([...Sayori, ...Natsuki, ...Yuri]), [])

  const [selected, setSelected] = useState(new Set())
  const [status, setStatus] = useState('idle') // idle | loading | error | success
  const casamentoClicks = useRef(0)

  function toggle(word) {
    if (status === 'success') return

    // Cheat: 10 cliques seguidos em "Casamento" passa de fase
    if (word === 'Casamento') {
      casamentoClicks.current += 1
      if (casamentoClicks.current >= 10) {
        setStatus('success')
        setTimeout(() => onSuccess(), 600)
        return
      }
    } else {
      casamentoClicks.current = 0
    }

    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(word)) next.delete(word)
      else next.add(word)
      return next
    })
  }

  async function handleSubmit() {
    if (status === 'loading') return
    setStatus('loading')

    const serialized = [...selected]
      .map(normalizeWord)
      .sort()
      .join(',')

    const hash = await sha256(serialized)

    if (hash === challenge.expectedHash) {
      setStatus('success')
      setTimeout(() => onSuccess(), 800)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 2000)
    }
  }

  const selectedCount = selected.size
  const totalSayori = Sayori.length

  return (
    <div className="pw-page">
      <h1 className="pw-title">escreva um poema para melhor garota</h1>

      <div className="pw-words">
        {allWords.map(word => {
          const isSel = selected.has(word)
          return (
            <button
              key={word}
              className={`pw-word ${isSel ? 'pw-word-selected' : ''}`}
              onClick={() => toggle(word)}
              type="button"
            >
              {word}
            </button>
          )
        })}
      </div>

      <div className="pw-footer">
        <span className="pw-count">
          {selectedCount} palavra{selectedCount !== 1 ? 's' : ''} selecionada{selectedCount !== 1 ? 's' : ''}
        </span>

        <button
          className="challenge-btn pw-submit"
          onClick={handleSubmit}
          disabled={selectedCount === 0 || status === 'loading' || status === 'success'}
          type="button"
        >
          {status === 'loading' ? 'Verificando...' : 'Enviar poema'}
        </button>

        {status === 'error' && (
          <p className="feedback feedback-error">Poema incorreto. Tente novamente.</p>
        )}
        {status === 'success' && (
          <p className="feedback feedback-success">Correto. Avançando...</p>
        )}
      </div>
    </div>
  )
}
