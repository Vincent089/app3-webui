import apiFetch from './client'
import type { Core } from '@/types/api'

export const getCoreGroup = (coreId: number) =>
  apiFetch<Core[]>(`/cores/${coreId}/group`)
export const joinCoreGroup = (coreId: number, targetCoreId: number) =>
  apiFetch<void>(`/cores/${coreId}/group`, {
    method: 'POST',
    body: JSON.stringify({ target_core_id: targetCoreId }),
  })
export const leaveCoreGroup = (coreId: number) =>
  apiFetch<void>(`/cores/${coreId}/group`, { method: 'DELETE' })
