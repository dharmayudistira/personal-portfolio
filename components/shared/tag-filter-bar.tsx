"use client"

import { useCallback, useRef, useState } from "react"
import { ChevronDown, Layers, Search } from "lucide-react"
import { useOnClickOutside } from "@/hooks/use-on-click-outside"

type TagGroup = { label: string; tags: string[] }

type TagFilterBarProps = {
  tagGroups: TagGroup[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  search: string
  onSearchChange: (value: string) => void
}

export function TagFilterBar({
  tagGroups,
  selectedTags,
  onTagsChange,
  search,
  onSearchChange,
}: TagFilterBarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const isAllActive = selectedTags.length === 0

  function handleToggleTag(tag: string) {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter((t) => t !== tag))
    } else {
      onTagsChange([...selectedTags, tag])
    }
  }

  function handleClear() {
    onTagsChange([])
  }

  useOnClickOutside(dropdownRef, useCallback(() => setDropdownOpen(false), []))

  return (
    <div ref={dropdownRef} className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Filter controls — always on one row, no wrapping */}
      <div className="flex items-center justify-between gap-2 sm:justify-start">
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Filter_By:
        </span>

        {/* All button — hidden on mobile */}
        <button
          onClick={handleClear}
          className={`hidden shrink-0 px-4 py-1.5 font-mono text-[11px] font-medium tracking-wide transition-all sm:block ${
            isAllActive
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          All
        </button>

        {/* TAG_INDEX trigger */}
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className={`flex shrink-0 items-center gap-2 px-4 py-1.5 font-mono text-[11px] font-medium tracking-wide transition-all ${
            selectedTags.length > 0
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground"
          }`}
        >
          <Layers className="size-3" />
          Tag
          {selectedTags.length > 0 && (
            <span className="flex size-4 items-center justify-center rounded-full bg-background/20 font-mono text-[9px]">
              {selectedTags.length}
            </span>
          )}
          <ChevronDown
            className={`size-3 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Dropdown — anchored to outer wrapper so it spans full width on mobile */}
      {dropdownOpen && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute left-0 top-full z-50 mt-2 w-full border border-foreground/10 bg-card p-5 shadow-xl sm:w-auto sm:min-w-80"
        >
          <div className="grid grid-cols-2 gap-6 sm:flex sm:gap-10">
            {tagGroups.map((group) => (
              <div key={group.label}>
                <span className="mb-3 block font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">
                  {group.label}
                </span>
                <div className="relative">
                <div className="max-h-72 space-y-3 overflow-y-auto pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                  {group.tags.map((tag) => (
                    <label
                      key={tag}
                      onClick={() => handleToggleTag(tag)}
                      className="flex cursor-pointer items-center gap-3 font-mono text-[11px] tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span
                        className={`flex size-3.5 shrink-0 items-center justify-center border transition-colors ${
                          selectedTags.includes(tag)
                            ? "border-foreground bg-foreground"
                            : "border-foreground/20 bg-transparent"
                        }`}
                      >
                        {selectedTags.includes(tag) && (
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                            className="text-background"
                          >
                            <path
                              d="M1.5 4L3 5.5L6.5 2"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="square"
                            />
                          </svg>
                        )}
                      </span>
                      {tag}
                    </label>
                  ))}
                </div>
                {/* fade hint — always visible, masked by scroll reaching bottom */}
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card to-transparent" />
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-5 flex items-center justify-between border-t border-foreground/5 pt-4">
            <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground/50">
              Active_Filters: {selectedTags.length}
            </span>
            <button
              onClick={handleClear}
              className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
            >
              Clear_Registry
            </button>
          </div>
        </div>
      )}

      {/* Search — full width on mobile */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search_Keyword"
          className="h-9 w-full border border-foreground/10 bg-transparent pl-9 pr-4 font-mono text-[11px] uppercase tracking-wide text-foreground placeholder:text-muted-foreground/50 focus:border-foreground/30 focus:outline-none sm:w-56"
        />
      </div>
    </div>
  )
}
