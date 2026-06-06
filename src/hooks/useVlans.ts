import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listVlans, createVlan, updateVlan, deleteVlan } from '@/api/vlans'

const KEY = ['vlans']

export function useVlans() {
  return useQuery({ queryKey: KEY, queryFn: listVlans })
}

export function useCreateVlan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createVlan,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateVlan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: string; body: Parameters<typeof updateVlan>[1] }) =>
      updateVlan(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteVlan() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteVlan,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
