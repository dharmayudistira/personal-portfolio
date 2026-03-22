import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Clock } from "lucide-react"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { SectionDivider } from "@/components/shared/section-divider"
import { ViewCounter } from "@/components/shared/view-counter"

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: `${post.title} — Dharma Yudistira`,
      description: post.description,
      type: "article",
      publishedTime: post.date.replace(/\./g, "-"),
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  const posts = getAllPosts()
  const currentIndex = posts.findIndex((p) => p.slug === slug)
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null

  // Related posts: share at least one tag
  const related = posts
    .filter(
      (p) => p.slug !== slug && p.tags.some((t) => post.tags.includes(t))
    )
    .slice(0, 2)

  // Dynamic MDX import
  const { default: PostContent } = await import(
    `@/app/blogs/_content/${slug}.mdx`
  )

  return (
    <div className="px-6 lg:px-12">
      <div className="pt-24" />

      <SectionDivider label="DOC:00" />

      {/* Header */}
      <header className="py-12 sm:py-20">
        <Link
          href="/blogs"
          className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back_to_Blogs
        </Link>

        <h1 className="mb-8 max-w-4xl font-heading text-3xl font-bold tracking-tighter sm:text-5xl md:text-7xl">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span>{post.date}</span>
          <span className="flex items-center gap-1.5">
            <Clock className="size-3" />
            {post.readTime}
          </span>
          <ViewCounter slug={post.slug} increment />
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="border border-foreground/10 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <SectionDivider label="IMG:01" />

      {/* Feature image */}
      <section className="py-8 sm:py-12">
        <div className="relative aspect-[16/8] w-full overflow-hidden bg-secondary">
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary grayscale transition-all duration-700 hover:grayscale-0">
            <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground/40">
              [{post.slug}_cover]
            </span>
          </div>
        </div>
      </section>

      <SectionDivider label="TXT:02" />

      {/* Content */}
      <div className="grid grid-cols-1 gap-12 py-12 sm:py-20 md:grid-cols-12">
        {/* Main content */}
        <article className="md:col-span-8">
          <PostContent />
        </article>

        {/* Sidebar */}
        <aside className="self-start md:col-span-4 md:sticky md:top-24">
          <div className="space-y-8">
            {/* Metadata */}
            <div className="border border-foreground/5 p-6">
              <h4 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Metadata_Extract
              </h4>
              <div className="space-y-4">
                <div>
                  <span className="mb-1 block font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50">
                    Tags:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-foreground/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="mb-1 block font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50">
                    Status:
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="size-1.5 animate-pulse rounded-full bg-foreground" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                      Published_Live
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Related posts */}
            {related.length > 0 && (
              <div className="border border-foreground/5 p-6">
                <h4 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Related_Entries
                </h4>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link
                      key={r.slug}
                      href={`/blogs/${r.slug}`}
                      className="group block"
                    >
                      <span className="mb-1 block font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50">
                        {r.date}
                      </span>
                      <span className="text-sm font-medium leading-snug transition-colors group-hover:text-primary">
                        {r.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>

      <SectionDivider label="NAV:03" />

      {/* Prev/Next navigation */}
      <div className="grid grid-cols-2">
        {prevPost ? (
          <div className="py-12 pr-8">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              ← Previous
            </span>
            <Link
              href={`/blogs/${prevPost.slug}`}
              className="font-heading text-lg font-bold tracking-tight transition-colors hover:text-primary hover:underline"
            >
              {prevPost.title}
            </Link>
          </div>
        ) : (
          <div />
        )}
        {nextPost ? (
          <div className="py-12 pl-8 text-right">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Next →
            </span>
            <Link
              href={`/blogs/${nextPost.slug}`}
              className="font-heading text-lg font-bold tracking-tight transition-colors hover:text-primary hover:underline"
            >
              {nextPost.title}
            </Link>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
