# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Dev server — localhost:3000
pnpm build      # Production build
pnpm start      # Serve production build
pnpm lint       # ESLint
```

Package manager: **pnpm**. No test suite.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| MDX | `@next/mdx` + `remark-gfm` + `remark-frontmatter` |
| State/Fetching | TanStack Query v5 |
| Syntax highlighting | Shiki (`github-dark-default` theme) |
| Persistence | Upstash Redis (REST) |
| Analytics | Vercel Analytics |
| Theming | next-themes (system default, ripple transition) |
| Deployment | Vercel |

---

## Project Structure

```
app/
  layout.tsx                  # Root layout — fonts, metadata, providers, AppShell
  page.tsx                    # Home
  about/page.tsx
  works/
    page.tsx
    [slug]/page.tsx           # Work detail (static params from WORKS array)
  blogs/
    page.tsx
    [slug]/page.tsx           # Blog detail (dynamic MDX import)
    _content/                 # MDX source files (one file per post)
  api/
    pageviews/route.ts        # GET: total visits; POST: increment
    views/[slug]/route.ts     # GET/POST: per-content view count
  globals.css
  manifest.ts / robots.ts / sitemap.ts / opengraph-image.tsx / rss.xml/route.ts

components/
  layout/                     # AppShell, Navbar, Footer, BackToTop, LocalClock, VisitorCounter
  shared/                     # CodeBlock, CommandPalette, SectionDivider, TagFilterBar, ThemeToggle, ViewCounter
  home/ about/ blogs/ works/  # Page-scoped UI components
  ui/                         # shadcn primitives (button, dialog, sheet, etc.)
  providers/                  # QueryProvider, ThemeProvider, PageviewTracker

lib/
  data/
    works.ts                  # All work entries as TypeScript objects
    about.ts                  # BIO, EXPERIENCES, STACK_GROUPS constants
  posts.ts                    # Reads MDX frontmatter; module-level cache
  highlight.ts                # Shiki wrapper
  redis.ts                    # Upstash Redis client
  utils.ts                    # cn() (clsx + tailwind-merge)

hooks/
  use-is-mac.ts
  use-on-click-outside.ts

