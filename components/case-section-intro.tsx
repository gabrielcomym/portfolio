'use client'

import { useState } from 'react'
import { CaseDetailPanel } from '@/components/case-detail-panel'
import { PillButton } from '@/components/ui/pill-button'
import type { CaseSection } from '@/lib/cases-data'

export function CaseSectionIntro({ section }: { section: CaseSection }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="mx-auto flex max-w-[884px] flex-col items-center gap-[var(--space-case-section-title-gap)] pt-[var(--space-case-section-title-top)] pb-[var(--space-case-section-title-bottom)] text-center">
        <h3 data-scroll-reveal="copy" className="text-display text-ink">{section.heading}</h3>
        {section.ctaLabel ? <PillButton onClick={() => setOpen(true)}>{section.ctaLabel}</PillButton> : null}
      </div>
      <section className="sr-only" aria-label={`${section.heading} case-study details`}>
        <h4>{section.heading} details</h4>
        {section.details.map((detail) => (
          <section key={detail.label}>
            <h5>{detail.label}</h5>
            <p>{detail.copy}</p>
          </section>
        ))}
      </section>
      <CaseDetailPanel open={open} heading={section.heading} details={section.details} onClose={() => setOpen(false)} />
    </>
  )
}
