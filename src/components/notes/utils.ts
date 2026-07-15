import { REMINDER_HEADER_COLORS } from '../reminders/constants'
import type { ReminderCardData } from '../reminders/types'
import type { Note } from '../../types/note'

const HEADER_COLORS = [
  REMINDER_HEADER_COLORS.lavender,
  REMINDER_HEADER_COLORS.peach,
]

const formatNoteTime = (value?: string) => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  })
}

export const mapNoteToReminderCard = (
  note: Note,
  index: number,
): ReminderCardData => {
  const lines = note.content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)

  const items =
    lines.length > 0
      ? lines.map((text, lineIndex) => ({
          id: `${note.id}-${lineIndex}`,
          text,
        }))
      : [{ id: `${note.id}-0`, text: note.content }]

  return {
    id: note.id,
    title: note.title,
    time: formatNoteTime(note.createdAt ?? note.updatedAt),
    headerColor: HEADER_COLORS[index % HEADER_COLORS.length],
    items,
  }
}
