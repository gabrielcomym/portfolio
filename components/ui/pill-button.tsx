import Link from 'next/link'
import type { ButtonHTMLAttributes } from 'react'

/** Clickable secondary CTA pill — used for "Read more" prompts. */
export function PillButton({
  children,
  href,
  className,
  ...props
}: {
  children: React.ReactNode
  href?: string
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = `text-cta inline-flex items-center justify-center rounded-pill bg-pill-bg px-5 py-3 text-ink transition-colors duration-150 hover:bg-hairline ${className ?? ''}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return <button type="button" className={classes} {...props}>{children}</button>
}
