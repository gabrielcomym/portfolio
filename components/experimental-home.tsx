'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { CSSProperties } from 'react'
import { useEffect, useRef } from 'react'
import { CASES, CASE_ORDER } from '@/lib/cases-data'
import { GLOBAL_NAV_LINKS } from '@/components/site-header'
import styles from './experimental-home.module.css'

const PROJECTS = CASE_ORDER.map((slug) => {
  const project = CASES[slug]

  return {
    title: project.title,
    description: project.dek,
    image: project.cardImage ?? project.heroImage ?? '',
    href: `/case-studies/${project.slug}`,
  }
})

export function ExperimentalHome() {
  const stageRef = useRef<HTMLElement>(null)
  const railRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const rail = railRef.current
    if (!stage || !rail) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let current = rail.scrollTop
    let target = current
    let frame = 0
    let lastFrame = performance.now()
    let animating = false

    const clampScroll = (value: number) => Math.min(
      Math.max(value, 0),
      Math.max(0, rail.scrollHeight - rail.clientHeight),
    )

    const animate = (now: number) => {
      const delta = Math.min(now - lastFrame, 32)
      const ease = 1 - Math.exp(-delta / 85)
      current += (target - current) * ease
      rail.scrollTop = current
      lastFrame = now

      if (Math.abs(target - current) < 0.5) {
        rail.scrollTop = target
        current = target
        frame = 0
        animating = false
        return
      }

      frame = window.requestAnimationFrame(animate)
    }

    const handleScroll = () => {
      if (animating) return
      current = rail.scrollTop
      target = current
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return
      event.preventDefault()

      if (!animating) {
        current = rail.scrollTop
        target = current
      }

      const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? rail.clientHeight
          : 1
      target = clampScroll(target + event.deltaY * multiplier)

      if (reducedMotion.matches) {
        current = target
        rail.scrollTop = target
        return
      }

      if (frame) return
      animating = true
      lastFrame = performance.now()
      frame = window.requestAnimationFrame(animate)
    }

    rail.addEventListener('scroll', handleScroll, { passive: true })
    stage.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.cancelAnimationFrame(frame)
      rail.removeEventListener('scroll', handleScroll)
      stage.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return (
    <main
      ref={stageRef}
      className={styles.stage}
    >
      <h1 className="sr-only">Selected projects</h1>
      <header className={`${styles.edge} ${styles.topEdge}`}>
        <Link href="/" className={styles.edgeLink}>Comym</Link>
        <nav aria-label="Primary" className={styles.primaryNav}>
          {GLOBAL_NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              className={styles.edgeLink}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      <nav ref={railRef} tabIndex={0} className={styles.railViewport} aria-label="Selected case studies. Scroll vertically to browse.">
        <div className={styles.rail}>
          {PROJECTS.map((project, index) => (
            <Link
              key={project.title}
              href={project.href}
              className={styles.projectCard}
              style={{ '--project-index': index } as CSSProperties}
              aria-label={`View ${project.title}: ${project.description}`}
            >
              <span className={styles.projectMedia}>
                <Image
                  src={project.image}
                  alt=""
                  fill
                  priority={index < 2}
                  sizes="(max-width: 767px) 78vw, (max-width: 1439px) 46vw, 592px"
                />
              </span>
              <span className={styles.projectDetails} aria-hidden="true">
                <span className={styles.projectTitle}>{project.title}</span>
                <span className={styles.projectDescription}>{project.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </nav>

      <footer className={`${styles.edge} ${styles.bottomEdge}`}>
        <span>2026</span>
        <Link href="mailto:gabrielcomym@gmail.com" className={styles.edgeLink}>Contact</Link>
      </footer>
    </main>
  )
}
