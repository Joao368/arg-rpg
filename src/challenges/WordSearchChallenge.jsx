import { useState, useEffect, useRef, useCallback } from 'react'
import { validateAnswer } from '../services/validation.js'
import './WordSearch.css'

const SIZE = 25
const WORD = 'SACRIFICIO'
const MOVE_INTERVAL = 2500
const INITIAL_SHUFFLES = 7

// Letras do alfabeto sem a palavra para preencher o ruído
const NOISE_CHARS = 'ABCDEFGHJKLMNOPQRTUVWXYZ'

function randomNoiseChar() {
  return NOISE_CHARS[Math.floor(Math.random() * NOISE_CHARS.length)]
}

/**
 * Cria a grade inicial 25x25 com a palavra em posição fixa.
 * A palavra é inserida horizontalmente na linha central, coluna central.
 */
function buildInitialGrid() {
  const grid = Array.from({ length: SIZE }, () =>
    Array.from({ length: SIZE }, () => randomNoiseChar())
  )

  // Posição fixa: linha 12, colunas 7–16 (centro)
  const row = 12
  const col = 7
  for (let i = 0; i < WORD.length; i++) {
    grid[row][col + i] = WORD[i]
  }

  return grid
}

/**
 * Move a grade inteira em uma direção, com wrap toroidal.
 * As letras que saem por um lado reaparecem no lado oposto.
 */
function moveGrid(grid, direction) {
  const SIZE = grid.length
  const next = Array.from({ length: SIZE }, () => Array(SIZE).fill(''))

  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      let nr = r
      let nc = c
      if (direction === 'right') nc = (c + 1) % SIZE
      if (direction === 'left')  nc = (c - 1 + SIZE) % SIZE
      if (direction === 'down')  nr = (r + 1) % SIZE
      if (direction === 'up')    nr = (r - 1 + SIZE) % SIZE
      next[nr][nc] = grid[r][c]
    }
  }

  return next
}

const DIRECTIONS = ['right', 'left', 'up', 'down']

function randomDirection() {
  return DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)]
}

/**
 * Aplica N movimentos aleatórios à grade (shuffle inicial).
 */
function shuffleGrid(grid, times) {
  let g = grid
  for (let i = 0; i < times; i++) {
    g = moveGrid(g, randomDirection())
  }
  return g
}

export default function WordSearchChallenge({ challenge, onSuccess }) {
  const [grid, setGrid] = useState(() =>
    shuffleGrid(buildInitialGrid(), INITIAL_SHUFFLES)
  )
  const [selected, setSelected] = useState([])   // [{r, c}] — células selecionadas pelo arrasto
  const [dragging, setDragging] = useState(false)
  const [status, setStatus] = useState('idle')   // idle | error | success
  const [input, setInput] = useState('')
  const [showInput, setShowInput] = useState(false)
  const gridRef = useRef(null)
  const intervalRef = useRef(null)
  const isMovingRef = useRef(false)

  // Movimento automático a cada 1.5s
  useEffect(() => {
    if (status === 'success') return
    intervalRef.current = setInterval(() => {
      isMovingRef.current = true
      setGrid(g => moveGrid(g, randomDirection()))
      // Limpa seleção quando o grid se move
      setSelected([])
      setDragging(false)
      setTimeout(() => { isMovingRef.current = false }, 100)
    }, MOVE_INTERVAL)

    return () => clearInterval(intervalRef.current)
  }, [status])

  // ─── Seleção por arrasto ─────────────────────────────────

  function cellKey(r, c) { return `${r},${c}` }

  function getCellFromPoint(x, y) {
    if (!gridRef.current) return null
    const cells = gridRef.current.querySelectorAll('[data-cell]')
    for (const el of cells) {
      const rect = el.getBoundingClientRect()
      if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
        const [r, c] = el.dataset.cell.split(',').map(Number)
        return { r, c }
      }
    }
    return null
  }

  function startDrag(r, c) {
    if (status === 'success') return
    setDragging(true)
    setSelected([{ r, c }])
  }

  function continueDrag(x, y) {
    if (!dragging || status === 'success') return
    const cell = getCellFromPoint(x, y)
    if (!cell) return
    setSelected(prev => {
      // Já existe? não repete
      if (prev.some(p => p.r === cell.r && p.c === cell.c)) return prev
      return [...prev, cell]
    })
  }

  function endDrag() {
    if (!dragging) return
    setDragging(false)
    checkSelection()
  }

  function checkSelection() {
    if (selected.length === 0) return
    const word = selected.map(({ r, c }) => grid[r][c]).join('')
    const reversed = word.split('').reverse().join('')
    if (word === WORD || reversed === WORD) {
      handleFoundWord()
    } else {
      setSelected([])
    }
  }

  function handleFoundWord() {
    clearInterval(intervalRef.current)
    setStatus('success')
    setShowInput(true)
  }

  // ─── Validação final via input ───────────────────────────

  async function handleSubmit(e) {
    e.preventDefault()
    if (!input.trim()) return
    const correct = await validateAnswer(input, challenge.expectedHash, challenge.normOptions)
    if (correct) {
      setTimeout(() => onSuccess(), 600)
    } else {
      setStatus('error')
      setTimeout(() => setStatus('success'), 2000)
    }
  }

  // ─── Eventos touch / mouse ───────────────────────────────

  function onMouseDown(r, c) { startDrag(r, c) }
  function onMouseEnter(r, c) { if (dragging) continueDrag(0, 0) }
  // Para mouse, usamos onMouseEnter diretamente na célula

  function onTouchStart(e) {
    e.preventDefault()
    const t = e.touches[0]
    const cell = getCellFromPoint(t.clientX, t.clientY)
    if (cell) startDrag(cell.r, cell.c)
  }

  function onTouchMove(e) {
    e.preventDefault()
    const t = e.touches[0]
    continueDrag(t.clientX, t.clientY)
  }

  function onTouchEnd(e) {
    e.preventDefault()
    endDrag()
  }

  const isSelected = (r, c) => selected.some(p => p.r === r && p.c === c)

  return (
    <div className="ws-wrapper">
      <p className="ws-hint">Encontre a palavra escondida na grade.</p>

      <div
        className={`ws-grid ${status === 'success' ? 'ws-frozen' : ''}`}
        ref={gridRef}
        onMouseUp={endDrag}
        onMouseLeave={endDrag}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        style={{ userSelect: 'none' }}
      >
        {grid.map((row, r) => (
          <div key={r} className="ws-row">
            {row.map((letter, c) => (
              <span
                key={c}
                data-cell={cellKey(r, c)}
                className={`ws-cell ${isSelected(r, c) ? 'ws-cell-selected' : ''}`}
                onMouseDown={() => onMouseDown(r, c)}
                onMouseEnter={() => { if (dragging) {
                  setSelected(prev => {
                    if (prev.some(p => p.r === r && p.c === c)) return prev
                    return [...prev, { r, c }]
                  })
                }}}
              >
                {letter}
              </span>
            ))}
          </div>
        ))}
      </div>

      {showInput && (
        <form className="ws-confirm-form challenge-form" onSubmit={handleSubmit}>
          <p className="ws-found-msg">Palavra encontrada. Digite-a para confirmar.</p>
          <input
            className={`challenge-input ${status === 'error' ? 'input-error' : ''}`}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="A palavra que você encontrou..."
            autoFocus
            autoComplete="off"
            spellCheck="false"
          />
          <button className="challenge-btn" type="submit">
            Confirmar
          </button>
          {status === 'error' && (
            <p className="feedback feedback-error">Palavra incorreta. Tente novamente.</p>
          )}
        </form>
      )}
    </div>
  )
}
