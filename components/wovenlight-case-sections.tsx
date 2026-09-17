import Image from 'next/image'
import type { ReactNode } from 'react'
import { CaseSectionIntro } from '@/components/case-section-intro'
import type { CaseSection } from '@/lib/cases-data'
import styles from './wovenlight-case-sections.module.css'

type Props = { sections: CaseSection[] }

const media = '/media/project/wovenlight'

function MediaFrame({
  src,
  alt,
  className = '',
  revealDelay,
  plain = false,
}: {
  src: string
  alt: string
  className?: string
  revealDelay?: 1
  plain?: boolean
}) {
  return (
    <figure data-scroll-reveal="media" data-scroll-reveal-delay={revealDelay} className={`${plain ? styles.plainFrame : styles.frame} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 92vw, 100vw"
        className={`${styles.media} ${plain ? styles.plainMedia : ''}`}
      />
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

export function WovenLightCaseSections({ sections }: Props) {
  const [workflow, trust, repeatability] = sections

  return (
    <div className={styles.caseMedia}>
      <Chapter chapter={workflow} className={styles.workflow}>
        <MediaFrame src={`${media}/section1_1.png`} alt="WovenLight workflow discussion" className={styles.s1Overview} plain />
        <MediaFrame src={`${media}/section1_2.png`} alt="WovenLight workflow mapping" className={styles.s1Map} />
        <div className={styles.s1Pair}>
          <MediaFrame src={`${media}/section1_3.png`} alt="WovenLight analysis workspace" className={styles.s1Small} />
          <MediaFrame src={`${media}/section1_4.png`} alt="WovenLight analysis flow detail" className={styles.s1Wide} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section1_5.png`} alt="WovenLight product workflow" className={styles.s1Centered} />
        <MediaFrame src={`${media}/section1_6.png`} alt="WovenLight workflow architecture" className={styles.s1Centered} />
      </Chapter>

      <Chapter chapter={trust} className={styles.trust}>
        <MediaFrame src={`${media}/section2_1.png`} alt="WovenLight AI research interface" className={styles.s2Overview} />
        <div className={styles.s2Pair}>
          <MediaFrame src={`${media}/section2_2.png`} alt="WovenLight review state" className={styles.s2Tall} />
          <MediaFrame src={`${media}/section2_3.png`} alt="WovenLight AI response detail" className={styles.s2Wide} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section2_4.png`} alt="WovenLight report workflow" className={styles.s2Map} />
        <div className={styles.s2Cluster}>
          <MediaFrame src={`${media}/section2_5.png`} alt="WovenLight source review panel" className={styles.s2Short} />
          <MediaFrame src={`${media}/section2_6.png`} alt="WovenLight research review" className={styles.s2Tall} revealDelay={1} />
          <MediaFrame src={`${media}/section2_7.png`} alt="WovenLight AI assistant" className={styles.s2Overlay} />
        </div>
        <MediaFrame src={`${media}/section2_8.png`} alt="WovenLight report generation workflow" className={styles.s2Final} />
      </Chapter>

      <Chapter chapter={repeatability} className={styles.repeatability}>
        <MediaFrame src={`${media}/section3_1.png`} alt="WovenLight product architecture" className={styles.s3Overview} />
        <MediaFrame src={`${media}/section3_2.png`} alt="WovenLight report-building pattern" className={styles.s3TenColumns} />
        <div className={styles.s3PairOne}>
          <MediaFrame src={`${media}/section3_3.png`} alt="WovenLight component detail" className={styles.s3Small} />
          <MediaFrame src={`${media}/section3_4.png`} alt="WovenLight reusable workflow interface" className={styles.s3Wide} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section3_5.png`} alt="WovenLight product template overview" className={styles.s3Overview} />
        <MediaFrame src={`${media}/section3_6.png`} alt="WovenLight workflow template" className={styles.s3TenColumns} />
        <div className={styles.s3PairTwo}>
          <MediaFrame src={`${media}/section3_7.png`} alt="WovenLight repeatable analysis pattern" className={styles.s3Left} />
          <MediaFrame src={`${media}/section3_8.png`} alt="WovenLight workflow component" className={styles.s3Right} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section3_9.png`} alt="WovenLight AI workflow model" className={styles.s3TenColumns} />
        <MediaFrame src={`${media}/section3_10.png`} alt="WovenLight analysis system" className={styles.s3FinalWide} />
        <div className={styles.s3Final}>
          <MediaFrame src={`${media}/section3_11.png`} alt="WovenLight product interface on mobile" className={styles.s3Vertical} />
          <MediaFrame src={`${media}/section3_12.png`} alt="WovenLight product architecture documentation" className={styles.s3LargeVertical} revealDelay={1} />
        </div>
      </Chapter>
    </div>
  )
}
