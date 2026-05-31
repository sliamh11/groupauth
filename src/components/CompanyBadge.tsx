import { cn } from '@/lib/utils'
import type { CompanyId } from '@/types'

const COMPANY_CONFIG: Record<CompanyId, { label: string; classes: string }> = {
  cympire: {
    label: 'Cympire',
    classes: 'bg-company-cympire/10 text-company-cympire',
  },
  cywareness: {
    label: 'Cywareness',
    classes: 'bg-company-cywareness/10 text-company-cywareness',
  },
  codeus: {
    label: 'Codeus Education',
    classes: 'bg-company-codeus/10 text-company-codeus',
  },
  bina: {
    label: 'Bina',
    classes: 'bg-company-bina/10 text-company-bina',
  },
  soterio: {
    label: 'Soterio',
    classes: 'bg-company-soterio/10 text-company-soterio',
  },
}

interface CompanyBadgeProps {
  company: CompanyId
  className?: string
}

export function CompanyBadge({ company, className }: CompanyBadgeProps) {
  const config = COMPANY_CONFIG[company]
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium',
        config.classes,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
