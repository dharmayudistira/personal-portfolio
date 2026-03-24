"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Menu, Command as CommandIcon, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { cn } from "@/lib/utils"
import { useIsMac } from "@/hooks/use-is-mac"

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Works", href: "/works" },
  { label: "Blogs", href: "/blogs" },
  { label: "About", href: "/about" },
] as const

type NavbarProps = {
  onCommandOpen: () => void
}

export function Navbar({ onCommandOpen }: NavbarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMac = useIsMac()

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <header className="fixed top-0 z-40 w-full">
      <div className="border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
        <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          {/* Brand */}
          <Link
            href="/"
            className="font-mono text-sm font-semibold tracking-tight uppercase text-foreground transition-colors hover:text-primary"
          >
            dharma
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={cn(
                  "relative px-3 py-1.5 font-mono text-xs tracking-wide uppercase transition-colors",
                  isActive(href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {label}
                {isActive(href) && (
                  <span className="absolute bottom-0 left-3 right-3 h-px bg-primary" />
                )}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Search pill — desktop only */}
            <button
              onClick={onCommandOpen}
              aria-label="Open command palette"
              className="hidden md:inline-flex items-center gap-2 border border-foreground/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              <Search className="size-3 shrink-0" />
              <span>Search</span>
              <span className="ml-1 flex items-center gap-0.5 border border-foreground/10 px-1.5 py-0.5 text-[9px] text-muted-foreground/50">
                {isMac ? <><CommandIcon className="size-2.5" />K</> : "Ctrl K"}
              </span>
            </button>
            <ThemeToggle />

            {/* Mobile hamburger */}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Open menu"
              className="md:hidden"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-4" />
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-72 bg-background p-0">
          <SheetHeader className="border-b border-border/40 px-6 py-4">
            <SheetTitle className="font-mono text-sm font-semibold tracking-tight uppercase">
              dharma_pe
            </SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-4 py-4">
            {NAV_ITEMS.map(({ label, href }) => (
              <SheetClose key={href} asChild>
                <Link
                  href={href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 font-mono text-sm tracking-wide uppercase transition-colors",
                    isActive(href)
                      ? "bg-accent text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              </SheetClose>
            ))}
          </nav>
          <div className="mt-auto border-t border-border/40 px-4 py-4">
            <SheetClose asChild>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 font-mono text-xs text-muted-foreground"
                onClick={() => {
                  setMobileOpen(false)
                  setTimeout(onCommandOpen, 150)
                }}
              >
                <CommandIcon className="size-3.5" />
                Command palette
                <kbd className="ml-auto rounded border border-border/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {isMac ? "⌘K" : "Ctrl K"}
                </kbd>
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
