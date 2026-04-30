# Stack & Structure

Detailed reference. See [`CLAUDE.md`](../CLAUDE.md) for philosophy and rules.

## Commands

```bash
pnpm dev        # Dev server, localhost:3000
pnpm build      # Production build (verifies types + SSG)
pnpm start      # Serve production build locally
pnpm lint       # ESLint flat config
```

Package manager: **pnpm**. No test suite. CI is the Vercel build.

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Turbopack |
| Runtime | React 19 | |
| Language | TypeScript 5 strict | Target ES2022 |
| Styling | Tailwind CSS v4 | CSS-first config in `globals.css` |
| Components | shadcn/ui + radix-ui | Re-generated, not vendored by hand |
| MDX | `@next/mdx` + `remark-gfm` + `remark-frontmatter` | |
| State / fetching | TanStack Query v5 | One `QueryClient` in `QueryProvider` |
| Syntax highlighting | Shiki | Singleton in `lib/highlight.ts`, theme `github-dark-default` |
| Persistence | Upstash Redis (REST) | `lib/redis.ts` |
| Rate limiting | `@upstash/ratelimit` | Sliding-window limiters in `lib/ratelimit.ts` |
| Theming | next-themes | System default, view-transition ripple |
| Analytics | Vercel Analytics | Already wired in root layout |
| Deployment | Vercel | |

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL        # Canonical site URL (e.g. https://www.dharma-yudistira.com)
UPSTASH_REDIS_REST_URL      # Upstash Redis REST endpoint
UPSTASH_REDIS_REST_TOKEN    # Upstash Redis REST token
```

`NEXT_PUBLIC_SITE_URL` is consumed by `app/layout.tsx`, sitemap, robots, RSS, and OG image generation. Defaults to `http://localhost:3000` in dev.

## Project Structure

```
app/
  layout.tsx                # Root layout: fonts, metadata, providers, AppShell
  page.tsx                  # Home
  about/page.tsx
  works/
    page.tsx
    [slug]/page.tsx         # Work detail, static params from WORKS array
  blogs/
    page.tsx
    [slug]/page.tsx         # Blog detail, dynamic MDX import
    _content/                # MDX source files, one per post
  api/
    pageviews/route.ts      # GET total visits / POST increment (rate-limited)
    views/[slug]/route.ts   # GET/POST per-content view count (rate-limited)
  globals.css
  manifest.ts / robots.ts / sitemap.ts / opengraph-image.tsx / rss.xml/route.ts
  error.tsx / not-found.tsx

components/
  layout/                   # AppShell, Navbar, Footer, BackToTop, LocalClock, VisitorCounter
  shared/                   # CodeBlock, CommandPalette, SectionDivider, TagFilterBar, ThemeToggle, ViewCounter
  home/ about/ blogs/ works/  # Page-scoped UI
  ui/                       # shadcn primitives
  providers/                # QueryProvider, ThemeProvider, PageviewTracker

lib/
  data/
    works.ts                # All work entries as TypeScript objects
    about.ts                # BIO, EXPERIENCES, STACK_GROUPS constants
  posts.ts                  # MDX frontmatter reader, prod-only cache
  highlight.ts              # Shiki singleton
  redis.ts                  # Upstash Redis client
  ratelimit.ts              # Sliding-window limiters + IP helper
  utils.ts                  # cn() (clsx + tailwind-merge)

hooks/
  use-is-mac.ts
  use-on-click-outside.ts

mdx-components.tsx          # Global MDX component map
```

## Import Conventions

- Path alias `@/*` resolves to project root.
- Group order: external, then `@/components`, then `@/lib`, then relative.
- All page imports live ABOVE `export const metadata` declarations.
- Server components stay default; add `"use client"` only when state, effects, or browser APIs are required.
