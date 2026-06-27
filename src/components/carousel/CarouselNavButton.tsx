import type { LucideIcon } from 'lucide-react'

interface CarouselNavButtonProps {
  direction: 'left' | 'right'
  onClick: () => void
  disabled?: boolean
  icon: LucideIcon
}

const CarouselNavButton = ({
  direction,
  onClick,
  disabled = false,
  icon: Icon,
}: CarouselNavButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Show previous cards' : 'Show more cards'}
      className={`absolute top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white text-neutral-700 shadow-md transition-opacity hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 disabled:pointer-events-none disabled:opacity-0 ${
        direction === 'left' ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'
      }`}
    >
      <Icon className="size-5" aria-hidden="true" />
    </button>
  )
}

export default CarouselNavButton
