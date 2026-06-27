import KeyboardShortcut from './KeyboardShortcut'
import type { SidebarNavItemConfig } from './types'

interface SidebarNavItemProps {
  item: SidebarNavItemConfig
}

const SidebarNavItem = ({ item }: SidebarNavItemProps) => {
  const Icon = item.icon
  const shortcutAttr = item.shortcut?.replace('⌘', 'Meta+').replace(' ', '')

  return (
    <button
      type="button"
      onClick={item.onClick}
      className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-neutral-600 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
      aria-keyshortcuts={shortcutAttr}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <span className="flex-1">{item.label}</span>
      {item.shortcut ? <KeyboardShortcut keys={item.shortcut} /> : null}
    </button>
  )
}

export default SidebarNavItem
