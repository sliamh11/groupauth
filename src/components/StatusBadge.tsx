import { cn } from '@/lib/utils'

export type StatusValue = 'active' | 'pending' | 'disabled'

const STATUS_CONFIG: Record<StatusValue, { dot: string; label: string; text: string }> = {
  active: {
    dot: 'bg-status-active',
    label: 'Active',
    text: 'text-status-active',
  },
  pending: {
    dot: 'bg-status-pending',
    label: 'Pending',
    text: 'text-status-pending',
  },
  disabled: {
    dot: 'bg-status-disabled',
    label: 'Disabled',
    text: 'text-status-disabled',
  },
}

interface StatusBadgeProps {
  status: StatusValue
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status]
  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className={cn('size-2 rounded-full', config.dot)} aria-hidden="true" />
      <span className={cn('text-sm font-medium', config.text)}>{config.label}</span>
    </span>
  )
}
