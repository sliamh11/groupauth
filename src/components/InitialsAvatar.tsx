import { cn } from '@/lib/utils'

interface InitialsAvatarProps {
  name: string
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
}

export function InitialsAvatar({ name, className }: InitialsAvatarProps) {
  const initials = getInitials(name)
  return (
    <span
      className={cn(
        'inline-flex size-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground select-none',
        className,
      )}
      aria-label={name}
    >
      {initials}
    </span>
  )
}
