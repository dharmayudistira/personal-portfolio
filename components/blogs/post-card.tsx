import Link from "next/link"
import { Clock } from "lucide-react"
import type { PostMeta } from "@/lib/posts"

type PostCardProps = {
  post: PostMeta
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group">
      <Link href={`/blogs/${post.slug}`} className="block">
        {/* Thumbnail */}
        <div className="relative mb-6 aspect-video overflow-hidden bg-background">
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary to-background grayscale transition-all duration-500 group-hover:grayscale-0">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/40">
              [{post.slug}]
            </span>
          </div>
        </div>

        {/* Meta row */}
        <div className="mb-3 flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {post.date}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="border border-foreground/5 bg-secondary/30 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="mb-4 font-heading text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {/* Read time + views */}
        <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3" />
            {post.readTime}
          </span>
        </div>
      </Link>
    </article>
  )
}
