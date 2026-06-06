import apiFetch from './client'
import type { VlanRestriction } from '@/types/api'

type VlanRestrictionPayload = Omit<VlanRestriction, 'id' | 'core_name'>

export const listVlanRestrictions = () => apiFetch<VlanRestriction[]>('/vlanrestrictions')
export const createVlanRestriction = (body: VlanRestrictionPayload) =>
  apiFetch<VlanRestriction>('/vlanrestrictions', { method: 'POST', body: JSON.stringify(body) })
export const updateVlanRestriction = (id: number, body: Partial<VlanRestrictionPayload>) =>
  apiFetch<VlanRestriction>(`/vlanrestrictions/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
export const deleteVlanRestriction = (id: number) =>
  apiFetch<void>(`/vlanrestrictions/${id}`, { method: 'DELETE' })
