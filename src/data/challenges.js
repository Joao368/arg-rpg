/**
 * challenges.js
 *
 * Definição dos desafios. As respostas corretas NUNCA ficam aqui em texto puro.
 * Apenas os hashes SHA-256 das respostas normalizadas.
 *
 * Para gerar um hash: npm run hash "resposta"
 *
 * Tipos disponíveis:
 *   text            - campo de texto livre
 *   number          - campo numérico
 *   multiple-choice - seleção de alternativas
 *   code            - código secreto (campo texto tratado como código)
 *   custom          - componente personalizado (precisa de challengeComponent)
 *
 * normOptions padrão aplicados se não definidos:
 *   caseSensitive: false, trimSpaces: true,
 *   collapseSpaces: true, requireAccents: false
 */

export const CHALLENGES = {
  'desafio-pronto': {
    type: 'text',
    placeholder: '',

    expectedHash: '507a9a8be3d145a86daa9644b28bf42a8dc0720d8baeabdf0406c393692bf082',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: true,
      requireAccents: false,
    },
  },

  'desafio-infiltrado': {
    type: 'text',
    placeholder: 'Nome do infiltrado...',

    expectedHash: 'd006c4836c1e8873d2c09e7a759b844e5d631a5c2dc87ffba3c33c4807ae1cf6',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: true,
      requireAccents: false,
    },
  },

  'desafio-sigilo': {
    type: 'text',
    placeholder: 'Sua resposta...',
  
    expectedHash: '4d6d852bd86eae1360a1410738d64fb7b4faca6cfbc507f85355d305531abb3a',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: true,
      requireAccents: false,
    },
  },

  'desafio-larpado': {
    type: 'text',
    placeholder: 'O _______!',
    
    expectedHash: '13fb328b339e078f51ce2769308354557a183c0f4d043e699aaa0772fc44cf10',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: true,
      requireAccents: false,
    },
  },

  'desafio-obsessao': {
    type: 'text',
    placeholder: 'Sua resposta...',
    
    expectedHash: 'f17feed060f5761c7a756920bbc88bbf82de9747872aa36f026cb0dc3964b07f',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: true,
      requireAccents: false,
    },
  },

  'desafio-email': {
    type: 'email-step',
    
    expectedHash: 'a10335a2644cd19e4af502cb5abe0d85c3878caff3449f8fe206b556d490d6b4',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: true,
      requireAccents: false,
    },
  },

  'desafio-urna': {
    type: 'voting-machine',
   
    expectedHash: '02dd3f6e8c9ee3deafa324c94b1fed88ebf82082210cbdd713e119dc2b2c7010',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: false,
      requireAccents: false,
    },
  },

  'desafio-poema': {
    type: 'poem-words',
   
    expectedHash: 'c80edfbd7c280f93d9b25105834e6a90990983f3c9fe6c40b703b074444555c7',
  },

  'desafio-pistas': {
    type: 'clues',
   
    expectedHash: '4160cef9684dc728a02302f907fb9aff5895f47efdc964a587e913025ed39822',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: true,
      requireAccents: false,
    },
  },

  'desafio-caca-palavra': {
    type: 'word-search',
    
    expectedHash: '4e37007477f76ef31a5053bc7f2dfc0d14e54dbb93c362622558aaa1fcbed124',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: true,
      requireAccents: false,
    },
  },

  'desafio-numero': {
    type: 'number',
    placeholder: 'Digite o valor total...',
    // Resposta: "77"
    // hash SHA-256 de "77"
    expectedHash: 'a88a7902cb4ef697ba0b6759c50e8c10297ff58f942243de19b984841bfe1f73',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: true,
      requireAccents: false,
    },
    hint: 'Some os três fragmentos.',
  },

  'desafio-multipla': {
    type: 'multiple-choice',
    options: [
      { id: 'a', label: 'Testemunha A — estava dormindo' },
      { id: 'b', label: 'Testemunha B — viu o carro vermelho' },
      { id: 'c', label: 'Testemunha C — ouviu a janela quebrar' },
    ],
    // Resposta: selecionar apenas "b"
    // hash SHA-256 de "b" (ids ordenados, unidos por vírgula)
    expectedHash: '3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
    hint: 'Apenas uma alternativa é a correta.',
  },

  'desafio-codigo': {
    type: 'code',
    placeholder: 'Código de acesso...',
    // Resposta: "ARG-77"
    // hash SHA-256 de "arg-77" (lowercase)
    expectedHash: '465bd0604d0089560c23312fb3ba25fc65d06ad49a89a0c8ace81d2d73f00eac',
    normOptions: {
      caseSensitive: false,
      trimSpaces: true,
      collapseSpaces: false,
      requireAccents: false,
    },
    hint: 'O nome do projeto e o número do arquivo.',
  },
}
