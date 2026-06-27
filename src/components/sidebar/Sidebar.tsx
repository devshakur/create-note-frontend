import SidebarCreateNoteButton from './SidebarCreateNoteButton'
import SidebarDivider from './SidebarDivider'
import SidebarFolders from './SidebarFolders'
import SidebarFooter from './SidebarFooter'
import SidebarHeader from './SidebarHeader'
import SidebarNavItem from './SidebarNavItem'
import { SIDEBAR_QUICK_ACTIONS } from './constants'

const Sidebar = () => {
  return (
    <nav
      aria-label="Main navigation"
      className="flex h-full w-full flex-col bg-[#f3f3f3] py-2"
    >
      <SidebarHeader />

      <div className="flex flex-col gap-1 px-3">
        <SidebarCreateNoteButton />
        {SIDEBAR_QUICK_ACTIONS.map((item) => (
          <SidebarNavItem key={item.id} item={item} />
        ))}
      </div>

      <SidebarDivider />

      <div className="flex-1 overflow-y-auto">
        <SidebarFolders />
      </div>

      <SidebarDivider />
      <SidebarFooter />
    </nav>
  )
}

export default Sidebar
