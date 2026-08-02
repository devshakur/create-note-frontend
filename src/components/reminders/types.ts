export interface ReminderItem {
  id: string
  text: string
}

export interface ReminderCardData {
  id: string
  title: string
  time: string
  headerColor: string
  items: ReminderItem[]
}

export type ReminderCardAction = 'view' | 'edit' | 'archive' | 'delete'

export interface ReminderCardProps {
  title: string
  time: string
  headerColor: string
  items: ReminderItem[]
  onOpen?: () => void
  onAction?: (action: ReminderCardAction) => void
  isDeleting?: boolean
  isArchiving?: boolean
  archiveMode?: 'archive' | 'unarchive'
}
