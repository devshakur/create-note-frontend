import { useCallback } from 'react'

import { NOTE_TIME_FILTER_OPTIONS } from './constants'
import NoteTimeFilterSegment from './NoteTimeFilterSegment'
import type { NoteTimeFilterProps, NoteTimeFilterValue } from './types'

const NoteTimeFilter = ({ value, onChange }: NoteTimeFilterProps) => {
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = NOTE_TIME_FILTER_OPTIONS.findIndex(
        (option) => option.id === value,
      )
      if (currentIndex === -1) return

      let nextIndex = currentIndex

      if (event.key === 'ArrowRight') {
        nextIndex = (currentIndex + 1) % NOTE_TIME_FILTER_OPTIONS.length
      } else if (event.key === 'ArrowLeft') {
        nextIndex =
          (currentIndex - 1 + NOTE_TIME_FILTER_OPTIONS.length) %
          NOTE_TIME_FILTER_OPTIONS.length
      } else {
        return
      }

      event.preventDefault()
      onChange(NOTE_TIME_FILTER_OPTIONS[nextIndex].id as NoteTimeFilterValue)
    },
    [onChange, value],
  )

  return (
    <div
      role="tablist"
      aria-label="Filter notes by time"
      className="inline-flex w-full max-w-md rounded-full bg-neutral-200/80 p-1"
      onKeyDown={handleKeyDown}
    >
      {NOTE_TIME_FILTER_OPTIONS.map((option) => (
        <NoteTimeFilterSegment
          key={option.id}
          option={option}
          isActive={value === option.id}
          onSelect={onChange}
        />
      ))}
    </div>
  )
}

export default NoteTimeFilter
