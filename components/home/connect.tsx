import Link from "next/link"
import { Mail, Github } from "lucide-react"

export function Connect() {
  return (
    <section className="relative flex flex-col items-center py-48 text-center">
      <div className="max-w-3xl">
        <span className="mb-10 block font-mono text-[10px] uppercase tracking-[0.8em] text-muted-foreground">
          Available_for_Consultation
        </span>

        <h2 className="mb-10 font-heading text-7xl font-bold uppercase tracking-tighter md:text-8xl">
          Let&apos;s Connect
        </h2>

        <p className="mx-auto mb-16 max-w-xl text-lg font-light leading-relaxed text-muted-foreground">
          Currently open for technical leadership roles and contract
          engineering projects. Let&apos;s ship something great.
        </p>

        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <Link
            href="mailto:dharmayudistira2000@gmail.com"
            className="inline-flex items-center justify-center gap-3 bg-primary px-12 py-5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground"
          >
            <Mail className="size-4" />
            Initialize_Comms
          </Link>
          <Link
            href="https://github.com/dharmayudistira"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-border px-12 py-5 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5"
          >
            <Github className="size-4" />
            View_Github
          </Link>
        </div>
      </div>
    </section>
  )
}
