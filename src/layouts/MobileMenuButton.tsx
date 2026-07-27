import { Menu } from 'lucide-react'

interface MobileMenuButtonProps {
  isOpen: boolean
  onOpen: () => void
}

const MobileMenuButton = ({ isOpen, onOpen }: MobileMenuButtonProps) => {
  if (isOpen) return null

  return (
    <button
      type="button"
      className="fixed top-4 left-4 z-60 rounded-lg bg-white p-2 text-neutral-800 shadow-md transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 lg:hidden"
      aria-expanded={false}
      aria-controls="app-sidebar"
      aria-label="Open menu"
      onClick={onOpen}
    >
      <Menu className="size-5" aria-hidden="true" />
    </button>
  )
}

export default MobileMenuButton
