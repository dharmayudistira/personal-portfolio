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

// Threads official logo (Meta brand kit)
function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 192 192"
      fill="currentColor"
      className={className}
    >
      <path d="M141.537 88.988c-.87-.403-1.71-.784-2.561-1.143-1.482-27.307-16.403-42.94-41.457-43.1h-.355c-14.986 0-27.449 6.397-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.347-10.548h.228c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.625-23.68-1.14-23.82 1.372-39.134 15.265-38.106 34.569.52 9.792 5.398 18.216 13.734 23.719 7.047 4.652 16.123 6.927 25.556 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.171-40.059-7.486-51.275-21.744C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.171 40.526 7.521 52.171 21.848 5.71 7.026 10.015 15.861 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.194 47.292 9.642 32.788 28.079 19.882 44.486 13.224 67.316 13.001 95.933L13 96l.001.067c.223 28.617 6.881 51.447 19.787 67.854 14.504 18.437 36.094 27.885 64.169 28.079h.113c24.96-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-19.045-24.723-24.553ZM98.44 129.507c-10.44.588-21.286-4.098-21.821-14.135-.384-7.442 5.308-15.746 22.473-16.735 1.966-.113 3.895-.168 5.79-.168 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.446 28.713-23.813 29.273Z" />
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
