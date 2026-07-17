import apiFetch from './client'
import type { Company } from '@/types/api'

export const getCompanies = () => apiFetch<Company[]>('/companies')
export const getCompany = (id: string) => apiFetch<Company>(`/companies/${id}`)
export const createCompany = (body: Record<string, unknown>) =>
  apiFetch<Company>('/companies', { method: 'POST', body: JSON.stringify(body) })
export const updateCompany = (id: string, body: Record<string, unknown>) =>
  apiFetch<Company>(`/companies/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
export const deleteCompany = (id: string) =>
  apiFetch<void>(`/companies/${id}`, { method: 'DELETE' })
