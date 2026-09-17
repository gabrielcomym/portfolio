import type { Metadata } from 'next'
import Image from 'next/image'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { Container } from '@/components/layout/container'
import { ScrollRevealController } from '@/components/scroll-reveal'
import { AboutProjectCarousel } from '@/components/about-project-carousel'
import { withBasePath } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About — Comym',
  description:
    'Product design leader with 20+ years of experience across product design, design direction, and digital transformation.',
}

const BIO_PARAGRAPHS = [
  'I\u2019m a product design leader with 20+ years of experience across product design, design direction, and digital transformation.',
  'My work sits between strategy, UX, systems thinking, and hands-on design. I help teams turn technical possibilities, early ideas, and business goals into clearer products, workflows, and digital experiences.',
  'Most recently, I worked as Design Director at Work & Co. and Principal Designer at McKinsey & Company / QuantumBlack, where I led product design for Kedro, an open-source Python framework for reproducible data science now part of the Linux Foundation AI & Data ecosystem.',
  'Earlier in my career, I worked with teams at TBWA\\Media Arts Lab, Wieden+Kennedy, Google Creative Lab, R/GA, Publicis Sapient, Songkick, and others across product, advertising, and creative technology.',
]

const HELP_TEAMS_DO = [
  'Shape product direction from ambiguity.',
  'Design AI, data, and expert workflows.',
  'Make technical systems easier to understand and use.',
  'Connect product strategy, UX architecture, and execution.',
  'Raise design quality across teams, rituals, and shipped work.',
]

const SELECTED_EXPERIENCE = {
  current: [
    'Design Director, Work & Co.',
    'Principal Designer, WovenLight',
    'Principal Designer, McKinsey / QuantumBlack',
    'Lead Designer, TBWA\\Media Arts Lab',
    'Art Director, Google - The Zoo & Creative Lab',
    'Lead Designer, Publicis Sapient',
    'Lead Designer, WML',
    'Lead Product Designer, Songkick',
    'Lead Product Designer, Buzzbike',
    'Senior Designer, R/GA',
    'Senior Designer, Wieden + Kennedy',
    'Senior Designer, Havas',
    'Creative, Digitas',
    'Interactive Art Director, Ogilvy One',
    'Co-founder / Creative Director, Zign',
  ],
}

const RECOGNITION = ['AI Awards', 'Fast Company Innovation by Design', 'D&AD', 'Cannes Lions', 'The FWA', 'Awwwards', 'The Webby Awards', 'Lovie Awards', 'Behance']

const ORGANIZATIONS_A = ['NASA', 'Apple', 'Google', 'Microsoft', 'Samsung', 'Mercedes-Benz', 'Aston Martin', 'Opel', 'Volvo', 'Toyota', 'Red Bull']
const ORGANIZATIONS_B = ['Unilever', 'GE', 'Santander', 'NatWest', 'HSBC', 'Barclays', 'Allianz', 'Emirates', 'McDonald\u2019s', 'KFC', 'BBC']

const EDUCATION = [
  { program: 'MA Computational Arts - Goldsmiths University of London', place: 'London, London, UK' },
  { program: 'Interactive Art Direction - Hyper Island', place: 'Stockholm, Sweden' },
  { program: 'BA Industrial Design - UNESA', place: 'Rio, Brazil' },
]

const CERTIFICATIONS = [
  'Machine Learning Specialization - DeepLearning.AI',
  'IDEO U Human-Centered Strategy',
  'LangChain for LLM Application Development',
  'Multi AI Agent Systems with crewAI',
  'Python for Beginners',
]

const TESTIMONIALS_A = [
  {
    quote:
      'Gabriel has an incredible eye for detail and in the short period of time I worked with him at Google he brought that attention and precision in his style to a number of pitches and projects I was involved in.',
    name: 'Joe Fry',
    role: 'Partner Innovation @ Google',
  },
  {
    quote: 'Gabriel\u2019s work as a Lead Designer on Kedro has been nothing short of amazing!',
    name: 'Ivan Danov',
    role: 'Group Engineering Lead @ PhysicsX. ex-Palantir',
  },
  {
    quote:
      'As an engineer I\u2019ve learnt a lot from Gabriel about design as well as how to think out of the box and build successful products.',
    name: 'Merel Theisen',
    role: 'Principal Software Engineer @ QuantumBlack, AI by McKinsey',
  },
]

