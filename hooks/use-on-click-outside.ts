import { useEffect, type RefObject } from "react"

export function useOnClickOutside(
  ref: RefObject<HTMLElement | null>,
  handler: () => void
) {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler()
      }
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [ref, handler])
}
