import Image from 'next/image'
import { CaseSectionIntro } from '@/components/case-section-intro'
import type { CaseSection } from '@/lib/cases-data'
import { withBasePath } from '@/lib/utils'
import styles from './rivendell-case-sections.module.css'

// Each entry maps an export to its Figma column start/span and native dimensions.
type MediaPlacement = [image: number, column: number, span: number, width: number, height: number]
const chapters: MediaPlacement[][][] = [[[[1,1,12,2688,1628]],[[2,1,6,1320,1034],[3,8,4,864,1182]],[[4,2,9,2004,1310]],[[5,1,12,2688,1608]],[[6,2,7,1642,946]],[[7,1,11,2460,1490]],[[8,1,7,1642,810]],[[9,5,7,1642,810]]],[[[1,1,12,2688,1628]],[[2,1,7,1548,1048]],[[3,4,8,1776,1236]],[[4,1,5,1092,914],[5,7,4,864,1240]],[[6,1,11,2460,1468]],[[7,2,4,864,856],[8,7,3,636,776]],[[9,1,12,2688,1608]],[[10,1,4,864,1398],[11,6,6,1414,938],[12,6,4,864,788]]],[[[1,1,12,2688,1608]],[[2,2,3,636,1092],[3,6,6,1320,508]],[[4,1,12,2688,1608]],[[5,1,6,1320,676],[6,8,4,864,1120]],[[7,3,7,1642,734]]]]

export function RivendellCaseSections({ sections }: { sections: CaseSection[] }) {
  return (
    <div>
      {sections.map((section, chapterIndex) => (
        <section key={section.heading} className={styles.chapter}>
          <CaseSectionIntro section={section} />
          <div className={styles.media}>
            {chapters[chapterIndex].map((group, groupIndex) => (
              <div key={groupIndex} className={group.length === 3 ? styles.cluster : styles.row}>
                {group.map(([number, column, span, width, height], index) => (
                  <figure
                    key={number}
                    data-scroll-reveal="media"
                    data-scroll-reveal-delay={index > 0 ? '1' : undefined}
                    className={styles.frame}
                    style={{ gridColumn: `${column} / span ${span}` }}
                  >
                    <Image
                      src={withBasePath(`/media/project/rivendell/section${chapterIndex + 1}_${number}.png`)}
                      alt={`Rivendell — ${section.heading} Product view ${number}.`}
                      width={width}
                      height={height}
                      sizes={`(max-width: 767px) 100vw, ${Math.ceil(span / 12 * 100)}vw`}
                      className={styles.image}
                    />
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
