import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
        ERR_404 // RESOURCE_NOT_FOUND
      </span>
      <h1 className="mb-4 font-heading text-8xl font-bold tracking-tighter md:text-[12rem]">
        404
      </h1>
      <p className="mb-12 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
        The requested route does not exist in the current system registry.
        Verify the path and retry.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 border border-foreground/10 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Return_to_Index
      </Link>
    </div>
  )
}
