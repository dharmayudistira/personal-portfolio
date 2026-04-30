import { redis } from "@/lib/redis"
import { getClientIp, pageviewRatelimit } from "@/lib/ratelimit"

export async function GET() {
  const views = (await redis.get<number>("pageviews:total")) ?? 0
  return Response.json({ views })
}

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const { success } = await pageviewRatelimit.limit(ip)
  if (!success) return new Response("Too Many Requests", { status: 429 })

  const views = await redis.incr("pageviews:total")
  return Response.json({ views })
}
