import { useState } from 'react'
import type { Vrf } from '@/types/api'
import { useVrfs, useCreateVrf, useUpdateVrf, useDeleteVrf } from '@/hooks/useVrfs'
import { useAsns } from '@/hooks/useAsns'
import { vrfColumns, vrfCreateFields, vrfEditFields } from '@/config/vrfs.config'
import { DataTable } from '@/components/table/DataTable'
import { ResourceModal } from '@/components/modal/ResourceModal'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function VrfsPage() {
  const { data = [], isLoading } = useVrfs()
  const { data: asns = [] } = useAsns()
  const create = useCreateVrf()
  const update = useUpdateVrf()
  const remove = useDeleteVrf()

  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Vrf | null>(null)

  const columns = vrfColumns(
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
      <Header title="VRFs" search={search} onSearch={setSearch} />
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-3 flex justify-end">
            <Button onClick={() => { setEditTarget(null); setModalOpen(true) }} size="sm">
              <Plus className="h-3.5 w-3.5" /> Add VRF
            </Button>
          </div>
          <DataTable data={data} columns={columns} globalFilter={search} isLoading={isLoading} />
        </div>
      </div>
      <ResourceModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        fields={vrfCreateFields(asns)}
        editFields={vrfEditFields}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        initialValues={editTarget as any}
        title={editTarget ? 'Edit VRF' : 'Add VRF'}
      />
    </div>
  )
}
