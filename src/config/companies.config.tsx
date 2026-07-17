import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import type { Company } from '@/types/api'
import type { FieldDef } from '@/types/table'
import { ActionsCell } from '@/components/table/ActionsCell'

const h = createColumnHelper<Company>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const companyColumns = (onEdit: (row: Company) => void, onDelete: (row: Company) => void): ColumnDef<Company, any>[] => [
  h.accessor('gcode', { header: 'GCode', enableColumnFilter: true, cell: (i) => i.getValue() ?? '—' }),
  h.accessor('name', { header: 'Name', enableColumnFilter: true }),
  h.accessor('created_at', {
    header: 'Created',
    cell: (i) => new Date(i.getValue()).toLocaleDateString(),
  }),
  h.accessor('updated_at', {
    header: 'Updated',
    cell: (i) => new Date(i.getValue()).toLocaleDateString(),
  }),
  h.display({
    id: 'actions',
    header: 'Actions',
    size: 90,
    cell: ({ row }) => <ActionsCell row={row.original} onEdit={onEdit} onDelete={onDelete} />,
  }),
]

export const companyCreateFields: FieldDef[] = [
  { key: 'gcode', label: 'GCode', type: 'text' },
  { key: 'name', label: 'Name', type: 'text', required: true },
]

export const companyEditFields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
]
