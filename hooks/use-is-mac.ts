"use client"

import { useState } from "react"

/** Returns true if the user is on macOS (including iOS). */
export function useIsMac(): boolean {
  const [isMac] = useState(
    () => typeof navigator !== "undefined" && /mac|iphone|ipad|ipod/i.test(navigator.userAgent)
  )
  return isMac
}
