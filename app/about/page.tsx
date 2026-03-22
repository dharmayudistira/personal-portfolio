import type { Metadata } from "next"
import { Bio } from "@/components/about/bio"

export const metadata: Metadata = {
  title: "About",
  description:
    "Dharma Yudistira — Product Engineer based in Sidoarjo, Indonesia. Full-stack TypeScript and cross-platform mobile with Flutter and Kotlin.",
  openGraph: {
    title: "About — Dharma Yudistira",
    description:
      "Product Engineer based in Sidoarjo, Indonesia. Full-stack TypeScript and cross-platform mobile with Flutter and Kotlin.",
  },
}
import { Timeline } from "@/components/about/timeline"
import { StackGrid } from "@/components/about/stack-grid"
import { SectionDivider } from "@/components/shared/section-divider"
import { DownloadResumeButton } from "@/components/about/download-resume-button"

export default function AboutPage() {
  return (
    <div className="px-6 lg:px-12">
      <div className="pt-24 sm:pt-32" />

      <SectionDivider label="BIO:00" />

      <Bio />

      <SectionDivider label="EXP:01" />

      <Timeline />

      <SectionDivider label="STK:02" />

      <StackGrid />

      <SectionDivider label="SYS:END" />

      {/* Resume CTA */}
      <section className="flex flex-col items-center py-16 text-center sm:py-24">
        <span className="mb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Ready to synchronize?
        </span>
        <p className="mb-10 font-heading text-3xl font-bold uppercase tracking-tight">
          Deploying quality systems since 2018.
        </p>
        <DownloadResumeButton variant="cta" />
      </section>
    </div>
  )
}
