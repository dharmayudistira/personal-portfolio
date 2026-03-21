import { redis } from "@/lib/redis"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const views = (await redis.get<number>(`views:${slug}`)) ?? 0

  return Response.json({ views })
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const views = await redis.incr(`views:${slug}`)

  return Response.json({ views })
}
