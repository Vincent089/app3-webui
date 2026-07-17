import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCompanies, createCompany, updateCompany, deleteCompany } from '@/api/companies'

const KEY = ['companies']

export function useCompanies() {
  return useQuery({ queryKey: KEY, queryFn: getCompanies })
}

export function useCreateCompany() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createCompany,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateCompany() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: { name: string } }) => updateCompany(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteCompany() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
