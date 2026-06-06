import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { listCores, createCore, updateCore, deleteCore } from '@/api/cores'

const KEY = ['cores']

export function useCores() {
  return useQuery({ queryKey: KEY, queryFn: listCores })
}

export function useCreateCore() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createCore,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateCore() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ id, body }: { id: number; body: Parameters<typeof updateCore>[1] }) =>
      updateCore(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteCore() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteCore,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
