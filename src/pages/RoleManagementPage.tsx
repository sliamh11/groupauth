// Wave 3 — Role Management page: role list, permission toggles, company-scope
// checkboxes, and Create Role dialog. Data driven by ROLE_DETAILS (mock-data).

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog'
import { ROLE_DETAILS, COMPANIES } from '@/lib/mock-data'
import type { RoleDetail } from '@/lib/mock-data'
import type { Permission } from '@/types'
import { cn } from '@/lib/utils'

// ── Permission group ordering ────────────────────────────────────────────────

const PERM_GROUP_ORDER = [
  'User Management',
  'Company Settings',
  'Reports',
  'API Access',
] as const

function groupPermissions(permissions: Permission[]): Map<string, Permission[]> {
  const map = new Map<string, Permission[]>()
  for (const group of PERM_GROUP_ORDER) {
    map.set(group, [])
  }
  for (const perm of permissions) {
    const list = map.get(perm.group)
    if (list) list.push(perm)
  }
  return map
}

// ── Right panel (role detail + permissions + company scope) ──────────────────

interface RolePanelProps {
  role: RoleDetail
}

function RolePanel({ role }: RolePanelProps) {
  // Local mutable copies of permission states — reset on remount (key={role.id})
  const [perms, setPerms] = useState<Permission[]>(
    role.permissions.map((p) => ({ ...p })),
  )
  const [scopedCompanies, setScopedCompanies] = useState<Set<string>>(
    new Set(role.companyScopes),
  )

  function togglePerm(id: string, checked: boolean) {
    setPerms((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: checked } : p)),
    )
  }

  function toggleCompany(companyId: string, checked: boolean) {
    setScopedCompanies((prev) => {
      const next = new Set(prev)
      if (checked) {
        next.add(companyId)
      } else {
        next.delete(companyId)
      }
      return next
    })
  }

  const groupedPerms = groupPermissions(perms)

  return (
    <div className="col-span-2 flex flex-col gap-6">
      {/* Role header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground">{role.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{role.description}</p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline" size="sm">
            Edit
          </Button>
          {!role.isSystemRole && (
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          )}
        </div>
      </div>

      {/* Permissions section */}
      <div>
        <h3 className="mb-3 text-base font-semibold text-foreground">
          Permissions
        </h3>
        <div className="flex flex-col gap-5">
          {Array.from(groupedPerms.entries()).map(([group, groupPerms]) => {
            if (groupPerms.length === 0) return null
            return (
              <div key={group}>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {group}
                </p>
                <div className="flex flex-col gap-1">
                  {groupPerms.map((perm) => (
                    <div
                      key={perm.id}
                      className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-muted/50"
                    >
                      <span className="text-sm text-foreground">{perm.label}</span>
                      <Switch
                        checked={perm.enabled}
                        onCheckedChange={(checked: boolean) =>
                          togglePerm(perm.id, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Company scope section */}
      <div>
        <h3 className="mb-1 text-base font-semibold text-foreground">
          Company Scope
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">
          Select which companies this role has access to
        </p>
        <div className="flex flex-col gap-2">
          {COMPANIES.map((company) => {
            const isChecked = scopedCompanies.has(company.id)
            return (
              <label
                key={company.id}
                className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-muted/50"
              >
                <Checkbox
                  checked={isChecked}
                  onCheckedChange={(checked: boolean) =>
                    toggleCompany(company.id, checked)
                  }
                />
                <span className="text-sm text-foreground">{company.name}</span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// ── Create Role dialog ────────────────────────────────────────────────────────

const QUICK_TEMPLATES = [
  'Read-only Access',
  'User Manager',
  'Company Admin',
  'Start from Scratch',
] as const

interface CreateRoleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CreateRoleDialog({ open, onOpenChange }: CreateRoleDialogProps) {
  const [roleName, setRoleName] = useState('')
  const [description, setDescription] = useState('')

  function handleClose() {
    setRoleName('')
    setDescription('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg" showCloseButton>
        <DialogHeader>
          <DialogTitle>Create New Role</DialogTitle>
          <DialogDescription>
            Create a custom role with specific permissions and company access.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          {/* Role Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Role Name
            </label>
            <Input
              placeholder="e.g., Regional Manager"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Description
            </label>
            <Textarea
              placeholder="Describe the purpose and scope of this role..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-20 resize-none"
            />
          </div>

          {/* Quick permissions template */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Quick Permissions Template
            </label>
            <div className="grid grid-cols-2 gap-2">
              {QUICK_TEMPLATES.map((template) => (
                <button
                  key={template}
                  type="button"
                  className="rounded-lg border border-input bg-background px-3 py-2 text-left text-sm text-foreground transition-colors hover:bg-muted"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose
            render={
              <Button variant="outline" onClick={handleClose} />
            }
          >
            Cancel
          </DialogClose>
          <Button
            disabled={!roleName.trim()}
            onClick={handleClose}
          >
            Create Role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

export function RoleManagementPage() {
  const [selectedRoleId, setSelectedRoleId] = useState<string>('rd2') // Company Admin default
  const [dialogOpen, setDialogOpen] = useState(false)

  const selectedRole = ROLE_DETAILS.find((r) => r.id === selectedRoleId) ?? ROLE_DETAILS[1]

  return (
    <div className="flex flex-col gap-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Roles</h1>
        <Button
          className="bg-primary rounded-md"
          onClick={() => setDialogOpen(true)}
        >
          <Plus />
          Create Role
        </Button>
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left panel — role list */}
        <div className="col-span-1 flex flex-col gap-3">
          {ROLE_DETAILS.map((role) => {
            const isSelected = role.id === selectedRoleId
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedRoleId(role.id)}
                className={cn(
                  'w-full rounded-lg border bg-card p-4 text-left transition-colors hover:border-primary/50',
                  isSelected
                    ? 'border-primary bg-primary/5'
                    : 'border-border',
                )}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground">
                    {role.name}
                  </span>
                  {isSelected && (
                    <span className="size-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {role.userCount} users
                </p>
              </button>
            )
          })}
        </div>

        {/* Right panel — role detail (key resets local state on role change) */}
        <RolePanel key={selectedRole.id} role={selectedRole} />
      </div>

      {/* Create Role dialog */}
      <CreateRoleDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  )
}
