import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ActionsCellProps<TData> {
  row: TData
  onEdit: (row: TData) => void
  onDelete: (row: TData) => void
}

export function ActionsCell<TData>({ row, onEdit, onDelete }: ActionsCellProps<TData>) {
  return (
    <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" onClick={() => onEdit(row)} title="Edit">
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          if (confirm('Delete this item?')) onDelete(row)
        }}
        title="Delete"
        className="text-destructive hover:text-destructive"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  )
}
