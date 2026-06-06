import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import type { Asn } from '@/types/api'
import type { FieldDef } from '@/types/table'
import { ActionsCell } from '@/components/table/ActionsCell'

const h = createColumnHelper<Asn>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asnColumns = (onEdit: (row: Asn) => void, onDelete: (row: Asn) => void): ColumnDef<Asn, any>[] => [
  h.accessor('number', { header: 'Number' }),
  h.accessor('scope', { header: 'Scope', enableColumnFilter: true }),
  h.accessor('gcode', {
    header: 'GCode',
    cell: (info) => info.getValue() ?? '—',
    enableColumnFilter: true,
  }),
  h.display({
    id: 'actions',
    header: 'Actions',
    size: 90,
    cell: ({ row }) => <ActionsCell row={row.original} onEdit={onEdit} onDelete={onDelete} />,
  }),
]

export const asnFields: FieldDef[] = [
  { key: 'number', label: 'Number', type: 'number', required: true },
  { key: 'scope', label: 'Scope', type: 'text', required: true },
  { key: 'gcode', label: 'GCode', type: 'text' },
]
