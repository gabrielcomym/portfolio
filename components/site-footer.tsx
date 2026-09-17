import Link from 'next/link'
import { Container } from '@/components/layout/container'

const FOOTER_NAV_LINKS = [
  { label: 'Work', href: '/' },
  { label: 'Insights', href: 'https://gabrielcomym.medium.com/', external: true },
  { label: 'About', href: '/about' },
]

/**
 * Shared footer from the approved 102:114 Figma component.
 * The footer has its own navigation composition and does not reuse the
 * page header, so its year and wordmark remain part of the same system.
 */
export function SiteFooter() {
  return (
    <footer className="flex min-h-[420px] flex-col bg-ink text-paper md:min-h-[506px]">
      <Container className="flex flex-1 flex-col py-10 md:py-12">
        <h2 data-scroll-reveal="chrome" className="text-footer-wordmark text-paper">Comym</h2>
        <div className="mt-auto grid grid-cols-1 gap-y-6 md:grid-cols-12 md:items-center md:gap-6">
          <span data-scroll-reveal="chrome" className="text-nav text-paper md:col-span-1">2026</span>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-8 gap-y-2 md:col-span-6 md:col-start-5">
            {FOOTER_NAV_LINKS.map((link) => (
              <Link key={link.label} href={link.href} target={link.external ? '_blank' : undefined} rel={link.external ? 'noreferrer' : undefined} data-scroll-reveal="chrome" data-scroll-reveal-delay="1" className="text-nav text-paper transition-opacity duration-150 hover:opacity-60">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link href="mailto:gabrielcomym@gmail.com" data-scroll-reveal="chrome" data-scroll-reveal-delay="1" className="text-nav text-paper transition-opacity duration-150 hover:opacity-60 md:col-start-12 md:justify-self-end">
            Contact
          </Link>
        </div>
      </Container>
    </footer>
  )
}
