'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { CaseDetail } from '@/lib/cases-data'
import styles from './case-detail-panel.module.css'

type PanelState = 'entering' | 'open' | 'closing'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
const CLOSE_FALLBACK_MS = 220

export function CaseDetailPanel({
  open,
  heading,
  details,
  onClose,
}: {
  open: boolean
  heading: string
  details: CaseDetail[]
  onClose: () => void
}) {
  const [mounted, setMounted] = useState(open)
  const [state, setState] = useState<PanelState>('entering')
  const panelRef = useRef<HTMLElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const openerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (open) {
      if (!mounted) {
        openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
        setState('entering')
        setMounted(true)
      }
      return
    }

    if (mounted) setState('closing')
  }, [mounted, open])

  useEffect(() => {
    if (!mounted || !open) return

    const frame = window.requestAnimationFrame(() => {
      setState('open')
      closeRef.current?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [mounted, open])

  const finishClosing = useCallback(() => {
    if (open) return
    setMounted(false)
    setState('entering')
    openerRef.current?.focus({ preventScroll: true })
  }, [open])

  useEffect(() => {
    if (state !== 'closing') return
    const timeout = window.setTimeout(finishClosing, CLOSE_FALLBACK_MS)
    return () => window.clearTimeout(timeout)
  }, [finishClosing, state])

  useEffect(() => {
    if (!mounted) return

    const body = document.body
    const originalOverflow = body.style.overflow
    const originalPaddingRight = body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const computedPaddingRight = Number.parseFloat(window.getComputedStyle(body).paddingRight) || 0

    body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) body.style.paddingRight = `${computedPaddingRight + scrollbarWidth}px`

    return () => {
      body.style.overflow = originalOverflow
      body.style.paddingRight = originalPaddingRight
    }
  }, [mounted])

  if (!mounted) return null

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
      return
    }

    if (event.key !== 'Tab') return
    const elements = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
    if (!elements?.length) return
    const first = elements[0]
    const last = elements[elements.length - 1]

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  function handlePanelTransitionEnd(event: React.TransitionEvent<HTMLElement>) {
    if (event.currentTarget !== event.target || event.propertyName !== 'transform' || state !== 'closing') return
    finishClosing()
  }

  return (
    <div className={styles.root} data-state={state}>
      <div className={styles.scrim} aria-hidden="true" />
      <button type="button" tabIndex={-1} className={styles.backdrop} aria-label="Close details" onClick={onClose} />
      <aside
        ref={panelRef}
        className={styles.panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-detail-title"
        onKeyDown={handleKeyDown}
        onTransitionEnd={handlePanelTransitionEnd}
      >
        <button ref={closeRef} type="button" className={`text-cta inline-flex items-center justify-center rounded-pill bg-pill-bg px-5 py-3 text-ink hover:bg-hairline ${styles.back}`} onClick={onClose}>Close</button>
        <div className={styles.content}>
          <h2 id="case-detail-title" className={styles.heading}>{heading}</h2>
          <div className={styles.details}>
            {details.map((detail) => (
              <section key={detail.label} className={styles.detail}>
                <h3 className={styles.label}>{detail.label}</h3>
                <p className={styles.copy}>{detail.copy}</p>
              </section>
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}
