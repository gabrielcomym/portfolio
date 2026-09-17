'use client'

import { useState } from 'react'
import { CaseDetailPanel } from '@/components/case-detail-panel'
import { PillButton } from '@/components/ui/pill-button'
import type { CaseSection } from '@/lib/cases-data'

export function CaseSectionIntro({ section }: { section: CaseSection }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="mx-auto flex max-w-[884px] flex-col items-center gap-8 py-[var(--space-case-rhythm-large)] text-center">
        <h3 data-scroll-reveal="copy" className="text-display text-ink">{section.heading}</h3>
        {section.ctaLabel ? <PillButton onClick={() => setOpen(true)}>{section.ctaLabel}</PillButton> : null}
      </div>
      <CaseDetailPanel open={open} heading={section.heading} details={section.details} onClose={() => setOpen(false)} />
    </>
  )
}
