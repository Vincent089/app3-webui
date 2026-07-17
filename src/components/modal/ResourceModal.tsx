import { useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/no-explicit-any
import { useForm } from 'react-hook-form'
import type { FieldDef } from '@/types/table'
import { Dialog, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { ModalField } from './ModalField'

interface ResourceModalProps {
  open: boolean
  onClose: () => void
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: Record<string, any>) => Promise<void>
  fields: FieldDef[]
  editFields?: FieldDef[]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialValues?: Record<string, any>
  title: string
}

export function ResourceModal({
  open,
  onClose,
  onSubmit,
  fields,
  editFields,
  initialValues,
  title,
}: ResourceModalProps) {
  const isEditing = initialValues != null

  const activeFields = isEditing && editFields ? editFields : fields

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<Record<string, any>>({ defaultValues: initialValues })

  useEffect(() => {
    reset(open && isEditing ? initialValues : {})
  }, [open, isEditing, initialValues, reset])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function submit(data: Record<string, any>) {
    const payload: Record<string, unknown> = {}
    for (const field of activeFields) {
      if (field.readOnly) continue
      const value = data[field.key]
      const isEmpty =
        value === undefined ||
        value === null ||
        value === '' ||
        (typeof value === 'number' && isNaN(value))
      if (!field.required && isEmpty) continue
      payload[field.key] = value
    }
    await onSubmit(payload)
    reset({})
    onClose()
  }

  const readOnlyFields = activeFields.filter((f) => f.readOnly)
  const editableFields = activeFields.filter((f) => !f.readOnly)

  return (
    <Dialog open={open} onClose={onClose} className="max-h-[90vh] overflow-y-auto">
      <DialogTitle className="mb-4">{title}</DialogTitle>
      <form onSubmit={handleSubmit(submit)} className="grid gap-3">
        {readOnlyFields.map((f) => (
          <ModalField
            key={f.key}
            field={f}
            register={register}
            errors={errors}
            readOnlyValue={initialValues ? String(initialValues[f.key] ?? '') : undefined}
          />
        ))}
        {editableFields.map((f) => (
          <ModalField key={f.key} field={f} register={register} errors={errors} control={control} />
        ))}
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </form>
    </Dialog>
  )
}
