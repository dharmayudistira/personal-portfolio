"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

function XIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.73-8.835L1.254 2.25H8.08l4.258 5.63 5.906-5.63Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// Threads has no lucide icon — minimal custom SVG
function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.474 12.01v-.02c.027-3.579.876-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.51 5.465l-2.04.555c-1.112-4.07-3.832-6.116-8.3-6.146-2.97.02-5.013.967-6.068 2.812-.66 1.165-1.01 2.749-1.04 4.73v.02c.03 1.98.38 3.564 1.04 4.73 1.055 1.842 3.1 2.79 6.068 2.81 1.55-.01 2.87-.317 3.927-.908.884-.5 1.518-1.234 1.888-2.18.255-.654.387-1.436.387-2.322 0-.025 0-.05-.001-.076a5.624 5.624 0 0 0-.387-2.113c-.37-.946-1.004-1.68-1.888-2.18-1.057-.59-2.378-.898-3.927-.908l-.078-.001c-1.246 0-2.264.25-3.026.74-.659.428-1.085 1.047-1.27 1.84l-2.04-.556c.302-1.24 1.009-2.247 2.103-2.993 1.096-.75 2.467-1.131 4.079-1.131h.077c2.04.013 3.73.44 5.033 1.268 1.38.875 2.326 2.145 2.816 3.78.29.987.437 2.033.437 3.11 0 .027 0 .054-.002.08 0 1.077-.147 2.123-.437 3.11-.49 1.635-1.436 2.905-2.816 3.78-1.303.829-2.993 1.255-5.033 1.268h-.077Z" />
    </svg>
  )
}

type Props = {
  title: string
  slug: string
  bare?: boolean
}

export function SharePost({ title, slug, bare = false }: Props) {
  const [copied, setCopied] = useState(false)

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blogs/${slug}`
      : `https://www.dharma-yudistira.com/blogs/${slug}`

  const shareText = `${title} by Dharma Yudistira`

  const channels = [
    {
      id: "x",
      label: "Share on X",
      icon: <XIcon className="size-3.5" />,
      action: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(url)}&via=justamannothero`,
          "_blank",
          "noopener,noreferrer"
        ),
    },
    {
      id: "threads",
      label: "Share on Threads",
      icon: <ThreadsIcon className="size-3.5" />,
      action: () =>
        window.open(
          `https://www.threads.net/intent/post?text=${encodeURIComponent(`${shareText} ${url}`)}`,
          "_blank",
          "noopener,noreferrer"
        ),
    },
    {
      id: "copy",
      label: copied ? "Copied!" : "Copy link",
      icon: copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />,
      action: async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
    },
  ]

  const buttons = (
    <div className="flex gap-2">
      {channels.map((ch) => (
        <button
          key={ch.id}
          onClick={ch.action}
          aria-label={ch.label}
          title={ch.label}
          className={`flex size-8 items-center justify-center border transition-colors duration-150 ${
            ch.id === "copy" && copied
              ? "border-foreground/40 bg-foreground text-background"
              : "border-foreground/10 text-muted-foreground hover:border-foreground/30 hover:text-foreground"
          }`}
        >
          {ch.icon}
        </button>
      ))}
    </div>
  )

  if (bare) return buttons

  return (
    <div className="border border-foreground/5 p-6">
      <h4 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Broadcast_To
      </h4>
      {buttons}
    </div>
  )
}