const TESTIMONIALS_B = [
  {
    quote:
      'He\u2019s a very talented designer and all round nice guy, the work he produced was high quality and the clients loved it! Can\u2019t recommend him enough!',
    name: 'Leon Bayliss',
    role: 'Product Designer | Engineer @ Meta',
  },
  {
    quote:
      'His cool and pixel perfect design style was extremely positively received and contributed to the positive and friendly relationship we have with this client.',
    name: 'Sibylle Tretera',
    role: 'Head of Creative Strategy @ Pinterest',
  },
  {
    quote: 'Gabriel stands out as someone who tries to understand the business needs behind decisions.',
    name: 'Carlos Ferr\u00e3o',
    role: 'Senior Program Manager @ Google',
  },
]

const ABOUT_IMAGES = [
  { src: '/media/about/about_1.png', alt: 'Portrait of Gabriel Comym', className: 'md:col-span-5', ratio: 'aspect-[1096/750]' },
  { src: '/media/about/about_2.png', alt: 'Digital installation in a dark gallery', className: 'md:col-span-6 md:col-start-6', ratio: 'aspect-[1320/750]' },
  { src: '/media/about/about_3.png', alt: 'A colorful light reflection on a wall', className: 'md:col-span-3', ratio: 'aspect-[636/894]' },
  { src: '/media/about/about_4.png', alt: 'Coastal landscape under a blue sky', className: 'md:col-span-3 md:col-start-4', ratio: 'aspect-[636/894]' },
  { src: '/media/about/about_5.png', alt: 'Analog synthesizer and keyboard', className: 'md:col-span-5 md:col-start-7', ratio: 'aspect-[1096/596]' },
  { src: '/media/about/about_6.png', alt: 'The Vignelli Canon book', className: 'md:col-span-4 md:col-start-3', ratio: 'aspect-[864/602]' },
  { src: '/media/about/about_6-1.png', alt: 'Blue stage lights at a live performance', className: 'md:col-span-3 md:col-start-7', ratio: 'aspect-[636/894]' },
]

const ABOUT_ROW_CLASS = 'grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6'

function AboutImage({
  src,
  alt,
  className,
  ratio,
  revealDelay,
}: (typeof ABOUT_IMAGES)[number] & { revealDelay?: string }) {
  return (
    <figure
      data-scroll-reveal="media"
      data-scroll-reveal-delay={revealDelay}
      className={`${className} ${ratio} relative overflow-hidden rounded-image bg-ink`}
    >
      <Image src={withBasePath(src)} alt={alt} fill priority={src.endsWith('about_1.png') || src.endsWith('about_2.png')} sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
    </figure>
  )
}

function AboutRow({
  label,
  children,
  className = '',
  large = false,
}: {
  label: string
  children: React.ReactNode
  className?: string
  large?: boolean
}) {
  return (
    <section data-scroll-reveal="copy" className={`${ABOUT_ROW_CLASS} ${className}`}>
      <h2 className={`${large ? 'text-heading-lg' : 'text-heading-sm'} text-ink md:col-span-3`}>{label}</h2>
      <div
        className={`${large ? 'text-heading-lg text-ink md:col-span-7' : 'text-body-editorial text-ink-muted md:col-span-5'} whitespace-pre-line md:col-start-4`}
      >
        {children}
      </div>
    </section>
  )
}

