import { getAllPosts } from "@/lib/posts"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export function GET() {
  const items = getAllPosts()
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blogs/${post.slug}</link>
      <description>${escapeXml(post.description)}</description>
      <pubDate>${new Date(post.date.replace(/\./g, "-")).toUTCString()}</pubDate>
      <guid isPermaLink="true">${BASE_URL}/blogs/${post.slug}</guid>
    </item>`
    )
    .join("")

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Dharma Yudistira — Blog</title>
    <link>${BASE_URL}</link>
    <description>Technical writing on distributed systems, frontend architecture, and engineering.</description>
    <language>en</language>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  })
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
