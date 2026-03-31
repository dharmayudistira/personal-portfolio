import { redis } from "@/lib/redis"

export async function GET() {
  const views = (await redis.get<number>("pageviews:total")) ?? 0
  return Response.json({ views })
}

export async function POST() {
  const views = await redis.incr("pageviews:total")
  return Response.json({ views })
}
