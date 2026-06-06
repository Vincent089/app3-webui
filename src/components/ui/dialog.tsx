import * as React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DialogProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
  className?: string
  hideClose?: boolean
}

export function Dialog({ open, onClose, children, className, hideClose }: DialogProps) {
  React.useEffect(() => {
    if (!open || hideClose) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose, hideClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={hideClose ? undefined : onClose} />
      <div
        className={cn(
          'relative z-50 w-full max-w-lg rounded-lg border bg-card p-6 shadow-lg',
          className,
        )}
      >
        {children}
        {!hideClose && (
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}

export function DialogTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h2 className={cn('text-lg font-semibold leading-none', className)}>{children}</h2>
}
