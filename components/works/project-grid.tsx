"use client"

import { useMemo, useState } from "react"
import { WORKS } from "@/lib/data/works"
import { FilterBar } from "@/components/works/filter-bar"
import { ProjectCard } from "@/components/works/project-card"

export function ProjectGrid() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [search, setSearch] = useState("")

  const filtered = useMemo(() => {
    let results = WORKS

    if (selectedTags.length > 0) {
      results = results.filter((w) =>
        selectedTags.some(
          (tag) => w.tags.includes(tag) || w.category === tag
        )
      )
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      results = results.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.description.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return results
  }, [selectedTags, search])

  return (
    <>
      <section className="mb-12">
        <FilterBar
          selectedTags={selectedTags}
          onTagsChange={setSelectedTags}
          search={search}
          onSearchChange={setSearch}
        />
      </section>

      <section className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              No_Projects_Found
            </span>
          </div>
        )}
      </section>
    </>
  )
}
