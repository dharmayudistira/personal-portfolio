"use client"

import { Download } from "lucide-react"

type DownloadResumeButtonProps = {
  variant?: "inline" | "cta"
}

function triggerDownload() {
  const a = document.createElement("a")
  a.href = "/dharma-resume.pdf"
  a.download = "Dharma_Yudistira_Resume.pdf"
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export function DownloadResumeButton({ variant = "inline" }: DownloadResumeButtonProps) {
  if (variant === "cta") {
    return (
      <button
        type="button"
        onClick={triggerDownload}
        className="inline-flex items-center gap-3 border border-foreground/10 px-10 py-4 font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
      >
        <Download className="size-4" />
        Download_CV.pdf
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={triggerDownload}
      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
    >
      <Download className="size-3" />
      Resume
    </button>
  )
}
