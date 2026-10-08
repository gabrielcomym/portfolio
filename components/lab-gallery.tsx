'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Observer } from 'gsap/Observer'
import { GLOBAL_NAV_LINKS } from '@/components/site-header'
import { withBasePath } from '@/lib/utils'
import styles from './lab-gallery.module.css'

type GalleryEngine = { move: (x: number, y: number) => void }
type Viewport = { width: number, height: number, columns: number, cellWidth: number, cellHeight: number, worldWidth: number, worldHeight: number }

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)
const wrapCentered = (value: number, size: number) => ((value + size / 2) % size + size) % size - size / 2
const DRAG_DISTANCE_PER_PIXEL = 0.9
const WHEEL_DISTANCE_MULTIPLIER = 1.15
const INERTIA_DISTANCE_FACTOR = 0.32
const INERTIA_DISTANCE_LIMIT = 360
const INERTIA_DURATION = 1.1

/** A finite media set is projected as a transform-only, periodically wrapped field. */
export function LabGallery({ images }: { images: string[] }) {
  const stageRef = useRef<HTMLElement>(null)
  const mediaRefs = useRef<Array<HTMLDivElement | null>>([])
  const engineRef = useRef<GalleryEngine | null>(null)

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return

    gsap.registerPlugin(Observer)
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const position = { x: 0, y: 0 }
    let viewport: Viewport = { width: 0, height: 0, columns: 6, cellWidth: 0, cellHeight: 0, worldWidth: 0, worldHeight: 0 }
    let autoDrift = !reducedMotion.matches
    let dragging = false
    let didDragEnd = false
    let dragVelocityX = 0
    let dragVelocityY = 0
    let lastDragAt = 0
    let resumeCall: gsap.core.Tween | null = null
    const revealTweens: gsap.core.Tween[] = []
    const revealCleanup: Array<() => void> = []

    const render = () => {
      const { width, height, columns, cellWidth, cellHeight, worldWidth, worldHeight } = viewport
      if (!width || !height) return

      images.forEach((_, index) => {
        const media = mediaRefs.current[index]
        if (!media) return
        const row = Math.floor(index / columns)
        const column = index % columns
        const stagger = row % 2 ? cellWidth * 0.18 : 0
        const gridX = (column - (columns - 1) / 2) * cellWidth + stagger
        const gridY = (row - (Math.ceil(images.length / columns) - 1) / 2) * cellHeight
        const x = wrapCentered(gridX - position.x, worldWidth)
        const y = wrapCentered(gridY - position.y, worldHeight)
        const normalizedX = clamp(x / (width * 0.62), -1, 1)
        const normalizedY = clamp(y / (height * 0.7), -1, 1)
        const sphericalDepth = Math.cos(clamp(Math.hypot(normalizedX, normalizedY), 0, 1) * Math.PI / 2)
        const z = -420 + sphericalDepth * 560
        const scale = 0.68 + sphericalDepth * 0.32
        const rotateY = normalizedX * -24
        const rotateX = normalizedY * 14
        media.style.transform = `translate3d(${width / 2 + x}px, ${height / 2 + y}px, ${z}px) translate(-50%, -50%) rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(${scale})`
      })
    }

    const resize = () => {
      const width = stage.clientWidth
      const height = stage.clientHeight
      const columns = width < 600 ? 4 : 6
      const rows = Math.ceil(images.length / columns)
      const cardWidth = clamp(width * 0.27, 176, 440)
      const cellWidth = cardWidth + clamp(width * 0.075, 40, 160)
      const cellHeight =
        width < 600
          ? Math.max(cellWidth * 1.08, cardWidth * 1.55)
          : Math.max(cellWidth * 1.04, cardWidth * 1.35)
      viewport = { width, height, columns, cellWidth, cellHeight, worldWidth: columns * cellWidth, worldHeight: rows * cellHeight }
      render()
    }
    const revealMedia = () => {
      const { columns, cellWidth, cellHeight } = viewport
      const rows = Math.ceil(images.length / columns)
      const revealOrder = images.map((_, index) => {
        const row = Math.floor(index / columns)
        const column = index % columns
        const stagger = row % 2 ? cellWidth * 0.18 : 0
        const gridX = (column - (columns - 1) / 2) * cellWidth + stagger
        const gridY = (row - (rows - 1) / 2) * cellHeight
        return { index, distance: Math.hypot(gridX, gridY) }
      }).sort((first, second) => first.distance - second.distance)

      revealOrder.forEach(({ index }, revealIndex) => {
        const image = mediaRefs.current[index]?.querySelector('img')
        if (!image) return
        if (reducedMotion.matches) gsap.set(image, { opacity: 1, scale: 1 })
        else gsap.set(image, { opacity: 0, scale: 0.965 })
        const reveal = () => {
          if (reducedMotion.matches) {
            gsap.set(image, { opacity: 1, scale: 1 })
            return
          }
          revealTweens.push(gsap.to(image, {
            opacity: 1,
            scale: 1,
            duration: 0.58,
            delay: Math.min(revealIndex * 0.028, 1.05),
            ease: 'power3.out',
            overwrite: true,
          }))
        }
        if (image.complete) {
          const frame = requestAnimationFrame(reveal)
          revealCleanup.push(() => cancelAnimationFrame(frame))
          return
        }
        image.addEventListener('load', reveal, { once: true })
        image.addEventListener('error', reveal, { once: true })
        revealCleanup.push(() => {
          image.removeEventListener('load', reveal)
          image.removeEventListener('error', reveal)
        })
      })
    }
    const resume = () => {
      resumeCall?.kill()
      resumeCall = gsap.delayedCall(1.15, () => {
        if (!dragging && !reducedMotion.matches) autoDrift = true
      })
    }
    const interrupt = () => {
      autoDrift = false
      resumeCall?.kill()
    }
    const move = (x: number, y: number, immediate = false) => {
      interrupt()
      if (immediate) {
        gsap.killTweensOf(position)
        position.x += x
        position.y += y
        render()
        return
      }
      gsap.to(position, {
        x: position.x + x,
        y: position.y + y,
        duration: 0.72,
        ease: 'power2.out',
        overwrite: true,
        onUpdate: render,
        onComplete: resume,
      })
    }
    const coast = (velocityX: number, velocityY: number) => {
      if (reducedMotion.matches) {
        resume()
        return
      }
      const distanceX = clamp(velocityX * INERTIA_DISTANCE_FACTOR, -INERTIA_DISTANCE_LIMIT, INERTIA_DISTANCE_LIMIT)
      const distanceY = clamp(velocityY * INERTIA_DISTANCE_FACTOR, -INERTIA_DISTANCE_LIMIT, INERTIA_DISTANCE_LIMIT)
      if (Math.abs(distanceX) < 1 && Math.abs(distanceY) < 1) {
        resume()
        return
      }
      gsap.to(position, {
        x: position.x + distanceX,
        y: position.y + distanceY,
        duration: INERTIA_DURATION,
        ease: 'power2.out',
        onUpdate: render,
        onComplete: resume,
      })
    }
    engineRef.current = { move }

    const pointerObserver = Observer.create({
      target: stage,
      type: 'pointer,touch',
      dragMinimum: 3,
      onPress: () => {
        dragging = true
        didDragEnd = false
        dragVelocityX = 0
        dragVelocityY = 0
        lastDragAt = performance.now()
        stage.dataset.dragging = 'true'
        interrupt()
        gsap.killTweensOf(position)
      },
      onDrag: (observer) => {
        const now = performance.now()
        const elapsed = Math.max(now - lastDragAt, 1)
        // Preserve enough of the preceding motion to avoid a tiny final pointer
        // sample cancelling the velocity the visitor built during the drag.
        const smoothing = 0.38
        dragVelocityX = dragVelocityX * (1 - smoothing) + (observer.deltaX / elapsed * 1000) * smoothing
        dragVelocityY = dragVelocityY * (1 - smoothing) + (observer.deltaY / elapsed * 1000) * smoothing
        lastDragAt = now
        // The wrapped coordinates subtract field offset, so invert pointer deltas to keep cards under the drag.
        move(-observer.deltaX * DRAG_DISTANCE_PER_PIXEL, -observer.deltaY * DRAG_DISTANCE_PER_PIXEL, true)
      },
      onDragEnd: () => {
        didDragEnd = true
        dragging = false
        stage.dataset.dragging = 'false'
        const recentVelocity = performance.now() - lastDragAt < 180
        coast(recentVelocity ? -dragVelocityX : 0, recentVelocity ? -dragVelocityY : 0)
      },
      onRelease: () => {
        if (didDragEnd) return
        dragging = false
        stage.dataset.dragging = 'false'
        resume()
      },
    })
    const wheelObserver = Observer.create({
      target: stage,
      type: 'wheel',
      preventDefault: true,
      onChange: (observer) => move(observer.deltaX * WHEEL_DISTANCE_MULTIPLIER, observer.deltaY * WHEEL_DISTANCE_MULTIPLIER),
    })
    const ticker = (_time: number, deltaTime: number) => {
      if (!autoDrift || reducedMotion.matches) return
      position.x += Math.min(deltaTime, 80) * 0.008
      position.y += Math.min(deltaTime, 80) * 0.003
      render()
    }
    const onMotionChange = () => {
      autoDrift = !reducedMotion.matches
      if (reducedMotion.matches) {
        revealTweens.forEach((tween) => tween.kill())
        mediaRefs.current.forEach((media) => {
          const image = media?.querySelector('img')
          if (image) gsap.set(image, { opacity: 1, scale: 1 })
        })
      }
      if (autoDrift) resume()
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(stage)
    reducedMotion.addEventListener('change', onMotionChange)
    resize()
    revealMedia()
    gsap.ticker.add(ticker)

    return () => {
      engineRef.current = null
      resumeCall?.kill()
      gsap.killTweensOf(position)
      revealTweens.forEach((tween) => tween.kill())
      revealCleanup.forEach((cleanup) => cleanup())
      pointerObserver.kill()
      wheelObserver.kill()
      resizeObserver.disconnect()
      reducedMotion.removeEventListener('change', onMotionChange)
      gsap.ticker.remove(ticker)
    }
  }, [images])

  const onGalleryKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const step = event.shiftKey ? 280 : 110
    const direction: Record<string, [number, number]> = {
      ArrowUp: [0, -step], ArrowDown: [0, step], ArrowLeft: [-step, 0], ArrowRight: [step, 0],
    }
    if (direction[event.key]) {
      event.preventDefault()
      engineRef.current?.move(...direction[event.key])
    }
  }

  return (
    <main ref={stageRef} className={styles.stage} data-dragging="false" onKeyDown={onGalleryKeyDown} tabIndex={0} aria-label="Lab image gallery. Drag, scroll, or use the arrow keys to explore.">
      <div className={styles.field} aria-hidden="true">
        {images.map((filename, index) => (
          <div key={filename} ref={(element) => { mediaRefs.current[index] = element }} className={styles.media}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={withBasePath(`/media/lab/${encodeURIComponent(filename)}`)} alt="" loading="lazy" draggable={false} />
          </div>
        ))}
      </div>

      <header className={styles.header}>
        <Link href="/" className={styles.edgeLink}>Comym</Link>
        <nav aria-label="Primary" className={styles.primaryNav}>
          {GLOBAL_NAV_LINKS.map((link) => <Link key={link.label} href={link.href} className={styles.edgeLink} aria-current={link.href === '/lab' ? 'page' : undefined}>{link.label}</Link>)}
        </nav>
      </header>
      <div className={styles.bottom}>
        <h1>Lab</h1>
        <p className={styles.hint}>Drag to explore <span aria-hidden="true">·</span> Scroll to move</p>
        <Link href="mailto:gabrielcomym@gmail.com" className={styles.edgeLink}>Contact</Link>
      </div>
    </main>
  )
}
