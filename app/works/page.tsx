import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Works",
  description:
    "Selected projects spanning web and mobile — Flutter, React, Next.js, and more.",
  openGraph: {
    title: "Works — Dharma Yudistira",
    description:
      "Selected projects spanning web and mobile — Flutter, React, Next.js, and more.",
  },
}
import { ProjectGrid } from "@/components/works/project-grid"
import { SectionDivider } from "@/components/shared/section-divider"

export default function WorksPage() {
  return (
    <div className="px-6 lg:px-12">
      {/* Header */}
      <header className="pb-16 pt-24 sm:pt-32">
        <div className="mb-4 flex items-center gap-3">
          <span className="size-2 animate-pulse bg-foreground" />
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Build_Registry // Module.03
          </span>
        </div>
        <h1 className="mb-6 font-heading text-5xl font-bold uppercase tracking-tighter sm:text-6xl md:text-8xl">
          Works
        </h1>
        <p className="max-w-2xl text-sm font-light leading-relaxed text-muted-foreground sm:text-base">
          A documentation of technical systems, architectural patterns, and
          performance-first interfaces. Each project represents a different
          problem space and engineering constraint.
        </p>
      </header>

      <SectionDivider />

      {/* Filter + Grid */}
      <div className="py-16">
        <ProjectGrid />
      </div>

      <SectionDivider label="SYS:END" />

      {/* CTA */}
      <section className="flex flex-col items-center py-16 sm:py-32 text-center">
        <span className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
          Ready_for_Deployment?
        </span>
        <h2 className="mb-8 font-heading text-3xl font-bold text-foreground sm:text-4xl">
          Collaborate on your next system.
        </h2>
        <Link
          href="/about"
          className="bg-primary px-8 py-3 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground transition-all hover:scale-[1.02] active:scale-95"
        >
          Initiate_Contact
        </Link>
      </section>
    </div>
  )
}
