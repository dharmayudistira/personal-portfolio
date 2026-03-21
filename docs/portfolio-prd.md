# Product Requirements Document (PRD)

## Personal Portfolio Website — Product Engineer

---

**Version:** 1.2 (Final)
**Date:** March 20, 2026
**Status:** Approved — Ready for Development

---

## 1. Overview

### 1.1 Purpose

A personal portfolio website to showcase work, writing, and expertise as a **Product Engineer**. The site serves as a professional home base — a single URL that communicates credibility, technical depth, and craft.

### 1.2 Goals

- **Establish authority:** Position the owner as a skilled Product Engineer through curated projects and technical writing.
- **Attract opportunities:** Serve as a living resume for recruiters, collaborators, and potential clients.
- **Share knowledge:** Publish technical blog posts with high-quality code examples and developer-focused content.
- **Maximize discoverability:** Rank well on search engines for relevant engineering topics through strong SEO practices.

### 1.3 Target Audience

- Hiring managers and recruiters in the tech industry
- Fellow engineers and developers discovering content via search or social
- Potential collaborators and open-source contributors

### 1.4 Design References

| Reference | Key Takeaways |
|-----------|--------------|
| [theodorusclarence.com](https://theodorusclarence.com/) | Dark theme, editorial blog layout with featured posts and view counts, project cards with live/repo links, strong hero with tagline and CTA, yearly retrospective section |
| [chanhdai.com](https://chanhdai.com/) | Structured single-page resume feel, tech stack icon grid, GitHub contributions heatmap, experience timeline, command palette (⌘K), shadcn/ui-inspired component aesthetic |
| [shadcn/ui](https://ui.shadcn.com/docs/components) | Component library for consistent, accessible, well-crafted UI primitives |
| [Fancy Components](https://www.fancycomponents.dev/components) | Micro-interaction inspiration — letter swap hover, vertical cut reveal, text rotate, simple marquee, scramble hover, stacking cards |

### 1.5 Design Direction Summary

**Aesthetic:** Dark-first, monospace-accented minimalism with a green accent color — derived from a custom tweakcn theme.

- **Theme:** Dark mode primary (pure black `oklch(0 0 0)` background), with light mode support
- **Accent:** Green (`oklch(0.8545 0.1675 159.6564)`) — used for links, active states, highlights, and interactive elements
- **Feel:** Pixel-perfect, calm, confident. Every element earns its place. No visual noise.

---

## 2. Information Architecture

### 2.1 Sitemap

```
/                     → Home
/works                → Works (project listing)
/works/[slug]         → Work detail (individual project)
/blogs                → Blogs (post listing)
/blogs/[slug]         → Blog post detail
/about                → About
/sitemap.xml          → XML Sitemap (auto-generated)
/robots.txt           → Robots file
/rss.xml              → RSS Feed
```

### 2.2 Global Elements

#### Navigation Bar

- Fixed top navigation, semi-transparent with backdrop blur on scroll
- Links: **Home**, **Works**, **Blogs**, **About**
- Active state: green accent underline or dot indicator
- Right side: theme toggle (dark/light) and ⌘K command palette trigger
- Mobile: hamburger menu with slide-in drawer (shadcn/ui `Sheet`)

#### Command Palette (⌘K)

- Global keyboard shortcut (⌘K / Ctrl+K)
- Search across pages, blog posts, and projects
- Quick navigation and theme switching
- Built with `cmdk` library (shadcn/ui `Command` component)

#### Footer

- Compact layout with social links (GitHub, LinkedIn, X/Twitter, Email)
- Copyright line
- RSS feed link

#### Back-to-Top Button

- Floating button in bottom-right corner, appears after scrolling 400px
- Smooth scroll to top on click
- Subtle fade-in/out animation
- Uses `chevron-up` icon from lucide-react, styled with ghost button variant

#### Favicon & Web Manifest

- Custom favicon (`.ico`, `.svg`, `apple-touch-icon.png`)
- `manifest.webmanifest` with site name, theme color (green accent), background color (black)
- Configured via Next.js `app/manifest.ts` and `app/icon.tsx` (or static files in `/app`)

#### Error Pages

- **`app/not-found.tsx`** — Custom 404 page with the site's design system: heading, short message, "Go Home" button. Includes a subtle animation (e.g., glitch effect on "404" text).
- **`app/error.tsx`** — Generic error boundary with "Something went wrong" message and "Try Again" button that calls `reset()`. Must be a Client Component.
- **`app/global-error.tsx`** — Root-level error boundary wrapping the entire app (catches layout-level errors).

#### Loading States

- **`app/loading.tsx`** — Global loading fallback with a minimal skeleton or spinner matching the site theme.
- **Route-level `loading.tsx`** — For `/blogs` and `/works` listing pages: skeleton card grids matching the actual card layout (pulsing placeholder blocks for image, title, tags).
- **View counter skeleton** — Inline shimmer placeholder (`--` or pulsing `0`) while React Query fetches the count.
- All skeletons use `animate-pulse` with `bg-muted` color for consistency.

---

## 3. Page Specifications

### 3.1 Home Page (`/`)

The homepage is the hook — concise, visually striking, and navigates visitors to deeper content within seconds.

#### Hero Section

- **Name:** Large display heading (48–64px), Plus Jakarta Sans, bold
- **Role line:** "Product Engineer" with a blinking cursor animation (CSS `@keyframes`)
- **Tagline:** One-liner description beneath the role (16px, muted-foreground color)
- **CTA Buttons:** Two buttons — "View Works" (primary/accent) and "Read Blog" (outline/ghost)
- **Social Icons:** GitHub, LinkedIn, X — small monochrome icons in a horizontal row
- **Animation:** Staggered fade-in + slight upward slide on load (Motion for React)
- **Optional micro-interaction:** Scramble text effect on name hover (ref: Fancy Components `scramble-hover`)

#### Featured Works Section

- Section heading: "Featured Works"
- 2–3 project cards in a responsive grid (2-col desktop, 1-col mobile)
- Each card contains:
  - Project thumbnail/screenshot (aspect ratio 16:9, with hover zoom)
  - Project name (bold)
  - One-line description
  - Tech stack tags as inline code pills (IBM Plex Mono)
  - Arrow link to `/works/[slug]`
- Subtle border with accent glow on hover
- "View all works →" link at bottom

#### Recent Blog Posts Section

- Section heading: "Recent Posts"
- 3 latest posts displayed as horizontal list items
- Each item shows:
  - Date in monospace font IBM Plex Mono (e.g., `Mar 19, 2026`)
  - Post title (bold, linked)
  - Short excerpt or description (muted-foreground)
  - View count (muted, with eye icon)
  - Category tags as small pills
- "See all posts →" link at bottom

#### Tech Stack Section

- Auto-scrolling horizontal marquee of tech icons
- Icons for: React, Next.js, TypeScript, Tailwind CSS, Node.js, PostgreSQL, Prisma, Figma, etc.
- Monochrome icons by default, color on hover
- Smooth infinite scroll, pauses on hover

#### Connect Section

- Minimal call-to-action area before the footer
- Heading: "Let's Connect"
- Social links (icon + label) and email CTA
- Short one-liner ("Always open to interesting conversations and collaborations.")

### 3.2 Works Page (`/works`)

#### Layout

- Page heading: "Works" with a short subtitle
- **Filter bar:** Horizontal pill/tag filters — "All", "Web App", "Open Source", "SaaS", "Design System", etc.
  - Active filter has accent background
  - Client-side filtering, no page reload
- **Project grid:** Responsive cards (2-col desktop, 1-col mobile)

#### Project Card

- Thumbnail image (16:9, rounded corners per theme radius)
- Project name
- Short description (1–2 lines, clamped)
- Tech stack tags (inline code pills)
- Links: "View Project →" and optionally GitHub icon
- Hover: subtle scale + border accent

#### Work Detail Page (`/works/[slug]`)

- **Hero:** Full-width project banner image
- **Metadata:** Project name, date range, role, links (live site, GitHub)
- **Content:** MDX body with problem/solution/outcome narrative, screenshots, code snippets
- **Navigation:** "← Back to Works" at top, prev/next project links at bottom

### 3.3 Blogs Page (`/blogs`)

#### Layout

- Page heading: "Blog" with subtitle
- **Search bar:** Filter posts by title (client-side)
- **Tag filter:** Horizontal scrollable tag pills (React, TypeScript, Career, etc.)
  - Multiple tags active (OR logic), "All" clears

#### Blog Post List

- 2-column card grid (matching chanhdai's blog page style)
- Each card shows:
  - Thumbnail image (optional, 16:9)
  - Date in IBM Plex Mono (e.g., `19.03.2026`)
  - Title (bold, linked)
  - Read time (e.g., "5 min read")
  - View count (eye icon, muted)
  - Tags as small pills

#### Blog Post Detail (`/blogs/[slug]`)

- **Header:** Breadcrumb, title, metadata (author, date, read time, view count, tags)
- **Content body (MDX):**
  - Clean typography (Plus Jakarta Sans body, heading hierarchy h2–h4)
  - Syntax-highlighted code blocks via Shiki + rehype-pretty-code
    - Line numbers
    - Line highlighting (e.g., `{1,3-5}` in code fence meta)
    - Filename / language label at top of code block
    - **Copy button:** Top-right corner of every code block. On click: copies code to clipboard, icon transitions from `Copy` → `Check` (green accent) for 2 seconds via React state, then reverts. Uses `navigator.clipboard.writeText()`.
  - Inline code styling (IBM Plex Mono, `bg-muted` background pill)
  - Images with captions (`figure` + `figcaption`)
  - Callout/admonition blocks (info, warning, tip)
  - Custom MDX components
- **Related posts:** Below the content body, a "Related Posts" section showing 2–3 posts that share at least one tag with the current post. Sorted by most tags in common, then by date. Displayed as compact horizontal cards (thumbnail, title, date). Improves internal linking for SEO and keeps readers engaged.
- **Post navigation:** Previous / Next post links at bottom

### 3.4 About Page (`/about`)

#### Bio Section

- Avatar placeholder (rounded, ~120px) — real photo to be added later
- Name (large heading)
- Current role
- 2–3 paragraph bio (first person)
- Location with pin icon
- Social links row

#### Experience Timeline

- Vertical timeline (inspired by chanhdai)
- Each entry: company logo placeholder, company name, title, type, date range (IBM Plex Mono), bullet descriptions, tech tags
- Most recent first

#### Tech Stack Grid

- Grouped: **Languages**, **Frameworks & Libraries**, **Tools & Platforms**, **Design**
- Icon grid with labels

#### Resume Download

- Ghost/outline button: "Download Resume" (links to PDF, to be added later)

---

## 4. Design System

### 4.1 Theme (via tweakcn)

The full theme is defined using oklch color space with CSS custom properties. Below is the summary. The complete CSS theme file is maintained separately and imported into the project.

#### Fonts

| Role | Font Family | Fallback |
|------|------------|----------|
| Sans (body, headings) | **Plus Jakarta Sans** | sans-serif |
| Serif (editorial accents) | **Lora** | serif |
| Mono (code, dates, tags) | **IBM Plex Mono** | monospace |

#### Typography Scale

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / Hero heading | Plus Jakarta Sans | 700 | 48–64px |
| Page heading (h1) | Plus Jakarta Sans | 700 | 36–40px |
| Section heading (h2) | Plus Jakarta Sans | 600 | 24–28px |
| Subsection heading (h3) | Plus Jakarta Sans | 600 | 20px |
| Body text | Plus Jakarta Sans | 400 | 16px, line-height 1.7 |
| Small / metadata | Plus Jakarta Sans | 400 | 14px |
| Code / monospace accents | IBM Plex Mono | 400 | 14px |
| Tags / badges | IBM Plex Mono | 500 | 12px |

#### Color Tokens (Summary)

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--background` | `oklch(0.994 0 0)` (near-white) | `oklch(0 0 0)` (pure black) | Page background |
| `--foreground` | `oklch(0 0 0)` | `oklch(0.955 0 0)` | Primary text |
| `--card` | `oklch(0.994 0 0)` | `oklch(0.145 0 0)` | Card surfaces |
| `--primary` | `oklch(0.855 0.168 159.66)` | Same | Green accent (links, buttons, highlights) |
| `--secondary` | `oklch(0.993 0.001 197.14)` | `oklch(0.470 0.090 160.01)` | Secondary surfaces/text |
| `--muted` | `oklch(0.970 0 0)` | `oklch(0.265 0.004 286.15)` | Muted backgrounds |
| `--muted-foreground` | `oklch(0.439 0 0)` | `oklch(0.673 0 0)` | Secondary text, descriptions |
| `--accent` | `oklch(0.995 0.007 164.95)` | `oklch(0.300 0.061 159.89)` | Hover/active accent surfaces |
| `--border` | `oklch(0.972 0.003 247.86)` | `oklch(0.214 0.002 286.23)` | Borders, dividers |
| `--destructive` | `oklch(0.667 0.211 2.83)` | `oklch(0.743 0.170 1.08)` | Error states |

#### Border Radius

- Base `--radius`: `1.4rem`
- `--radius-sm`: `calc(1.4rem - 4px)`
- `--radius-md`: `calc(1.4rem - 2px)`
- `--radius-lg`: `1.4rem`
- `--radius-xl`: `calc(1.4rem + 4px)`

### 4.2 Spacing

Based on a 4px base (`--spacing: 0.27rem`): `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`.

- Section vertical padding: `80–128px`
- Card internal padding: `20–24px`
- Grid gap: `16–24px`
- Content max-width: `768px` (blog prose), `1152px` (grid layouts)

### 4.3 Component Library

All UI primitives from **shadcn/ui**, themed with the tweakcn config:

- `Button` (primary, secondary, outline, ghost, destructive)
- `Badge` / tag pill
- `Card`
- `Command` (⌘K palette)
- `Dialog`
- `Input` (search)
- `Separator`
- `Tooltip`
- `Tabs` (filters)
- `Sheet` (mobile nav)
- `ScrollArea`

### 4.4 Micro-Interactions & Motion

| Element | Interaction | Implementation |
|---------|------------|----------------|
| Page load | Staggered fade-in + upward slide | Motion for React |
| Page transitions | Crossfade between routes | Next.js View Transitions or Motion layout |
| Card hover | Scale (1.01–1.02) + border accent glow | CSS `transition` |
| Nav link hover | Underline slide-in from left | CSS `::after` pseudo-element |
| Hero name | Scramble/letter-swap on hover | Fancy Components or custom |
| Tech stack marquee | Infinite horizontal scroll, pause on hover | CSS keyframes or Fancy Components `simple-marquee` |
| Blog post appear | Fade + slide on scroll | Intersection Observer + CSS |
| Code block copy | Checkmark feedback | React state |
| Theme toggle | Smooth color transition | CSS `transition` on custom properties |

---

## 5. Technical Architecture

### 5.1 Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 15** (App Router) | SSG/SSR flexibility, excellent SEO, React Server Components |
| Language | **TypeScript** | Type safety, better DX |
| Styling | **Tailwind CSS v4** | Utility-first, pairs with shadcn/ui |
| Theme | **tweakcn** custom theme | Pre-configured oklch color tokens, font families, radius, shadows |
| UI Components | **shadcn/ui** | Accessible, unstyled primitives |
| Data Fetching | **TanStack Query (React Query) v5** | Caching, deduplication, background refetching, optimistic updates |
| HTTP Client | **ky** or native `fetch` | Lightweight, used inside React Query `queryFn` |
| Content | **MDX** via `next-mdx-remote` | Flexible, supports custom components, server-side compilation |
| Content Source | **Local MDX files** in `/content` | Zero cost, version-controlled, no CMS |
| Syntax Highlighting | **Shiki** + `rehype-pretty-code` | VS Code-quality highlighting |
| Animations | **Motion for React** (framer-motion) | Declarative animations, layout transitions, gestures |
| Fancy Effects | **Fancy Components** (selective) | Marquee, text scramble — installed as needed |
| View Counter | **Upstash Redis** (REST API) | Serverless, free tier sufficient |
| Deployment | **Vercel** | Zero-config Next.js hosting |
| Analytics | **Vercel Analytics** + **Speed Insights** | Privacy-friendly, built-in |
| Package Manager | **pnpm** | Fast, disk-efficient |
| Code Quality | **ESLint** + **Prettier** | Consistent code style |

### 5.2 Project Structure

```
├── app/
│   ├── layout.tsx                  # Root layout (nav, footer, providers, fonts)
│   ├── page.tsx                    # Home page
│   ├── not-found.tsx               # Custom 404 page
│   ├── error.tsx                   # Error boundary
│   ├── global-error.tsx            # Root error boundary
│   ├── loading.tsx                 # Global loading fallback
│   ├── manifest.ts                 # Web manifest generation
│   ├── icon.tsx                    # Dynamic favicon (or static files)
│   ├── works/
│   │   ├── page.tsx                # Works listing
│   │   ├── loading.tsx             # Skeleton grid for works
│   │   └── [slug]/page.tsx         # Work detail
│   ├── blogs/
│   │   ├── page.tsx                # Blog listing
│   │   ├── loading.tsx             # Skeleton grid for blogs
│   │   └── [slug]/page.tsx         # Blog post detail
│   ├── about/
│   │   └── page.tsx                # About page
│   ├── og/
│   │   └── route.tsx               # Dynamic OG image generation
│   ├── api/
│   │   └── views/[slug]/route.ts   # View counter API (rate-limited)
│   ├── sitemap.ts                  # Dynamic sitemap generation
│   ├── robots.ts                   # Robots.txt generation
│   └── rss.xml/route.ts            # RSS feed generation
├── components/
│   ├── ui/                         # shadcn/ui primitives (themed)
│   ├── layout/                     # Navbar, Footer, MobileNav, BackToTop
│   ├── home/                       # Hero, FeaturedWorks, RecentPosts, TechStack, Connect
│   ├── works/                      # ProjectCard, ProjectGrid, FilterBar
│   ├── blogs/                      # PostCard, PostList, SearchBar, TagFilter, RelatedPosts, CopyCodeButton
│   ├── about/                      # Timeline, StackGrid, Bio
│   └── shared/                     # CommandPalette, ThemeToggle, ViewCounter, MDXComponents, Skeleton
├── content/
│   ├── works/                      # MDX files per project
│   │   ├── project-alpha.mdx
│   │   ├── project-beta.mdx
│   │   └── project-gamma.mdx
│   └── blogs/                      # MDX files per post
│       ├── building-scalable-react-apps.mdx
│       ├── typescript-patterns-i-use-daily.mdx
│       └── why-product-engineers-matter.mdx
├── lib/
│   ├── env.ts                      # Environment variable validation (@t3-oss/env-nextjs)
│   ├── mdx.ts                      # MDX parsing utilities
│   ├── views.ts                    # View counter logic (Upstash)
│   ├── rate-limit.ts               # Rate limiter (@upstash/ratelimit)
│   ├── query-client.ts             # React Query client config
│   ├── query-keys.ts               # Query key factory
│   └── utils.ts                    # Shared utilities (cn, formatDate, etc.)
├── hooks/
│   └── use-view-count.ts           # React Query hooks for view counter
├── public/
│   ├── images/
│   │   ├── works/                  # Project screenshots
│   │   └── blogs/                  # Blog post banners
│   └── fonts/                      # Plus Jakarta Sans, IBM Plex Mono, Lora (self-hosted)
├── styles/
│   └── globals.css                 # tweakcn theme + Tailwind imports + prose styles
├── .env.example                    # Environment variable template
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

### 5.3 Content Schema

#### Blog Post Frontmatter (`/content/blogs/*.mdx`)

```yaml
---
title: "Building Scalable React Applications"
description: "Patterns and practices for React apps that grow with your team."
date: "2026-03-19"
tags: ["react", "architecture", "typescript"]
published: true
image: "/images/blogs/scalable-react-banner.webp"
---
```

#### Work/Project Frontmatter (`/content/works/*.mdx`)

```yaml
---
title: "Project Alpha"
description: "A SaaS dashboard for real-time analytics."
date: "2026-01-15"
tags: ["next.js", "typescript", "tailwind", "prisma"]
category: "Web App"
image: "/images/works/project-alpha-banner.webp"
liveUrl: "https://project-alpha.com"
repoUrl: "https://github.com/username/project-alpha"
featured: true
published: true
---
```

### 5.4 View Counter Architecture

```
Browser → POST /api/views/[slug]
                  ↓
          Upstash Redis (INCR)
                  ↓
          Returns { count: number }
```

- Increment on page load (POST from client component)
- Read count on server render (GET from Upstash)
- Deduplicate by session (IP hash or cookie, optional)
- Free tier: 10,000 requests/day

### 5.5 Blog Content Workflow

#### Adding a New Blog Post

```
1. Create file:    /content/blogs/my-new-post.mdx
2. Add frontmatter (title, description, date, tags, image, published)
3. Write content in MDX (Markdown + React components)
4. Add images to:  /public/images/blogs/
5. Commit & push → Vercel auto-deploys (typically < 60s)
```

The slug is derived from the filename: `my-new-post.mdx` → `/blogs/my-new-post`.

Setting `published: false` in frontmatter hides the post from listings and sitemap (useful for drafts).

#### Blog Stats — How Each Metric Works

| Stat | Type | How It Works |
|------|------|-------------|
| **Read time** | Static (build-time) | MDX parser counts words in the post body, divides by 200 wpm, rounds to nearest minute. Computed in `lib/mdx.ts` during `getAllPosts()` and stored as metadata. Zero runtime cost. |
| **View count** | Dynamic (runtime) | Client component fires `POST /api/views/[slug]` on page mount. API route calls `Upstash Redis INCR` and returns the new count. Initial count is fetched server-side via `GET` for SSG/ISR hydration. Displayed with an eye icon. |
| **Publish date** | Static (frontmatter) | Set by the author in `date` field. Displayed in IBM Plex Mono. Used for sorting (newest first) and sitemap `lastModified`. |
| **Tags** | Static (frontmatter) | Defined as an array in `tags` field. Used for filtering on the blog listing page and displayed as pills on cards and post headers. |

#### `lib/mdx.ts` — Core Content Utilities

```typescript
// Key functions the MDX utility module will export:

getAllPosts()
// → Reads all .mdx files from /content/blogs/
// → Parses frontmatter + computes read time
// → Filters out unpublished posts
// → Sorts by date (newest first)
// → Returns: Post[] with { slug, frontmatter, readTime }

getPostBySlug(slug: string)
// → Reads single .mdx file
// → Parses frontmatter + compiles MDX to React components
// → Computes read time
// → Returns: { frontmatter, content, readTime }

getAllTags()
// → Aggregates all unique tags across published posts
// → Returns: string[] (for the filter UI)
```

#### `lib/views.ts` — View Counter Utilities

```typescript
// Uses @upstash/redis REST client

getViewCount(slug: string)
// → Redis GET on key `views:{slug}`
// → Returns: number (0 if key doesn't exist)

incrementViewCount(slug: string)
// → Redis INCR on key `views:{slug}`
// → Returns: number (new count after increment)
```

#### Upstash Redis Setup (One-Time, ~5 Minutes)

```
1. Sign up at upstash.com (free, no credit card)
2. Create a new Redis database (choose nearest region)
3. Copy UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN
4. Add both to .env.local (and Vercel environment variables)
5. Install: pnpm add @upstash/redis
```

### 5.6 Environment Variable Management

#### `.env.example` (committed to Git)

```bash
# Upstash Redis (view counter)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Site URL (used for OG images, sitemap, RSS)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Env Validation with `@t3-oss/env-nextjs`

```typescript
// lib/env.ts
import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.string().url(),
  },
  runtimeEnv: {
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  },
});
```

This ensures the app **fails fast at build time** if any required env variable is missing or malformed, rather than silently breaking in production.

### 5.7 Rate Limiting on View Counter API

The `POST /api/views/[slug]` route is publicly accessible. Without rate limiting, bots or bad actors could inflate view counts or exhaust the Upstash free tier (10,000 requests/day).

#### Implementation: `@upstash/ratelimit`

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '60 s'), // 10 requests per 60 seconds per IP
  analytics: true,
});
```

```typescript
// app/api/views/[slug]/route.ts
import { ratelimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export async function POST(req, { params }) {
  const ip = (await headers()).get('x-forwarded-for') ?? '127.0.0.1';
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return Response.json({ error: 'Rate limited' }, { status: 429 });
  }

  // ... proceed with INCR
}
```

Uses the same Upstash Redis instance — no extra service needed. `@upstash/ratelimit` is a lightweight wrapper that stores rate limit counters as Redis keys.

### 5.8 OG Image Generation

Dynamic Open Graph images ensure blog posts and project pages have rich preview cards when shared on X, LinkedIn, and other platforms.

#### Implementation: `next/og` (Vercel OG)

```
app/
├── og/
│   └── route.tsx        # Dynamic OG image endpoint
```

```typescript
// app/og/route.tsx
import { ImageResponse } from 'next/og';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get('title') ?? 'Portfolio';
  const description = searchParams.get('description') ?? '';
  const type = searchParams.get('type') ?? 'page'; // 'page' | 'blog' | 'work'

  return new ImageResponse(
    // JSX template with site branding, title, description
    // Uses Plus Jakarta Sans loaded via fetch
    // Green accent color, dark background matching the site theme
    // Dimensions: 1200x630 (standard OG)
  );
}
```

#### Usage in `generateMetadata`

```typescript
// In any page's generateMetadata:
openGraph: {
  images: [`/og?title=${encodeURIComponent(title)}&type=blog`],
}
```

#### OG Image Design

- **Dimensions:** 1200×630px
- **Background:** Dark (`--background` color from theme)
- **Layout:** Site logo/name top-left, post title large center, description below, tag pills at bottom
- **Typography:** Plus Jakarta Sans (loaded via `fetch` in the route handler)
- **Accent:** Green border or accent line matching the theme

### 5.9 Placeholder Content Plan

All pages will ship with dummy content for development and review:

| Content | Count | Details |
|---------|-------|---------|
| Works/Projects | 4 | Placeholder names ("Project Alpha", "Project Beta", etc.) with lorem descriptions, dummy screenshots, realistic tech tags |
| Blog Posts | 4 | Placeholder titles ("Building Scalable React Apps", "TypeScript Patterns I Use Daily", etc.) with realistic MDX content including code blocks |
| Tech Stack Icons | 12–16 | Real tech icons (React, Next.js, TypeScript, Tailwind, Node.js, PostgreSQL, Prisma, Docker, Figma, Git, etc.) |
| Experience Entries | 3 | Placeholder companies with realistic roles and date ranges |

### 5.10 Next.js Rendering Strategy

Every route uses the most optimal rendering method. The principle: **static by default, dynamic only when necessary**.

| Route | Rendering | Why |
|-------|-----------|-----|
| `/` (Home) | **SSG** (Static Site Generation) | Content changes only on deploy. Featured works and recent posts are read from MDX at build time. |
| `/works` | **SSG** | Project list is static, filtering is client-side. Rebuilt on deploy. |
| `/works/[slug]` | **SSG** with `generateStaticParams` | All project slugs known at build time. Pre-renders every project page. |
| `/blogs` | **SSG** | Post list is static, search/filter is client-side. Rebuilt on deploy. |
| `/blogs/[slug]` | **SSG** with `generateStaticParams` | All post slugs known at build time. View count is the only dynamic piece (handled client-side). |
| `/about` | **SSG** | Fully static content. |
| `/api/views/[slug]` | **Dynamic** (API Route) | Must run server-side to hit Upstash Redis on each request. Rate-limited. |
| `/og` | **Dynamic** (Route Handler) | Generates OG images on-demand via `next/og`. Cached by Vercel CDN. |
| `/sitemap.xml` | **SSG** | Generated at build time from all MDX files. |
| `/rss.xml` | **SSG** (Route Handler) | Generated at build time. |
| `not-found.tsx` | **SSG** | Static 404 page. |
| `error.tsx` | **Client Component** | Must be client-side to use `reset()`. |

#### Server Components vs Client Components

```
Server Components (default — zero JS shipped to browser):
├── app/layout.tsx            → Renders nav, footer, fonts, metadata
├── app/page.tsx              → Home page shell, all sections
├── app/not-found.tsx         → Custom 404 page
├── app/works/page.tsx        → Project grid (static data)
├── app/works/[slug]/page.tsx → Project detail (MDX compiled server-side)
├── app/blogs/page.tsx        → Blog list shell (static data)
├── app/blogs/[slug]/page.tsx → Blog post (MDX compiled server-side via next-mdx-remote)
└── app/about/page.tsx        → About page (static data)

Client Components ("use client" — interactive, JS shipped):
├── app/error.tsx                         → Error boundary (needs reset())
├── components/providers/QueryProvider.tsx → React Query context provider
├── components/shared/ThemeToggle.tsx      → Theme switching (needs DOM access)
├── components/shared/CommandPalette.tsx   → ⌘K modal (keyboard events, focus trap)
├── components/shared/ViewCounter.tsx      → Fires POST + displays live count via React Query
├── components/blogs/SearchBar.tsx         → Client-side search input with debounce
├── components/blogs/TagFilter.tsx         → Client-side tag filtering
├── components/blogs/CopyCodeButton.tsx    → Clipboard API + icon state transition
├── components/works/FilterBar.tsx         → Client-side category filtering
├── components/layout/MobileNav.tsx        → Sheet open/close state
├── components/layout/BackToTop.tsx        → Scroll listener + smooth scroll
└── components/home/TechStackMarquee.tsx   → Pause-on-hover animation state
```

**Rule of thumb:** If the component needs `useState`, `useEffect`, event handlers, or browser APIs → Client Component. Everything else stays as a Server Component for zero JS overhead.

### 5.11 Data Fetching & React Query (TanStack Query v5)

#### Setup

React Query is configured with a global `QueryClientProvider` in the root layout. The QueryClient is created once with optimized defaults.

```typescript
// lib/query-client.ts
import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Data is static-ish — don't refetch aggressively
        staleTime: 60 * 1000,           // 1 min before considered stale
        gcTime: 5 * 60 * 1000,          // 5 min before garbage collected
        refetchOnWindowFocus: false,     // Don't refetch when tab regains focus
        refetchOnReconnect: false,       // Don't refetch on network reconnect
        retry: 1,                        // Retry failed requests once
      },
    },
  });
}
```

```typescript
// components/providers/QueryProvider.tsx ("use client")
'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { makeQueryClient } from '@/lib/query-client';
import { useState } from 'react';

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => makeQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}
```

#### Query Key Convention

All query keys follow a consistent hierarchy for easy invalidation:

```typescript
// lib/query-keys.ts
export const queryKeys = {
  views: {
    all: ['views'] as const,
    bySlug: (slug: string) => ['views', slug] as const,
  },
} as const;
```

#### Where React Query Is Used

| Feature | Query Key | queryFn | staleTime | Notes |
|---------|-----------|---------|-----------|-------|
| **View count (read)** | `['views', slug]` | `GET /api/views/[slug]` | `Infinity` | Fetched once, updated optimistically on increment |
| **View count (increment)** | Mutation | `POST /api/views/[slug]` | — | Uses `useMutation` with optimistic update |

#### View Counter — Full React Query Implementation

```typescript
// hooks/use-view-count.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/lib/query-keys';

export function useViewCount(slug: string) {
  return useQuery({
    queryKey: queryKeys.views.bySlug(slug),
    queryFn: async () => {
      const res = await fetch(`/api/views/${slug}`);
      const data = await res.json();
      return data.count as number;
    },
    staleTime: Infinity,    // View count won't go stale — we update it optimistically
  });
}

export function useIncrementView(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/views/${slug}`, { method: 'POST' });
      const data = await res.json();
      return data.count as number;
    },
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: queryKeys.views.bySlug(slug) });

      // Snapshot previous value
      const previous = queryClient.getQueryData<number>(queryKeys.views.bySlug(slug));

      // Optimistically increment
      queryClient.setQueryData(queryKeys.views.bySlug(slug), (old: number | undefined) =>
        (old ?? 0) + 1
      );

      return { previous };
    },
    onError: (_err, _vars, context) => {
      // Rollback on error
      if (context?.previous !== undefined) {
        queryClient.setQueryData(queryKeys.views.bySlug(slug), context.previous);
      }
    },
    onSettled: () => {
      // Sync with server after mutation
      queryClient.invalidateQueries({ queryKey: queryKeys.views.bySlug(slug) });
    },
  });
}
```

#### What Does NOT Use React Query

Most data in this site is **static MDX content** fetched at build time by Server Components. React Query is only for runtime dynamic data.

| Data | Fetching Method | Why Not React Query |
|------|----------------|---------------------|
| Blog post list | `getAllPosts()` in Server Component | Static at build time — no client fetch needed |
| Blog post content | `getPostBySlug()` in Server Component | MDX compiled server-side via `next-mdx-remote` |
| Project list | `getAllWorks()` in Server Component | Static at build time |
| Project detail | `getWorkBySlug()` in Server Component | Static at build time |
| Tags | `getAllTags()` in Server Component | Static at build time |
| Experience data | Hardcoded or JSON in Server Component | Static data, changes only on deploy |

**Principle:** Don't wrap static data in React Query just because you can. Server Components + SSG already give you optimal caching (CDN-level). React Query is reserved for data that changes at runtime without a redeploy — in this site, that's just view counts.

---

## 6. SEO Strategy

### 6.1 Technical SEO

| Requirement | Implementation |
|------------|----------------|
| **Meta tags** | Dynamic `<title>` and `<meta name="description">` per page via `generateMetadata` |
| **Open Graph** | `og:title`, `og:description`, `og:image`, `og:url`, `og:type` on every page |
| **Twitter Cards** | `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image` |
| **Canonical URLs** | `<link rel="canonical">` on every page |
| **Sitemap** | Auto-generated `sitemap.xml` via `app/sitemap.ts` with `lastModified` dates |
| **Robots.txt** | Generated via `app/robots.ts`, allow all, reference sitemap |
| **RSS Feed** | `/rss.xml` for subscribers and feed readers |
| **JSON-LD** | `Person` on About, `BlogPosting` on blog posts, `WebSite` on homepage with `SearchAction` |
| **Heading hierarchy** | One `h1` per page, proper h2 → h3 nesting |
| **Image optimization** | `next/image` with `alt` text, WebP, responsive `sizes` |
| **URL structure** | Clean slugs (`/blogs/scalable-react-apps`), no IDs or query params |
| **Internal linking** | Blog posts link to related posts, works reference relevant blog posts |

### 6.2 Performance Targets (Core Web Vitals)

| Metric | Target | Strategy |
|--------|--------|----------|
| **LCP** | < 2.5s | SSG for all content, optimized images, font preloading |
| **INP** | < 200ms | Minimal client JS, code-splitting, lazy-load non-critical components |
| **CLS** | < 0.1 | Explicit image dimensions, `size-adjust` for fonts, reserved space |

### 6.3 Performance Optimizations

- **SSG:** All pages pre-rendered at build time
- **Fonts:** Self-hosted Plus Jakarta Sans, IBM Plex Mono, Lora via `next/font` with `font-display: swap`
- **Images:** WebP via `next/image`, lazy loading below fold
- **Code splitting:** Dynamic imports for command palette, syntax highlighter
- **Prefetching:** Next.js automatic link prefetching

### 6.4 Content SEO

- Descriptive, keyword-rich titles
- Unique 150–160 char meta descriptions per page
- Alt text on every image
- Cross-referencing between blog posts and works

---

## 7. Accessibility

| Requirement | Implementation |
|------------|----------------|
| Keyboard navigation | Full tab order, `focus-visible` rings, skip-to-content link |
| Screen readers | Semantic HTML (`nav`, `main`, `article`, `section`), ARIA labels |
| Color contrast | WCAG AA minimum (4.5:1 text, 3:1 large text) — verified both themes |
| Motion sensitivity | `prefers-reduced-motion` disables all animations |
| Focus management | Focus trap in command palette and mobile nav |
| Image alt text | Descriptive alt on all images |
| Form labels | Visible labels or `aria-label` on inputs |

---

## 8. Responsive Breakpoints

| Breakpoint | Width | Layout |
|-----------|-------|--------|
| Mobile | < 640px | Single column, hamburger nav, stacked cards |
| Tablet | 640–1024px | 2-column grids, full nav |
| Desktop | > 1024px | Full layout, max-width containers |

Max-widths: prose `768px`, grids `1152px`, hero `100%` with inner constraint.

---

## 9. Milestones

### Phase 1: Foundation (MVP)

- [ ] Project scaffolding (Next.js 15, TypeScript, Tailwind v4, pnpm)
- [ ] Import tweakcn theme into `globals.css`
- [ ] Self-host fonts (Plus Jakarta Sans, IBM Plex Mono, Lora)
- [ ] Environment variable setup (`.env.example`, `@t3-oss/env-nextjs` validation)
- [ ] shadcn/ui component installation and theming
- [ ] React Query provider setup (`QueryProvider`, `query-client.ts`, `query-keys.ts`)
- [ ] Global layout (Navbar, Footer, ThemeToggle, BackToTop, MobileNav)
- [ ] Custom 404 page (`not-found.tsx`) and error boundaries (`error.tsx`, `global-error.tsx`)
- [ ] Loading skeletons (`loading.tsx` for blogs, works routes)
- [ ] Favicon and web manifest (`manifest.ts`, `icon.tsx`)
- [ ] Home page (Hero, Featured Works, Recent Posts, Tech Stack, Connect)
- [ ] About page (Bio, Experience Timeline, Stack Grid)
- [ ] Works page (Project grid + filtering)
- [ ] Work detail page (MDX rendering via `next-mdx-remote`)
- [ ] Blogs page (Post list + search + tag filtering)
- [ ] Blog detail page (MDX + syntax highlighting + copy code button + related posts)
- [ ] Populate with placeholder content (4 works, 4 posts, 3 experience entries)
- [ ] SEO setup (metadata, sitemap, robots, JSON-LD, canonical URLs)
- [ ] Responsive design (mobile, tablet, desktop)
- [ ] Deploy to Vercel

### Phase 2: Polish

- [ ] Command palette (⌘K)
- [ ] View counter (Upstash Redis + React Query + rate limiting)
- [ ] OG image generation (`next/og` dynamic route)
- [ ] Animations (page transitions, hover effects, marquee, scramble text) via Motion for React
- [ ] RSS feed
- [ ] Dark/light mode polish and testing
- [ ] Performance audit (Lighthouse 90+ all metrics)
- [ ] Accessibility audit

### Phase 3: Content & Launch

- [ ] Replace placeholder content with real projects and posts
- [ ] Add real profile photo
- [ ] Configure custom domain
- [ ] Vercel Analytics + Speed Insights
- [ ] Submit sitemap to Google Search Console

---

## 10. Success Metrics

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 95 |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | ≥ 95 |
| First Contentful Paint | < 1.0s |
| Time to Interactive | < 2.0s |
| Core Web Vitals | All green (LCP < 2.5s, INP < 200ms, CLS < 0.1) |
| Blog indexing | Within 48 hours of publish |

---

## Decisions Log

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | **Green accent** via tweakcn oklch theme | User-selected theme with oklch color space for perceptual uniformity |
| 2 | **Plus Jakarta Sans / IBM Plex Mono / Lora** | Defined in tweakcn theme — modern sans + technical mono + editorial serif |
| 3 | **No testimonials section** | Not needed at launch |
| 4 | **Avatar placeholder** | Real photo to be added in Phase 3 |
| 5 | **Domain setup deferred** | Will configure in Phase 3 |
| 6 | **Placeholder content** | 4 works, 4 blog posts, 3 experience entries — all dummy data |
| 7 | **Local MDX, no CMS** | Zero cost, full ownership, version-controlled |
| 8 | **Upstash Redis for views** | Serverless, free tier, simple REST API |
| 9 | **Vercel deployment** | Best-in-class Next.js hosting, zero config |
| 10 | **TanStack Query (React Query) v5** | Caching, optimistic updates, deduplication for runtime dynamic data (view counts). Static content stays in Server Components. |
| 11 | **next-mdx-remote** for MDX | Most flexible MDX approach — server-side compilation, custom components, potential remote sources |
| 12 | **Motion for React** (framer-motion) | Full-featured animation library — page transitions, layout animations, gestures, stagger effects |
| 13 | **SSG by default, dynamic only for API routes** | All content pages pre-rendered at build time for best performance. Only `/api/views/[slug]` runs server-side at request time. |
| 14 | **Server Components by default** | Zero JS shipped for static content. Client Components only for interactive pieces (theme toggle, search, filters, view counter, command palette). |
| 15 | **Custom 404 + error boundaries** | Branded error pages for dead links and runtime failures |
| 16 | **Route-level loading.tsx skeletons** | Consistent loading states matching actual card layouts |
| 17 | **Dynamic OG images via next/og** | Rich preview cards on X/LinkedIn for every blog post and project |
| 18 | **@t3-oss/env-nextjs for env validation** | Fail fast at build time if env vars are missing |
| 19 | **@upstash/ratelimit on view counter** | 10 req/60s per IP — prevents abuse, uses same Redis instance |
| 20 | **Favicon + web manifest** | Polish detail — custom icon, theme color, PWA-ready |
| 21 | **Back-to-top button** | Floating button after 400px scroll, consistent with reference sites |
| 22 | **Related posts by tag** | 2–3 related posts on blog detail for SEO internal linking and engagement |

---

*This PRD is finalized and ready for development. Phase 1 may begin immediately.*
