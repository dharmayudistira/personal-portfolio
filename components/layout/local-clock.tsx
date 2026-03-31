"use client"

import { useCallback, useEffect, useReducer } from "react"

function getWIBTime() {
  return (
    new Date().toLocaleTimeString("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }) + " — local time"
  )
}

export function LocalClock() {
  const [, tick] = useReducer((x: number) => x + 1, 0)

  const subscribe = useCallback(() => {
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(subscribe, [subscribe])

  return (
    <div
      className="text-center md:text-right font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
      suppressHydrationWarning
    >
      <span className="tabular-nums text-foreground" suppressHydrationWarning>{getWIBTime()}</span>
      <br />
      <span className="text-muted-foreground/50">Sidoarjo, Indonesia</span>
    </div>
  )
}
