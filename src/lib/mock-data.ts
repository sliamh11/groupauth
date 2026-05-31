// GroupAuth — mock fixtures for development and Storybook stories
// Companies, users, roles, and activity data match the wireframes exactly.

import type { Company, User, Role, Activity, LoginEvent } from '@/types'

// Wave 2 — per-user role assignments (distinct from role definitions in ROLES)
export interface RoleAssignment {
  id: string
  userId: string
  roleName: string
  companyScope: string
  assignedDate: string
}

export const ROLE_ASSIGNMENTS: RoleAssignment[] = [
  {
    id: 'ra1',
    userId: 'u1',
    roleName: 'Admin',
    companyScope: 'Cympire',
    assignedDate: 'Jan 15, 2025',
  },
  {
    id: 'ra2',
    userId: 'u1',
    roleName: 'Manager',
    companyScope: 'All Companies',
    assignedDate: 'Feb 3, 2025',
  },
]

// Wave 2 — login history rows matching wireframe 05-user-detail (~8 rows)
export const USER_LOGIN_HISTORY: LoginEvent[] = [
  {
    id: 'lh1',
    userId: 'u1',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    device: 'Chrome on macOS',
    status: 'success',
    timestamp: 'May 31, 2026 14:32',
  },
  {
    id: 'lh2',
    userId: 'u1',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    device: 'Chrome on macOS',
    status: 'success',
    timestamp: 'May 31, 2026 09:15',
  },
  {
    id: 'lh3',
    userId: 'u1',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    device: 'Chrome on macOS',
    status: 'success',
    timestamp: 'May 30, 2026 18:45',
  },
  {
    id: 'lh4',
    userId: 'u1',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    device: 'Safari on iPhone',
    status: 'success',
    timestamp: 'May 30, 2026 08:20',
  },
  {
    id: 'lh5',
    userId: 'u1',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    device: 'Chrome on macOS',
    status: 'success',
    timestamp: 'May 29, 2026 16:10',
  },
  {
    id: 'lh6',
    userId: 'u1',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    device: 'Chrome on macOS',
    status: 'failed',
    timestamp: 'May 29, 2026 03:05',
  },
  {
    id: 'lh7',
    userId: 'u1',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    device: 'Firefox on Windows',
    status: 'success',
    timestamp: 'May 28, 2026 11:30',
  },
  {
    id: 'lh8',
    userId: 'u1',
    ip: '192.168.1.100',
    location: 'San Francisco, CA',
    device: 'Chrome on macOS',
    status: 'success',
    timestamp: 'May 27, 2026 09:00',
  },
]

