import fs from "fs"
import path from "path"
import matter from "gray-matter"

const CONTENT_DIR = path.join(process.cwd(), "app/blogs/_content")

let _cache: PostMeta[] | null = null
const CACHE_ENABLED = process.env.NODE_ENV === "production"

export type PostMeta = {
  slug: string
  title: string
  description: string
  date: string
  updatedAt?: string
  tags: string[]
  readTime: string
  published: boolean
  cover?: string
  kicker?: string
}

export type PostTagGroup = { label: string; tags: string[] }

/** Read all .mdx files and extract frontmatter metadata. Cached in production only. */
export function getAllPosts(): PostMeta[] {
  if (CACHE_ENABLED && _cache) return _cache

  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx"))

  const posts = files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8")
      const { data } = matter(raw)
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: data.title,
        description: data.description,
        date: data.date,
        updatedAt: data.updatedAt,
        tags: data.tags ?? [],
        readTime: data.readTime ?? "",
        published: data.published ?? false,
        cover: data.cover,
        kicker: data.kicker,
      } satisfies PostMeta
    })
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date))

  if (CACHE_ENABLED) _cache = posts
  return posts
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}

/** Derive tag groups from actual post tags */
export function getPostTagGroups(): PostTagGroup[] {
  const allTags = [...new Set(getAllPosts().flatMap((p) => p.tags))]
  return [{ label: "Topics", tags: allTags }]
}
