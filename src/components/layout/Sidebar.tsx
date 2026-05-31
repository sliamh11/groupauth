import { LayoutDashboard, Users, Shield } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Users', to: '/dashboard/users', icon: Users },
  { label: 'Roles', to: '/dashboard/roles', icon: Shield },
] as const

export function Sidebar() {
  return (
    <aside className="flex h-full w-60 flex-col bg-sidebar">
      {/* Logo + brand */}
      <div className="flex items-center gap-2.5 px-4 py-5">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary">
          <Shield className="size-4 text-white" />
        </div>
        <span className="text-sm font-semibold text-white">BSW Group</span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-2">
        {NAV_ITEMS.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-sidebar-active-bg text-white'
                  : 'text-sidebar-foreground hover:text-white',
              )
            }
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
