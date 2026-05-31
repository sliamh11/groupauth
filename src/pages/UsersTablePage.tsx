import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router'
import { Download, Plus, ShieldCheck, Shield } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { CompanyBadge } from '@/components/CompanyBadge'
import { InitialsAvatar } from '@/components/InitialsAvatar'
import { StatusBadge } from '@/components/StatusBadge'
import { USERS, COMPANIES } from '@/lib/mock-data'
import type { CompanyId, UserStatus } from '@/types'

// Derive unique roles from mock data (static to keep Tailwind v4 happy)
const ALL_ROLES = [...new Set(USERS.map((u) => u.role))].sort()

export function UsersTablePage() {
  const navigate = useNavigate()

  // Filter state — "all" is the sentinel for "no filter"
  const [companyFilter, setCompanyFilter] = useState<string>('all')
  const [roleFilter, setRoleFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [search, setSearch] = useState('')

  // Selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  // Derived: filtered rows
  const filteredUsers = useMemo(() => {
    return USERS.filter((user) => {
      if (companyFilter !== 'all' && user.company !== companyFilter) return false
      if (roleFilter !== 'all' && user.role !== roleFilter) return false
      if (statusFilter !== 'all' && user.status !== statusFilter) return false
      if (search.trim()) {
        const q = search.toLowerCase()
        if (
          !user.name.toLowerCase().includes(q) &&
          !user.email.toLowerCase().includes(q)
        ) {
          return false
        }
      }
      return true
    })
  }, [companyFilter, roleFilter, statusFilter, search])

  // Select-all logic
  const allSelected =
    filteredUsers.length > 0 && filteredUsers.every((u) => selectedIds.has(u.id))
  const someSelected =
    !allSelected && filteredUsers.some((u) => selectedIds.has(u.id))

  function toggleAll() {
    if (allSelected) {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        filteredUsers.forEach((u) => next.delete(u.id))
        return next
      })
    } else {
      setSelectedIds((prev) => {
        const next = new Set(prev)
        filteredUsers.forEach((u) => next.add(u.id))
        return next
      })
    }
  }

  function toggleRow(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Users</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="default">
            <Download className="size-4" aria-hidden="true" />
            Export
          </Button>
          <Button variant="default" size="default">
            <Plus className="size-4" aria-hidden="true" />
            Add User
          </Button>
        </div>
      </div>

      {/* Filter row */}
      <div className="flex items-center gap-2">
        {/* All Companies */}
        <Select
          value={companyFilter}
          onValueChange={(v) => setCompanyFilter(v ?? 'all')}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Companies</SelectItem>
            {COMPANIES.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* All Roles */}
        <Select
          value={roleFilter}
          onValueChange={(v) => setRoleFilter(v ?? 'all')}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            {ALL_ROLES.map((role) => (
              <SelectItem key={role} value={role}>
                {role}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* All Status */}
        <Select
          value={statusFilter}
          onValueChange={(v) => setStatusFilter(v ?? 'all')}
        >
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>

        {/* Search */}
        <Input
          type="search"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1"
        />
      </div>

      {/* Data table */}
      <div className="rounded-lg border border-border bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 pl-4">
                <Checkbox
                  checked={allSelected}
                  indeterminate={someSelected}
                  onCheckedChange={toggleAll}
                  aria-label="Select all users"
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>MFA</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/dashboard/users/${user.id}`)}
              >
                {/* Checkbox cell */}
                <TableCell className="pl-4" onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedIds.has(user.id)}
                    onCheckedChange={() => toggleRow(user.id)}
                    aria-label={`Select ${user.name}`}
                  />
                </TableCell>

                {/* Name + email */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <InitialsAvatar name={user.name} />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium text-foreground leading-tight">
                        {user.name}
                      </span>
                      <span className="text-xs text-muted-foreground leading-tight truncate">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>

                {/* Company */}
                <TableCell>
                  <CompanyBadge company={user.company as CompanyId} />
                </TableCell>

                {/* Role chip */}
                <TableCell>
                  <span className="bg-muted rounded-md px-2 py-0.5 text-xs text-foreground">
                    {user.role}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={user.status as UserStatus} />
                </TableCell>

                {/* Last Login */}
                <TableCell className="text-sm text-muted-foreground">
                  {user.lastLogin}
                </TableCell>

                {/* MFA */}
                <TableCell>
                  {user.mfaEnabled ? (
                    <ShieldCheck
                      className="size-4 text-status-active"
                      aria-label="MFA enabled"
                    />
                  ) : (
                    <Shield
                      className="size-4 text-muted-foreground"
                      aria-label="MFA disabled"
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}

            {filteredUsers.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-8 text-center text-sm text-muted-foreground"
                >
                  No users match your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
