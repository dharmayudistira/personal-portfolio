"use client"

import { useEffect, useRef, type RefObject } from "react"

export function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void
) {
  const handlerRef = useRef(handler)

  useEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    function onPointerDown(e: MouseEvent | TouchEvent) {
      const target = e.target as Node | null
      if (!target || !ref.current || ref.current.contains(target)) return
      handlerRef.current()
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
    }
  }, [ref])
}
