/**
 * validation.js
 *
 * Lógica central de validação de respostas via SHA-256 (Web Crypto API).
 *
 * AVISO: toda a validação roda no cliente. O hash protege contra
 * descoberta casual, mas não contra um usuário determinado que
 * inspecione o bundle ou use força bruta em respostas curtas.
 */

/**
 * Normaliza uma string de acordo com as opções do desafio.
 *
 * @param {string} input
 * @param {object} options
 * @param {boolean} [options.caseSensitive=false]   - preserva maiúsculas/minúsculas
 * @param {boolean} [options.trimSpaces=true]       - remove espaços nas bordas
 * @param {boolean} [options.collapseSpaces=true]   - colapsa espaços internos múltiplos
 * @param {boolean} [options.requireAccents=false]  - se false, remove acentos antes de comparar
 * @returns {string}
 */
export function normalize(input, options = {}) {
  const {
    caseSensitive = false,
    trimSpaces = true,
    collapseSpaces = true,
    requireAccents = false,
  } = options

  let s = String(input)

  if (!caseSensitive) s = s.toLowerCase()
  if (trimSpaces) s = s.trim()
  if (collapseSpaces) s = s.replace(/\s+/g, ' ')
  if (!requireAccents) s = removeAccents(s)

  return s
}

/**
 * Remove acentuação de uma string.
 */
function removeAccents(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Gera o hash SHA-256 de uma string e retorna como hex.
 *
 * @param {string} text
 * @returns {Promise<string>} hex string com 64 caracteres
 */
export async function sha256(text) {
  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/**
 * Valida a resposta do jogador contra o hash esperado.
 *
 * @param {string} userInput        - resposta digitada
 * @param {string} expectedHash     - hash SHA-256 armazenado na definição do desafio
 * @param {object} [normOptions={}] - opções de normalização
 * @returns {Promise<boolean>}
 */
export async function validateAnswer(userInput, expectedHash, normOptions = {}) {
  const normalized = normalize(userInput, normOptions)
  const hash = await sha256(normalized)
  return hash === expectedHash
}

/**
 * Valida múltipla escolha: recebe um array de ids selecionados,
 * ordena, serializa e compara com o hash.
 *
 * @param {string[]} selectedIds
 * @param {string}   expectedHash
 * @returns {Promise<boolean>}
 */
export async function validateMultipleChoice(selectedIds, expectedHash) {
  const serialized = [...selectedIds].sort().join(',')
  const hash = await sha256(serialized)
  return hash === expectedHash
}
