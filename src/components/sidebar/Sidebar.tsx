import { useState } from 'react'
import CreateNoteModal from '../notes/CreateNoteModal'
import SidebarCreateNoteButton from './SidebarCreateNoteButton'
import SidebarFooter from './SidebarFooter'
import SidebarHeader from './SidebarHeader'
import SidebarNavItem from './SidebarNavItem'
import { SIDEBAR_QUICK_ACTIONS } from './constants'
import { useNavigate } from 'react-router-dom'

interface SidebarProps {
  onNavigate?: () => void
}

const Sidebar = ({ onNavigate }: SidebarProps) => {
  const [isCreateNoteOpen, setIsCreateNoteOpen] = useState(false)
  const navigate = useNavigate()
  const openCreateNote = () => setIsCreateNoteOpen(true)

  const closeCreateNote = () => {
    setIsCreateNoteOpen(false)
    onNavigate?.()
  }

  return (
    <nav
      aria-label="Main navigation"
      className="flex h-full w-full flex-col bg-[#f3f3f3] py-2"
    >
      <SidebarHeader />

      <div className="mt-2 flex flex-col gap-[clamp(0.75rem,2.5vh,1.75rem)] px-3">
        <SidebarCreateNoteButton onClick={openCreateNote} />
        {SIDEBAR_QUICK_ACTIONS.map((item) => (
          <SidebarNavItem
            key={item.id}
            item={{ ...item, onClick: item.path ? () => navigate(item.path!) : onNavigate }}
          />
        ))}
      </div>

      

      <div className="flex-1" />
      <SidebarFooter onNavigate={onNavigate} />

      <CreateNoteModal open={isCreateNoteOpen} onClose={closeCreateNote} />
    </nav>
  )
}

export default Sidebar
