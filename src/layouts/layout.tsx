import React from 'react'
import Sidebar from '../components/sidebar/Sidebar'


interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-full w-full min-w-0">
      <aside className="relative z-10 h-full min-h-full w-[260px] shrink-0 shadow-[4px_0_24px_-4px_rgba(0,0,0,0.12)]">
        <Sidebar />
      </aside>
      <main className="min-w-0 flex-1 bg-[#f3f3f3]">{children}</main>
    </div>
  )
}

export default Layout