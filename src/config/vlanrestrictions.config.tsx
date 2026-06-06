import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import type { VlanRestriction } from '@/types/api'
import type { FieldDef } from '@/types/table'
import { ActionsCell } from '@/components/table/ActionsCell'

const h = createColumnHelper<VlanRestriction>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const vlanRestrictionColumns = (
  onEdit: (row: VlanRestriction) => void,
  onDelete: (row: VlanRestriction) => void,
): ColumnDef<VlanRestriction, any>[] => [
  h.accessor('core_name', { header: 'Core', enableColumnFilter: true }),
  h.accessor('description', { header: 'Description' }),
  h.accessor('start', { header: 'Start' }),
  h.accessor('end', { header: 'End' }),
  h.display({
    id: 'actions',
    header: 'Actions',
    size: 90,
    cell: ({ row }) => <ActionsCell row={row.original} onEdit={onEdit} onDelete={onDelete} />,
  }),
]

export const vlanRestrictionFields: FieldDef[] = [
  { key: 'core_id', label: 'Core ID', type: 'number', required: true },
  { key: 'description', label: 'Description', type: 'text', required: true },
  { key: 'start', label: 'Start', type: 'number', required: true },
  { key: 'end', label: 'End', type: 'number', required: true },
]
