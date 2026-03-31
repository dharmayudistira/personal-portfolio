"use client"

import { useEffect, useState } from "react"

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/pageviews")
      .then((r) => r.json())
      .then((d) => setCount(d.views))
      .catch(() => {})
  }, [])

  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center md:text-left">
      <span className="opacity-50 block">Total_Visits</span>
      <span className="tabular-nums text-foreground">
        {count === null ? "——————" : count.toLocaleString().padStart(6, "0")}
      </span>
    </div>
  )
}
