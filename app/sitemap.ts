import type { MetadataRoute } from "next"
import { WORKS } from "@/lib/data/works"
import { getAllPosts } from "@/lib/posts"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/works`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  const workPages: MetadataRoute.Sitemap = WORKS.map((work) => ({
    url: `${BASE_URL}/works/${work.slug}`,
    lastModified: new Date(work.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE_URL}/blogs/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticPages, ...workPages, ...blogPages]
}
