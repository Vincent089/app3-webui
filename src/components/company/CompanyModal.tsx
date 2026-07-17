import { useEffect, useState } from 'react'
import { Plus, X } from 'lucide-react'
import type { Company } from '@/types/api'
import { Dialog, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const STANDARD_KEYS = new Set(['id', 'gcode', 'name', 'created_at', 'updated_at'])

function extractMeta(company: Company): { key: string; value: string }[] {
  return Object.entries(company)
    .filter(([k]) => !STANDARD_KEYS.has(k))
    .map(([key, value]) => ({ key, value: String(value ?? '') }))
}

interface Pair { key: string; value: string }

interface CompanyModalProps {
  open: boolean
  onClose: () => void
  onSubmit: (data: Record<string, unknown>) => Promise<void>
  initialValues?: Company | null
  title: string
}

export function CompanyModal({ open, onClose, onSubmit, initialValues, title }: CompanyModalProps) {
  const isEditing = initialValues != null

  const [name, setName] = useState('')
  const [gcode, setGcode] = useState('')
  const [nameError, setNameError] = useState('')
  const [gcodeError, setGcodeError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [existingMeta, setExistingMeta] = useState<Pair[]>([])
  const [newPairs, setNewPairs] = useState<Pair[]>([])

  useEffect(() => {
    if (!open) return
    if (isEditing && initialValues) {
      setName(initialValues.name)
      setGcode(initialValues.gcode ?? '')
      setExistingMeta(extractMeta(initialValues))
    } else {
      setName('')
      setGcode('')
      setExistingMeta([])
    }
    setNewPairs([])
    setNameError('')
    setGcodeError('')
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  function updateExistingValue(i: number, value: string) {
    setExistingMeta((p) => p.map((pair, idx) => (idx === i ? { ...pair, value } : pair)))
  }

  function updateNewPair(i: number, field: 'key' | 'value', value: string) {
    setNewPairs((p) => p.map((pair, idx) => (idx === i ? { ...pair, [field]: value } : pair)))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    let valid = true

    if (!name.trim()) { setNameError('Name is required'); valid = false }
    else setNameError('')

    if (gcode && !/^G\d{5}$/.test(gcode)) { setGcodeError('Format: G followed by 5 digits'); valid = false }
    else setGcodeError('')

    if (!valid) return

    const payload: Record<string, unknown> = { name: name.trim() }
    if (!isEditing && gcode) payload.gcode = gcode

    for (const { key, value } of existingMeta) {
      payload[key] = value
    }
    for (const { key, value } of newPairs) {
      if (key.trim()) payload[key.trim()] = value
    }

    setSubmitting(true)
    try {
      await onSubmit(payload)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onClose={onClose} className="max-h-[90vh] overflow-y-auto">
      <DialogTitle className="mb-4">{title}</DialogTitle>
      <form onSubmit={handleSubmit} className="grid gap-3">

        <div className="grid gap-1.5">
          <Label htmlFor="gcode">
            GCode
            {isEditing && <span className="ml-1.5 text-xs text-muted-foreground">(cannot be changed)</span>}
          </Label>
          <Input
            id="gcode"
            value={gcode}
            onChange={(e) => setGcode(e.target.value)}
            disabled={isEditing}
            placeholder="G12345 (optional)"
            className={isEditing ? 'opacity-60' : ''}
          />
          {gcodeError && <span className="text-xs text-destructive">{gcodeError}</span>}
        </div>

        <div className="grid gap-1.5">
          <Label htmlFor="name">
            Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <span className="text-xs text-destructive">{nameError}</span>}
        </div>

        {isEditing && existingMeta.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Meta Fields</p>
            {existingMeta.map((pair, i) => (
              <div key={pair.key} className="flex gap-2">
                <div className="flex h-8 w-1/3 items-center rounded-md border bg-muted/50 px-3 text-sm text-muted-foreground">
                  {pair.key}
                </div>
                <Input
                  value={pair.value}
                  onChange={(e) => updateExistingValue(i, e.target.value)}
                  className="flex-1"
                />
              </div>
            ))}
          </div>
        )}

        {newPairs.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {isEditing ? 'New Fields' : 'Extra Fields'}
            </p>
            {newPairs.map((pair, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  placeholder="key"
                  value={pair.key}
                  onChange={(e) => updateNewPair(i, 'key', e.target.value)}
                  className="w-1/3"
                />
                <Input
                  placeholder="value"
                  value={pair.value}
                  onChange={(e) => updateNewPair(i, 'value', e.target.value)}
                  className="flex-1"
                />
                <Button type="button" variant="ghost" size="icon" onClick={() => setNewPairs((p) => p.filter((_, idx) => idx !== i))}>
                  <X className="h-3.5 w-3.5" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-fit"
          onClick={() => setNewPairs((p) => [...p, { key: '', value: '' }])}
        >
          <Plus className="h-3.5 w-3.5" /> Add field
        </Button>

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={submitting}>{submitting ? 'Saving…' : 'Save'}</Button>
        </div>
      </form>
    </Dialog>
  )
}
