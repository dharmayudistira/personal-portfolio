"use client"

import { useState } from "react"
import { Check, Copy, Linkedin, Twitter } from "lucide-react"

type Props = {
  title: string
  slug: string
}

type Channel = {
  id: string
  label: string
  icon: React.ReactNode
  action: () => void
}

export function SharePost({ title, slug }: Props) {
  const [copied, setCopied] = useState(false)
  const [active, setActive] = useState<string | null>(null)

  const url =
    typeof window !== "undefined"
      ? `${window.location.origin}/blogs/${slug}`
      : `https://www.dharma-yudistira.com/blogs/${slug}`

  function flash(id: string) {
    setActive(id)
    setTimeout(() => setActive(null), 600)
  }

  const channels: Channel[] = [
    {
      id: "x",
      label: "X / Twitter",
      icon: <Twitter className="size-3" />,
      action: () => {
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&via=justamannothero`,
          "_blank",
          "noopener,noreferrer"
        )
        flash("x")
      },
    },
    {
      id: "li",
      label: "LinkedIn",
      icon: <Linkedin className="size-3" />,
      action: () => {
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          "_blank",
          "noopener,noreferrer"
        )
        flash("li")
      },
    },
    {
      id: "copy",
      label: copied ? "Copied!" : "Copy URL",
      icon: copied ? <Check className="size-3" /> : <Copy className="size-3" />,
      action: async () => {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        flash("copy")
        setTimeout(() => setCopied(false), 2000)
      },
    },
  ]

  return (
    <div className="border border-foreground/5 p-6">
      <h4 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Broadcast_To
      </h4>

      <div className="flex flex-col gap-2">
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={ch.action}
            className={`group flex w-full items-center gap-3 border px-3 py-2.5 font-mono text-[10px] uppercase tracking-widest transition-all duration-150 ${
              active === ch.id
                ? "border-foreground/30 bg-foreground/5 text-foreground"
                : "border-foreground/10 text-muted-foreground hover:border-foreground/20 hover:text-foreground"
            }`}
          >
            <span
              className={`flex size-5 shrink-0 items-center justify-center border transition-colors duration-150 ${
                active === ch.id
                  ? "border-foreground/40 bg-foreground text-background"
                  : "border-foreground/15 group-hover:border-foreground/30"
              }`}
            >
              {ch.icon}
            </span>
            <span>{ch.label}</span>
            <span className="ml-auto opacity-30 transition-opacity group-hover:opacity-60">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
