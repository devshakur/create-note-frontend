import { CircleDot } from 'lucide-react'

import KeyboardShortcut from './KeyboardShortcut'

interface SidebarCreateNoteButtonProps {
  onClick?: () => void
}

const SidebarCreateNoteButton = ({ onClick }: SidebarCreateNoteButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2.5 text-left text-sm font-medium text-white transition-colors hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500"
      aria-keyshortcuts="Meta+N"
    >
      <CircleDot className="size-4 shrink-0" aria-hidden="true" />
      <span className="flex-1">Create Note</span>
      <KeyboardShortcut keys="⌘ N" variant="onDark" />
    </button>
  )
}

export default SidebarCreateNoteButton
