import { useNavigate } from 'react-router'
import { Users, UserCheck, Mail, ShieldCheck, Sparkles } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CompanyBadge } from '@/components/CompanyBadge'
import { InitialsAvatar } from '@/components/InitialsAvatar'
import { COMPANIES, RECENT_ACTIVITY } from '@/lib/mock-data'
import type { CompanyId } from '@/types'

// Static lookup to keep Tailwind v4 class names as literals (no dynamic template strings)
const COMPANY_BG_CLASSES: Record<CompanyId, string> = {
  cympire: 'bg-company-cympire',
  cywareness: 'bg-company-cywareness',
  codeus: 'bg-company-codeus',
  bina: 'bg-company-bina',
  soterio: 'bg-company-soterio',
}

const STAT_CARDS = [
  {
    label: 'Total Users',
    value: '287',
    icon: Users,
  },
  {
    label: 'Active Today',
    value: '143',
    icon: UserCheck,
  },
  {
    label: 'Pending Invites',
    value: '12',
    icon: Mail,
  },
  {
    label: 'MFA Enabled',
    value: '94%',
    icon: ShieldCheck,
  },
]

interface StatCardProps {
  label: string
  value: string
  icon: React.ElementType
}

function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-card rounded-lg border border-border shadow-sm p-6 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon className="size-5 text-muted-foreground" aria-hidden="true" />
      </div>
      <span className="text-3xl font-semibold text-foreground">{value}</span>
    </div>
  )
}

export function DashboardPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6 p-6">
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-4 gap-4">
        {STAT_CARDS.map((card) => (
          <StatCard key={card.label} {...card} />
        ))}
      </div>

      {/* Companies */}
      <section>
        <h2 className="text-base font-semibold text-foreground mb-4">Companies</h2>
        <div className="grid grid-cols-5 gap-4">
          {COMPANIES.map((company) => (
            <button
              key={company.id}
              type="button"
              className="bg-card rounded-lg border border-border shadow-sm p-5 flex flex-col gap-4 text-left cursor-pointer hover:bg-accent/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => navigate(`/dashboard/companies/${company.id}`)}
            >
              {/* Logo row */}
              <div className="flex items-center gap-3">
                <span
                  className={`inline-flex size-10 items-center justify-center rounded-full text-white text-sm font-semibold select-none ${COMPANY_BG_CLASSES[company.id]}`}
                  aria-hidden="true"
                >
                  {company.name[0].toUpperCase()}
                </span>
                <span className="text-sm font-semibold text-foreground">{company.name}</span>
              </div>

              {/* Stats */}
              <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{company.userCount} users</span>
                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <span className="size-2 rounded-full bg-status-active" aria-hidden="true" />
                  {company.activeCount} active now
                </span>
              </div>

              {/* AI insight */}
              {company.aiInsight && (
                <div className="flex items-start gap-1.5">
                  <Sparkles className="size-3.5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                  <span className="text-xs text-muted-foreground leading-snug">
                    {company.aiInsight}
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {RECENT_ACTIVITY.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <InitialsAvatar name={row.user} />
                        <span className="text-sm text-foreground">{row.user}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <CompanyBadge company={row.company} />
                    </TableCell>
                    <TableCell className="text-sm text-foreground">{row.action}</TableCell>
                    <TableCell className="text-sm text-muted-foreground text-right">
                      {row.time}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
