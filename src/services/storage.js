/**
 * storage.js
 *
 * Gerencia a persistência do progresso no LocalStorage.
 * A chave é versionada para evitar conflitos em caso de mudanças
 * estruturais no estado salvo.
 */

const STORAGE_KEY = 'arg_progress_v1'

const DEFAULT_STATE = {
  currentStepId: null, // id da etapa atual
  completed: [],       // array de ids de etapas concluídas
  startedAt: null,     // timestamp ISO do início
  meta: {},            // reservado para dados extras por etapa
}

/**
 * Carrega o progresso salvo. Retorna o estado padrão se não houver nada.
 */
export function loadProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_STATE }
    const parsed = JSON.parse(raw)
    // Garante que campos novos no DEFAULT_STATE sempre existam
    return { ...DEFAULT_STATE, ...parsed }
  } catch {
    return { ...DEFAULT_STATE }
  }
}

/**
 * Salva o estado de progresso inteiro.
 */
export function saveProgress(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('[ARG] Falha ao salvar progresso no LocalStorage:', e)
  }
}

/**
 * Reseta o progresso por completo (útil para debug ou botão "recomeçar").
 */
export function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (e) {
    console.warn('[ARG] Falha ao resetar progresso:', e)
  }
}
