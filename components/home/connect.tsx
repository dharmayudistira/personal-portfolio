import Link from "next/link"
import { Mail, Github } from "lucide-react"

export function Connect() {
  return (
    <section className="relative flex flex-col items-center py-24 text-center sm:py-48">
      <div className="max-w-3xl">
        <span className="mb-6 block font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground sm:mb-10 sm:tracking-[0.8em]">
          Available_for_Consultation
        </span>

        <h2 className="mb-8 font-heading text-4xl font-bold uppercase tracking-tighter sm:mb-10 sm:text-7xl md:text-8xl">
          Let&apos;s Connect
        </h2>

        <p className="mx-auto mb-12 max-w-xl text-base font-light leading-relaxed text-muted-foreground sm:mb-16 sm:text-lg">
          Currently open for technical leadership roles and contract
          engineering projects. Let&apos;s ship something great.
        </p>

        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          <Link
            href="mailto:dharmayudistira2000@gmail.com"
            className="inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-colors hover:bg-foreground sm:px-12 sm:py-5"
          >
            <Mail className="size-4" />
            Initialize_Comms
          </Link>
          <Link
            href="https://github.com/dharmayudistira"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 border border-border px-8 py-4 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-foreground/5 sm:px-12 sm:py-5"
          >
            <Github className="size-4" />
            View_Github
          </Link>
        </div>
      </div>
    </section>
  )
}
