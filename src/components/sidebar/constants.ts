import { Archive, Home, Search } from 'lucide-react'

import type { SidebarNavItemConfig } from './types'

export const SIDEBAR_APP_NAME = 'Take Note'

export const SIDEBAR_QUICK_ACTIONS: SidebarNavItemConfig[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: Home,
    path: '/dashboard',
  },
  {
    id: 'search',
    label: 'Search Notes',
    icon: Search,
    shortcut: '⌘ S',
    path: '/search',
  },
  {
    id: 'archives',
    label: 'Archives',
    icon: Archive,
    shortcut: '⌘ R',  
    path: '/archives',
  },
]

