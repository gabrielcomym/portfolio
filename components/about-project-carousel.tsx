'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { CASES, CASE_ORDER } from '@/lib/cases-data'
import { withBasePath } from '@/lib/utils'
import styles from './about-project-carousel.module.css'

export function AboutProjectCarousel({
  excludeSlug,
  spacious = false,
}: {
  excludeSlug?: string
  spacious?: boolean
}) {
  const railRef = useRef<HTMLDivElement>(null)
  const projects = CASE_ORDER
    .filter((slug) => slug !== excludeSlug)
    .map((slug) => {
      const project = CASES[slug]

      return {
        title: project.title,
        description: project.dek,
        href: `/case-studies/${project.slug}`,
        image: project.cardImage ?? project.heroImage ?? '',
      }
    })

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let current = rail.scrollLeft
    let target = current
    let motionFrame = 0
    let lastFrame = performance.now()
    let wheelAnimating = false
    let inertiaAnimating = false
    let pointerId: number | null = null
    let pointerStartX = 0
    let pointerDistance = 0
    let lastPointerX = 0
    let lastPointerTime = 0
    let velocity = 0
    let isDragging = false
    let suppressClickUntil = 0

    const maxScroll = () => Math.max(0, rail.scrollWidth - rail.clientWidth)
    const clamp = (value: number) => Math.min(Math.max(value, 0), maxScroll())
    const stopMotion = () => {
      window.cancelAnimationFrame(motionFrame)
      motionFrame = 0
      wheelAnimating = false
      inertiaAnimating = false
    }
    const stopInertia = () => {
      if (!inertiaAnimating) return

      window.cancelAnimationFrame(motionFrame)
      motionFrame = 0
      inertiaAnimating = false
      current = rail.scrollLeft
      target = current
    }

    const animateWheel = (now: number) => {
      const delta = Math.min(now - lastFrame, 32)
      const ease = 1 - Math.exp(-delta / 85)
      current += (target - current) * ease
      rail.scrollLeft = current
      lastFrame = now

      if (Math.abs(target - current) < 0.5) {
        rail.scrollLeft = target
        current = target
        motionFrame = 0
        wheelAnimating = false
        return
      }

      motionFrame = window.requestAnimationFrame(animateWheel)
    }

    const animateInertia = (now: number) => {
      const delta = Math.min(now - lastFrame, 32)
      const start = rail.scrollLeft
      const next = clamp(start + velocity * delta)

      rail.scrollLeft = next
      current = next
      target = next
      lastFrame = now
      velocity *= Math.pow(0.9, delta / 16.67)

      if (next === start || Math.abs(velocity) < 0.015) {
        motionFrame = 0
        inertiaAnimating = false
        return
      }

      motionFrame = window.requestAnimationFrame(animateInertia)
    }

    const handleScroll = () => {
      if (wheelAnimating || inertiaAnimating || pointerId !== null) return
      current = rail.scrollLeft
      target = current
    }

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.shiftKey || !event.deltaY) return

      event.preventDefault()
      stopInertia()
      const multiplier = event.deltaMode === WheelEvent.DOM_DELTA_LINE
        ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE
          ? rail.clientWidth
          : 1
      const sensitivity = event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? 1 : 1.35

      if (!wheelAnimating) {
        current = rail.scrollLeft
        target = current
        wheelAnimating = true
      }

      target = clamp(target + event.deltaY * multiplier * sensitivity)
      if (reducedMotion.matches) {
        rail.scrollLeft = target
        current = target
        wheelAnimating = false
        return
      }

      if (!motionFrame) {
        lastFrame = performance.now()
        motionFrame = window.requestAnimationFrame(animateWheel)
      }
    }

    const handlePointerDown = (event: PointerEvent) => {
      if ((event.pointerType !== 'mouse' && event.pointerType !== 'pen') || event.button !== 0) return

      stopMotion()
      current = rail.scrollLeft
      target = current
      pointerId = event.pointerId
      pointerStartX = event.clientX
      pointerDistance = 0
      lastPointerX = event.clientX
      lastPointerTime = event.timeStamp || performance.now()
      velocity = 0
      isDragging = false
    }

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerId !== pointerId) return

      pointerDistance = Math.max(pointerDistance, Math.abs(event.clientX - pointerStartX))
      if (pointerDistance <= 5) return

      isDragging = true
      rail.dataset.dragging = 'true'
      if (!rail.hasPointerCapture(event.pointerId)) rail.setPointerCapture(event.pointerId)
      event.preventDefault()

      const timestamp = event.timeStamp || performance.now()
      const elapsed = Math.max(1, timestamp - lastPointerTime)
      const movement = lastPointerX - event.clientX
      const nextScroll = clamp(rail.scrollLeft + movement)

      rail.scrollLeft = nextScroll
      current = nextScroll
      target = nextScroll
      velocity = velocity * 0.72 + (movement / elapsed) * 0.28
      lastPointerX = event.clientX
      lastPointerTime = timestamp
    }

    const completePointer = (event: PointerEvent, allowInertia: boolean) => {
      if (event.pointerId !== pointerId) return

      if (isDragging) {
        suppressClickUntil = performance.now() + 320
        document.documentElement.dataset.carouselDrag = 'true'
        window.setTimeout(() => document.documentElement.removeAttribute('data-carousel-drag'), 320)

        if (allowInertia && !reducedMotion.matches && Math.abs(velocity) >= 0.015) {
          inertiaAnimating = true
          lastFrame = performance.now()
          motionFrame = window.requestAnimationFrame(animateInertia)
        }
      }

      pointerId = null
      delete rail.dataset.dragging
      if (rail.hasPointerCapture(event.pointerId)) rail.releasePointerCapture(event.pointerId)
    }

    const handlePointerUp = (event: PointerEvent) => completePointer(event, true)
    const handlePointerCancel = (event: PointerEvent) => completePointer(event, false)

    const handleClickCapture = (event: MouseEvent) => {
      if (performance.now() >= suppressClickUntil) return

      event.preventDefault()
      event.stopPropagation()
    }

    const handleDragStart = (event: DragEvent) => event.preventDefault()

    rail.addEventListener('scroll', handleScroll, { passive: true })
    rail.addEventListener('wheel', handleWheel, { passive: false })
    rail.addEventListener('pointerdown', handlePointerDown)
    rail.addEventListener('pointermove', handlePointerMove)
    rail.addEventListener('pointerup', handlePointerUp)
    rail.addEventListener('pointercancel', handlePointerCancel)
    rail.addEventListener('click', handleClickCapture, true)
    rail.addEventListener('dragstart', handleDragStart)

    return () => {
      stopMotion()
      rail.removeEventListener('scroll', handleScroll)
      rail.removeEventListener('wheel', handleWheel)
      rail.removeEventListener('pointerdown', handlePointerDown)
      rail.removeEventListener('pointermove', handlePointerMove)
      rail.removeEventListener('pointerup', handlePointerUp)
      rail.removeEventListener('pointercancel', handlePointerCancel)
      rail.removeEventListener('click', handleClickCapture, true)
      rail.removeEventListener('dragstart', handleDragStart)
    }
  }, [])

  return (
    <section className={`${styles.section} ${spacious ? styles.sectionSpacious : ''}`} aria-labelledby="explore-projects-heading">
      <div className={styles.heading}>
        <h2 id="explore-projects-heading" data-scroll-reveal="copy" className="text-heading-lg text-ink">
          Explore projects
        </h2>
      </div>
      <div ref={railRef} data-scroll-reveal="media" className={styles.viewport} aria-label="Explore case studies horizontally">
        <div className={styles.rail}>
          {projects.map((project) => (
            <Link key={project.title} href={project.href} className={styles.card} aria-label={`View ${project.title}: ${project.description}`}>
              <span className={styles.media}>
                <Image src={withBasePath(project.image)} alt="" fill sizes="(max-width: 767px) 78vw, (max-width: 1439px) 34vw, 490px" className={styles.image} />
              </span>
              <span className={styles.details}>
                <span className={styles.title}>{project.title}</span>
                <span className={styles.description}>{project.description}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
