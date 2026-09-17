import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import { PageTransition } from '@/components/page-transition'
import { withBasePath } from '@/lib/utils'
import {
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_PREVIEW_IMAGE,
  SITE_PREVIEW_IMAGE_ALT,
  SITE_PREVIEW_IMAGE_HEIGHT,
  SITE_PREVIEW_IMAGE_WIDTH,
  SITE_URL,
} from '@/lib/site'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Comym — Product design leadership for AI, data, and technical products',
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: PERSON_NAME, url: '/about/' }],
  creator: PERSON_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
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
  icons: {
    icon: [
      { url: withBasePath('/favicon.svg'), type: 'image/svg+xml' },
      { url: withBasePath('/favicon.png'), type: 'image/png' },
    ],
    shortcut: withBasePath('/favicon.png'),
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light ${dmSans.variable} bg-paper`}>
      <body className="antialiased font-sans text-ink">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}
