import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar/Sidebar'
import MobileMenuButton from './MobileMenuButton'

const Layout = () => {
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
    <div className="relative flex w-full min-w-0">
      <MobileMenuButton isOpen={isSidebarOpen} onToggle={toggleSidebar} />

      {isSidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          aria-label="Close menu"
          onClick={closeSidebar}
        />
      ) : null}

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 h-svh w-[min(260px,85vw)] shrink-0 overflow-hidden bg-[#f3f3f3] shadow-[4px_0_24px_-4px_rgba(0,0,0,0.12)] transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:z-10 lg:w-60 lg:translate-x-0 lg:self-start ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <Sidebar onNavigate={closeSidebar} />
      </aside>

      <main className="min-h-screen min-w-0 flex-1 overflow-y-auto bg-[#f3f3f3] pt-16 lg:pt-0">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
