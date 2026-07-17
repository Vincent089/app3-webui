import { useCoreGroup } from '@/hooks/useCoreGroup'

interface CoreGroupCellProps {
  coreId: number
}

export function CoreGroupCell({ coreId }: CoreGroupCellProps) {
  const { data: members = [], isLoading } = useCoreGroup(coreId)

  if (isLoading) return <span className="text-muted-foreground text-xs">…</span>

  const peers = members.filter((m) => m.id !== coreId)
  if (!peers.length) return <span className="text-muted-foreground">—</span>

  return (
    <div className="flex flex-wrap gap-1">
      {peers.map((m) => (
        <span
          key={m.id}
          className="inline-flex items-center rounded bg-primary/10 px-1.5 py-0.5 text-xs font-medium text-primary"
        >
          {m.name}
        </span>
      ))}
    </div>
  )
}
