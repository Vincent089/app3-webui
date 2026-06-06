import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  listVlanRestrictions,
  createVlanRestriction,
  updateVlanRestriction,
  deleteVlanRestriction,
} from '@/api/vlanrestrictions'

const KEY = ['vlanrestrictions']

export function useVlanRestrictions() {
  return useQuery({ queryKey: KEY, queryFn: listVlanRestrictions })
}

export function useCreateVlanRestriction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: createVlanRestriction,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useUpdateVlanRestriction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: number
      body: Parameters<typeof updateVlanRestriction>[1]
    }) => updateVlanRestriction(id, body),
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}

export function useDeleteVlanRestriction() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: deleteVlanRestriction,
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  })
}
