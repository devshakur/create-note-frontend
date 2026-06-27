import { Menu, X } from 'lucide-react'

interface MobileMenuButtonProps {
  isOpen: boolean
  onToggle: () => void
}

const MobileMenuButton = ({ isOpen, onToggle }: MobileMenuButtonProps) => {
  return (
    <button
      type="button"
      className="fixed top-4 left-4 z-[60] rounded-lg bg-white p-2 text-neutral-800 shadow-md transition-colors hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-400 md:hidden"
      aria-expanded={isOpen}
      aria-controls="app-sidebar"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      onClick={onToggle}
    >
      {isOpen ? (
        <X className="size-5" aria-hidden="true" />
      ) : (
        <Menu className="size-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default MobileMenuButton