export const COMPANIES: Company[] = [
  {
    id: 'cympire',
    name: 'Cympire',
    domain: 'cympire.com',
    userCount: 64,
    activeCount: 38,
    mfaEnabled: true,
    aiInsight: 'MFA adoption increased 12% this month — highest across all companies',
  },
  {
    id: 'cywareness',
    name: 'Cywareness',
    domain: 'cywareness.io',
    userCount: 52,
    activeCount: 28,
    mfaEnabled: true,
    aiInsight: "3 users haven't logged in for 30+ days — consider account review",
  },
  {
    id: 'codeus',
    name: 'Codeus Education',
    domain: 'codeus.co.il',
    userCount: 71,
    activeCount: 41,
    mfaEnabled: false,
    aiInsight: 'Login success rate improved to 98.2%, up from 94.1% last week',
  },
  {
    id: 'bina',
    name: 'Bina',
    domain: 'bina.org.il',
    userCount: 48,
    activeCount: 22,
    mfaEnabled: true,
    aiInsight: '5 pending invites older than 7 days — may need resending',
  },
  {
    id: 'soterio',
    name: 'Soterio',
    domain: 'soterio.com',
    userCount: 52,
    activeCount: 14,
    mfaEnabled: false,
    aiInsight: 'Unusual login pattern detected from new IP range in last 48h',
  },
]

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Chen',
    email: 'sarah.chen@cympire.com',
    company: 'cympire',
    role: 'Company Admin',
    status: 'active',
    lastLogin: '2 min ago',
    mfaEnabled: true,
    avatarInitials: 'SC',
  },
  {
    id: 'u2',
    name: 'Michael Torres',
    email: 'michael.torres@cywareness.io',
    company: 'cywareness',
    role: 'Manager',
    status: 'active',
    lastLogin: '5 min ago',
    mfaEnabled: true,
    avatarInitials: 'MT',
  },
  {
    id: 'u3',
    name: 'James Lee',
    email: 'james.lee@codeus.co.il',
    company: 'codeus',
    role: 'Viewer',
    status: 'pending',
    lastLogin: 'Never',
    mfaEnabled: false,
    avatarInitials: 'JL',
  },
  {
    id: 'u4',
    name: 'Sophia Martinez',
    email: 'sophia.martinez@bina.org.il',
    company: 'bina',
    role: 'Manager',
    status: 'disabled',
    lastLogin: '30 days ago',
    mfaEnabled: false,
    avatarInitials: 'SM',
  },
  {
    id: 'u5',
    name: 'David Cohen',
    email: 'david.cohen@soterio.com',
    company: 'soterio',
    role: 'Viewer',
    status: 'active',
    lastLogin: '1 hour ago',
    mfaEnabled: true,
    avatarInitials: 'DC',
  },
  {
    id: 'u6',
    name: 'Anat Levi',
    email: 'anat.levi@cympire.com',
    company: 'cympire',
    role: 'Manager',
    status: 'active',
    lastLogin: '3 hours ago',
    mfaEnabled: true,
    avatarInitials: 'AL',
  },
  {
    id: 'u7',
    name: 'Ronen Shapira',
    email: 'ronen.shapira@cywareness.io',
    company: 'cywareness',
    role: 'Company Admin',
    status: 'active',
    lastLogin: '1 day ago',
    mfaEnabled: false,
    avatarInitials: 'RS',
  },
  {
    id: 'u8',
    name: 'Emily Johnson',
    email: 'emily.johnson@bina.org.il',
    company: 'bina',
    role: 'Viewer',
    status: 'pending',
    lastLogin: 'Never',
    mfaEnabled: false,
    avatarInitials: 'EJ',
  },
  {
    id: 'u9',
    name: 'Omar Hassan',
    email: 'omar.hassan@soterio.com',
    company: 'soterio',
    role: 'Manager',
    status: 'active',
    lastLogin: '2 days ago',
    mfaEnabled: true,
    avatarInitials: 'OH',
  },
  {
    id: 'u10',
    name: 'Noa Ben-David',
    email: 'noa.bendavid@codeus.co.il',
    company: 'codeus',
    role: 'Company Admin',
    status: 'active',
    lastLogin: '4 hours ago',
    mfaEnabled: true,
    avatarInitials: 'NB',
  },
]

export const ROLES: Role[] = [
  {
    id: 'r1',
    name: 'Super Admin',
    description: 'Full system access across all companies',
    userCount: 2,
    companyScopes: ['cympire', 'cywareness', 'codeus', 'bina', 'soterio'],
    permissions: [],
  },
  {
    id: 'r2',
    name: 'Company Admin',
    description: 'Full access within assigned company',
    userCount: 5,
    companyScopes: ['cympire', 'cywareness', 'codeus'],
    permissions: [],
  },
  {
    id: 'r3',
    name: 'Manager',
    description: 'Manage users and view reports',
    userCount: 18,
    companyScopes: ['cympire', 'cywareness'],
    permissions: [],
  },
  {
    id: 'r4',
    name: 'Viewer',
    description: 'Read-only access to assigned resources',
    userCount: 42,
    companyScopes: ['bina'],
    permissions: [],
  },
  {
    id: 'r5',
    name: 'Custom',
    description: 'Customized permission set',
    userCount: 3,
    companyScopes: ['soterio'],
    permissions: [],
  },
]

