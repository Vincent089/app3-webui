import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Company } from '@/types/api'
import { useCompanies, useCreateCompany, useUpdateCompany, useDeleteCompany } from '@/hooks/useCompanies'
import { companyColumns } from '@/config/companies.config'
import { DataTable } from '@/components/table/DataTable'
import { CompanyModal } from '@/components/company/CompanyModal'
import { Header } from '@/components/layout/Header'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export function CompaniesPage() {
  const { data = [], isLoading } = useCompanies()
  const create = useCreateCompany()
  const update = useUpdateCompany()
  const remove = useDeleteCompany()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTarget, setEditTarget] = useState<Company | null>(null)

  const columns = companyColumns(
    (row) => { setEditTarget(row); setModalOpen(true) },
    (row) => remove.mutate(row.id),
    (row) => navigate(`/companies/${row.id}`),
  )

  function handleClose() { setModalOpen(false); setEditTarget(null) }

  async function handleSubmit(body: Record<string, unknown>) {
    if (editTarget) {
      await update.mutateAsync({ id: editTarget.id, body })
    } else {
      await create.mutateAsync(body)
    }
    handleClose()
  }

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      <Header title="Companies" search={search} onSearch={setSearch} />
      <div className="flex-1 overflow-auto p-4">
        <div className="mx-auto max-w-[1800px]">
          <div className="mb-3 flex justify-end">
            <Button onClick={() => { setEditTarget(null); setModalOpen(true) }} size="sm">
              <Plus className="h-3.5 w-3.5" /> Add Company
            </Button>
          </div>
          <DataTable data={data} columns={columns} globalFilter={search} isLoading={isLoading} />
        </div>
      </div>
      <CompanyModal
        open={modalOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        initialValues={editTarget}
        title={editTarget ? 'Edit Company' : 'Add Company'}
      />
    </div>
  )
}
