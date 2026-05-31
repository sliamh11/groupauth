import { Outlet } from 'react-router'

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-auth-from to-auth-to px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-card">
        <Outlet />
      </div>
    </div>
  )
}
