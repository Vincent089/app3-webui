import { useState } from 'react'
import type { Core } from '@/types/api'
import { useCoreGroup, useJoinCoreGroup, useLeaveCoreGroup } from '@/hooks/useCoreGroup'
import { Dialog, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'

interface CoreGroupModalProps {
  open: boolean
  onClose: () => void
  core: Core
  allCores: Core[]
}

export function CoreGroupModal({ open, onClose, core, allCores }: CoreGroupModalProps) {
  const { data: members = [], isLoading } = useCoreGroup(core.id)
  const join = useJoinCoreGroup()
  const leave = useLeaveCoreGroup()
  const [targetId, setTargetId] = useState<string>('')

  // The group always includes the core itself; check for OTHER members
  const peers = members.filter((m) => m.id !== core.id)
  const isShared = peers.length > 0
  const peerIds = new Set(peers.map((m) => m.id))
  const joinableCores = allCores.filter((c) => c.id !== core.id && !peerIds.has(c.id))

  async function handleJoin() {
    if (!targetId) return
    await join.mutateAsync({ coreId: core.id, targetCoreId: Number(targetId) })
    setTargetId('')
  }

  async function handleLeave() {
    if (!confirm('Leave group? This core will manage its own VLAN namespace.')) return
    await leave.mutateAsync(core.id)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className="mb-4">Group — {core.name}</DialogTitle>

      {isLoading ? (
        <p className="py-4 text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Current Group
            </p>
            {isShared ? (
              <>
                <ul className="space-y-1">
                  {peers.map((m) => (
                    <li key={m.id} className="rounded-md bg-muted/40 px-3 py-2 text-sm">
                      <span className="font-medium">{m.name}</span>
                      <span className="ml-2 text-muted-foreground">{m.datacenter}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleLeave}
                  disabled={leave.isPending}
                >
                  Leave Group
                </Button>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">Solo — not joined with any other core.</p>
            )}
          </div>

          <div className="space-y-2 border-t pt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Join a Group
            </p>
            <div className="flex gap-2">
              <Select
                value={targetId}
                onChange={(e) => setTargetId(e.target.value)}
                className="flex-1"
              >
                <option value="">Select a core…</option>
                {joinableCores.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.datacenter})
                  </option>
                ))}
              </Select>
              <Button
                size="sm"
                onClick={handleJoin}
                disabled={!targetId || join.isPending}
              >
                Join
              </Button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  )
}
