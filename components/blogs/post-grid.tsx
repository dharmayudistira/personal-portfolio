"use client"

import { useMemo, useState, useCallback } from "react"
import type { PostMeta } from "@/lib/posts"
import { TagFilter } from "@/components/blogs/tag-filter"
import { PostCard } from "@/components/blogs/post-card"

const PAGE_SIZE = 6

type PostGridProps = {
  posts: PostMeta[]
  tagGroups: { label: string; tags: string[] }[]
}

export function PostGrid({ posts, tagGroups }: PostGridProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [search, setSearch] = useState("")
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    let results = posts

    if (selectedTags.length > 0) {
      results = results.filter((p) =>
        selectedTags.some((tag) => p.tags.includes(tag))
      )
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      )
    }

    return results
  }, [posts, selectedTags, search])

  const visible = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }, [])

  return (
    <>
      <section className="mb-12">
        <TagFilter
          tagGroups={tagGroups}
          selectedTags={selectedTags}
          onTagsChange={(tags) => {
            setSelectedTags(tags)
            setVisibleCount(PAGE_SIZE)
          }}
          search={search}
          onSearchChange={(value) => {
            setSearch(value)
            setVisibleCount(PAGE_SIZE)
          }}
        />
      </section>

      <section className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2">
        {visible.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground">
              No_Entries_Found
            </span>
          </div>
        )}
        {hasMore && (
          <div className="col-span-full mb-12 flex justify-center pt-8">
            <button
              onClick={handleLoadMore}
              className="border border-foreground/10 bg-secondary px-8 py-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Load_More
            </button>
          </div>
        )}
      </section>
    </>
  )
}
