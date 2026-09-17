export const SITE_NAME = 'Comym'
export const SITE_URL = 'https://comym.co'
export const PERSON_NAME = 'Gabriel Comym'
export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const SITE_DESCRIPTION = 'Product design leadership for AI, data, and complex technical products.'
export const SITE_PREVIEW_IMAGE = '/site_preview.png'
export const SITE_PREVIEW_IMAGE_WIDTH = 2400
export const SITE_PREVIEW_IMAGE_HEIGHT = 1260
export const SITE_PREVIEW_IMAGE_ALT = 'Comym portfolio — product design leadership for AI, data, and complex technical products.'

export const PERSON_DESCRIPTION =
  'Product design leader with 20+ years of experience across product design, design direction, and digital transformation.'

export const PERSON_EXPERTISE = [
  'Product design',
  'Design direction',
  'AI workflows',
  'Machine learning workflows',
  'Data products',
  'Technical UX',
  'Enterprise UX',
  'Systems thinking',
  'Product strategy',
  'Creative technology',
]

export function canonicalUrl(path = '/') {
  return new URL(path, SITE_URL).toString()
}
