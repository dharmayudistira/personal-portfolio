import Link from "next/link"
import { cn } from "@/lib/utils"
import { getAllPosts } from "@/lib/posts"

function getRecentPosts() {
  return getAllPosts()
    .slice(0, 3)
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.description,
      date: p.date.replace(/\./g, "_"),
      tag: p.tags[0]?.replace(/\s/g, "_") ?? "",
    }))
}

export function RecentPosts() {
  return (
    <section className="relative py-16 sm:py-32">
      <div className="mb-10 sm:mb-16 flex items-end justify-between">
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            02 // KNOWLEDGE_BASE
          </span>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight sm:text-5xl">
            Recent{" "}<br className="sm:hidden" />Posts
          </h2>
        </div>
        <Link
          href="/blogs"
          className="border-b border-foreground/20 pb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          All_Posts
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {getRecentPosts().map((post, index) => (
          <Link
            key={post.slug}
            href={`/blogs/${post.slug}`}
            className={cn(
              "group/post relative flex flex-col border-foreground/5 px-8 py-10",
              "border-b lg:border-b-0 lg:border-r last:border-r-0 last:border-b-0",
              index === 0 && "lg:border-l",
              "lg:border-l"
            )}
          >
            {/* Hover gradient */}
            <div className="pointer-events-none absolute inset-0 size-full bg-gradient-to-b from-foreground/[0.03] to-transparent opacity-0 transition duration-200 group-hover/post:opacity-100" />

            {/* Date */}
            <div className="relative z-10 mb-6 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
              {post.date}
            </div>

            {/* Title with accent bar */}
            <div className="relative z-10 mb-3">
              <div className="absolute -left-8 inset-y-0 h-6 w-1 origin-center rounded-br-full rounded-tr-full bg-foreground/10 transition-all duration-200 group-hover/post:h-8 group-hover/post:bg-foreground" />
              <h3 className="inline-block font-heading text-xl font-bold tracking-tight transition duration-200 group-hover/post:translate-x-1">
                {post.title}
              </h3>
            </div>

            {/* Excerpt */}
            <p className="relative z-10 mb-8 line-clamp-2 text-sm font-light leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>

            {/* Tag — pushed to bottom */}
            <div className="relative z-10 mt-auto flex items-center justify-end">
              <span className="border border-foreground/10 px-2.5 py-1 font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
                {post.tag}
              </span>
            </div>
          </Link>
        ))}
      </div>

    </section>
  )
}
