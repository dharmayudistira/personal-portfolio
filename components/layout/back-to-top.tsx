"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`fixed right-6 bottom-6 z-30 border border-border/40 bg-background/80 backdrop-blur-sm transition-all duration-300 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ChevronUp className="size-4" />
    </Button>
  )
}
