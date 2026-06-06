import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import type { Core } from '@/types/api'
import type { FieldDef } from '@/types/table'
import { ActionsCell } from '@/components/table/ActionsCell'

const h = createColumnHelper<Core>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const coreColumns = (onEdit: (row: Core) => void, onDelete: (row: Core) => void): ColumnDef<Core, any>[] => [
  h.accessor('id', { header: 'ID' }),
  h.accessor('name', { header: 'Name', enableColumnFilter: true }),
  h.accessor('datacenter', { header: 'Datacenter', enableColumnFilter: true }),
  h.accessor('size', { header: 'Size' }),
  h.display({
    id: 'actions',
    header: 'Actions',
    size: 90,
    cell: ({ row }) => <ActionsCell row={row.original} onEdit={onEdit} onDelete={onDelete} />,
  }),
]

export const coreFields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'datacenter', label: 'Datacenter', type: 'text', required: true },
  { key: 'size', label: 'Size', type: 'number', required: true },
]
