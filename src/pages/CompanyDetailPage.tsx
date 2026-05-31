import { useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { Sparkles, TrendingUp, AlertCircle } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { StatusBadge } from '@/components/StatusBadge'
import { COMPANIES } from '@/lib/mock-data'
import {
  COMPANY_MEMBERS,
  CYMPIRE_AI_INSIGHTS,
  CYMPIRE_DOMAIN_CONFIG,
} from '@/lib/mock-data'
import type { CompanyId } from '@/types'
import type { AiInsight } from '@/lib/mock-data'

// ── Company logo background colours — static map (no template literals) ──────
const COMPANY_LOGO_BG: Record<CompanyId, string> = {
  cympire: 'bg-company-cympire',
  cywareness: 'bg-company-cywareness',
  codeus: 'bg-company-codeus',
  bina: 'bg-company-bina',
  soterio: 'bg-company-soterio',
}

// ── AI insight icon helper ────────────────────────────────────────────────────
function InsightIcon({ type }: { type: AiInsight['iconType'] }) {
  if (type === 'trend-up') {
    return <TrendingUp className="size-5 shrink-0 text-status-active" />
  }
  return <AlertCircle className="size-5 shrink-0 text-status-pending" />
}

export function CompanyDetailPage() {
  const { companyId } = useParams<{ companyId: string }>()
  const navigate = useNavigate()

  const company =
    COMPANIES.find((c) => c.id === companyId) ?? COMPANIES[0]

  const logoBg = COMPANY_LOGO_BG[company.id]
  const initial = company.name[0].toUpperCase()

  // ── Settings local state ──────────────────────────────────────────────────
  const [mfaEnabled, setMfaEnabled] = useState(true)

  return (
    <div className="flex flex-col gap-6">
      {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <button
          type="button"
          onClick={() => navigate('/dashboard/users')}
          className="hover:text-foreground transition-colors"
        >
          Companies
        </button>
        <span className="select-none">›</span>
        <span className="font-medium text-foreground">{company.name}</span>
      </nav>

      {/* ── Header card ───────────────────────────────────────────────────── */}
      <Card>
        <CardContent className="flex items-center gap-5 py-5">
          {/* Large company logo circle */}
          <div
            className={[
              'flex size-16 shrink-0 items-center justify-center rounded-full text-white text-2xl font-bold select-none',
              logoBg,
            ].join(' ')}
            aria-hidden="true"
          >
            {initial}
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">
                {company.name}
              </h1>
              <StatusBadge status="active" />
            </div>
            <p className="text-sm text-muted-foreground">{company.domain}</p>
          </div>
        </CardContent>
      </Card>

      {/* ── Stats row ─────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <span className="text-3xl font-semibold text-foreground">
              {company.userCount}
            </span>
            <span className="mt-1 text-sm text-muted-foreground">Users</span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <span className="text-3xl font-semibold text-foreground">
              {company.activeCount}
            </span>
            <span className="mt-1 text-sm text-muted-foreground">
              Active Today
            </span>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <span className="text-3xl font-semibold text-foreground">92%</span>
            <span className="mt-1 text-sm text-muted-foreground">
              MFA Adoption
            </span>
          </CardContent>
        </Card>
      </div>

      {/* ── AI Insights card ──────────────────────────────────────────────── */}
      <div className="rounded-lg bg-primary/5 border border-primary/20 p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-2">
          <Sparkles className="size-5 text-primary" />
          <h2 className="text-base font-semibold text-foreground">
            AI Insights
          </h2>
        </div>

        {/* Insight rows */}
        <div className="flex flex-col gap-4">
          {CYMPIRE_AI_INSIGHTS.map((insight) => (
            <div key={insight.id} className="flex items-start gap-3">
              <div className="mt-0.5">
                <InsightIcon type={insight.iconType} />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-foreground">
                  {insight.title}
                </p>
                <p className="text-sm text-muted-foreground">{insight.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Domain Configuration card ─────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Domain Configuration</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 pb-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Allowed Email Patterns
            </label>
            <Input
              readOnly
              defaultValue={CYMPIRE_DOMAIN_CONFIG.allowedEmailPattern}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              SSO Redirect URL
            </label>
            <Input
              readOnly
              defaultValue={CYMPIRE_DOMAIN_CONFIG.ssoRedirectUrl}
            />
          </div>
        </CardContent>
      </Card>

      {/* ── Users card ────────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <button
            type="button"
            onClick={() => navigate('/dashboard/users')}
            className="mb-4 text-sm font-medium text-primary hover:underline"
          >
            View All Users
          </button>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {COMPANY_MEMBERS.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium text-foreground">
                    {member.name}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={member.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {member.lastLogin}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* ── Settings card ─────────────────────────────────────────────────── */}
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-6 pb-6">
          {/* Default Role for New Users */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Default Role for New Users
            </label>
            <Select defaultValue="user">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="user">User</SelectItem>
                  <SelectItem value="manager">Manager</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* MFA Policy */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              MFA Policy
            </label>
            <div className="flex items-center gap-3">
              <Switch
                checked={mfaEnabled}
                onCheckedChange={setMfaEnabled}
              />
              <span className="text-sm text-muted-foreground">
                Require all users to enable two-factor authentication
              </span>
            </div>
          </div>

          {/* Session Timeout */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground">
              Session Timeout (minutes)
            </label>
            <Input
              type="number"
              defaultValue={60}
              className="w-32"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
