"use client"

import { useQuery } from "@tanstack/react-query"

async function fetchPageviews(): Promise<number> {
  const res = await fetch("/api/pageviews")
  const data = await res.json()
  return data.views ?? 0
}

export function VisitorCounter() {
  const { data: count } = useQuery({
    queryKey: ["pageviews"],
    queryFn: fetchPageviews,
  })

  return (
    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground text-center md:text-left">
      <span className="opacity-50 block">Total_Visits</span>
      <span className="tabular-nums text-foreground">
        {count == null ? "——————" : count.toLocaleString().padStart(6, "0")}
      </span>
    </div>
  )
}
