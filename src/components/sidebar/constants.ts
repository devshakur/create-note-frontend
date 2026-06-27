import { Archive, CircleHelp, Search, Settings } from 'lucide-react'

import type { SidebarFolder, SidebarNavItemConfig } from './types'

export const SIDEBAR_APP_NAME = 'Take Note'
export const SIDEBAR_USER_NAME = 'Meet Shakur'

export const SIDEBAR_QUICK_ACTIONS: SidebarNavItemConfig[] = [
  {
    id: 'search',
    label: 'Search',
    icon: Search,
    shortcut: '⌘ S',
  },
  {
    id: 'archives',
    label: 'Archives',
    icon: Archive,
    shortcut: '⌘ R',
  },
]

export const SIDEBAR_FOLDERS: SidebarFolder[] = [
  { id: 'bucket-list', name: 'Bucket List' },
  { id: 'finances', name: 'Finances' },
  { id: 'travel-plans', name: 'Travel Plans' },

]

export const SIDEBAR_FOOTER_ITEMS: SidebarNavItemConfig[] = [
  {
    id: 'help',
    label: 'Help',
    icon: CircleHelp,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  },
]
