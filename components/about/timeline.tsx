import { EXPERIENCES } from "@/lib/data/about"

export function Timeline() {
  return (
    <section className="py-12 sm:py-20">
      {/* Section header */}
      <div className="mb-10 sm:mb-16">
        <span className="mb-2 block font-mono text-[10px] text-muted-foreground/40">
          SEC_02
        </span>
        <h3 className="font-heading text-2xl font-bold uppercase tracking-tight">
          Technical_Timeline
        </h3>
      </div>

      {/* Timeline entries */}
      <div>
        {EXPERIENCES.map((exp) => (
            <div key={`${exp.company}-${exp.title}`} className="pb-10 last:pb-0 sm:pb-16">
              {/* Content */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_4fr]">
                {/* Date */}
                <div className="pt-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {exp.period}
                </div>

                {/* Card */}
                <div className="border border-foreground/5 bg-card p-5 sm:p-8">
                  <div className="mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <h4 className="font-heading text-xl font-bold uppercase tracking-tight">
                      {exp.title}
                    </h4>
                    <span
                      className={`w-fit px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${
                        exp.current
                          ? "bg-foreground/10 text-foreground"
                          : "bg-foreground/5 text-muted-foreground"
                      }`}
                    >
                      {exp.company}
                    </span>
                  </div>

                  <ul className="mb-6 space-y-3">
                    {exp.bullets.map((bullet) => (
                      <li
                        key={bullet.slice(0, 32)}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="text-foreground/20">/</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border border-foreground/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        ))}
      </div>
    </section>
  )
}
