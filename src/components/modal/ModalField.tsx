import { useWatch } from 'react-hook-form'
import type { UseFormRegister, FieldErrors, Control } from 'react-hook-form'
import type { FieldDef, SelectOption } from '@/types/table'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { cn } from '@/lib/utils'

interface ModalFieldProps {
  field: FieldDef
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>
  readOnlyValue?: string
}

export function ModalField({ field, register, errors, control, readOnlyValue }: ModalFieldProps) {
  const dependentValue = useWatch({ control, name: field.optionsDependsOn ?? '__none__' })
  const resolvedOptions: SelectOption[] = field.optionsDependsOn
    ? (field.optionsMap?.[String(dependentValue)] ?? [])
    : (field.options ?? [])

  const error = errors[field.key]?.message as string | undefined

  return (
    <div className="grid gap-1.5">
      <Label htmlFor={field.key}>
        {field.label}
        {field.required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>

      {field.readOnly ? (
        <div className="flex h-8 items-center rounded-md border bg-muted/50 px-3 text-sm text-muted-foreground">
          {readOnlyValue ?? '—'}
        </div>
      ) : field.type === 'textarea' ? (
        <textarea
          id={field.key}
          rows={3}
          className={cn(
            'w-full rounded-md border border-input bg-transparent px-3 py-1.5 text-sm shadow-sm',
            'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
            error && 'border-destructive',
          )}
          {...register(field.key, { required: field.required ? `${field.label} is required` : false })}
        />
      ) : field.type === 'select' ? (
        <Select
          id={field.key}
          className={cn(error && 'border-destructive')}
          {...register(field.key, {
            required: field.required ? `${field.label} is required` : false,
            valueAsNumber: field.valueAsNumber,
          })}
        >
          <option value="">Select…</option>
          {resolvedOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      ) : (
        <Input
          id={field.key}
          type={field.type === 'number' ? 'number' : 'text'}
          className={cn(error && 'border-destructive')}
          {...register(field.key, {
            required: field.required ? `${field.label} is required` : false,
            valueAsNumber: field.type === 'number',
          })}
        />
      )}

      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  )
}
