import { PenLine } from 'lucide-react'
import type { ReactNode } from 'react'
import emptyNoteImage from '../../assets/empty-note.webp'
import Button from './Button'

interface EmptyStateProps {
  titlePrefix?: string
  titleAccent?: string
  description?: ReactNode
  actionLabel?: string
  onAction?: () => void
  showAction?: boolean
}

const EmptyState = ({
  titlePrefix = 'Nothing',
  titleAccent = 'here yet!',
  description = (
    <>
      Looks like your{' '}
      <span className="font-semibold text-(--primary)">TakeNote</span> is empty.
      Start writing your thoughts, ideas, and everything that matters to you.
    </>
  ),
  actionLabel = 'Create your first note',
  onAction,
  showAction = true,
}: EmptyStateProps) => {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center px-4 py-6 text-center sm:py-8 ">
      <img
        src={emptyNoteImage}
        alt="empty note"
        decoding="async"
        className='block h-auto w-full max-w-50 object-contain sm:mb-4 sm:max-w-60 md:max-w-70'
      />
      <div className='relative -top-24 sm:-top-32 md:-top-40'>
      <h2 className="m-0 max-w-md font-(family-name:--heading) text-2xl font-bold tracking-tight text-[#1f2937] sm:text-3xl md:text-4xl">
        {titlePrefix}{' '}
        <span className="relative inline-block text-(--primary)">
          {titleAccent}
          <span
            aria-hidden
            className="absolute -bottom-0.5 left-0 h-1 w-full rounded-full bg-(--primary)/35 sm:-bottom-1 sm:h-1.5"
          />
        </span>
      </h2>

      <p className="mt-3 m-0 max-w-sm text-sm leading-relaxed text-neutral-500 sm:mt-4 sm:max-w-md sm:text-base">
        {description}
      </p>

      {showAction && onAction ? (
        <div className="mt-5 sm:mt-6 md:mt-8">
          <Button
            type="button"
            variant="primary"
            onClick={onAction}
            leftIcon={<PenLine className="size-4" />}
            className="rounded-full px-5 py-2.5 text-sm shadow-[0_10px_24px_-8px_rgba(255,190,59,0.65)] sm:px-6 sm:py-3"
          >
            {actionLabel}
          </Button>
        </div>
      ) : null}
      </div>
    </div>
  )
}

export default EmptyState
