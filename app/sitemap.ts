import type { MetadataRoute } from 'next'
import { CASE_ORDER } from '@/lib/cases-data'
import { canonicalUrl } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: canonicalUrl('/') },
    { url: canonicalUrl('/about/') },
    ...CASE_ORDER.map((slug) => ({ url: canonicalUrl(`/case-studies/${slug}/`) })),
  ]
}
