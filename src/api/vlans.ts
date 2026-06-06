import apiFetch from './client'
import type { Vlan } from '@/types/api'

type VlanPayload = Omit<Vlan, 'id' | 'core_name'>

export const listVlans = () => apiFetch<Vlan[]>('/vlans')
export const createVlan = (body: VlanPayload) =>
  apiFetch<Vlan>('/vlans', { method: 'POST', body: JSON.stringify(body) })
export const updateVlan = (id: string, body: Partial<VlanPayload>) =>
  apiFetch<Vlan>(`/vlans/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
export const deleteVlan = (id: string) =>
  apiFetch<void>(`/vlans/${id}`, { method: 'DELETE' })
