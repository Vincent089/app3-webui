import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import type { Vrf, Asn } from '@/types/api'
import type { FieldDef } from '@/types/table'
import { ActionsCell } from '@/components/table/ActionsCell'

const h = createColumnHelper<Vrf>()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const vrfColumns = (onEdit: (row: Vrf) => void, onDelete: (row: Vrf) => void): ColumnDef<Vrf, any>[] => [
  h.accessor('rd', { header: 'RD' }),
  h.accessor('name', { header: 'Name' }),
  h.accessor('asn_number', { header: 'ASN' }),
  h.accessor('number', { header: 'Number' }),
  h.accessor('gcode', { header: 'GCode', enableColumnFilter: true }),
  h.accessor('datacenter', { header: 'Datacenter', enableColumnFilter: true }),
  h.accessor('scope', { header: 'Scope', enableColumnFilter: true }),
  h.accessor('subscope', { header: 'Subscope', enableColumnFilter: true }),
  h.accessor('qualifier', { header: 'Qualifier', enableColumnFilter: true }),
  h.accessor('purpose', { header: 'Purpose', enableColumnFilter: true }),
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

export const vrfCreateFields = (asns: Asn[]): FieldDef[] => [
  {
    key: 'asn_number',
    label: 'ASN',
    type: 'select',
    required: true,
    valueAsNumber: true,
    options: asns.map((a) => ({ label: String(a.number), value: a.number })),
  },
  { key: 'gcode', label: 'GCode', type: 'text', required: true },
  { key: 'datacenter', label: 'Datacenter', type: 'text', required: true },
  { key: 'scope', label: 'Scope', type: 'text', required: true },
  { key: 'subscope', label: 'Subscope', type: 'text', required: true },
  { key: 'qualifier', label: 'Qualifier', type: 'text', required: true },
  { key: 'number', label: 'Number', type: 'number' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'rd', label: 'RD', type: 'text' },
  { key: 'purpose', label: 'Purpose', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
]

export const vrfEditFields: FieldDef[] = [
  { key: 'gcode', label: 'GCode', type: 'text', required: true },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'purpose', label: 'Purpose', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
]
