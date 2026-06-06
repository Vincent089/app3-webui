import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import type { Vlan } from '@/types/api'
import type { Core } from '@/types/api'
import type { FieldDef } from '@/types/table'
import { ActionsCell } from '@/components/table/ActionsCell'

const h = createColumnHelper<Vlan>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const vlanColumns = (onEdit: (row: Vlan) => void, onDelete: (row: Vlan) => void): ColumnDef<Vlan, any>[] => [
  h.accessor('core_name', { header: 'Core', enableColumnFilter: true }),
  h.accessor('number', { header: 'Number' }),
  h.accessor('subnet', { header: 'Subnet' }),
  h.accessor('gcode', { header: 'GCode', enableColumnFilter: true }),
  h.accessor('purpose', { header: 'Purpose', enableColumnFilter: true }),
  h.accessor('name', { header: 'Name' }),
  h.accessor('description', {
    header: 'Description',
    cell: (info) => info.getValue() ?? '—',
  }),
  h.display({
    id: 'actions',
    header: 'Actions',
    size: 90,
    cell: ({ row }) => <ActionsCell row={row.original} onEdit={onEdit} onDelete={onDelete} />,
  }),
]

export const vlanCreateFields = (cores: Core[]): FieldDef[] => [
  {
    key: 'core_id',
    label: 'Core',
    type: 'select',
    required: true,
    valueAsNumber: true,
    options: cores.map((c) => ({ label: `${c.name} (${c.datacenter})`, value: c.id })),
  },
  { key: 'number', label: 'Number', type: 'number' },
  { key: 'subnet', label: 'Subnet', type: 'text', required: true },
  { key: 'gcode', label: 'GCode', type: 'text', required: true },
  { key: 'purpose', label: 'Purpose', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
]

export const vlanEditFields: FieldDef[] = [
  { key: 'gcode', label: 'GCode', type: 'text', required: true },
  { key: 'purpose', label: 'Purpose', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
]
