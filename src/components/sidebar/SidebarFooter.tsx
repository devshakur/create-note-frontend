import SidebarNavItem from './SidebarNavItem'
import { SIDEBAR_FOOTER_ITEMS } from './constants'

const SidebarFooter = () => {
  return (
    <nav aria-label="Sidebar footer" className="flex flex-col gap-1 px-3 pb-4">
      {SIDEBAR_FOOTER_ITEMS.map((item) => (
        <SidebarNavItem key={item.id} item={item} />
      ))}
    </nav>
  )
}

export default SidebarFooter
