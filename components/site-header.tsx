import Link from 'next/link'

export const GLOBAL_NAV_LINKS = [
  { label: 'Lab', href: '/lab', external: false },
  { label: 'About', href: '/about', external: false },
]

/**
 * Shared top navigation used across the home, About, and case-study pages.
 * It follows the viewport edge rather than the centered editorial grid, matching
 * the edge chrome on the home and Lab views.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-transparent px-6 py-6 md:px-12 md:py-10">
      <nav aria-label="Primary" className="flex items-start justify-between gap-8">
        <Link href="/" data-scroll-reveal="chrome" className="text-nav text-ink">
          Comym
        </Link>
        <ul className="flex flex-wrap items-center justify-end gap-x-8 gap-y-2 md:gap-x-16">
          {GLOBAL_NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                data-scroll-reveal="chrome"
                data-scroll-reveal-delay="1"
                className="text-nav text-ink transition-opacity duration-150 hover:opacity-60"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
