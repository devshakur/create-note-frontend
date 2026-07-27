import type { ReactNode } from 'react'
import { useArrowKeyNavigation } from '../../hooks/useArrowKeyNavigation'

interface SidebarNavListProps {
  children: ReactNode
  className?: string
  'aria-label'?: string
}

const SidebarNavList = ({
  children,
  className,
  'aria-label': ariaLabel = 'Sidebar links',
}: SidebarNavListProps) => {
  const { handleKeyDown } = useArrowKeyNavigation({ orientation: 'vertical' })

  return (
    <div
      role="list"
      aria-label={ariaLabel}
      className={className}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  )
}

export default SidebarNavList
