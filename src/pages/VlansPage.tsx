import { useState } from 'react'
import type { Vlan } from '@/types/api'
import { useVlans, useCreateVlan, useUpdateVlan, useDeleteVlan } from '@/hooks/useVlans'
import { useCores } from '@/hooks/useCores'
import { vlanColumns, vlanCreateFields, vlanEditFields } from '@/config/vlans.config'
import { DataTable } from '@/components/table/DataTable'
import { ResourceModal } from '@/components/modal/ResourceModal'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function VlansPage() {
  const { data = [], isLoading } = useVlans()
  const { data: cores = [] } = useCores()
  const create = useCreateVlan()
  const update = useUpdateVlan()
  const remove = useDeleteVlan()

  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Vlan | null>(null)

  const columns = vlanColumns(
    (row) => { setEditTarget(row); setModalOpen(true) },
    (row) => remove.mutate(row.id),
  )

  function handleClose() { setModalOpen(false); setEditTarget(null) }

  async function handleSubmit(body: Record<string, unknown>) {
    if (editTarget) {
      await update.mutateAsync({ id: editTarget.id, body })
    } else {
      await create.mutateAsync(body as Parameters<typeof create.mutateAsync>[0])
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="VLANs" search={search} onSearch={setSearch} />
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-3 flex justify-end">
            <Button onClick={() => { setEditTarget(null); setModalOpen(true) }} size="sm">
              <Plus className="h-3.5 w-3.5" /> Add VLAN
            </Button>
          </div>
          <DataTable data={data} columns={columns} globalFilter={search} isLoading={isLoading} />
        </div>
      </div>
      <ResourceModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        fields={vlanCreateFields(cores)}
        editFields={vlanEditFields}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        initialValues={editTarget as any}
        title={editTarget ? 'Edit VLAN' : 'Add VLAN'}
      />
    </div>
  )
}
