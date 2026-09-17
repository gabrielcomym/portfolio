/** Small passive tag/label — used for case metadata (e.g. "Technical UX"). */
export function Chip({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <span
      className={`text-chip inline-flex shrink-0 items-center justify-center rounded-pill bg-chip-bg px-3 py-1 text-ink-muted ${className ?? ''}`}
    >
      {children}
    </span>
  )
}
