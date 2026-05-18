import { redis } from "@/lib/redis"
import { getClientIp, pageviewRatelimit } from "@/lib/ratelimit"

const NO_STORE = { "Cache-Control": "no-store" }

export async function GET() {
  const views = (await redis.get<number>("pageviews:total")) ?? 0
  return Response.json({ views }, { headers: NO_STORE })
}

export async function POST(req: Request) {
  const ip = getClientIp(req)
  const { success } = await pageviewRatelimit.limit(ip)
  if (!success) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: NO_STORE,
    })
  }

  const views = await redis.incr("pageviews:total")
  return Response.json({ views }, { headers: NO_STORE })
}
