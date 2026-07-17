import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import type { Vlan, Core, Company } from '@/types/api'
import type { FieldDef, SelectOption } from '@/types/table'
import { ActionsCell } from '@/components/table/ActionsCell'

function gcodeOptions(companies: Company[]): SelectOption[] {
  return companies
    .filter((c) => c.gcode)
    .map((c) => ({ label: `${c.gcode} — ${c.name}`, value: c.gcode! }))
}

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

export const vlanCreateFields = (cores: Core[], companies: Company[]): FieldDef[] => [
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
  { key: 'gcode', label: 'GCode', type: 'select', required: true, options: gcodeOptions(companies) },
  { key: 'purpose', label: 'Purpose', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
]

export const vlanEditFields = (companies: Company[]): FieldDef[] => [
  { key: 'gcode', label: 'GCode', type: 'select', required: true, options: gcodeOptions(companies) },
  { key: 'purpose', label: 'Purpose', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
]
