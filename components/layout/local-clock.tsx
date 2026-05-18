"use client"

import { useSyncExternalStore } from "react"

function getWIBTime() {
  return new Date().toLocaleTimeString("en-US", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
}

let currentTime: string | null = null
const listeners = new Set<() => void>()
let intervalId: ReturnType<typeof setInterval> | null = null

function subscribe(onChange: () => void) {
  listeners.add(onChange)
  if (!intervalId) {
    currentTime = getWIBTime()
    intervalId = setInterval(() => {
      currentTime = getWIBTime()
      listeners.forEach((l) => l())
    }, 1000)
  }
  return () => {
    listeners.delete(onChange)
    if (listeners.size === 0 && intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
}

const getSnapshot = () => currentTime
const getServerSnapshot = () => null

export function LocalClock() {
  const time = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  return (
    <div className="text-center md:text-right font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
      <span className="tabular-nums text-foreground">
        {time ? `${time} - local time` : ""}
      </span>
      <br />
      <span className="text-muted-foreground/50">Sidoarjo, Indonesia</span>
    </div>
  )
}
