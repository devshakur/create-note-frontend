import type { NoteTimeFilterOption, NoteTimeFilterValue } from './types'
import type { NotesPeriod } from '../../types/note'

export const NOTE_FILTER_PANEL_ID = 'note-filter-panel'

export const NOTE_TIME_FILTER_OPTIONS: NoteTimeFilterOption[] = [
  { id: 'all', label: 'All' },
  { id: 'today', label: 'Today' },
  { id: 'this-week', label: 'Week' },
  { id: 'this-month', label: 'Month' },
  { id: 'this-year', label: 'Year' },
]

export const NOTE_PERIOD_BY_FILTER: Record<
  NoteTimeFilterValue,
  NotesPeriod | undefined
> = {
  all: undefined,
  today: 'today',
  'this-week': 'week',
  'this-month': 'month',
  'this-year': 'year',
}