export default function AboutPage() {
  return (
    <main>
      <ScrollRevealController />
      <SiteHeader />

      <Container className="pt-[var(--space-about-hero)]">
        <h1 data-scroll-reveal="headline" className="text-display max-w-[1116px] text-ink">
          I design products for technical domains where AI, data, expert workflows, and complex systems need to become clear, trusted, and usable.
        </h1>

        <section aria-label="Photo gallery" className="mt-[var(--space-case-rhythm-large)]">
          <div className="grid grid-cols-1 items-start gap-[var(--space-about-gallery)] sm:grid-cols-2 md:grid-cols-12">
            {ABOUT_IMAGES.slice(0, 2).map((image, index) => <AboutImage key={image.src} {...image} revealDelay={index ? '1' : undefined} />)}
          </div>
          <div className="mt-[var(--space-about-gallery)] grid grid-cols-1 items-start gap-[var(--space-about-gallery)] sm:grid-cols-2 md:grid-cols-12">
            <div className="grid grid-cols-1 items-start gap-[var(--space-about-gallery)] sm:grid-cols-2 md:col-span-6 md:grid-cols-6">
              <AboutImage {...ABOUT_IMAGES[2]} className="md:col-span-3" />
              <AboutImage {...ABOUT_IMAGES[3]} className="md:col-span-3" />
              <AboutImage {...ABOUT_IMAGES[5]} className="md:col-span-4 md:col-start-3" />
            </div>
            <div className="md:col-span-5 md:col-start-7">
              <AboutImage {...ABOUT_IMAGES[4]} className="w-full" />
              <div className="mt-[var(--space-about-gallery)] grid grid-cols-5 gap-[var(--space-about-gallery)]">
                <AboutImage {...ABOUT_IMAGES[6]} className="col-span-3" />
              </div>
            </div>
          </div>
        </section>

        <AboutRow label="About" large className="mt-[var(--space-case-rhythm-large)]">
          {BIO_PARAGRAPHS.join('\n\n')}
        </AboutRow>

        <AboutRow label="What I help teams do" className="mt-[var(--space-case-rhythm-large)]">
          {HELP_TEAMS_DO.map((item) => `— ${item}`).join('\n')}
        </AboutRow>

        <AboutRow label="Selected experience" className="mt-[var(--space-case-rhythm-medium)]">
          {SELECTED_EXPERIENCE.current.join('\n')}
        </AboutRow>

        <AboutRow label="Recognition" className="mt-[var(--space-case-rhythm-medium)]">
          {RECOGNITION.join('\n')}
        </AboutRow>

        <AboutRow label="Selected clients" className="mt-[var(--space-case-rhythm-medium)]">
          <span className="grid w-full grid-cols-2 gap-8 md:inline-grid md:w-auto md:grid-cols-[203px_204px] md:gap-[120px]">
            <span>{ORGANIZATIONS_A.join('\n')}</span>
            <span>{ORGANIZATIONS_B.join('\n')}</span>
          </span>
        </AboutRow>

        <AboutRow label="Listening" className="mt-[var(--space-case-rhythm-medium)]">
          <iframe
            title="Comym ambienthigscape playlist on Spotify"
            src="https://open.spotify.com/embed/playlist/1KS7co4Mi1Z0FKbxeAyEcQ"
            loading="lazy"
            width="100%"
            height="352"
            className="block w-full rounded-[12px] border-0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          />
        </AboutRow>

        <AboutRow label="Recognition" className="mt-[var(--space-case-rhythm-medium)]">
          {RECOGNITION.join('\n')}
        </AboutRow>

        <AboutRow label="Education" className="mt-[var(--space-case-rhythm-medium)]">
          {EDUCATION.map((item) => `— ${item.program}\n${item.place}`).join('\n')}
        </AboutRow>

        <AboutRow label="Latest Certifications" className="mt-[var(--space-case-rhythm-medium)]">
          {CERTIFICATIONS.map((item) => `— ${item}`).join('\n')}
        </AboutRow>

        <AboutRow label="Testimonials" className="mt-[var(--space-case-rhythm-medium)]">
          {[...TESTIMONIALS_A, ...TESTIMONIALS_B]
            .map((testimonial) => `\"${testimonial.quote}\"\n\n${testimonial.name}\n${testimonial.role}`)
            .join('\n\n')}
        </AboutRow>
      </Container>

      <div className="pt-[var(--space-6)]">
        <AboutProjectCarousel />
      </div>

      <SiteFooter />
    </main>
  )
}
