import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCoreGroup, joinCoreGroup, leaveCoreGroup } from '@/api/coregroups'

export function useCoreGroup(coreId: number) {
  return useQuery({
    queryKey: ['core-group', coreId],
    queryFn: () => getCoreGroup(coreId),
  })
}

export function useJoinCoreGroup() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ coreId, targetCoreId }: { coreId: number; targetCoreId: number }) =>
      joinCoreGroup(coreId, targetCoreId),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['core-group'] }),
  })
}

export function useLeaveCoreGroup() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: leaveCoreGroup,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['core-group'] }),
  })
}
