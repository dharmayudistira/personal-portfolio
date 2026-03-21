"use client"

import { useEffect } from "react"
import { RotateCcw } from "lucide-react"

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-32 text-center">
      <span className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground/50">
        ERR_500 // RUNTIME_EXCEPTION
      </span>
      <h1 className="mb-4 font-heading text-6xl font-bold tracking-tighter md:text-8xl">
        System_Fault
      </h1>
      <p className="mb-12 max-w-md font-mono text-sm leading-relaxed text-muted-foreground">
        An unexpected error occurred during execution. The system has logged the
        fault for diagnostics.
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 border border-foreground/10 px-8 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
      >
        <RotateCcw className="size-3.5" />
        Retry_Operation
      </button>
    </div>
  )
}
