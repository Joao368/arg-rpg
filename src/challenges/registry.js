/**
 * registry.js
 *
 * Liga cada tipo de desafio ao componente React correspondente.
 * Para adicionar um novo tipo:
 *   1. Crie o componente em src/challenges/
 *   2. Importe-o aqui
 *   3. Adicione a entrada no objeto REGISTRY
 */

import TextChallenge from './TextChallenge.jsx'
import NumberChallenge from './NumberChallenge.jsx'
import MultipleChoiceChallenge from './MultipleChoiceChallenge.jsx'
import CodeChallenge from './CodeChallenge.jsx'
import WordSearchChallenge from './WordSearchChallenge.jsx'
import CluesChallenge from './CluesChallenge.jsx'
import PoemWordsChallenge from './PoemWordsChallenge.jsx'
import VotingMachineChallenge from './VotingMachineChallenge.jsx'
import EmailStepChallenge from './EmailStepChallenge.jsx'

export const REGISTRY = {
  'text': TextChallenge,
  'number': NumberChallenge,
  'multiple-choice': MultipleChoiceChallenge,
  'code': CodeChallenge,
  'word-search': WordSearchChallenge,
  'clues': CluesChallenge,
  'poem-words': PoemWordsChallenge,
  'voting-machine': VotingMachineChallenge,
  'email-step': EmailStepChallenge,
  // 'custom': CustomChallenge,  ← adicione aqui para tipos personalizados
}
