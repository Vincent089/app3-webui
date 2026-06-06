import apiFetch from './client'
import type { Vrf } from '@/types/api'

type VrfPayload = Omit<Vrf, 'id'>

export const listVrfs = () => apiFetch<Vrf[]>('/vrfs')
export const createVrf = (body: VrfPayload) =>
  apiFetch<Vrf>('/vrfs', { method: 'POST', body: JSON.stringify(body) })
export const updateVrf = (id: string, body: Partial<VrfPayload>) =>
  apiFetch<Vrf>(`/vrfs/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
export const deleteVrf = (id: string) =>
  apiFetch<void>(`/vrfs/${id}`, { method: 'DELETE' })
