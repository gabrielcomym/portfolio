import type { Metadata, Viewport } from 'next'
import { ExperimentalHome } from '@/components/experimental-home'
import { StructuredData } from '@/components/structured-data'
import { homePageJsonLd, websiteJsonLd } from '@/lib/structured-data'
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_PREVIEW_IMAGE,
  SITE_PREVIEW_IMAGE_ALT,
  SITE_PREVIEW_IMAGE_HEIGHT,
  SITE_PREVIEW_IMAGE_WIDTH,
} from '@/lib/site'

export const metadata: Metadata = {
  title: 'Comym — Product design leadership for AI, data, and technical products',
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Comym — Product design leadership for AI, data, and technical products',
    description: SITE_DESCRIPTION,
    url: '/',
    siteName: SITE_NAME,
    locale: 'en_US',
    type: 'website',
    images: [{ url: SITE_PREVIEW_IMAGE, width: SITE_PREVIEW_IMAGE_WIDTH, height: SITE_PREVIEW_IMAGE_HEIGHT, alt: SITE_PREVIEW_IMAGE_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comym — Product design leadership for AI, data, and technical products',
    description: SITE_DESCRIPTION,
    images: [SITE_PREVIEW_IMAGE],
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#151515',
  userScalable: true,
}

export default function HomePage() {
  return (
    <>
      <StructuredData data={websiteJsonLd()} />
      <StructuredData data={homePageJsonLd()} />
      <ExperimentalHome />
    </>
  )
}
