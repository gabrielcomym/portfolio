import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import { PageTransition } from '@/components/page-transition'
import { withBasePath } from '@/lib/utils'
import './globals.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
})

export const metadata: Metadata = {
  title: 'Comym — Design leadership for complex technical products',
  description:
    'Comym is the design practice of a product design leader specializing in AI, data, and expert workflows for technical domains.',
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
