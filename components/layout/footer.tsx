import Link from "next/link"
import { LocalClock } from "@/components/layout/local-clock"
import { VisitorCounter } from "@/components/layout/visitor-counter"
import { BIO } from "@/lib/data/about"

const FOOTER_LINKS = [
  ...BIO.socials.map((s) => ({ label: s.label, href: s.href })),
  { label: "RSS", href: "/rss.xml" },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-foreground/5 bg-secondary/30 py-16">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 px-8 md:flex-row md:justify-between">
        <VisitorCounter />

        <div className="flex flex-wrap justify-center gap-10">
          {FOOTER_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </div>

        <LocalClock />
      </div>
    </footer>
  )
}
