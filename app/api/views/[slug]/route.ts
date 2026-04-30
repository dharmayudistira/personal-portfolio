import { redis } from "@/lib/redis"
import { getAllPosts } from "@/lib/posts"
import { getClientIp, viewsRatelimit } from "@/lib/ratelimit"

function isKnownSlug(slug: string): boolean {
  return getAllPosts().some((p) => p.slug === slug)
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  if (!isKnownSlug(slug)) return new Response("Not Found", { status: 404 })

  const views = (await redis.get<number>(`views:${slug}`)) ?? 0
  return Response.json({ views })
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  if (!isKnownSlug(slug)) return new Response("Not Found", { status: 404 })

  const ip = getClientIp(req)
  const { success } = await viewsRatelimit.limit(`${ip}:${slug}`)
  if (!success) {
    const views = (await redis.get<number>(`views:${slug}`)) ?? 0
    return Response.json({ views })
  }

  const views = await redis.incr(`views:${slug}`)
  return Response.json({ views })
}
