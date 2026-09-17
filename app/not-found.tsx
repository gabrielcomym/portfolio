import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Container } from '@/components/layout/container'
import { PillButton } from '@/components/ui/pill-button'

export default function NotFound() {
  return (
    <main>
      <SiteHeader />
      <Container className="py-[var(--space-case-rhythm-medium)]">
        <h1 className="text-display text-ink">Page not found.</h1>
        <p className="text-body-editorial mt-8 max-w-xl text-ink-muted">This page is unavailable. Explore the selected projects instead.</p>
        <PillButton href="/" className="mt-8">View projects</PillButton>
      </Container>
      <SiteFooter />
    </main>
  )
}
