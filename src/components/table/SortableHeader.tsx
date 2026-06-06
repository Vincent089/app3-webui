import type { Column } from '@tanstack/react-table'
import { ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ColumnFilter } from './ColumnFilter'

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>
  label: string
}

export function SortableHeader<TData>({ column, label }: SortableHeaderProps<TData>) {
  const sorted = column.getIsSorted()
  const canFilter = column.getCanFilter()

  return (
    <div className="flex items-center gap-0.5">
      <button
        onClick={column.getToggleSortingHandler()}
        className={cn(
          'flex items-center gap-1 select-none',
          column.getCanSort() && 'cursor-pointer hover:text-foreground',
        )}
      >
        <span>{label}</span>
        {column.getCanSort() && (
          <span className="text-muted-foreground">
            {sorted === 'asc' ? (
              <ArrowUp className="h-3 w-3" />
            ) : sorted === 'desc' ? (
              <ArrowDown className="h-3 w-3" />
            ) : (
              <ArrowUpDown className="h-3 w-3 opacity-40" />
            )}
          </span>
        )}
      </button>
      {canFilter && <ColumnFilter column={column} />}
    </div>
  )
}
