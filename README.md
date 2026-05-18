# personal-portfolio

Personal portfolio of Dharma Yudistira. Static-first Next.js site with works (TS data), blogs (MDX), and live counters backed by Upstash Redis.

## Stack

- Next.js 16 App Router (Turbopack), React 19, TypeScript 5 strict
- Tailwind v4 + shadcn/ui (CSS-first config in `app/globals.css`)
- MDX via `@next/mdx` + Shiki for syntax highlighting
- TanStack Query v5 for live counters
- Upstash Redis + `@upstash/ratelimit` for view tracking
- Vercel hosting + Analytics

## Scripts

```bash
pnpm dev      # localhost:3000
pnpm build    # production build (verifies types + SSG)
pnpm start    # serve production build locally
pnpm lint     # ESLint flat config
```

Package manager: pnpm. No test suite. CI is the Vercel build.

## Environment

```bash
NEXT_PUBLIC_SITE_URL        # Canonical site URL
UPSTASH_REDIS_REST_URL      # Upstash Redis REST endpoint
UPSTASH_REDIS_REST_TOKEN    # Upstash Redis REST token
```

## Adding content

- **Work:** edit `lib/data/works.ts`. Drop hero image under `public/works/`. Set `createdAt = updatedAt = today`.
- **Blog post:** create `app/blogs/_content/<slug>.mdx` with YAML frontmatter (`published: true`, `date`, `updatedAt`, `tags`, etc.).
- Bump only the touched entry's `updatedAt`. Sitemap, RSS, and JSON-LD derive from it.

See `CLAUDE.md` (philosophy + do/don't) and `.claude/` (stack, content, design, API, SEO references) for details.
