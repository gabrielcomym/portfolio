# Portfolio

A visual portfolio for communicating design leadership across complex technical products.

## Project structure

```text
portfolio/
├── app/                 Next.js routes and the canonical token stylesheet
├── components/          Reusable page and UI components
├── lib/                 Portfolio content and case-study data
├── public/media/        Approved, referenced project and About exports
├── AGENTS.md
└── docs/product-brief.md
```

## Current status

`in development`

The design system is implemented in `app/globals.css`. It is the source of
truth for the 12-column grid, typography roles, spacing rhythm, and case-media
measures used by the landing, project, and About pages.

The public cases are Kedro, Rivendell, WovenLight and PerformanceAI, in that
order. The home is a static viewport with an internal thumbnail carousel.
Production images use Next.js responsive optimization. Type errors fail builds.
No application analytics is enabled; About retains its approved Spotify embed.

Run `npx pnpm@10.15.0 exec tsc --noEmit` and `npx pnpm@10.15.0 build` before release.
