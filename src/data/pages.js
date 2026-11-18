/**
 * pages.js
 *
 * Definição de todas as etapas do ARG.
 *
 * Para gerar hashes de respostas, use:
 *   npm run hash "resposta aqui"
 */

export const PAGES = [
  {
    id: 'inicio',
    title: 'Você está pronto?',
    content: null,
    challengeId: 'desafio-pronto',
    isLanding: true,
  },
  {
    id: 'caca-palavra',
    title: 'O que você encontrou?',
    content: null,
    challengeId: 'desafio-caca-palavra',
  },
  {
    id: 'pistas',
    title: 'Pistas',
    content: null,
    challengeId: 'desafio-pistas',
  },
  {
    id: 'poema',
    title: 'poema',
    content: null,
    challengeId: 'desafio-poema',
  },
  {
    id: 'urna',
    title: 'honesto',
    content: null,
    challengeId: 'desafio-urna',
  },
  {
    id: 'email',
    title: 'o melhor',
    content: null,
    challengeId: 'desafio-email',
  },
  {
    id: 'obsessao',
    title: 'a nova obsessão do mestre',
    content: null,
    challengeId: 'desafio-obsessao',
    isCentered: true,
  },
  {
    id: 'larpado',
    title: 'O _______!',
    content: null,
    challengeId: 'desafio-larpado',
    isCentered: true,
  },
  {
    id: 'sigilo',
    title: 'consequencias',
    content: null,
    challengeId: 'desafio-sigilo',
    isCentered: true,
    media: { type: 'image', src: './assets/sigilo.png', alt: '' },
  },
  {
    id: 'infiltrado',
    title: 'Nomeie o infiltrado',
    content: null,
    challengeId: 'desafio-infiltrado',
    isCentered: true,
  },
  {
    id: 'fim',
    title: 'Fim',
    content: null,
    challengeId: null,
    isFinal: true,
  },
]
