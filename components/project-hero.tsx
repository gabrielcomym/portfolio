import Image from 'next/image'
import { withBasePath } from '@/lib/utils'
import styles from './project-hero.module.css'

export function ProjectHero({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.hero}>
      <Image
        src={withBasePath(src)}
        alt={alt}
        fill
        preload
        loading="eager"
        fetchPriority="high"
        sizes="(min-width: 768px) 92vw, 100vw"
        className={styles.media}
      />
    </div>
  )
}
