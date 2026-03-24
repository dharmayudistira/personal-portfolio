import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BIO, EXPERIENCES } from "@/lib/data/about";

const currentJob = EXPERIENCES.find((e) => e.current);

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col justify-center  pb-24 pt-28">
      {/* Golden ratio / Fibonacci spiral ornament */}
      <div className="pointer-events-none absolute inset-y-0 -left-6 -right-6 overflow-hidden lg:-left-12 lg:-right-12" aria-hidden="true">
        {/* Desktop / tablet — fills section, spiral right-anchored */}
        <svg
          className="absolute inset-0 hidden h-full w-full text-foreground/[0.055] md:block"
          viewBox="0 0 340 210"
          preserveAspectRatio="xMaxYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="desktop-spiral-clip">
              <rect x="0" y="0" width="340" height="210" />
            </clipPath>
          </defs>
          <g clipPath="url(#desktop-spiral-clip)">
            <g stroke="currentColor" strokeDasharray="4 2">
              <path d="M105.1 -170.853L464.633 411.625" vectorEffect="non-scaling-stroke" />
              <path d="M-267.831 375.247L600.141 -159.777" vectorEffect="non-scaling-stroke" />
            </g>
            <g stroke="currentColor">
              <path d="M260 0.5V80" vectorEffect="non-scaling-stroke" />
              <path d="M339.5 80.5H210" vectorEffect="non-scaling-stroke" />
              <path d="M210 210V0.5" vectorEffect="non-scaling-stroke" />
              <path d="M260 50.5H339.5" vectorEffect="non-scaling-stroke" />
              <path d="M240 60.5V80.5" vectorEffect="non-scaling-stroke" />
            </g>
            <g stroke="currentColor">
              <rect x="210" y="50.5" width="30" height="30" vectorEffect="non-scaling-stroke" />
              <rect x="240" y="60.5" width="20" height="20" vectorEffect="non-scaling-stroke" />
              <rect x="240" y="50.5" width="20" height="10" vectorEffect="non-scaling-stroke" />
            </g>
            <path
              d="M239.897 60.3571C239.897 54.894 244.414 50.381 249.882 50.381C255.35 50.381 259.868 54.894 259.868 60.3571C259.868 71.2835 250.833 80.3095 239.897 80.3095C223.493 80.3095 209.941 66.7704 209.941 50.381C209.941 23.0652 232.527 0.499999 259.868 0.5C303.613 0.499995 339.75 36.6043 339.75 80.3095C339.75 151.33 281.027 210 209.941 210C95.1103 210 0.25 115.226 0.25 0.5C0.250008 -185.69 154.06 -339.5 340.25 -339.5"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>

        {/* Mobile — fills section, spiral bottom-center anchored */}
        <svg
          className="absolute inset-0 h-full w-full text-foreground/[0.055] md:hidden"
          viewBox="0 0 210 340"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="mobile-spiral-clip">
              <rect x="0" y="0" width="210" height="340" />
            </clipPath>
          </defs>
          <g clipPath="url(#mobile-spiral-clip)">
            <g stroke="currentColor" strokeDasharray="4 2">
              <path d="M380.853 105.099L-201.625 464.632" vectorEffect="non-scaling-stroke" />
              <path d="M-165.247 -267.831L369.777 600.141" vectorEffect="non-scaling-stroke" />
            </g>
            <g stroke="currentColor">
              <path d="M209.5 260L130 260" vectorEffect="non-scaling-stroke" />
              <path d="M129.5 339.5L129.5 210" vectorEffect="non-scaling-stroke" />
              <path d="M159.5 260L159.5 210" vectorEffect="non-scaling-stroke" />
              <path d="M0 210L209.5 210" vectorEffect="non-scaling-stroke" />
              <path d="M160 240L130.133 240" vectorEffect="non-scaling-stroke" />
              <path d="M149.5 240L149.5 260" vectorEffect="non-scaling-stroke" />
            </g>
            <g stroke="currentColor">
              <rect x="159.5" y="210" width="30" height="30" transform="rotate(90 159.5 210)" vectorEffect="non-scaling-stroke" />
              <rect x="149.5" y="240" width="20" height="20" transform="rotate(90 149.5 240)" vectorEffect="non-scaling-stroke" />
              <rect x="159.5" y="240" width="20" height="10" transform="rotate(90 159.5 240)" vectorEffect="non-scaling-stroke" />
            </g>
            <path
              d="M149.643 239.897C155.106 239.897 159.619 244.414 159.619 249.882C159.619 255.35 155.106 259.868 149.643 259.868C138.717 259.868 129.69 250.833 129.69 239.897C129.69 223.493 143.23 209.941 159.619 209.941C186.935 209.941 209.5 232.527 209.5 259.868C209.5 303.613 173.396 339.75 129.69 339.75C58.6695 339.75 0 281.027 0 209.941C0 95.1103 94.7738 0.24998 209.5 0.249985C395.69 0.250001 549.5 154.06 549.5 340.25"
              stroke="currentColor"
              strokeWidth="2"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        </svg>
      </div>

      {/* Status bar — availability + current job */}
      <div className="mb-10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-green-500">
            Open_to_Work
          </span>
        </div>

        {currentJob && (
          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            {currentJob.type}
            <span className="mx-2 text-foreground/20">//</span>
            {currentJob.company}
          </span>
        )}
      </div>

      {/* Name — split across two lines for impact */}
      <div className="mb-6 overflow-hidden">
        <h1 className="font-heading font-bold uppercase leading-[0.9] tracking-tighter">
          <span className="block text-[clamp(3.5rem,12vw,9rem)]">Dharma</span>
          <span className="block text-[clamp(3.5rem,12vw,9rem)] text-primary/80">
            Yudistira
          </span>
        </h1>
      </div>

      {/* Stats strip */}
      <div className="mb-10 flex flex-wrap items-center gap-x-5 gap-y-2 border-foreground/5 pt-5">
        <span className="font-mono text-xs tracking-wide text-foreground">
          {BIO.role}
        </span>

        <span className="hidden h-3 w-px bg-foreground/10 sm:block" />

        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          3+ yrs exp
        </span>

        <span className="hidden h-3 w-px bg-foreground/10 sm:block" />

        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Full-Stack · Mobile
        </span>

        <span className="hidden h-3 w-px bg-foreground/10 sm:block" />

        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          {BIO.location}
        </span>
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-3">
        <Button
          asChild
          className="gap-2 px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <Link href="/works">
            View_Works
            <ArrowUpRight className="size-3" />
          </Link>
        </Button>
        <Button
          variant="outline"
          asChild
          className="px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
        >
          <Link href="/blogs">Read_Blog</Link>
        </Button>
      </div>
    </section>
  );
}
