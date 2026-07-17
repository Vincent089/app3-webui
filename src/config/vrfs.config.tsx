import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import type { Vrf, Company } from '@/types/api'
import type { FieldDef, SelectOption } from '@/types/table'
import { ActionsCell } from '@/components/table/ActionsCell'

function gcodeOptions(companies: Company[]): SelectOption[] {
  return companies
    .filter((c) => c.gcode)
    .map((c) => ({ label: `${c.gcode} — ${c.name}`, value: c.gcode! }))
}

const DATACENTERS: SelectOption[] = [
  { label: 'DDC', value: 'DDC' },
  { label: 'MDC', value: 'MDC' },
]

const SCOPES: SelectOption[] = [
  { label: 'legacy', value: 'legacy' },
  { label: 'gdn', value: 'gdn' },
  { label: 'datacenter', value: 'datacenter' },
  { label: 'remote', value: 'remote' },
]

const SCOPE_SUBSCOPES: Record<string, SelectOption[]> = {
  legacy: [],
  gdn: [{ label: 'l3circuit', value: 'l3circuit' }],
  datacenter: [
    { label: 'snis', value: 'snis' },
    { label: 'cloud', value: 'cloud' },
    { label: 'ua', value: 'ua' },
    { label: 'pbr', value: 'pbr' },
    { label: 'hnas', value: 'hnas' },
    { label: 'client', value: 'client' },
  ],
  remote: [{ label: 'client', value: 'client' }],
}

const QUALIFIERS: SelectOption[] = [
  { label: 'legacy', value: 'legacy' },
  { label: 'gaas', value: 'gaas' },
]

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

export const vrfCreateFields = (companies: Company[]): FieldDef[] => [
  { key: 'asn_number', label: 'ASN Number', type: 'number', required: true, valueAsNumber: true },
  { key: 'gcode', label: 'GCode', type: 'select', required: true, options: gcodeOptions(companies) },
  { key: 'datacenter', label: 'Datacenter', type: 'select', required: true, options: DATACENTERS },
  { key: 'scope', label: 'Scope', type: 'select', required: true, options: SCOPES },
  {
    key: 'subscope',
    label: 'Subscope',
    type: 'select',
    optionsDependsOn: 'scope',
    optionsMap: SCOPE_SUBSCOPES,
  },
  { key: 'qualifier', label: 'Qualifier', type: 'select', required: true, options: QUALIFIERS },
  { key: 'number', label: 'Number', type: 'number' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'rd', label: 'RD', type: 'text' },
  { key: 'purpose', label: 'Purpose', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
]

export const vrfEditFields = (companies: Company[]): FieldDef[] => [
  { key: 'gcode', label: 'GCode', type: 'select', required: true, options: gcodeOptions(companies) },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'purpose', label: 'Purpose', type: 'text', required: true },
  { key: 'description', label: 'Description', type: 'textarea' },
]
