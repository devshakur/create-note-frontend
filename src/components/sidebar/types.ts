import type { LucideIcon } from 'lucide-react'

export interface SidebarNavItemConfig {
  id: string
  label: string
  icon: LucideIcon
  shortcut?: string
  path?: string
  onClick?: () => void
}

export interface SidebarFolder {
  id: string
  name: string
}
