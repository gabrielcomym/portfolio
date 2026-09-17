import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

/**
 * Page-level 12-column grid container.
 * Desktop: 1440px max width, 48px outer margin, 24px gutter.
 * Mobile: single column, 24px margin.
 */
export function Container({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full max-w-[1440px] px-6 md:px-12',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function Grid12({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-6 md:grid-cols-12',
        className,
      )}
    >
      {children}
    </div>
  )
}
