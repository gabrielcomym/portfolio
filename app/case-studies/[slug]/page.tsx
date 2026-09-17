import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Container } from '@/components/layout/container'
import { Chip } from '@/components/ui/chip'
import { KedroCaseSections } from '@/components/kedro-case-sections'
import { PerformanceAICaseSections } from '@/components/performanceai-case-sections'
import { RivendellCaseSections } from '@/components/rivendell-case-sections'
import { WovenLightCaseSections } from '@/components/wovenlight-case-sections'
import { ProjectHero } from '@/components/project-hero'
import { ScrollRevealController } from '@/components/scroll-reveal'
import { AboutProjectCarousel } from '@/components/about-project-carousel'
import { CASES } from '@/lib/cases-data'
import { StructuredData } from '@/components/structured-data'
import { caseStudyJsonLd } from '@/lib/structured-data'
import {
  SITE_NAME,
  SITE_PREVIEW_IMAGE,
  SITE_PREVIEW_IMAGE_HEIGHT,
  SITE_PREVIEW_IMAGE_WIDTH,
} from '@/lib/site'

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(CASES).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const study = Object.hasOwn(CASES, slug) ? CASES[slug] : undefined
  if (!study) return {}
  const path = `/case-studies/${study.slug}/`
  const title = `${study.title} — ${study.dek}`
  return {
    title,
    description: study.workIntro,
    alternates: { canonical: path },
    openGraph: {
      title,
      description: study.workIntro,
      url: path,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'article',
      images: [{
        url: SITE_PREVIEW_IMAGE,
        width: SITE_PREVIEW_IMAGE_WIDTH,
        height: SITE_PREVIEW_IMAGE_HEIGHT,
        alt: `${study.title} — Comym portfolio preview`,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: study.workIntro,
      images: [SITE_PREVIEW_IMAGE],
    },
  }
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const study = Object.hasOwn(CASES, slug) ? CASES[slug] : undefined
  if (!study) notFound()

  const descriptionParagraphs = study.projectDescription
  const outcomeParagraphs = study.outcome

  return (
    <main>
      <StructuredData data={caseStudyJsonLd(study)} />
      <ScrollRevealController />
      <SiteHeader />

      <Container className="pt-10 md:pt-[58px]">
        <header>
          <h1 data-scroll-reveal="headline" className="text-display max-w-[1116px] text-ink md:text-[64px]">
            {study.title}
            <br />
            <span className="text-ink-muted">{study.dek}</span>
          </h1>
          <div data-scroll-reveal="copy" data-scroll-reveal-delay="1" className="case-meta-tags mt-[var(--space-case-rhythm-small)]">
            {study.metaTags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        </header>

        <div className="mt-[var(--space-case-rhythm-medium)]">
          <ProjectHero src={study.heroImage} alt={`${study.title} product interface shown on a ${study.slug === 'rivendell' ? 'rugged tablet' : 'laptop'}`} />
        </div>

        <section className="mt-[var(--space-case-rhythm-medium)] grid grid-cols-1 gap-8 md:mt-[120px] md:grid-cols-12 md:gap-6">
          <h2 data-scroll-reveal="copy" className="text-heading-lg text-ink md:col-span-3">Work</h2>
          <p data-scroll-reveal="copy" data-scroll-reveal-delay="1" className="text-heading-lg text-ink md:col-span-7">{study.workIntro}</p>
        </section>

        {study.slug === 'kedro' ? (
          <KedroCaseSections sections={study.sections} />
        ) : study.slug === 'wovenlight' ? (
          <WovenLightCaseSections sections={study.sections} />
        ) : study.slug === 'performanceai' ? (
          <PerformanceAICaseSections sections={study.sections} />
        ) : study.slug === 'rivendell' ? (
          <RivendellCaseSections sections={study.sections} />
        ) : null}

        <section className="my-[var(--space-case-summary)] grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-6">
          <div data-scroll-reveal="copy" className="flex flex-col gap-[23px] md:col-span-5">
            <h2 className="text-heading-sm text-ink">Project Description</h2>
            <div className="flex flex-col gap-6">
              {descriptionParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-body-editorial text-ink-muted">{paragraph}</p>
              ))}
            </div>
          </div>
          <div data-scroll-reveal="copy" data-scroll-reveal-delay="1" className="flex flex-col gap-[23px] md:col-span-5 md:col-start-7">
            <h2 className="text-heading-sm text-ink">Outcome</h2>
            <div className="flex flex-col gap-6">
              {outcomeParagraphs.map((paragraph) => (
                <p key={paragraph} className="text-body-editorial text-ink-muted">{paragraph}</p>
              ))}
            </div>
          </div>
        </section>

      </Container>

      <AboutProjectCarousel excludeSlug={study.slug} />

      <SiteFooter />
    </main>
  )
}
