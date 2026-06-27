export type NoteTimeFilterValue = 'today' | 'this-week' | 'this-month'

export interface NoteTimeFilterOption {
  id: NoteTimeFilterValue
  label: string
}

export interface NoteTimeFilterProps {
  value: NoteTimeFilterValue
  onChange: (value: NoteTimeFilterValue) => void
}
