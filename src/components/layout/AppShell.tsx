import { Outlet } from 'react-router'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

export function AppShell() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
