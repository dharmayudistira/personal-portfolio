import { STACK_GROUPS } from "@/lib/data/about"

export function StackGrid() {
  return (
    <section className="py-12 sm:py-20">
      {/* Section header */}
      <div className="mb-10 sm:mb-16">
        <span className="mb-2 block font-mono text-[10px] text-muted-foreground/40">
          SEC_03
        </span>
        <h3 className="font-heading text-2xl font-bold uppercase tracking-tight">
          Tech_Stack_Audit
        </h3>
      </div>

      <div className="space-y-0 divide-y divide-foreground/5">
        {STACK_GROUPS.map((group) => (
          <div
            key={group.index}
            className="flex flex-col gap-4 py-6 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-8"
          >
            {/* Group label */}
            <div className="w-36 shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
              {group.index}_{group.label}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="bg-secondary/50 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