export const RECENT_ACTIVITY: Activity[] = [
  { id: 'a1', user: 'Sarah Chen', company: 'cympire', action: 'Logged in', time: '2 min ago' },
  { id: 'a2', user: 'Michael Torres', company: 'cywareness', action: 'Password changed', time: '5 min ago' },
  { id: 'a3', user: 'James Lee', company: 'codeus', action: 'Invited', time: '10 min ago' },
  { id: 'a4', user: 'Sophia Martinez', company: 'bina', action: 'Account disabled', time: '1 hour ago' },
  { id: 'a5', user: 'David Cohen', company: 'soterio', action: 'MFA enabled', time: '2 hours ago' },
  { id: 'a6', user: 'Anat Levi', company: 'cympire', action: 'Role changed', time: '3 hours ago' },
]

// ── Company Detail page fixtures (Wave 2) ──────────────────────────────────

export interface CompanyMember {
  id: string
  name: string
  role: string
  status: 'active' | 'pending' | 'disabled'
  lastLogin: string
}

export interface AiInsight {
  id: string
  iconType: 'trend-up' | 'alert'
  title: string
  body: string
}

export interface CompanyDomainConfig {
  allowedEmailPattern: string
  ssoRedirectUrl: string
}

export const COMPANY_MEMBERS: CompanyMember[] = [
  { id: 'cm1', name: 'Sarah Chen', role: 'Admin', status: 'active', lastLogin: '2h ago' },
  { id: 'cm2', name: 'David Kim', role: 'Manager', status: 'active', lastLogin: '12h ago' },
  { id: 'cm3', name: 'Ava Anderson', role: 'Manager', status: 'pending', lastLogin: 'Never' },
  { id: 'cm4', name: 'Jennifer Liu', role: 'User', status: 'active', lastLogin: '1d ago' },
  { id: 'cm5', name: 'Marcus Zhang', role: 'User', status: 'active', lastLogin: '3h ago' },
  { id: 'cm6', name: 'Lisa Wang', role: 'Admin', status: 'active', lastLogin: '5h ago' },
  { id: 'cm7', name: 'Kevin Patel', role: 'User', status: 'disabled', lastLogin: '1w ago' },
  { id: 'cm8', name: 'Rachel Green', role: 'User', status: 'active', lastLogin: '8h ago' },
]

export const CYMPIRE_AI_INSIGHTS: AiInsight[] = [
  {
    id: 'ai1',
    iconType: 'trend-up',
    title: 'Security Improvement Detected',
    body: 'MFA adoption increased by 12% this month (from 82% to 94%), representing 8 new users enabling two-factor authentication. This is the highest improvement across all companies in the BSW Group.',
  },
  {
    id: 'ai2',
    iconType: 'trend-up',
    title: 'Login Success Rate Trending Up',
    body: 'Average login success rate improved to 98.7% (up from 95.2% last week). Failed login attempts decreased by 47%, suggesting better password management practices.',
  },
  {
    id: 'ai3',
    iconType: 'alert',
    title: 'Inactive Admin Account',
    body: '1 admin user (Kevin Patel) hasn\'t logged in for 7+ days. Consider reviewing high-privilege inactive accounts for security compliance.',
  },
]

export const CYMPIRE_DOMAIN_CONFIG: CompanyDomainConfig = {
  allowedEmailPattern: '*@cympire.com',
  ssoRedirectUrl: 'https://auth.cympire.com/sso/callback',
}

// ── Login History ────────────────────────────────────────────────────────────

export const LOGIN_HISTORY: LoginEvent[] = [
  {
    id: 'l1',
    userId: 'u1',
    ip: '185.34.22.11',
    location: 'Tel Aviv, IL',
    device: 'Chrome / macOS',
    status: 'success',
    timestamp: '2 min ago',
  },
  {
    id: 'l2',
    userId: 'u1',
    ip: '185.34.22.11',
    location: 'Tel Aviv, IL',
    device: 'Chrome / macOS',
    status: 'success',
    timestamp: '1 day ago',
  },
  {
    id: 'l3',
    userId: 'u1',
    ip: '92.45.11.200',
    location: 'London, UK',
    device: 'Safari / iOS',
    status: 'failed',
    timestamp: '3 days ago',
  },
]
