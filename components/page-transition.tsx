'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import styles from './page-transition.module.css'

type TransitionState = 'idle' | 'covering' | 'revealing'

function isTransitionableLink(anchor: HTMLAnchorElement, event: MouseEvent<HTMLDivElement>) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false
  if (anchor.target && anchor.target !== '_self') return false
  if (anchor.hasAttribute('download')) return false

  const url = new URL(anchor.href, window.location.href)
  if (url.origin !== window.location.origin || url.pathname === window.location.pathname && url.search === window.location.search) return false
  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [state, setState] = useState<TransitionState>('idle')
  const targetRef = useRef<string | null>(null)
  const stateRef = useRef<TransitionState>('idle')

  function setTransitionState(nextState: TransitionState) {
    stateRef.current = nextState
    setState(nextState)
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    if (document.documentElement.dataset.carouselDrag === 'true') {
      event.preventDefault()
      document.documentElement.removeAttribute('data-carousel-drag')
      return
    }

    if (stateRef.current !== 'idle') {
      event.preventDefault()
      return
    }

    const target = event.target
    const anchor = target instanceof Element ? target.closest('a') : null
    if (!(anchor instanceof HTMLAnchorElement) || !isTransitionableLink(anchor, event)) return

    event.preventDefault()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      router.push(anchor.href)
      return
    }

    targetRef.current = anchor.href
    window.dispatchEvent(new CustomEvent('comym:page-transition-start'))
    setTransitionState('covering')
  }

  useEffect(() => {
    if (state !== 'covering' || !targetRef.current) return

    const target = targetRef.current
    const timeout = window.setTimeout(() => router.push(target), 820)
    return () => window.clearTimeout(timeout)
  }, [router, state])

  useEffect(() => {
    if (stateRef.current !== 'covering' || !targetRef.current) return
    const frame = window.requestAnimationFrame(() => setTransitionState('revealing'))
    return () => window.cancelAnimationFrame(frame)
  }, [pathname])

  function handleTransitionEnd(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.propertyName !== 'transform' || stateRef.current !== 'revealing') return
    targetRef.current = null
    setTransitionState('idle')
  }

  return (
    <div onClickCapture={handleClickCapture}>
      {children}
      <div
        aria-hidden="true"
        className={styles.transitionLayer}
        data-state={state}
        onTransitionEnd={handleTransitionEnd}
      />
    </div>
  )
}
