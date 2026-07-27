export type NoteTimeFilterValue =
  | 'all'
  | 'today'
  | 'this-week'
  | 'this-month'
  | 'this-year'

export interface NoteTimeFilterOption {
  id: NoteTimeFilterValue
  label: string
}

export interface NoteTimeFilterProps {
  value: NoteTimeFilterValue
  onChange: (value: NoteTimeFilterValue) => void
}

export interface NotesPageHeaderProps {
  title: string
  className?: string
  value: NoteTimeFilterValue
  onChange: (value: NoteTimeFilterValue) => void
}
