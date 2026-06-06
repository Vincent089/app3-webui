import { useState } from 'react'
import type { VlanRestriction } from '@/types/api'
import {
  useVlanRestrictions,
  useCreateVlanRestriction,
  useUpdateVlanRestriction,
  useDeleteVlanRestriction,
} from '@/hooks/useVlanRestrictions'
import { vlanRestrictionColumns, vlanRestrictionFields } from '@/config/vlanrestrictions.config'
import { DataTable } from '@/components/table/DataTable'
import { ResourceModal } from '@/components/modal/ResourceModal'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function VlanRestrictionsPage() {
  const { data = [], isLoading } = useVlanRestrictions()
  const create = useCreateVlanRestriction()
  const update = useUpdateVlanRestriction()
  const remove = useDeleteVlanRestriction()

  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<VlanRestriction | null>(null)

  const columns = vlanRestrictionColumns(
    (row) => { setEditTarget(row); setModalOpen(true) },
    (row) => remove.mutate(row.id),
  )

  function handleClose() { setModalOpen(false); setEditTarget(null) }

  async function handleSubmit(body: Partial<VlanRestriction>) {
    if (editTarget) {
      await update.mutateAsync({ id: editTarget.id, body })
    } else {
      await create.mutateAsync(body as Parameters<typeof create.mutateAsync>[0])
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="VLAN Restrictions" search={search} onSearch={setSearch} />
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-3 flex justify-end">
            <Button onClick={() => { setEditTarget(null); setModalOpen(true) }} size="sm">
              <Plus className="h-3.5 w-3.5" /> Add Restriction
            </Button>
          </div>
          <DataTable data={data} columns={columns} globalFilter={search} isLoading={isLoading} />
        </div>
      </div>
      <ResourceModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        fields={vlanRestrictionFields}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        initialValues={editTarget as any}
        title={editTarget ? 'Edit VLAN Restriction' : 'Add VLAN Restriction'}
      />
    </div>
  )
}
