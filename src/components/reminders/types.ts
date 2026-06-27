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

export interface ReminderCardProps {
  title: string
  time: string
  headerColor: string
  items: ReminderItem[]
  onEdit?: () => void
}
