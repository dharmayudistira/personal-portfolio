import type { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { WORKS, getWorkBySlug } from "@/lib/data/works"
import { SectionDivider } from "@/components/shared/section-divider"
import { CodeBlock } from "@/components/shared/code-block"

export function generateStaticParams() {
  return WORKS.map((work) => ({ slug: work.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const work = getWorkBySlug(slug)
  if (!work) return {}

  return {
    title: work.title,
    description: work.description,
    openGraph: {
      title: `${work.title} — Dharma Yudistira`,
      description: work.description,
      images: work.image ? [{ url: work.image }] : undefined,
    },
  }
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const work = getWorkBySlug(slug)

  if (!work) notFound()

  const currentIndex = WORKS.findIndex((w) => w.slug === slug)
  const prevWork = currentIndex > 0 ? WORKS[currentIndex - 1] : null
  const nextWork =
    currentIndex < WORKS.length - 1 ? WORKS[currentIndex + 1] : null

  return (
    <div className="px-6 lg:px-12">
      <div className="pt-24" />

      <SectionDivider label="IMG:00" />

      {/* Hero image */}
      <section className="py-8">
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-secondary">
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary">
            <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground/50">
              [{work.slug}_hero]
            </span>
          </div>
          {work.image && (
            <Image
              src={work.image}
              alt={work.title}
              fill
              className="absolute inset-0 object-cover"
              sizes="100vw"
              priority
            />
          )}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
      </section>

      <SectionDivider label="HDR:01" />

      {/* Header + Metadata */}
      <div className="grid grid-cols-1 gap-12 py-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <Link
            href="/works"
            className="mb-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back_to_Works
          </Link>
          <h1 className="mb-6 font-heading text-6xl font-bold uppercase tracking-tighter md:text-8xl">
            {work.title}
          </h1>
          <p className="max-w-2xl text-sm font-light leading-relaxed text-muted-foreground">
            {work.longDescription}
          </p>
        </div>
        <div className="flex flex-col justify-end gap-6 border-l border-foreground/10 pl-8 md:col-span-4">
          <div>
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Role:
            </span>
            <span className="text-sm font-medium uppercase text-foreground">
              {work.role}
            </span>
          </div>
          <div>
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Tools:
            </span>
            <span className="text-sm font-medium uppercase text-foreground">
              {work.tags.join(", ")}
            </span>
          </div>
          <div>
            <span className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Date:
            </span>
            <span className="text-sm font-medium uppercase text-foreground">
              {work.date}
            </span>
          </div>
          {(work.liveUrl || work.repoUrl) && (
            <div className="flex gap-3 pt-2">
              {work.liveUrl && (
                <Link
                  href={work.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-foreground/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  Live
                  <ArrowUpRight className="size-3" />
                </Link>
              )}
              {work.repoUrl && (
                <Link
                  href={work.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 border border-foreground/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  Source
                  <ArrowUpRight className="size-3" />
                </Link>
              )}
            </div>
          )}
        </div>
      </div>

      <SectionDivider label="SEC:02" />

      {/* 01 / THE_PROBLEM */}
      <section className="grid grid-cols-1 items-start gap-8 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="sticky top-24 font-heading text-2xl font-bold uppercase tracking-tighter">
            01 / The_Problem
          </h2>
        </div>
        <div className="md:col-span-8">
          <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
            {work.sections.problem.body}
          </p>
          {work.sections.problem.quote && (
            <div className="border-l-2 border-primary bg-secondary/30 p-8">
              <p className="font-mono text-sm italic text-foreground">
                &ldquo;{work.sections.problem.quote}&rdquo;
              </p>
            </div>
          )}
        </div>
      </section>

      <SectionDivider label="SEC:03" />

      {/* 02 / THE_SOLUTION */}
      <section className="grid grid-cols-1 items-start gap-8 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="sticky top-24 font-heading text-2xl font-bold uppercase tracking-tighter">
            02 / The_Solution
          </h2>
        </div>
        <div className="md:col-span-8">
          {/* Feature cards */}
          <div className="mb-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {work.sections.solution.features.map((feature) => (
              <div
                key={feature.name}
                className="flex flex-col gap-3 bg-secondary p-6"
              >
                <h3 className="font-heading text-sm font-bold text-foreground">
                  {feature.name}
                </h3>
                <p className="text-sm leading-snug text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            {work.sections.solution.body}
          </p>

          {/* Solution image placeholder */}
          <div className="relative aspect-video w-full overflow-hidden bg-background">
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary/50 to-background">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/40">
                [{work.slug}_solution]
              </span>
            </div>
            <div className="absolute bottom-4 left-4 font-mono text-[10px] text-foreground/30">
              SYSTEM_MODULE_V4.02
            </div>
          </div>
        </div>
      </section>

      <SectionDivider label="SEC:04" />

      {/* 03 / TECHNICAL_RECAP */}
      <section className="grid grid-cols-1 items-start gap-8 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <h2 className="sticky top-24 font-heading text-2xl font-bold uppercase tracking-tighter">
            03 / Technical_Recap
          </h2>
        </div>
        <div className="md:col-span-8">
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            {work.sections.technical.body}
          </p>

          {/* Code block */}
          <CodeBlock
            code={work.sections.technical.code.content}
            language={work.sections.technical.code.language}
            filename={work.sections.technical.code.filename}
          />
        </div>
      </section>

      <SectionDivider label="NAV:05" />

      {/* Prev/Next navigation */}
      <div className="grid grid-cols-2">
        {prevWork ? (
          <div className="py-12 pr-8">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              ← Previous
            </span>
            <Link
              href={`/works/${prevWork.slug}`}
              className="font-heading text-xl font-bold tracking-tight transition-colors hover:text-primary hover:underline"
            >
              {prevWork.title}
            </Link>
          </div>
        ) : (
          <div />
        )}
        {nextWork ? (
          <div className="py-12 pl-8 text-right">
            <span className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Next →
            </span>
            <Link
              href={`/works/${nextWork.slug}`}
              className="font-heading text-xl font-bold tracking-tight transition-colors hover:text-primary hover:underline"
            >
              {nextWork.title}
            </Link>
          </div>
        ) : (
          <div />
        )}
      </div>
    </div>
  )
}
