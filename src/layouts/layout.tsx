import React from 'react'
import Sidebar from '../components/Sidebar'


interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex min-h-full w-full min-w-0">
      <aside className="h-full min-h-full w-[260px] shrink-0">
        <Sidebar />
      </aside>
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  )
}

export default Layout