export type FieldType = 'text' | 'number' | 'textarea' | 'select'

export interface SelectOption {
  label: string
  value: string | number
}

export interface FieldDef {
  key: string
  label: string
  type: FieldType
  required?: boolean
  readOnly?: boolean
  options?: SelectOption[]
  valueAsNumber?: boolean
  optionsDependsOn?: string
  optionsMap?: Record<string, SelectOption[]>
}
