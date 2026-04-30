# SEO & Metadata

Detailed reference. See [`CLAUDE.md`](../CLAUDE.md) for principles.

## Per-page metadata

Every page exports `metadata` (or `generateMetadata` for dynamic). Required fields:

- `title` (template applied via root layout)
- `description`
- `alternates.canonical` (path only — `metadataBase` resolves it to a full URL)
- `openGraph` (type, title, description, url, images)
- `twitter` (card, site, creator, title, description)

For articles (`/blogs/[slug]`), additionally:

- `openGraph.publishedTime` from `post.date` (dot-to-dash)
- `openGraph.modifiedTime` from `post.updatedAt ?? post.date`
- `openGraph.tags` from `post.tags`

## JSON-LD

Every detail page (`/works/[slug]`, `/blogs/[slug]`) and the home page render an inline `<script type="application/ld+json">` containing a `@graph`:

| Page type | Graph entries |
|---|---|
| Home | `Person` + `WebSite` |
| Work detail | `SoftwareApplication` + `BreadcrumbList` |
| Blog detail | `BlogPosting` + `BreadcrumbList` |

The Person identity anchor is `https://www.dharma-yudistira.com/#person`. All other entries reference it as `author` / `publisher`.

For `BlogPosting`:
- `datePublished` from `post.date`
- `dateModified` from `post.updatedAt ?? post.date`

## Sitemap (`app/sitemap.ts`)

- Static pages (`/`, `/works`, `/blogs`, `/about`) with hand-tuned priority + change frequency.
- Work pages: `lastModified` from `work.updatedAt`.
- Blog pages: `lastModified` from `post.updatedAt ?? post.date` (parsed from dot-format).

## RSS (`app/rss.xml/route.ts`)

Hand-built RSS 2.0 feed. Iterates `getAllPosts()`, escapes XML entities. Pub dates parsed from `post.date`.

## Robots (`app/robots.ts`)

`allow: "/"` for all user agents. Sitemap link points at `${BASE_URL}/sitemap.xml`.

## OG Image (`app/opengraph-image.tsx`)

Dynamically generated 1200x630 image via `next/og`. Used as the default OG image when a page or post lacks a specific cover.

## Canonical site URL

Controlled by `NEXT_PUBLIC_SITE_URL`. Production: `https://www.dharma-yudistira.com`. The `metadataBase` is set in `app/layout.tsx` so all `alternates.canonical` paths resolve correctly.

## Security headers (`next.config.ts`)

Applied to all routes:

- `Strict-Transport-Security` — 2y, preload
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`
- `Content-Security-Policy: frame-ancestors 'self'; form-action 'self'; base-uri 'self'`

If you add inline scripts beyond the existing JSON-LD blocks, audit the CSP before shipping.

## When you change a work or post

1. Bump `updatedAt` on that entry only. Sitemap + dateModified + RSS all derive from it.
2. Title or description changes propagate to OG / Twitter cards next build.
3. Re-run `pnpm build` to confirm SSG and metadata.
