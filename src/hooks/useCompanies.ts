import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCompanies, getCompany, createCompany, updateCompany, deleteCompany } from '@/api/companies'

const KEY = ['companies']

export function useCompanies() {
  return useQuery({ queryKey: KEY, queryFn: getCompanies })
}

export function useCompany(id: string) {
  return useQuery({ queryKey: [...KEY, id], queryFn: () => getCompany(id) })
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
    mutationFn: ({ id, body }: { id: string; body: Record<string, unknown> }) => updateCompany(id, body),
    onSuccess: (_, { id }) => {
      qc.invalidateQueries({ queryKey: KEY })
      qc.invalidateQueries({ queryKey: [...KEY, id] })
    },
  })
}

export function useDeleteCompany() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteCompany,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
