import { STACK_GROUPS } from "@/lib/data/about"

const TECH_STACK = STACK_GROUPS.flatMap((g) => g.items).map((t) => t.toUpperCase())

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center gap-[4rem]">
      {TECH_STACK.map((tech) => (
        <span key={tech} className="shrink-0 font-mono text-base font-bold tracking-[0.3em]">
          {tech}
        </span>
      ))}
    </div>
  )
}

export function TechMarquee() {
  return (
    <section className="-mx-6 w-[calc(100%+calc(var(--spacing)*12))] overflow-hidden py-[4rem] lg:-mx-12 lg:w-[calc(100%+calc(var(--spacing)*24))]">
      <div className="flex w-max animate-marquee items-center gap-[4rem] whitespace-nowrap text-foreground/50 hover:[animation-play-state:paused]">
        <MarqueeRow />
        <MarqueeRow />
      </div>
    </section>
  )
}
