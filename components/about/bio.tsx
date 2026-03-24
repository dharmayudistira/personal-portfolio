import Image from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { BIO } from "@/lib/data/about"
import { DownloadResumeButton } from "@/components/about/download-resume-button"

export function Bio() {
  return (
    <section className="py-12 sm:py-20">
      {/* Module header */}
      <div className="mb-8 flex items-center gap-3 sm:mb-12">
        <span className="size-2 animate-pulse bg-foreground" />
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          Sys_Profile // Module.05
        </span>
      </div>

      <div className="flex flex-col items-center gap-12 md:flex-row md:items-start">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="size-[120px] overflow-hidden rounded-full border-2 border-foreground/10 bg-secondary">
            <Image
              src="/avatar.jpeg"
              alt={BIO.name}
              width={120}
              height={120}
              className="size-full object-cover"
              priority
            />
          </div>
          {/* Status indicator */}
          <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 bg-background px-2 py-1">
            <span className="size-1.5 animate-pulse rounded-full bg-green-500" />
            <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
              Online
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="w-full flex-1 text-center md:text-left">
          <h1 className="mb-2 font-heading text-4xl font-bold uppercase tracking-tighter sm:text-5xl md:text-7xl">
            {BIO.name}
          </h1>
          <h2 className="mb-8 font-mono text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {BIO.role}
          </h2>

          <div className="mb-8 max-w-2xl space-y-6">
            {BIO.bio.map((paragraph) => (
              <p
                key={paragraph.slice(0, 32)}
                className="text-sm leading-relaxed text-muted-foreground sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Location + Socials */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:justify-start">
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              <MapPin className="size-3" />
              {BIO.location}
            </span>
            <span className="h-3 w-px bg-foreground/10" />
            {BIO.socials.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </Link>
            ))}
            <span className="h-3 w-px bg-foreground/10" />
            <DownloadResumeButton />
          </div>
        </div>
      </div>
    </section>
  )
}
