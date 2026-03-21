import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import type { Work } from "@/lib/data/works"

type ProjectCardProps = {
  project: Work
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group">
      <Link href={`/works/${project.slug}`} className="block">
        {/* Thumbnail */}
        <div className="relative mb-6 aspect-video overflow-hidden bg-background">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              {project.title}
            </h3>
            <span className="p-2 bg-secondary text-foreground transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-4" />
            </span>
          </div>

          <p className="max-w-[90%] text-sm font-light leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="border border-foreground/5 bg-secondary/30 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  )
}
