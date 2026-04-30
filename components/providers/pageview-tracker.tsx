"use client"

import { useEffect } from "react"
import { useQueryClient } from "@tanstack/react-query"

const SESSION_KEY = "pv:fired"

export function PageviewTracker() {
  const queryClient = useQueryClient()

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return
    if (typeof window === "undefined") return
    if (sessionStorage.getItem(SESSION_KEY)) return
    sessionStorage.setItem(SESSION_KEY, "1")

    fetch("/api/pageviews", { method: "POST" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { views: number } | null) => {
        if (data?.views != null) {
          queryClient.setQueryData(["pageviews"], data.views)
        }
      })
      .catch(() => {})
  }, [queryClient])

  return null
}
