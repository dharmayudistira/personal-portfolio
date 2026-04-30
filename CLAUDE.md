# CLAUDE.md

Coding mindset and rules for this project. Detailed reference under `.claude/`.

This is a personal portfolio: a single-author static site that publishes works and blog posts, with a thin layer of dynamic data (counters, future comments). Quality over scope. Each shipped piece reflects on the author personally.

---

## Philosophy

- **Static-first.** SSG > ISR > Dynamic. If a feature can render at build, render at build. The brief flash before counters resolve is the deliberate cost of full SSG; do not trade SSG away without flagging it explicitly.
- **Content-as-code.** Works live in TypeScript, blogs in MDX, both committed to git. Git is the CMS. Diffs, branches, and history are the editorial workflow.
- **Live data is opt-in.** Use Redis only when the static path can't express the requirement (counters, rate-limit state). Comments and guestbook will use Supabase, but only when those features actually start.
- **Single-author velocity.** No editorial workflow, no roles, no preview environments. Optimize for one person shipping fast.
- **Type strictly.** `Work` and `PostMeta` are sources of truth. Extend them; don't bypass them with `any`.
- **Be terse.** Code, comments, copy, commit messages. Sacrifice grammar for brevity.

---

## Strong DO

- **Read the relevant code before changing it.** No exceptions. Match existing patterns rather than inventing new structure.
- **Match the file split.** App-router pages stay thin. Logic in `lib/`. Generic UI in `components/shared/`. Page-scoped UI in `components/{home,about,blogs,works}/`. Shadcn primitives in `components/ui/`.
- **Prefer Server Components.** `"use client"` only for state, effects, browser APIs, or third-party client-only deps.
- **Use the existing fonts and color tokens.** All colors come from CSS vars in `app/globals.css`. Three fonts: Space Grotesk, Inter, IBM Plex Mono. See [`.claude/design.md`](.claude/design.md).
- **Update `updatedAt`** when you meaningfully change a work or post. Only the entry being touched. See [`.claude/content.md`](.claude/content.md).
- **Pre-render everything you can.** Add `generateStaticParams` to every dynamic segment that can be enumerated at build time.
- **Validate slugs at API boundaries.** Counter and write endpoints must check against the published list. See [`.claude/api.md`](.claude/api.md).
- **Rate-limit every POST.** `lib/ratelimit.ts` exposes pre-configured limiters; reuse one or add a new one. Never ship a public POST without one.
- **Use `next/image`** for every raster image. Provide `sizes` for non-`fill` cases.
- **Group all imports above `export const metadata`** in route files.

## Strong DON'T

- **Don't move static content into a database.** Works and blogs stay in git. Settled. See [`.claude/content.md`](.claude/content.md).
- **Don't use em dashes** in code, comments, commits, or docs. Use normal punctuation.
- **Don't add accent colors or new typefaces.** Monochromatic is the design language. If you think you need a new color, you don't, use existing tokens.
- **Don't write paragraph comments.** One short line max. Code names should explain *what*; comments only explain *why*.
- **Don't break SSG without flagging it.** Moving a page from static to dynamic is a deliberate trade-off, not a side effect. State the trade-off when proposing it.
- **Don't bypass the rate limiter** when adding new POST endpoints. Don't skip slug validation either.
- **Don't import server-only modules into client components.** `"use client"` + `fs` is a build break. Move the work to a server route or a server component.
- **Don't `any` your way out** of a type error. Fix the source.
- **Don't commit unverified.** If there's any doubt, run `pnpm build` before committing.
- **Don't create new top-level folders** without a reason that fits the existing pattern.
- **Don't provision Supabase yet.** Comments and guestbook are deferred. See roadmap below.

---

## Architecture at a glance

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 App Router | Turbopack, React 19 |
| Language | TypeScript 5 strict | Target ES2022 |
| Styling | Tailwind v4 + shadcn/ui | CSS-first config in `globals.css` |
| Content | MDX (blogs) + TS objects (works) | gray-matter frontmatter |
| Data | Upstash Redis (counters) | + `@upstash/ratelimit` |
| State | TanStack Query v5 | Single `QueryClient`, shared keys |
| Highlighting | Shiki singleton | Preloaded langs in `lib/highlight.ts` |
| Hosting | Vercel | + Vercel Analytics |

Full stack table and folder layout: [`.claude/stack.md`](.claude/stack.md).

---

## Reference index

| Topic | File | Read when |
|---|---|---|
| Stack, commands, env, structure | [`.claude/stack.md`](.claude/stack.md) | Adding deps, new env var, debugging build, surveying layout |
| Content (works + blogs + MDX) | [`.claude/content.md`](.claude/content.md) | Adding/editing a work or blog post, MDX components |
| Design system | [`.claude/design.md`](.claude/design.md) | Touching styles, fonts, color tokens, theme toggle |
| API + Redis + rate limit | [`.claude/api.md`](.claude/api.md) | Adding/editing routes under `app/api/`, client counter logic |
| SEO (metadata, JSON-LD, sitemap, RSS) | [`.claude/seo.md`](.claude/seo.md) | Editing metadata, structured data, OG, security headers |

---

## Common workflows (one-liners)

- **Add a work** → edit `lib/data/works.ts`. Set `createdAt = updatedAt = today`. Drop hero image under `public/works/`. Build to verify.
- **Add a blog post** → create `app/blogs/_content/<slug>.mdx` with frontmatter (`published: true`, `date = updatedAt = today`).
- **Edit existing content** → bump `updatedAt` only on the entry being touched. Sitemap, RSS, and JSON-LD all derive from it.
- **Add an API route** → server route under `app/api/`, params as `Promise<...>`, rate-limit POST, validate slug-like inputs.
- **Add a UI primitive** → if generic and shared, `components/shared/`. If page-scoped, `components/{page}/`. If a shadcn primitive, regenerate via shadcn rather than hand-rolling.

---

## Roadmap (not implemented)

| Feature | Backend | Status |
|---|---|---|
| Comments per blog post | Supabase Postgres | Deferred. No timeline. |
| Guestbook | Supabase Postgres | Deferred. Anonymous + optional social-login, soft moderation via copy. |

**Do NOT provision Supabase** until one of these features actually starts. No premature scaffolding, no env vars, no client wiring.

When the time comes:
- Comments live in their own table, keyed by blog slug as a string. The post stays in MDX.
- Guestbook is its own table, no slug coupling.
- Supabase is the predetermined backend. Don't re-debate Giscus or alternatives unless this decision is reopened.

---

## Commands

```bash
pnpm dev        # Dev server on localhost:3000
pnpm build      # Production build (verifies types + SSG)
pnpm start      # Serve production build locally
pnpm lint       # ESLint flat config
```

Package manager: **pnpm**. No test suite. CI is the Vercel build.

---

## Environment

```bash
NEXT_PUBLIC_SITE_URL        # Canonical site URL
UPSTASH_REDIS_REST_URL      # Upstash Redis REST endpoint
UPSTASH_REDIS_REST_TOKEN    # Upstash Redis REST token
```

Production canonical: `https://www.dharma-yudistira.com`.