mdx-components.tsx            # Global MDX component map
```

---

## Content Model

### Works (`lib/data/works.ts`)

All portfolio entries live as TypeScript objects in a single `_WORKS` array. The exported `WORKS` is sorted by `updatedAt` descending. Key fields on the `Work` type:

| Field | Purpose |
|---|---|
| `slug` | URL segment and ID |
| `title` | Display title |
| `seoTitle` | Overrides title in `<title>` / OG tags only |
| `description` | Short description (used in cards and SEO) |
| `longDescription` | Paragraph shown on detail page |
| `image` | Hero image path (relative to `/public`) |
| `ogImageDimensions` | Custom OG image width/height (default: 1200x630) |
| `category` | `"Web" \| "Mobile" \| "Desktop" \| "Open Source"` |
| `tags` | Stack/technology tags |
| `createdAt` / `updatedAt` | ISO date strings (`YYYY-MM-DD`); see timestamp rules below |
| `role` | Your role in the project |
| `liveUrls` | Array of `{ label, url }` |
| `repoUrl` | Optional source link |
| `featured` | `true` surfaces the work on the homepage |
| `confidential` | `true` shows NDA placeholder instead of sections |
| `impacts` | Bullet-point contributions shown under the NDA block |
| `sections` | Full case study (see below) |

**`sections` present**: renders three editorial sections (Problem / Solution / Technical Recap).
**`sections` absent + `confidential: true`**: renders NDA disclaimer + `impacts[]` bullets.

#### `updatedAt` rules — important

`WORKS` is sorted by `updatedAt` descending, so this field controls display order on the works page.

Whenever a work entry is meaningfully changed (content, assets, any field), manually set its `updatedAt` to today's date (`YYYY-MM-DD`). Only update the specific entry being changed, not others. `createdAt` is set once at project creation and never changed.

`sections` structure:
```ts
sections: {
  problem: { body: string; quote?: string }
  solution: {
    body: string
    features: { name: string; description: string }[]
    asset?: { type: "image" | "video"; url: string; poster?: string } | null
  }
  technical: {
    body: string
    code: { language: string; filename: string; content: string }
  }
}
```

### Blog Posts (`app/blogs/_content/*.mdx`)

Each `.mdx` file has a gray-matter frontmatter header:

```yaml
---
title: "Post title"
description: "One-line description"
date: "2026.03.21"        # Dot-separated YYYY.MM.DD — publish date, never changes
updatedAt: "2026.03.21"   # Same format — update manually when post content changes
tags: ["Tag1", "Tag2"]
readTime: "5 min"
published: true            # false = hidden from all listings
cover: /blogs/slug/cover.png  # Optional
---
```

`lib/posts.ts` reads all `.mdx` files at build time and caches the result in a module-level variable. Only posts with `published: true` are returned. The MDX content itself is loaded via a dynamic `import()` in `app/blogs/[slug]/page.tsx`.

#### `updatedAt` rule

Whenever a post's content is meaningfully changed, manually set `updatedAt` in its frontmatter to today (`YYYY.MM.DD`). `date` is the original publish date and never changes.

---

## Design System

### Colors

Strict monochromatic palette. No accent colors — primary is `#131313` in light mode and `#ffffff` in dark mode. All semantic tokens are CSS variables defined in `globals.css`.

```
Light: background #f9f9f9 / foreground #131313 / muted-foreground #6b6b6b
Dark:  background #131313 / foreground #e5e2e1 / muted-foreground #919191
```

### Typography

Three font variables, all loaded via `next/font/google` in `app/layout.tsx`:

| Variable | Font | Usage |
|---|---|---|
| `--font-heading` | Space Grotesk | `font-heading` — all headings, uppercase |
| `--font-sans` | Inter | Default body text |
| `--font-mono` | IBM Plex Mono | `font-mono` — labels, metadata, code, nav |

### Layout

Pages use `max-w-5xl mx-auto` (1024px max). Left/right vertical dashed grid lines are rendered as decorative `div` elements inside `AppShell`. Content sections are separated by `<SectionDivider label="TAG:NN" />`.

### Theme toggle

Uses the View Transition API (`document.startViewTransition`) to animate a radial ripple from the toggle button position. Falls back to instant swap if View Transitions are unsupported or `prefers-reduced-motion` is set.

---

## API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/pageviews` | GET | Read total visit counter from Redis (`pageviews:total`) |
| `/api/pageviews` | POST | Increment total visit counter |
| `/api/views/[slug]` | GET | Read per-content view count (`views:{slug}`) |
| `/api/views/[slug]` | POST | Increment per-content view count |

`PageviewTracker` (rendered in root layout) fires `POST /api/pageviews` on mount, **production only**. `ViewCounter` (used on blog detail pages) fires `POST /api/views/[slug]` on mount when `increment` prop is `true`.

---

## MDX Components

`mdx-components.tsx` maps standard HTML elements to styled variants. Two custom components are also available in `.mdx` files:

```mdx
<Callout type="note">...</Callout>      # Also: "warning" | "tip"
<CodeBlock language="ts" filename="example.ts">{`...`}</CodeBlock>
```

`CodeBlock` is a **server async component** that calls `highlightCode()` (Shiki) at render time. It accepts either a `code` prop (string) or `children` (MDX usage).

---

## SEO Patterns

Every detail page (`/works/[slug]`, `/blogs/[slug]`) follows this pattern:

1. **`generateMetadata()`** exports Next.js metadata with `title`, `description`, OG, and Twitter card fields.
2. An inline `<script type="application/ld+json">` renders a JSON-LD `@graph` containing:
   - Works: `SoftwareApplication` + `BreadcrumbList`
   - Blogs: `BlogPosting` + `BreadcrumbList`
   - Person identity anchor: `https://www.dharma-yudistira.com/#person`

The site URL is controlled by `NEXT_PUBLIC_SITE_URL`. The production canonical is `https://www.dharma-yudistira.com`.

Additional SEO files: `app/sitemap.ts`, `app/robots.ts`, `app/rss.xml/route.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`.

---

## Environment Variables

```bash
NEXT_PUBLIC_SITE_URL        # Canonical site URL (e.g. https://www.dharma-yudistira.com)
UPSTASH_REDIS_REST_URL      # Upstash Redis REST endpoint
UPSTASH_REDIS_REST_TOKEN    # Upstash Redis REST token
```
