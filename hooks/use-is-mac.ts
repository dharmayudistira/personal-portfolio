"use client"

import { useState } from "react"

/** Returns true if the user is on macOS (including iOS). */
export function useIsMac(): boolean {
  const [isMac] = useState<boolean>(() =>
    typeof navigator !== "undefined"
      ? /mac|iphone|ipad|ipod/i.test(navigator.userAgent)
      : false
  )

  return isMac
}
