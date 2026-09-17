import Image from 'next/image'
import type { ReactNode } from 'react'
import { CaseSectionIntro } from '@/components/case-section-intro'
import type { CaseSection } from '@/lib/cases-data'
import styles from './performanceai-case-sections.module.css'

type Props = { sections: CaseSection[] }

const media = '/media/project/performanceai'

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
    <figure
      data-scroll-reveal="media"
      data-scroll-reveal-delay={revealDelay}
      className={`${plain ? styles.plainFrame : styles.frame} ${className}`}
    >
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

export function PerformanceAICaseSections({ sections }: Props) {
  const [ambiguity, visibility, direction] = sections

  return (
    <div className={styles.caseMedia}>
      <Chapter chapter={ambiguity} className={styles.ambiguity}>
        <MediaFrame src={`${media}/section1_1.png`} alt="PerformanceAI product vision overview" className={styles.s1Overview} />
        <MediaFrame src={`${media}/section1_2.png`} alt="PerformanceAI product capability map" className={styles.s1TenColumns} />
        <div className={styles.s1Pair}>
          <MediaFrame src={`${media}/section1_3.png`} alt="PerformanceAI model monitoring exploration" className={styles.s1Left} plain />
          <MediaFrame src={`${media}/section1_4.png`} alt="PerformanceAI monitoring product concept" className={styles.s1Right} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section1_5.png`} alt="PerformanceAI capability framework" className={styles.s1Full} />
        <MediaFrame src={`${media}/section1_6.png`} alt="PerformanceAI monitoring lifecycle" className={styles.s1ElevenColumns} />
      </Chapter>

      <Chapter chapter={visibility} className={styles.visibility}>
        <MediaFrame src={`${media}/section2_1.png`} alt="PerformanceAI model monitoring dashboard" className={styles.s2Overview} />
        <MediaFrame src={`${media}/section2_2.png`} alt="PerformanceAI model performance comparison" className={styles.s2Centered} />
        <MediaFrame src={`${media}/section2_3.png`} alt="PerformanceAI run comparison interface" className={styles.s2ElevenColumns} />
        <div className={styles.s2Pair}>
          <MediaFrame src={`${media}/section2_4.png`} alt="PerformanceAI monitoring signal detail" className={styles.s2Left} />
          <MediaFrame src={`${media}/section2_5.png`} alt="PerformanceAI model alert panel" className={styles.s2Right} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section2_6.png`} alt="PerformanceAI performance signal summary" className={styles.s2Full} />
      </Chapter>

      <Chapter chapter={direction} className={styles.direction}>
        <MediaFrame src={`${media}/section3_1.png`} alt="PerformanceAI model performance overview" className={styles.s3Overview} />
        <MediaFrame src={`${media}/section3_2.png`} alt="PerformanceAI monitoring product flow" className={styles.s3TenColumns} />
        <div className={styles.s3PairOne}>
          <MediaFrame src={`${media}/section3_3.png`} alt="PerformanceAI model detail interface" className={styles.s3Left} />
          <MediaFrame src={`${media}/section3_4.png`} alt="PerformanceAI environment details panel" className={styles.s3Right} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section3_5.png`} alt="PerformanceAI model artifact view" className={styles.s3ElevenColumns} />
        <MediaFrame src={`${media}/section3_6.png`} alt="PerformanceAI monitoring dashboard concept" className={styles.s3TenColumns} />
        <div className={styles.s3PairTwo}>
          <MediaFrame src={`${media}/section3_7.png`} alt="PerformanceAI environment navigation" className={styles.s3Tall} />
          <MediaFrame src={`${media}/section3_8.png`} alt="PerformanceAI model detail view" className={styles.s3Wide} revealDelay={1} />
        </div>
        <MediaFrame src={`${media}/section3_9.png`} alt="PerformanceAI model artifact analysis" className={styles.s3Full} />
        <MediaFrame src={`${media}/section3_10.png`} alt="PerformanceAI model run detail" className={styles.s3ElevenColumns} />
        <div className={styles.s3Final}>
          <MediaFrame src={`${media}/section3_11.png`} alt="PerformanceAI mobile interface" className={styles.s3FinalTall} />
          <MediaFrame src={`${media}/section3_12.png`} alt="PerformanceAI mobile monitoring panel" className={styles.s3FinalPanel} revealDelay={1} />
        </div>
      </Chapter>
    </div>
  )
}
