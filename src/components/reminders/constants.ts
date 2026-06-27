import type { ReminderCardData } from './types'

export const REMINDER_HEADER_COLORS = {
  lavender: '#e8dff5',
  peach: '#fde5d8',
} as const

export const SAMPLE_REMINDER_CARDS: ReminderCardData[] = [
  {
    id: 'reminders-lavender',
    title: 'Reminders',
    time: '8:00 PM',
    headerColor: REMINDER_HEADER_COLORS.lavender,
    items: [
      { id: '1', text: 'Dentist appointment on Tuesday' },
      { id: '2', text: 'Submit report by end of the day' },
      { id: '3', text: 'Send email to boss' },
      { id: '4', text: 'Send email to boss' },
    ],
  },
  {
    id: 'reminders-peach',
    title: 'Reminders',
    time: '8:00 PM',
    headerColor: REMINDER_HEADER_COLORS.peach,
    items: [
      { id: '1', text: 'Dentist appointment on Tuesday' },
      { id: '2', text: 'Submit report by end of the day' },
      { id: '3', text: 'Send email to boss' },
      { id: '4', text: 'Send email to boss' },
    ],
  },
  {
    id: 'reminders-lavender-2',
    title: 'Reminders',
    time: '8:00 PM',
    headerColor: REMINDER_HEADER_COLORS.lavender,
    items: [
      { id: '1', text: 'Dentist appointment on Tuesday' },
      { id: '2', text: 'Submit report by end of the day' },
      { id: '3', text: 'Send email to boss' },
      { id: '4', text: 'Send email to boss' },
    ],
  },
  {
    id: 'reminders-peach-2',
    title: 'Reminders',
    time: '8:00 PM',
    headerColor: REMINDER_HEADER_COLORS.peach,
    items: [
      { id: '1', text: 'Dentist appointment on Tuesday' },
      { id: '2', text: 'Submit report by end of the day' },
      { id: '3', text: 'Send email to boss' },
      { id: '4', text: 'Send email to boss' },
    ],
  },
]
