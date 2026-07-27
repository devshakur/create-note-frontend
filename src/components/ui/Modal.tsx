import { useEffect, useId, useRef, type KeyboardEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { focusInitialElement, getFocusableElements } from '../../utils/focus'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  footer?: ReactNode
}

const Modal = ({ open, onClose, title, children, footer }: ModalProps) => {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!open) return

    previouslyFocusedRef.current = document.activeElement as HTMLElement | null

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscape)

    const frame = window.requestAnimationFrame(() => {
      focusInitialElement(dialogRef.current)
    })

    return () => {
      window.cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleEscape)
      previouslyFocusedRef.current?.focus()
      previouslyFocusedRef.current = null
    }
  }, [open, onClose])

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Tab') return

    const focusable = getFocusableElements(dialogRef.current)
    if (focusable.length === 0) return

    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    const activeElement = document.activeElement

    if (event.shiftKey) {
      if (activeElement === first || !dialogRef.current?.contains(activeElement)) {
        event.preventDefault()
        last.focus()
      }
      return
    }

    if (activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[#1a1814]/45 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        className="relative z-10 flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-neutral-200/80 bg-white shadow-[0_24px_60px_-20px_rgba(26,24,20,0.35)] outline-none"
      >
        <div className="flex min-w-0 flex-1 items-start justify-between gap-4 border-b border-neutral-100 px-6 py-5">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium tracking-wide text-[#FFBE3B] uppercase">
              TakeNote
            </p>
            <h2
              id={titleId}
              className="mt-1 truncate text-lg font-bold text-neutral-900!"
              title={title}
            >
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-md p-1.5 text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        <div className="px-6 py-5">{children}</div>

        {footer ? (
          <div className="flex items-center justify-end gap-3 border-t border-neutral-100 bg-[#fafafa] px-6 py-4">
            {footer}
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  )
}

export default Modal
