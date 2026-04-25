"use client"

import { useSyncExternalStore } from "react"

const MAC_RE = /mac|iphone|ipad|ipod/i
const subscribe = () => () => {}

export function useIsMac(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => MAC_RE.test(navigator.userAgent),
    () => false,
  )
}
