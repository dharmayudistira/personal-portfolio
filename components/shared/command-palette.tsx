"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Home,
  Briefcase,
  FileText,
  User,
  Sun,
  Moon,
  Monitor,
} from "lucide-react"
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
} from "@/components/ui/command"
import type { SearchItem } from "@/components/layout/app-shell"

type CommandPaletteProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  searchItems?: SearchItem[]
}

const NAV_COMMANDS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Works", href: "/works", icon: Briefcase },
  { label: "Blogs", href: "/blogs", icon: FileText },
  { label: "About", href: "/about", icon: User },
] as const

export function CommandPalette({
  open,
  onOpenChange,
  searchItems = [],
}: CommandPaletteProps) {
  const router = useRouter()
  const { setTheme } = useTheme()
  const [query, setQuery] = useState("")

  const navigate = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  const switchTheme = (theme: string) => {
    setTheme(theme)
    onOpenChange(false)
  }

  const isSearching = query.trim().length > 0
  const works = searchItems.filter((i) => i.type === "work")
  const posts = searchItems.filter((i) => i.type === "post")

  return (
    <CommandDialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) setQuery("")
      }}
      title="Command Palette"
      description="Search for pages and actions"
    >
      <Command className="rounded-xl border-none" shouldFilter={isSearching}>
        <CommandInput
          placeholder="Type a command or search..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {!isSearching && (
            <>
              <CommandGroup heading="Navigation">
                {NAV_COMMANDS.map(({ label, href, icon: Icon }) => (
                  <CommandItem key={href} onSelect={() => navigate(href)}>
                    <Icon className="size-4 text-muted-foreground" />
                    <span>{label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>

              {/* Search hint */}
              {searchItems.length > 0 && (
                <div className="border-t border-foreground/5 px-3 py-3">
                  <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
                    Type to search works &amp; posts
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {searchItems.slice(0, 6).map((item) => (
                      <button
                        key={item.slug}
                        onClick={() => setQuery(item.title.split(" ")[0])}
                        className="border border-foreground/5 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground/40 transition-colors hover:border-foreground/20 hover:text-muted-foreground"
                      >
                        {item.title.length > 16 ? item.title.slice(0, 16) + "…" : item.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {(isSearching ? works : []).length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Projects">
                {works.map((item) => (
                  <CommandItem
                    key={item.slug}
                    value={item.title}
                    onSelect={() => navigate(`/works/${item.slug}`)}
                  >
                    <Briefcase className="size-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {(isSearching ? posts : []).length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Blog Posts">
                {posts.map((item) => (
                  <CommandItem
                    key={item.slug}
                    value={item.title}
                    onSelect={() => navigate(`/blogs/${item.slug}`)}
                  >
                    <FileText className="size-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          <CommandGroup heading="Theme">
            <CommandItem onSelect={() => switchTheme("light")}>
              <Sun className="size-4 text-muted-foreground" />
              <span>Light mode</span>
            </CommandItem>
            <CommandItem onSelect={() => switchTheme("dark")}>
              <Moon className="size-4 text-muted-foreground" />
              <span>Dark mode</span>
            </CommandItem>
            <CommandItem onSelect={() => switchTheme("system")}>
              <Monitor className="size-4 text-muted-foreground" />
              <span>System theme</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  )
}
