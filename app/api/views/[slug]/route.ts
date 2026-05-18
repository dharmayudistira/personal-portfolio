import { redis } from "@/lib/redis"
import { getAllPosts } from "@/lib/posts"
import { getClientIp, viewsRatelimit } from "@/lib/ratelimit"

const NO_STORE = { "Cache-Control": "no-store" }

function isKnownSlug(slug: string): boolean {
  return getAllPosts().some((p) => p.slug === slug)
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  if (!isKnownSlug(slug)) {
    return new Response("Not Found", { status: 404, headers: NO_STORE })
  }

  const views = (await redis.get<number>(`views:${slug}`)) ?? 0
  return Response.json({ views }, { headers: NO_STORE })
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  if (!isKnownSlug(slug)) {
    return new Response("Not Found", { status: 404, headers: NO_STORE })
  }

  const ip = getClientIp(req)
  const { success } = await viewsRatelimit.limit(`${ip}:${slug}`)
  if (!success) {
    // Rate-limited: return current count with 200 so the UI keeps rendering.
    // Pageviews route returns 429; per-post views silently no-ops to avoid UI errors on refresh.
    const views = (await redis.get<number>(`views:${slug}`)) ?? 0
    return Response.json({ views }, { headers: NO_STORE })
  }

  const views = await redis.incr(`views:${slug}`)
  return Response.json({ views }, { headers: NO_STORE })
}
