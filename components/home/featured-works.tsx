import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getFeaturedWorks } from "@/lib/data/works"

const FEATURED_PROJECTS = getFeaturedWorks()

export function FeaturedWorks() {
  return (
    <section className="relative py-32">
      <div className="mb-20 flex items-end justify-between">
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            01 // PROJECT_INDEX
          </span>
          <h2 className="font-heading text-5xl font-bold uppercase tracking-tight">
            Featured Works
          </h2>
        </div>
        <Link
          href="/works"
          className="border-b border-foreground/20 pb-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          All_Works
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {FEATURED_PROJECTS.map((project) => (
          <Link
            key={project.slug}
            href={`/works/${project.slug}`}
            className="group block overflow-hidden bg-secondary transition-colors duration-300 hover:bg-muted"
          >
            <div className="aspect-video overflow-hidden bg-background">
              <Image
                src={project.image}
                alt={project.title}
                width={640}
                height={360}
                className="size-full object-cover opacity-60 transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
              />
            </div>

            <div className="p-8">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-heading text-2xl font-bold uppercase tracking-tight">
                  {project.title}
                </h3>
                <ArrowUpRight className="size-5 text-foreground/50 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
              </div>

              <p className="mb-8 text-sm font-light leading-relaxed text-muted-foreground">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border border-foreground/5 bg-background/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
