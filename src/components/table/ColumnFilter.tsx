import { useState, useRef, useEffect } from 'react'
import type { Column } from '@tanstack/react-table'
import { Filter, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ColumnFilterProps<TData> {
  column: Column<TData, unknown>
}

export function ColumnFilter<TData>({ column }: ColumnFilterProps<TData>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const currentValue = (column.getFilterValue() as string) ?? ''

  const uniqueValues = Array.from(column.getFacetedUniqueValues().keys())
    .filter((v) => v != null && v !== '')
    .sort()
    .map(String)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const isActive = currentValue !== ''

  return (
    <div ref={ref} className="relative inline-block" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          'ml-1 inline-flex items-center justify-center rounded p-0.5 transition-colors',
          isActive
            ? 'text-primary bg-primary/10'
            : 'text-muted-foreground hover:text-foreground hover:bg-accent',
        )}
        title="Filter column"
      >
        <Filter className="h-3 w-3" />
      </button>

      {open && (
        <div className="absolute left-0 top-6 z-50 min-w-[160px] rounded-md border bg-popover p-1 shadow-md">
          {isActive && (
            <button
              onClick={() => { column.setFilterValue(''); setOpen(false) }}
              className="flex w-full items-center gap-1.5 rounded px-2 py-1 text-xs text-destructive hover:bg-accent"
            >
              <X className="h-3 w-3" /> Clear filter
            </button>
          )}
          {uniqueValues.length === 0 && (
            <span className="block px-2 py-1 text-xs text-muted-foreground">No values</span>
          )}
          {uniqueValues.map((val) => (
            <button
              key={val}
              onClick={() => { column.setFilterValue(val); setOpen(false) }}
              className={cn(
                'block w-full rounded px-2 py-1 text-left text-xs hover:bg-accent',
                currentValue === val && 'bg-accent font-medium',
              )}
            >
              {val}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
