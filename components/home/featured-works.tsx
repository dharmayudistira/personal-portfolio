import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { getFeaturedWorks } from "@/lib/data/works"

const FEATURED_PROJECTS = getFeaturedWorks()
const [heroProject, ...secondaryProjects] = FEATURED_PROJECTS

export function FeaturedWorks() {
  return (
    <section className="relative py-16 sm:py-32">
      <div className="mb-12 sm:mb-20 flex items-end justify-between">
        <div>
          <span className="mb-3 block font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            01 // PROJECT_INDEX
          </span>
          <h2 className="font-heading text-3xl font-bold uppercase tracking-tight sm:text-5xl">
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

      <div className="space-y-10">
        {/* Hero project — full width */}
        {heroProject && (
          <Link
            href={`/works/${heroProject.slug}`}
            className="group block overflow-hidden bg-secondary transition-colors duration-300 hover:bg-muted"
          >
            <div className="aspect-[21/9] overflow-hidden bg-background">
              {heroProject.image ? (
                <Image
                  src={heroProject.image}
                  alt={heroProject.title}
                  width={1200}
                  height={514}
                  className="size-full object-cover opacity-[0.82] transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
                />
              ) : (
                <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary">
                  <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground/40">
                    [{heroProject.slug}]
                  </span>
                </div>
              )}
            </div>

            <div className="grid gap-6 p-8 sm:grid-cols-[1fr_auto] sm:items-start sm:p-10">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <h3 className="font-heading text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                    {heroProject.title}
                  </h3>
                </div>
                <p className="max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
                  {heroProject.description}
                </p>
              </div>
              <div className="flex flex-col items-start gap-4 sm:items-end">
                <ArrowUpRight className="size-6 text-foreground/50 transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                <div className="flex flex-wrap gap-2 sm:justify-end">
                  {heroProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="border border-foreground/5 bg-background/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Secondary projects — 3-col grid */}
        {secondaryProjects.length > 0 && (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
            {secondaryProjects.map((project) => (
              <Link
                key={project.slug}
                href={`/works/${project.slug}`}
                className="group block overflow-hidden bg-secondary transition-colors duration-300 hover:bg-muted"
              >
                <div className="aspect-video overflow-hidden bg-background">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={640}
                      height={360}
                      className="size-full object-cover opacity-[0.82] transition-all duration-700 group-hover:scale-[1.02] group-hover:opacity-100"
                    />
                  ) : (
                    <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary">
                      <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground/40">
                        [{project.slug}]
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-heading text-lg font-bold uppercase tracking-tight">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="size-4 text-foreground/50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>

                  <p className="mb-6 text-sm font-light leading-relaxed text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
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
        )}
      </div>
    </section>
  )
}
