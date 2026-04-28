import Link from "next/link"
import Image from "next/image"
import { Clock } from "lucide-react"
import type { PostMeta } from "@/lib/posts"

type PostCardProps = {
  post: PostMeta
  priority?: boolean
}

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="group pb-8">
      <Link href={`/blogs/${post.slug}`} className="block">
        {/* Thumbnail */}
        <div className="relative mb-6 aspect-video overflow-hidden bg-background">
          {post.cover ? (
            <Image
              src={post.cover}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary to-background">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/40">
                [{post.slug}]
              </span>
            </div>
          )}
        </div>

        {/* Meta row */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {post.date}
          </span>
          {post.kicker ? (
            <>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/40">
                {"//"}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-foreground">
                {post.kicker.replace(/\s/g, "_")}
              </span>
            </>
          ) : null}
        </div>

        {/* Title */}
        <h3 className="mb-2 font-heading text-xl font-bold tracking-tight transition-colors group-hover:text-primary">
          {post.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        {/* Read time + tags */}
        <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3" />
            {post.readTime}
          </span>
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="border border-foreground/5 bg-secondary/30 px-2 py-0.5 text-[9px]"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-[9px] text-muted-foreground/50">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
      </Link>
    </article>
  )
}
