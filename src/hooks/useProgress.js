/**
 * useProgress.js
 *
 * Hook central de progresso. Encapsula leitura/escrita no LocalStorage
 * e expõe helpers para verificar desbloqueio e concluir etapas.
 */

import { useState, useCallback } from 'react'
import { loadProgress, saveProgress, resetProgress } from '../services/storage.js'
import { PAGES } from '../data/pages.js'

/**
 * Retorna o id da primeira página.
 */
function firstPageId() {
  return PAGES[0]?.id ?? null
}

/**
 * Verifica se uma etapa está acessível dado o estado atual.
 *
 * Regras:
 * - A primeira etapa é sempre acessível.
 * - Uma etapa está acessível se já foi concluída.
 * - A próxima etapa após a última concluída também está acessível.
 */
export function isStepAccessible(stepId, progress) {
  const { completed } = progress
  const index = PAGES.findIndex(p => p.id === stepId)
  if (index === -1) return false
  if (index === 0) return true
  if (completed.includes(stepId)) return true
  // Verifica se a etapa anterior foi concluída
  const prevId = PAGES[index - 1].id
  return completed.includes(prevId)
}

export function useProgress() {
  const [progress, setProgress] = useState(() => {
    const saved = loadProgress()
    // Inicializa currentStepId se for null
    if (!saved.currentStepId) {
      saved.currentStepId = firstPageId()
      saved.startedAt = new Date().toISOString()
      saveProgress(saved)
    }
    return saved
  })

  /**
   * Marca uma etapa como concluída e avança a etapa atual.
   */
  const completeStep = useCallback((stepId) => {
    setProgress(prev => {
      const alreadyDone = prev.completed.includes(stepId)
      const newCompleted = alreadyDone ? prev.completed : [...prev.completed, stepId]

      // Determina a próxima etapa
      const index = PAGES.findIndex(p => p.id === stepId)
      const nextPage = PAGES[index + 1]
      const newCurrentId = nextPage ? nextPage.id : stepId // permanece na última se não houver próxima

      const newState = {
        ...prev,
        completed: newCompleted,
        currentStepId: newCurrentId,
      }
      saveProgress(newState)
      return newState
    })
  }, [])

  /**
   * Reseta o progresso por completo.
   */
  const reset = useCallback(() => {
    resetProgress()
    const fresh = {
      currentStepId: firstPageId(),
      completed: [],
      startedAt: new Date().toISOString(),
      meta: {},
    }
    saveProgress(fresh)
    setProgress(fresh)
  }, [])

  /**
   * Verifica se um stepId é acessível com base no progresso atual.
   */
  const canAccess = useCallback((stepId) => {
    return isStepAccessible(stepId, progress)
  }, [progress])

  /**
   * Verifica se um stepId já foi concluído.
   */
  const isCompleted = useCallback((stepId) => {
    return progress.completed.includes(stepId)
  }, [progress])

  return {
    progress,
    completeStep,
    reset,
    canAccess,
    isCompleted,
    currentStepId: progress.currentStepId,
  }
}
