import { BrowserRouter, Routes, Route, Navigate } from 'react-router'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { AppShell } from '@/components/layout/AppShell'
import { LoginPage } from '@/pages/LoginPage'
import { MfaPage } from '@/pages/MfaPage'
import { DashboardPage } from '@/pages/DashboardPage'
import { UsersTablePage } from '@/pages/UsersTablePage'
import { UserDetailPage } from '@/pages/UserDetailPage'
import { CompanyDetailPage } from '@/pages/CompanyDetailPage'
import { RoleManagementPage } from '@/pages/RoleManagementPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes — centered card on dark gradient */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/mfa" element={<MfaPage />} />
        </Route>

        {/* App routes — fixed sidebar + topbar shell */}
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/users" element={<UsersTablePage />} />
          <Route path="/dashboard/users/:userId" element={<UserDetailPage />} />
          <Route path="/dashboard/companies/:companyId" element={<CompanyDetailPage />} />
          <Route path="/dashboard/roles" element={<RoleManagementPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
