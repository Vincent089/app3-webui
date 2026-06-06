import apiFetch from './client'
import type { Core } from '@/types/api'

type CorePayload = Omit<Core, 'id'>

export const listCores = () => apiFetch<Core[]>('/cores')
export const createCore = (body: CorePayload) =>
  apiFetch<Core>('/cores', { method: 'POST', body: JSON.stringify(body) })
export const updateCore = (id: number, body: Partial<CorePayload>) =>
  apiFetch<Core>(`/cores/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
export const deleteCore = (id: number) =>
  apiFetch<void>(`/cores/${id}`, { method: 'DELETE' })
