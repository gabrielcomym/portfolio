import type { Metadata } from 'next'
import { ExperimentalHome } from '@/components/experimental-home'

export const metadata: Metadata = {
  title: 'Comym — Selected projects',
  description: 'Selected Comym projects in a focused visual index.',
}

export default function HomePage() {
  return <ExperimentalHome />
}
