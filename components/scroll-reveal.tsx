'use client'

import { useEffect } from 'react'

const REVEAL_SELECTOR = '[data-scroll-reveal]'

export function ScrollRevealController() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return

    const targets = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR))
    if (!targets.length) return

    const root = document.documentElement
    root.dataset.scrollRevealReady = 'true'

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          entry.target.setAttribute('data-scroll-revealed', 'true')
          observer.unobserve(entry.target)
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    targets.forEach((target) => observer.observe(target))

    return () => {
      observer.disconnect()
      root.removeAttribute('data-scroll-reveal-ready')
    }
  }, [])

  return null
}
