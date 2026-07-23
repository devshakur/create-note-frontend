import type { ButtonHTMLAttributes, MouseEvent } from 'react'
import { Pencil } from 'lucide-react'

interface ReminderCardEditButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'type' | 'onClick'> {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  title: string
}

const ReminderCardEditButton = ({
  onClick,
  title,
  ...props
}: ReminderCardEditButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex size-9 items-center justify-center rounded-full bg-[#d4ff3f] text-neutral-900 shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
      aria-label={`Note actions for ${title}`}
      {...props}
    >
      <Pencil className="size-4" aria-hidden="true" />
    </button>
  )
}

export default ReminderCardEditButton
