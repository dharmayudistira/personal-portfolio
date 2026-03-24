"use client"

import { useEffect, useState } from "react"

/** Returns true if the user is on macOS (including iOS). */
export function useIsMac(): boolean {
  const [isMac, setIsMac] = useState(false)

  useEffect(() => {
    setIsMac(/mac|iphone|ipad|ipod/i.test(navigator.userAgent))
  }, [])

  return isMac
}
