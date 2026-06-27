import { useEffect, useState } from 'react'
import Sidebar from '../components/sidebar/Sidebar'
import MobileMenuButton from './MobileMenuButton'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsSidebarOpen(false)
      }
    }

    if (isSidebarOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isSidebarOpen])

  const closeSidebar = () => setIsSidebarOpen(false)
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev)

  return (
    <div className="relative flex  w-full min-w-0">
      <MobileMenuButton isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {isSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Close menu"
          onClick={closeSidebar}
        />
      ) : null}

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 h-full w-[260px] shrink-0 bg-[#f3f3f3] shadow-[4px_0_24px_-4px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out md:relative md:z-10 md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <Sidebar onNavigate={closeSidebar} />
      </aside>

      <main className="min-w-0 flex-1 min-h-screen bg-[#f3f3f3] pt-16 md:pt-0">{children}</main>
    </div>
  )
}

export default Layout
