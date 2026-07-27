import { NavLink } from 'react-router-dom'
import KeyboardShortcut from './KeyboardShortcut'
import type { SidebarNavItemConfig } from './types'

interface SidebarNavItemProps {
  item: SidebarNavItemConfig
  onNavigate?: () => void
}

const SidebarNavItem = ({ item, onNavigate }: SidebarNavItemProps) => {
  const Icon = item.icon
  const shortcutAttr = item.shortcut?.replace('⌘', 'Meta+').replace(' ', '')

  const baseClasses =
    'flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400'

  if (item.path) {
    return (
      <NavLink
        to={item.path}
        onClick={() => onNavigate?.()}
        aria-keyshortcuts={shortcutAttr}
        className={({ isActive }) =>
          `${baseClasses} ${
            isActive
              ? 'bg-neutral-900 text-white'
              : 'text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900'
          }`
        }
      >
        <Icon className="size-4 shrink-0" aria-hidden="true" />
        <span className="flex-1">{item.label}</span>
        {item.shortcut && <KeyboardShortcut keys={item.shortcut} />}
      </NavLink>
    )
  }

  return (
    <button
      type="button"
      onClick={() => {
        item.onClick?.()
        onNavigate?.()
      }}
      className={`${baseClasses} text-neutral-600 hover:bg-neutral-200/60 hover:text-neutral-900`}
      aria-keyshortcuts={shortcutAttr}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="flex-1">{item.label}</span>
      {item.shortcut && <KeyboardShortcut keys={item.shortcut} />}
    </button>
  )
}

export default SidebarNavItem
