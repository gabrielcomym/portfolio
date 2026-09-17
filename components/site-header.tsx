import Link from 'next/link'
import { Container } from '@/components/layout/container'

export const GLOBAL_NAV_LINKS = [
  { label: 'Insights', href: 'https://gabrielcomym.medium.com/', external: true },
  { label: 'About', href: '/about' },
]

/**
 * Shared top navigation used across the home, About, and case-study pages.
 * Contact remains available in the footer so this compact header stays aligned
 * with the approved project-page composition.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full bg-paper py-6 md:py-10">
      <Container>
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
      </Container>
    </header>
  )
}
