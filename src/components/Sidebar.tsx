import SidebarCreateNoteButton from './sidebar/SidebarCreateNoteButton'
import SidebarDivider from './sidebar/SidebarDivider'
import SidebarFolders from './sidebar/SidebarFolders'
import SidebarFooter from './sidebar/SidebarFooter'
import SidebarHeader from './sidebar/SidebarHeader'
import SidebarNavItem from './sidebar/SidebarNavItem'
import { SIDEBAR_QUICK_ACTIONS } from './sidebar/constants'

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
