import { useEffect, useId, useRef, useState, type MouseEvent } from 'react'
import { Archive, ArchiveRestore, Eye, Pencil, Trash2 } from 'lucide-react'
import ReminderCardEditButton from './ReminderCardEditButton'
import type { ReminderCardAction } from './types'

interface ReminderCardActionsMenuProps {
  title: string
  onAction: (action: ReminderCardAction) => void
  isDeleting?: boolean
  isArchiving?: boolean
  archiveMode?: 'archive' | 'unarchive'
}

const ReminderCardActionsMenu = ({
  title,
  onAction,
  isDeleting = false,
  isArchiving = false,
  archiveMode = 'archive',
}: ReminderCardActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuId = useId()
  const containerRef = useRef<HTMLDivElement>(null)
  const closeTimerRef = useRef<number | null>(null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const openMenu = () => {
    clearCloseTimer()
    setIsOpen(true)
  }

  const scheduleClose = () => {
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false)
    }, 120)
  }

  useEffect(() => {
    if (!isOpen) return

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  useEffect(() => {
    return () => clearCloseTimer()
  }, [])

  const handleTriggerClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsOpen((prev) => !prev)
  }

  const handleAction = (
    event: MouseEvent<HTMLButtonElement>,
    action: ReminderCardAction,
  ) => {
    event.stopPropagation()
    setIsOpen(false)
    onAction(action)
  }

  const isBusy = isDeleting || isArchiving
  const ArchiveIcon = archiveMode === 'unarchive' ? ArchiveRestore : Archive
  const archiveLabel =
    archiveMode === 'unarchive'
      ? isArchiving
        ? 'Unarchiving...'
        : 'Unarchive note'
      : isArchiving
        ? 'Archiving...'
        : 'Archive note'

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
      onClick={(event) => event.stopPropagation()}
    >
      <ReminderCardEditButton
        title={title}
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls={menuId}
      />

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label={`${title} actions`}
          className="absolute right-0 bottom-full z-20 mb-2 min-w-[160px] overflow-hidden rounded-xl border border-neutral-200 bg-white py-1 shadow-lg"
        >
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none"
            onClick={(event) => handleAction(event, 'view')}
          >
            <Eye className="size-4 shrink-0" aria-hidden="true" />
            View
          </button>
          <button
            type="button"
            role="menuitem"
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none"
            onClick={(event) => handleAction(event, 'edit')}
          >
            <Pencil className="size-4 shrink-0" aria-hidden="true" />
            Edit
          </button>
          <button
            type="button"
            role="menuitem"
            disabled={isBusy}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-neutral-700 transition-colors hover:bg-neutral-100 focus-visible:bg-neutral-100 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            onClick={(event) => handleAction(event, 'archive')}
          >
            <ArchiveIcon className="size-4 shrink-0" aria-hidden="true" />
            {archiveLabel}
          </button>
          <button
            type="button"
            role="menuitem"
            disabled={isBusy}
            className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-red-600 transition-colors hover:bg-red-50 focus-visible:bg-red-50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            onClick={(event) => handleAction(event, 'delete')}
          >
            <Trash2 className="size-4 shrink-0" aria-hidden="true" />
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default ReminderCardActionsMenu
