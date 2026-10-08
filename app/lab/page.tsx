import { readdirSync } from 'node:fs'
import { join } from 'node:path'
import type { Metadata, Viewport } from 'next'
import { LabGallery } from '@/components/lab-gallery'
import { SITE_NAME, SITE_PREVIEW_IMAGE, SITE_PREVIEW_IMAGE_HEIGHT, SITE_PREVIEW_IMAGE_WIDTH } from '@/lib/site'

const title = 'Lab — Comym'
const description = 'Explore a visual gallery of selected images and experiments by Gabriel Comym.'
const LAB_LAYOUT_SEED = 0x5f3759df
const VISUAL_FAMILIES: Record<string, string> = {
  'lab-3600da4ac66208f1.png': 'line-study',
  'lab-a70a117a60b059b4.jpg': 'line-study',
  'lab-60ebeb70eb2068b2.jpg': 'symmetric-study',
  'lab-70776e654ce00fbe.png': 'symmetric-study',
  'lab-798b2e3ff6ed8ea6.png': 'symmetric-study',
  'lab-b2fe0f71be102876.png': 'symmetric-study',
  'lab-f175da6f44be46b5.png': 'symmetric-study',
}

const visualFamily = (filename: string) => VISUAL_FAMILIES[filename] ?? filename

function hasNeighborConflict(images: string[], columns: number) {
  const rows = images.length / columns
  return images.some((image, index) => {
    const row = Math.floor(index / columns)
    const column = index % columns
    const right = images[row * columns + (column + 1) % columns]
    const below = images[((row + 1) % rows) * columns + column]
    return visualFamily(image) === visualFamily(right) || visualFamily(image) === visualFamily(below)
  })
}

function shuffledLabImages(filenames: string[]) {
  let state = LAB_LAYOUT_SEED
  const random = () => {
    state |= 0
    state = state + 0x6d2b79f5 | 0
    let value = Math.imul(state ^ state >>> 15, 1 | state)
    value = value + Math.imul(value ^ value >>> 7, 61 | value) ^ value
    return ((value ^ value >>> 14) >>> 0) / 4294967296
  }
  for (let attempt = 0; attempt < 500; attempt += 1) {
    const shuffled = [...filenames]
    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(random() * (index + 1))
      ;[shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]
    }
    if (!hasNeighborConflict(shuffled, 6) && !hasNeighborConflict(shuffled, 4)) return shuffled
  }
  throw new Error('Unable to create a conflict-free Lab media layout')
}

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: '/lab/' },
  openGraph: {
    title,
    description,
    url: '/lab/',
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [{ url: SITE_PREVIEW_IMAGE, width: SITE_PREVIEW_IMAGE_WIDTH, height: SITE_PREVIEW_IMAGE_HEIGHT, alt: 'Comym portfolio preview' }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [SITE_PREVIEW_IMAGE],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#151515',
  userScalable: true,
}

export default function LabPage() {
  const images = shuffledLabImages(readdirSync(join(process.cwd(), 'public/media/lab'))
    .filter((filename) => /\.(avif|gif|jpe?g|png|webp)$/i.test(filename))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true })))

  return <LabGallery images={images} />
}
