// Wave 2 — User Detail page (LIA-163)
// Implements: profile card, Role Assignments table, Login History table

import { useParams, useNavigate } from 'react-router'
import { USERS } from '@/lib/mock-data'
import { ROLE_ASSIGNMENTS, USER_LOGIN_HISTORY } from '@/lib/mock-data'
import { InitialsAvatar } from '@/components/InitialsAvatar'
import { CompanyBadge } from '@/components/CompanyBadge'
import { StatusBadge } from '@/components/StatusBadge'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function UserDetailPage() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  const user = USERS.find((u) => u.id === userId) ?? USERS[0]

  const roleAssignments = ROLE_ASSIGNMENTS.filter((ra) => ra.userId === user.id)
  const loginHistory = USER_LOGIN_HISTORY.filter((lh) => lh.userId === user.id)

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => navigate('/dashboard/users')}
          className="text-primary hover:underline"
        >
          Users
        </button>
        <span className="text-muted-foreground">›</span>
        <span className="text-foreground font-medium">{user.name}</span>
      </nav>

      {/* Two-column layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left: Profile card */}
        <div className="col-span-1 bg-card rounded-lg border border-border shadow-sm p-6 flex flex-col items-center gap-3">
          <InitialsAvatar name={user.name} className="size-20 text-2xl" />
          <div className="text-center space-y-1">
            <p className="text-xl font-semibold text-foreground">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <CompanyBadge company={user.company} />
          <StatusBadge status={user.status} />
          <div className="w-full mt-2 flex flex-col gap-2">
            <Button
              className="w-full bg-primary text-primary-foreground rounded-md"
              onClick={() => {}}
            >
              Edit Profile
            </Button>
            <button
              type="button"
              onClick={() => {}}
              className="w-full border border-destructive text-destructive rounded-md px-4 py-2 text-sm font-medium hover:bg-destructive/5 transition-colors"
            >
              Disable Account
            </button>
          </div>
        </div>

        {/* Right: stacked cards */}
        <div className="col-span-2 space-y-6">
          {/* Role Assignments card */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-foreground">Role Assignments</h2>
              <Button
                className="bg-primary text-primary-foreground rounded-md"
                size="sm"
                onClick={() => {}}
              >
                Add Role
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Company Scope</TableHead>
                  <TableHead>Assigned Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roleAssignments.map((ra) => (
                  <TableRow key={ra.id}>
                    <TableCell>{ra.roleName}</TableCell>
                    <TableCell>{ra.companyScope}</TableCell>
                    <TableCell>{ra.assignedDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Login History card */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-base font-semibold text-foreground mb-4">Login History</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Device</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loginHistory.map((lh) => (
                  <TableRow key={lh.id}>
                    <TableCell>{lh.timestamp}</TableCell>
                    <TableCell>{lh.ip}</TableCell>
                    <TableCell>{lh.location}</TableCell>
                    <TableCell>{lh.device}</TableCell>
                    <TableCell>
                      <span
                        className={
                          lh.status === 'success'
                            ? 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-status-active/10 text-status-active'
                            : 'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-destructive/10 text-destructive'
                        }
                      >
                        {lh.status === 'success' ? 'Success' : 'Failed'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  )
}
