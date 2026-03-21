"use client"

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

  const navigate = (href: string) => {
    onOpenChange(false)
    router.push(href)
  }

  const switchTheme = (theme: string) => {
    setTheme(theme)
    onOpenChange(false)
  }

  const works = searchItems.filter((i) => i.type === "work")
  const posts = searchItems.filter((i) => i.type === "post")

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Command Palette"
      description="Search for pages and actions"
    >
      <Command className="rounded-xl border-none">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Navigation">
            {NAV_COMMANDS.map(({ label, href, icon: Icon }) => (
              <CommandItem key={href} onSelect={() => navigate(href)}>
                <Icon className="size-4 text-muted-foreground" />
                <span>{label}</span>
              </CommandItem>
            ))}
          </CommandGroup>

          {works.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Projects">
                {works.map((item) => (
                  <CommandItem
                    key={item.slug}
                    onSelect={() => navigate(`/works/${item.slug}`)}
                  >
                    <Briefcase className="size-4 text-muted-foreground" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {posts.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Blog Posts">
                {posts.map((item) => (
                  <CommandItem
                    key={item.slug}
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
