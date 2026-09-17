import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Prefix public asset URLs when the site is deployed under a GitHub project path. */
export function withBasePath(path: string) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

  if (!basePath || !path.startsWith('/')) return path
  return `${basePath.replace(/\/$/, '')}${path}`
}
