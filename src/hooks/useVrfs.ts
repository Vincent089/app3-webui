import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listVrfs, createVrf, updateVrf, deleteVrf } from '@/api/vrfs'

const KEY = ['vrfs']

export function useVrfs() {
  return useQuery({ queryKey: KEY, queryFn: listVrfs })
}

export function useCreateVrf() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createVrf,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateVrf() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Parameters<typeof updateVrf>[1] }) =>
      updateVrf(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteVrf() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteVrf,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
