import type { NoteTimeFilterOption, NoteTimeFilterValue } from './types'
import { NOTE_FILTER_PANEL_ID } from './constants'

interface NoteTimeFilterSegmentProps {
  option: NoteTimeFilterOption
  isActive: boolean
  onSelect: (value: NoteTimeFilterValue) => void
}

const NoteTimeFilterSegment = ({
  option,
  isActive,
  onSelect,
}: NoteTimeFilterSegmentProps) => {
  return (
    <button
      type="button"
      role="tab"
      id={`note-filter-${option.id}`}
      aria-selected={isActive}
      aria-controls={NOTE_FILTER_PANEL_ID}
      tabIndex={isActive ? 0 : -1}
      onClick={() => onSelect(option.id)}
      className={`flex-1 rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 ${
        isActive
          ? 'bg-white font-semibold text-neutral-900 shadow-sm'
          : 'font-medium text-neutral-500 hover:text-neutral-700'
      }`}
    >
      {option.label}
    </button>
  )
}

export default NoteTimeFilterSegment
