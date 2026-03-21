"use client"

import { useRef } from "react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleTheme = async () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark"

    if (
      !buttonRef.current ||
      !document.startViewTransition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setTheme(newTheme)
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme)
      })
    })

    await transition.ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const right = window.innerWidth - left
    const bottom = window.innerHeight - top
    const maxRadius = Math.hypot(
      Math.max(left, right),
      Math.max(top, bottom)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="icon"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      suppressHydrationWarning
    >
      <Sun className="size-4 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
