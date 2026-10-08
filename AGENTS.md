# Portfolio Project Briefing

Read the root `AGENTS.md` first. This file contains only rules for the Portfolio child project; product context belongs in `docs/product-brief.md`.

## Project

- **Name:** `portfolio`
- **Purpose:** A visual portfolio for communicating design leadership across complex technical products.
- **Status:** `in development`
- **Product brief:** `docs/product-brief.md` — create and read when product, audience, content, trust, or experience decisions are defined.
- **Design-system index:** `app/globals.css` — canonical color, typography, spacing, grid, motion, and case-media tokens.

## Stack And Commands

- **Language/framework:** TypeScript, Next.js 16, React 19, Tailwind CSS 4.
- **Package manager:** pnpm 10.15.0 via `npx pnpm@10.15.0`.
- **Install:** `npx pnpm@10.15.0 install`
- **Dev:** `npx pnpm@10.15.0 dev`
- **Test:** `npx pnpm@10.15.0 exec tsc --noEmit`
- **Type-check:** `npx pnpm@10.15.0 exec tsc --noEmit`
- **Build:** `npx pnpm@10.15.0 build`

## Implementation Rules

- Reuse the project design system and keep its documentation synchronized with implemented components.
- Target WCAG 2.2 AA unless the product brief defines a stricter bar.
- Verify responsive, keyboard, focus, overflow, loading, error, and reduced-motion states when they can occur.
- Use the global `design-taste` and `interaction-design` skills for material visual and interaction work.
- Keep project-specific contracts under the root `specs/` directory and durable decisions in `docs/adr/` or `docs/ddr/`.

## Project Constraints

- Define the product, audience, content, and visual direction before building application features.
- Preserve the 12-column grid: 48px outer margin and 24px standard gutter at desktop; centered six-column feature media begins at column 4.
- Use the shared `text-heading-lg` role for case titles and card captions; do not introduce one-off display sizes for case previews.
- Use `text-link-editorial` for impact-signal links: DM Sans Bold, 24px, compact leading, muted by default, black on hover/focus, and backed by a real anchor target.
- Use the shared `SiteHeader` and `SiteFooter` on About and case routes. The approved static home uses fixed edge navigation and its own Contact action. Contact links to `mailto:gabrielcomym@gmail.com`.
- Keep approved imagery in `public/media/`; preserve export crop and aspect ratio. Only runtime-referenced assets may remain public.
- Active case order is Kedro, Rivendell, WovenLight, PerformanceAI. Archived Refo content is preserved outside the deployable project and must not be generated as a public route.
- Do not add external services, analytics, or data collection without an approved project decision.

## Public Discovery and Content Integrity

- The canonical public domain is `https://comym.co`; use it for canonical URLs, structured-data identifiers, robots, sitemap, and public retrieval files.
- `app/robots.ts` and `app/sitemap.ts` are framework metadata routes. Keep the sitemap limited to active public pages and never invent `lastmod` values.
- `public/llms.txt` is a concise retrieval index. `public/llms-full.txt` is the richer factual representation of the public portfolio. Keep both synchronized with visible portfolio content.
- Shared canonical URLs and entity constants are in `lib/site.ts`. Schema.org graphs are composed in `lib/structured-data.ts` and emitted with `components/structured-data.tsx`.
- The root layout owns baseline canonical, robots, Open Graph, and Twitter metadata. Each public route must override title, description, canonical URL, Open Graph, and Twitter metadata with route-specific factual content.
- Use the single `Person` identifier from `lib/site.ts` in all structured data. Do not create duplicate people or add `sameAs`, employment, awards, dates, clients, results, or metrics unless they are verified in visible public content.
- `OAI-SearchBot` is explicitly allowed for ChatGPT Search discovery, while `GPTBot`, `Google-Extended`, and `ClaudeBot` are disallowed because the owner opted out of model-training crawls. Do not change this policy or public crawl access without an explicit owner decision.
- Case detail text is also emitted in visually hidden semantic HTML so it remains available in the static document. Preserve that representation when changing a case.
- When adding a public case study, update `CASES`, the route metadata, JSON-LD, sitemap eligibility, `llms.txt`, `llms-full.txt`, image alternatives, and related-project links in the same change.
- Never invent professional claims, clients, awards, outcomes, technologies, metrics, or credentials. Preserve the established visual design, image aspect ratios, and responsive behavior unless explicitly asked to change them.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
