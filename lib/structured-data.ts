import type { CaseStudy } from '@/lib/cases-data'
import {
  PERSON_DESCRIPTION,
  PERSON_EXPERTISE,
  PERSON_ID,
  PERSON_NAME,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  WEBSITE_ID,
  canonicalUrl,
} from '@/lib/site'

const personReference = { '@id': PERSON_ID }
const websiteReference = { '@id': WEBSITE_ID }

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        inLanguage: 'en',
        creator: personReference,
      },
      {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: PERSON_NAME,
        url: canonicalUrl('/about/'),
        jobTitle: 'Product Design Leader',
        description: PERSON_DESCRIPTION,
        knowsAbout: PERSON_EXPERTISE,
      sameAs: [
        'https://gabrielcomym.medium.com/',
        'https://www.linkedin.com/in/gabrielcomym/',
      ],
      },
    ],
  }
}

export function homePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    url: SITE_URL,
    name: 'Comym — Product design leadership for AI, data, and complex technical products',
    description: SITE_DESCRIPTION,
    isPartOf: websiteReference,
    about: personReference,
    inLanguage: 'en',
  }
}

export function profilePageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${canonicalUrl('/about/')}#webpage`,
    url: canonicalUrl('/about/'),
    name: 'About Gabriel Comym',
    description: PERSON_DESCRIPTION,
    isPartOf: websiteReference,
    mainEntity: personReference,
    inLanguage: 'en',
  }
}

export function caseStudyJsonLd(study: CaseStudy) {
  const path = `/case-studies/${study.slug}/`
  const url = canonicalUrl(path)
  const webPageId = `${url}#webpage`
  const creativeWorkId = `${url}#creativework`
  const breadcrumbId = `${url}#breadcrumb`

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': webPageId,
        url,
        name: `${study.title} — ${study.dek}`,
        description: study.workIntro,
        inLanguage: 'en',
        isPartOf: websiteReference,
        mainEntity: { '@id': creativeWorkId },
        breadcrumb: { '@id': breadcrumbId },
      },
      {
        '@type': 'CreativeWork',
        '@id': creativeWorkId,
        url,
        name: study.title,
        headline: study.dek,
        description: study.workIntro,
        image: canonicalUrl(study.heroImage),
        inLanguage: 'en',
        isPartOf: websiteReference,
        mainEntityOfPage: { '@id': webPageId },
        creator: personReference,
        keywords: study.metaTags.join(', '),
        about: study.metaTags.map((name) => ({ '@type': 'Thing', name })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': breadcrumbId,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Work', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: study.title, item: url },
        ],
      },
    ],
  }
}
