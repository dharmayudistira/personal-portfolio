import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="flex min-h-[85vh] flex-col justify-center pt-32 pb-24">
      <header className="max-w-4xl">
        <div className="mb-6 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.3em] text-primary">
          <span className="size-2 bg-primary" />
          Systems Architecture
        </div>

        <h1 className="mb-6 font-heading text-7xl font-bold uppercase tracking-tighter md:text-9xl">
          DHARMA_PE
        </h1>

        <div className="mb-10 flex items-center gap-3 font-mono text-2xl tracking-tight text-primary md:text-3xl">
          <span className="font-medium">Product Engineer</span>
          <span className="h-8 w-[2px] animate-pulse bg-primary" />
        </div>

        <p className="mb-12 max-w-2xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
          Building products at the intersection of design and engineering.
          Full-stack, from database to pixel — systems that perform, interfaces
          that resonate.
        </p>

        <div className="mb-16 flex flex-wrap gap-4">
          <Button asChild className="px-10 py-4 font-heading text-[11px] font-bold uppercase tracking-[0.2em]">
            <Link href="/works">View_Works</Link>
          </Button>
          <Button
            variant="outline"
            asChild
            className="px-10 py-4 font-heading text-[11px] font-bold uppercase tracking-[0.2em]"
          >
            <Link href="/blogs">Read_Blog</Link>
          </Button>
        </div>


      </header>
    </section>
  )
}
