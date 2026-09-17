import Image from 'next/image'
import type { ReactNode } from 'react'
import { CaseSectionIntro } from '@/components/case-section-intro'
import type { CaseSection } from '@/lib/cases-data'
import styles from './kedro-case-sections.module.css'

type Props = { sections: CaseSection[] }

const media = '/media/project/kedro'

function MediaFrame({
  src,
  alt,
  className = '',
  revealDelay,
}: {
  src: string
  alt: string
  className?: string
  revealDelay?: 1
}) {
  return (
    <figure
      data-scroll-reveal="media"
      data-scroll-reveal-delay={revealDelay}
      className={`${styles.frame} ${className}`}
    >
      <Image src={src} alt={alt} fill sizes="(min-width: 768px) 92vw, 100vw" className={styles.media} />
    </figure>
  )
}

function Chapter({ chapter, children, className = '' }: { chapter: CaseSection; children: ReactNode; className?: string }) {
  return (
    <section className={`${styles.chapter} ${className}`}>
      <CaseSectionIntro section={chapter} />
      {children}
    </section>
  )
}

export function KedroCaseSections({ sections }: Props) {
  const [visibility, integration, ecosystem] = sections

  return (
    <div className={styles.caseMedia}>
      <Chapter chapter={visibility} className={styles.visibility}>
        <MediaFrame src={`${media}/section1_1.png`} alt="Kedro-Viz modular pipeline overview" className={styles.s1Overview} />
        <div className={styles.s1PairOne}>
          <MediaFrame src={`${media}/section1_2.png`} alt="Kedro-Viz pipeline graph" className={styles.s1Pipeline} />
          <MediaFrame src={`${media}/section1_3.png`} alt="Kedro-Viz workflow shown on a laptop" className={styles.s1Laptop} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section1_4.png`} alt="Kedro-Viz workflow detail" className={styles.s1Flow} />
        <div className={styles.twoUp}>
          <MediaFrame src={`${media}/section1_5.png`} alt="Kedro filter panel" className={styles.half} />
          <MediaFrame src={`${media}/section1_6.png`} alt="Kedro product view" className={styles.half} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section1_7.png`} alt="Kedro-Viz connected workflow system" className={styles.elevenColumns} />
      </Chapter>

      <Chapter chapter={integration} className={styles.integration}>
        <MediaFrame src={`${media}/section2_1.png`} alt="Kedro experiment tracking overview" className={styles.s2Overview} />
        <div className={styles.s2Pair}>
          <MediaFrame src={`${media}/section2_2.png`} alt="Kedro experiment history" className={styles.s2History} />
          <MediaFrame src={`${media}/section2_3.png`} alt="Kedro experiment metrics" className={styles.s2Metrics} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section2_4.png`} alt="Kedro model performance dashboard" className={styles.full} />
        <MediaFrame src={`${media}/section2_5.png`} alt="Kedro analytics detail" className={styles.tenColumns} />
        <MediaFrame src={`${media}/section2_6.png`} alt="Kedro experiment analytics" className={styles.full} />
        <MediaFrame src={`${media}/section2_7.png`} alt="Kedro pipeline implementation detail" className={styles.eightColumns} />
      </Chapter>

      <Chapter chapter={ecosystem} className={styles.ecosystem}>
        <MediaFrame src={`${media}/section3_1.png`} alt="Kedro product ecosystem overview" className={styles.full} />
        <MediaFrame src={`${media}/section3_2.png`} alt="Kedro project history" className={styles.tenColumns} />
        <MediaFrame src={`${media}/section3_3.png`} alt="Kedro workflow interface detail" className={styles.full} />
        <MediaFrame src={`${media}/section3_4.png`} alt="Kedro interface component library" className={styles.elevenColumns} />
        <div className={styles.s3Final}>
          <MediaFrame src={`${media}/section3_5.png`} alt="Kedro design system documentation" className={styles.s3Vertical} />
          <MediaFrame src={`${media}/section3_5-1.png`} alt="Kedro component library view" className={styles.s3Panel} revealDelay={1} />
          <MediaFrame src={`${media}/section3_7.png`} alt="Kedro value progression diagram" className={styles.s3Diagram} revealDelay={1} />
        </div>
      </Chapter>
    </div>
  )
}
