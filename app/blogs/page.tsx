import type { Metadata } from "next"
import { PostGrid } from "@/components/blogs/post-grid"

export const metadata: Metadata = {
  title: "Blogs",
  description:
    "Technical writing on frontend architecture, mobile development, and the intersection of engineering and product design.",
  openGraph: {
    title: "Blogs — Dharma Yudistira",
    description:
      "Technical writing on frontend architecture, mobile development, and the intersection of engineering and product design.",
  },
}
import { SectionDivider } from "@/components/shared/section-divider"
import { getAllPosts, getPostTagGroups } from "@/lib/posts"

export default function BlogsPage() {
  const posts = getAllPosts()
  const tagGroups = getPostTagGroups()

  return (
    <div className="flex flex-1 flex-col px-6 lg:px-12">
      {/* Header */}
      <header className="pb-16 pt-32">
        <div className="mb-4 flex items-center gap-3">
          <span className="size-2 animate-pulse bg-foreground" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            System_Log // Archive.04
          </span>
        </div>
        <h1 className="mb-6 font-heading text-6xl font-bold uppercase tracking-tighter md:text-8xl">
          Blogs
        </h1>
        <p className="max-w-2xl font-light leading-relaxed text-muted-foreground">
          Technical writing on distributed systems, frontend architecture, and
          the intersection of engineering and product design.
        </p>
      </header>

      <SectionDivider />

      {/* Filter + Grid + Load more */}
      <div className="flex-1 pt-16">
        <PostGrid posts={posts} tagGroups={tagGroups} />
        <div className="mt-16 mb-16 flex justify-center">
          <button className="border border-foreground/10 px-10 py-3 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground">
            Initialize_Load_Sequence
          </button>
        </div>
      </div>

      <div className="mb-[calc(var(--spacing)*-3)]">
        <SectionDivider label="SYS:END" />
      </div>
    </div>
  )
}
