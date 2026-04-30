# Content Model

Detailed reference. See [`CLAUDE.md`](../CLAUDE.md) for the content-as-code philosophy.

## Works (`lib/data/works.ts`)

All portfolio entries live as TypeScript objects in a single `_WORKS` array. The exported `WORKS` is sorted by `updatedAt` descending, which controls display order on the works page.

### `Work` type fields

| Field | Purpose |
|---|---|
| `slug` | URL segment and ID |
| `title` | Display title |
| `seoTitle` | Overrides `<title>` / OG only |
| `description` | Short description (cards + SEO) |
| `longDescription` | Paragraph on detail page |
| `image` | Hero image path (relative to `/public`) |
| `ogImageDimensions` | OG image w/h (default 1200x630) |
| `category` | `"Web" \| "Mobile" \| "Desktop" \| "Open Source"` |
| `tags` | Stack/technology tags |
| `createdAt` / `updatedAt` | ISO strings (`YYYY-MM-DD`) |
| `role` | Your role in the project |
| `liveUrls` | `{ label, url }[]` |
| `repoUrl` | Optional source link |
| `featured` | Surfaces on homepage |
| `confidential` | Renders NDA placeholder instead of sections |
| `impacts` | Bullet contributions under NDA block |
| `sections` | Full case study (see below) |

### `sections` schema

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

- `sections` present → renders Problem / Solution / Technical Recap.
- `sections` absent + `confidential: true` → renders NDA disclaimer + `impacts[]`.

### `updatedAt` rule

When you meaningfully change a work entry (any field), set its `updatedAt` to today's date (`YYYY-MM-DD`). Only the entry being changed. `createdAt` is set once and never changed.

## Blog Posts (`app/blogs/_content/*.mdx`)

Each `.mdx` has a gray-matter frontmatter header:

```yaml
---
title: "Post title"
description: "One-line description"
date: "2026.03.21"           # YYYY.MM.DD, publish date, never changes
updatedAt: "2026.03.21"      # Update manually when content changes
tags: ["Tag1", "Tag2"]
readTime: "5 min"
published: true              # false = hidden from listings
cover: /blogs/slug/cover.png # Optional
kicker: "OPTIONAL_KICKER"    # Optional, displayed above title in listings
---
```

`lib/posts.ts` reads all `.mdx` files and caches the result module-level **in production only**. Dev gets fresh reads via HMR. Only `published: true` posts return.

The MDX content itself loads via dynamic `import()` in `app/blogs/[slug]/page.tsx`.

### `updatedAt` rule

When a post's content meaningfully changes, set `updatedAt` to today (`YYYY.MM.DD`). `date` is the original publish date.

## MDX Components (`mdx-components.tsx`)

Global component map. HTML elements are styled variants. Two custom components:

```mdx
<Callout type="note">...</Callout>      # Also: "warning" | "tip"
<CodeBlock language="ts" filename="example.ts">{`...`}</CodeBlock>
```

`CodeBlock` is a **server async component** that calls `highlightCode()` (Shiki singleton) at render time. It accepts either a `code` prop (string) or `children` (MDX usage).

## Adding a new work

1. Add an entry to `_WORKS` in `lib/data/works.ts`.
2. Place hero image under `public/works/<slug>.<ext>`.
3. Set `createdAt` and `updatedAt` to today.
4. If under NDA: set `confidential: true` and provide `impacts[]`.
5. Otherwise provide full `sections`.
6. Run `pnpm build` to confirm type validity and SSG generation.

## Adding a new blog post

1. Create `app/blogs/_content/<slug>.mdx`.
2. Add frontmatter (see schema above). Set `date = updatedAt = today`.
3. Place cover image at `public/blogs/<slug>/cover.<ext>` if used.
4. Use `<Callout>` and `<CodeBlock>` from MDX as needed.
5. Run `pnpm build` to confirm.

## Editing existing content

- Bump `updatedAt` on that entry only. Sitemap, RSS, and JSON-LD `dateModified` all derive from it.
- Title or description changes propagate automatically to OG / Twitter cards on next build.
