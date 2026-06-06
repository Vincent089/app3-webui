import apiFetch from './client'
import type { Asn } from '@/types/api'

export const listAsns = () => apiFetch<Asn[]>('/asns')
export const createAsn = (body: Asn) =>
  apiFetch<Asn>('/asns', { method: 'POST', body: JSON.stringify(body) })
export const updateAsn = (number: number, body: Partial<Asn>) =>
  apiFetch<Asn>(`/asns/${number}`, { method: 'PATCH', body: JSON.stringify(body) })
export const deleteAsn = (number: number) =>
  apiFetch<void>(`/asns/${number}`, { method: 'DELETE' })
