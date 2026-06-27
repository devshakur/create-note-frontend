import { Pencil } from 'lucide-react'

interface ReminderCardEditButtonProps {
  onClick?: () => void
  title: string
}

const ReminderCardEditButton = ({ onClick, title }: ReminderCardEditButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-3 bottom-3 flex size-9 items-center justify-center rounded-full bg-[#d4ff3f] text-neutral-900 shadow-sm transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400"
      aria-label={`Edit ${title}`}
    >
      <Pencil className="size-4" aria-hidden="true" />
    </button>
  )
}

export default ReminderCardEditButton
