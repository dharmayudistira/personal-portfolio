"use client"

import { useEffect } from "react"

export function PageviewTracker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return
    fetch("/api/pageviews", { method: "POST" })
  }, [])

  return null
}
