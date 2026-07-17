import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { Network } from 'lucide-react'
import type { Core } from '@/types/api'
import type { FieldDef, SelectOption } from '@/types/table'

const DATACENTERS: SelectOption[] = [
  { label: 'DDC', value: 'DDC' },
  { label: 'MDC', value: 'MDC' },
]
import { ActionsCell } from '@/components/table/ActionsCell'
import { CoreGroupCell } from '@/components/cores/CoreGroupCell'
import { Button } from '@/components/ui/button'

const h = createColumnHelper<Core>()

export const coreColumns = (
  onEdit: (row: Core) => void,
  onDelete: (row: Core) => void,
  onGroup: (row: Core) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ColumnDef<Core, any>[] => [
  h.accessor('name', { header: 'Name', enableColumnFilter: true }),
  h.accessor('datacenter', { header: 'Datacenter', enableColumnFilter: true }),
  h.accessor('size', { header: 'Size' }),
  h.display({
    id: 'group',
    header: 'Group',
    cell: ({ row }) => <CoreGroupCell coreId={row.original.id} />,
  }),
  h.display({
    id: 'actions',
    header: 'Actions',
    size: 110,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onGroup(row.original)}
          title="Manage group"
        >
          <Network className="h-3.5 w-3.5" />
        </Button>
        <ActionsCell row={row.original} onEdit={onEdit} onDelete={onDelete} />
      </div>
    ),
  }),
]

export const coreFields: FieldDef[] = [
  { key: 'name', label: 'Name', type: 'text', required: true },
  { key: 'datacenter', label: 'Datacenter', type: 'select', required: true, options: DATACENTERS },
  { key: 'size', label: 'Size', type: 'number', required: true },
]
