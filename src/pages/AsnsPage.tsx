import { useState } from 'react'
import type { Asn } from '@/types/api'
import { useAsns, useCreateAsn, useUpdateAsn, useDeleteAsn } from '@/hooks/useAsns'
import { asnColumns, asnFields } from '@/config/asns.config'
import { DataTable } from '@/components/table/DataTable'
import { ResourceModal } from '@/components/modal/ResourceModal'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function AsnsPage() {
  const { data = [], isLoading } = useAsns()
  const create = useCreateAsn()
  const update = useUpdateAsn()
  const remove = useDeleteAsn()

  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Asn | null>(null)

  const columns = asnColumns(
    (row) => { setEditTarget(row); setModalOpen(true) },
    (row) => remove.mutate(row.number),
  )

  function handleClose() { setModalOpen(false); setEditTarget(null) }

  async function handleSubmit(body: Partial<Asn>) {
    if (editTarget) {
      await update.mutateAsync({ number: editTarget.number, body })
    } else {
      await create.mutateAsync(body as Asn)
    }
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="ASNs" search={search} onSearch={setSearch} />
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-3 flex justify-end">
            <Button onClick={() => { setEditTarget(null); setModalOpen(true) }} size="sm">
              <Plus className="h-3.5 w-3.5" /> Add ASN
            </Button>
          </div>
          <DataTable data={data} columns={columns} globalFilter={search} isLoading={isLoading} />
        </div>
      </div>
      <ResourceModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        fields={asnFields}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        initialValues={editTarget as any}
        title={editTarget ? 'Edit ASN' : 'Add ASN'}
      />
    </div>
  )
}
