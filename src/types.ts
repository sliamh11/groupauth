// GroupAuth — shared TypeScript interfaces
// Fields drawn from wireframes: 01-login, 02-mfa, 03-dashboard, 04-users-table,
// 05-user-detail, 06-company-detail, 07-role-management, 08-create-role-dialog

export type UserStatus = 'active' | 'pending' | 'disabled'
export type CompanyId = 'cympire' | 'cywareness' | 'codeus' | 'bina' | 'soterio'

export interface User {
  id: string
  name: string
  email: string
  company: CompanyId
  role: string
  status: UserStatus
  lastLogin: string
  mfaEnabled: boolean
  avatarInitials?: string
}

export interface Company {
  id: CompanyId
  name: string
  domain: string
  userCount: number
  activeCount: number
  mfaEnabled: boolean
  aiInsight?: string
}

export interface Role {
  id: string
  name: string
  description: string
  userCount: number
  permissions: Permission[]
  companyScopes: CompanyId[]
}

export interface Permission {
  id: string
  label: string
  group: string
  enabled: boolean
}

export interface Activity {
  id: string
  user: string
  company: CompanyId
  action: string
  time: string
}

export interface LoginEvent {
  id: string
  userId: string
  ip: string
  location: string
  device: string
  status: 'success' | 'failed'
  timestamp: string
}
