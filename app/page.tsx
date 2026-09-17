import type { Metadata } from 'next'
import { ExperimentalHome } from '@/components/experimental-home'

export const metadata: Metadata = {
  title: 'Comym — Selected projects',
  description:
    'Comym is the portfolio of Gabriel Comym, a product design leader shaping AI, data, and expert workflows into clearer products and technical experiences.',
}

export default function HomePage() {
  return <ExperimentalHome />
}
