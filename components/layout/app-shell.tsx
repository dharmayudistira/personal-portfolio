"use client"

import { useCallback, useEffect, useState } from "react"
import { Navbar } from "@/components/layout/navbar"
import { BackToTop } from "@/components/layout/back-to-top"
import { CommandPalette } from "@/components/shared/command-palette"

export type SearchItem = {
  type: "work" | "post"
  slug: string
  title: string
}

type AppShellProps = {
  children: React.ReactNode
  searchItems?: SearchItem[]
}

export function AppShell({ children, searchItems = [] }: AppShellProps) {
  const [commandOpen, setCommandOpen] = useState(false)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      setCommandOpen((prev) => !prev)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  return (
    <>
      <Navbar onCommandOpen={() => setCommandOpen(true)} />
      <main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col pt-14">
        {/* Vertical structural grid lines */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-px grid-line-v opacity-60" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-px grid-line-v opacity-60" />

        {/* Grid intersection coordinates */}
        <div className="pointer-events-none absolute top-14 left-0 -translate-x-full pr-2 font-mono text-[10px] leading-none text-muted-foreground/50">
          0,0
        </div>
        <div className="pointer-events-none absolute top-14 right-0 translate-x-full pl-2 font-mono text-[10px] leading-none text-muted-foreground/50">
          1024,0
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 -translate-x-full pr-2 font-mono text-[10px] leading-none text-muted-foreground/50">
          0,end
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 translate-x-full pl-2 font-mono text-[10px] leading-none text-muted-foreground/50">
          1024,end
        </div>

        <div className="relative z-10 flex flex-1 flex-col">{children}</div>
      </main>
      <BackToTop />
      <CommandPalette open={commandOpen} onOpenChange={setCommandOpen} searchItems={searchItems} />
    </>
  )
}
