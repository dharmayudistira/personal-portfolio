# API Routes & Server Conventions

Detailed reference. See [`CLAUDE.md`](../CLAUDE.md) for the rules around POST endpoints.

## Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/pageviews` | GET | Read total visit counter (`pageviews:total`) |
| `/api/pageviews` | POST | Increment total visit counter, rate-limited |
| `/api/views/[slug]` | GET | Read per-blog view count (`views:{slug}`) |
| `/api/views/[slug]` | POST | Increment per-blog view count, rate-limited |

Both view-count routes validate `slug` against `getAllPosts()` and return `404` for unknown slugs so attackers can't create arbitrary `views:<x>` keys.

## Storage (`lib/redis.ts`)

Upstash Redis via REST. Single client exported from `lib/redis.ts`. Initialized from `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.

Keyspace:

| Key | Type | Purpose |
|---|---|---|
| `pageviews:total` | int | Global counter |
| `views:{slug}` | int | Per-blog counter |
| `rl:pageviews:*` | rate-limit | State for `/api/pageviews` limiter |
| `rl:views:*` | rate-limit | State for `/api/views/[slug]` limiter |

## Rate limiting (`lib/ratelimit.ts`)

Two pre-configured `Ratelimit` instances:

| Name | Algorithm | Window | Limit | Identifier |
|---|---|---|---|---|
| `pageviewRatelimit` | sliding window | 1 min | 5 | client IP |
| `viewsRatelimit` | sliding window | 1 hour | 3 | `{ip}:{slug}` |

`getClientIp(req)` extracts from `x-forwarded-for` (first hop), falls back to `x-real-ip`, defaults to `"anon"`. On Vercel, `x-forwarded-for` is always populated.

On rate-limit miss for `/api/views/[slug]` POST, the route returns the current count rather than 429 so the UI doesn't break. For `/api/pageviews` POST, it returns 429.

## Conventions for new POST routes

1. Always rate-limit. Reuse an existing limiter if the shape fits, or add a new one to `lib/ratelimit.ts`.
2. Validate any user-controlled key (slug, id) against an allow-list. Don't let the client invent Redis keys.
3. On invalid input, return `404` rather than `400` (don't leak which keys exist via error responses).
4. Return JSON via `Response.json(...)`.
5. If the endpoint is fire-and-forget on the client, dedupe on the client too (see "Client conventions" below).

## Conventions for dynamic params (Next.js 16)

`params` is a `Promise`. Always:

```ts
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  // ...
}
```

Same in pages: type as `params: Promise<{ slug: string }>` and `await params` in the body and in `generateMetadata`.

## Client-side conventions

- Counters use TanStack Query (`useQuery` / `useMutation`). Single shared cache key per resource: `["pageviews"]`, `["views", slug]`.
- POST mutations call `queryClient.setQueryData(...)` on success to seed the cache.
- Idempotent client-side dedupe via `sessionStorage` for fire-and-forget POSTs (e.g., view tracking) so StrictMode and revisits don't double-count.
- When `increment` is true on `ViewCounter`, the GET query is disabled (`enabled: !increment`) — the POST already returns the new count.
