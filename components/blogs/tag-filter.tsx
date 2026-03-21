import { TagFilterBar } from "@/components/shared/tag-filter-bar"

type TagFilterProps = {
  tagGroups: { label: string; tags: string[] }[]
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  search: string
  onSearchChange: (value: string) => void
}

export function TagFilter({ tagGroups, ...props }: TagFilterProps) {
  return <TagFilterBar tagGroups={tagGroups} {...props} />
}
