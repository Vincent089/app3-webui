import { createColumnHelper, type ColumnDef } from '@tanstack/react-table'
import { Eye } from 'lucide-react'
import type { Company } from '@/types/api'
import { ActionsCell } from '@/components/table/ActionsCell'
import { Button } from '@/components/ui/button'

const h = createColumnHelper<Company>()

export const companyColumns = (
  onEdit: (row: Company) => void,
  onDelete: (row: Company) => void,
  onView: (row: Company) => void,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): ColumnDef<Company, any>[] => [
  h.accessor('gcode', { header: 'GCode', enableColumnFilter: true, cell: (i) => i.getValue() ?? '—' }),
  h.accessor('name', { header: 'Name', enableColumnFilter: true }),
  h.accessor('created_at', {
    header: 'Created',
    cell: (i) => new Date(i.getValue() as string).toLocaleDateString(),
  }),
  h.accessor('updated_at', {
    header: 'Updated',
    cell: (i) => new Date(i.getValue() as string).toLocaleDateString(),
  }),
  h.display({
    id: 'actions',
    header: 'Actions',
    size: 110,
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={() => onView(row.original)} title="View details">
          <Eye className="h-3.5 w-3.5" />
        </Button>
        <ActionsCell row={row.original} onEdit={onEdit} onDelete={onDelete} />
      </div>
    ),
  }),
]
