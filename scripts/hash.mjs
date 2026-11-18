/**
 * hash.mjs
 *
 * Gera o hash SHA-256 de uma resposta normalizada para uso em challenges.js.
 *
 * Uso:
 *   node scripts/hash.mjs "resposta aqui"
 *   npm run hash "resposta aqui"
 *
 * Opções (após a resposta):
 *   --case-sensitive   preserva maiúsculas/minúsculas (padrão: ignora)
 *   --require-accents  exige acentuação (padrão: remove)
 *
 * Exemplos:
 *   node scripts/hash.mjs "inicio"
 *   node scripts/hash.mjs "ARG-77" --case-sensitive
 *   node scripts/hash.mjs "77"
 */

import { createHash } from 'node:crypto'

const args = process.argv.slice(2)

if (args.length === 0 || args[0] === '--help') {
  console.log('Uso: node scripts/hash.mjs "resposta" [--case-sensitive] [--require-accents]')
  process.exit(0)
}

const input = args[0]
const caseSensitive = args.includes('--case-sensitive')
const requireAccents = args.includes('--require-accents')

function normalize(s) {
  let r = s.trim().replace(/\s+/g, ' ')
  if (!caseSensitive) r = r.toLowerCase()
  if (!requireAccents) r = r.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return r
}

const normalized = normalize(input)
const hash = createHash('sha256').update(normalized, 'utf8').digest('hex')

console.log()
console.log('  Entrada original :', input)
console.log('  Normalizada      :', normalized)
console.log('  SHA-256          :', hash)
console.log()
console.log('  Cole em challenges.js:')
console.log(`  expectedHash: '${hash}',`)
console.log()
