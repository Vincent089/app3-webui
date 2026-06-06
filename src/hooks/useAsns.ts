import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listAsns, createAsn, updateAsn, deleteAsn } from '@/api/asns'

const KEY = ['asns']

export function useAsns() {
  return useQuery({ queryKey: KEY, queryFn: listAsns })
}

export function useCreateAsn() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createAsn,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateAsn() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ number, body }: { number: number; body: Parameters<typeof updateAsn>[1] }) =>
      updateAsn(number, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteAsn() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteAsn,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
