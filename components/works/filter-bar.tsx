import { TAG_GROUPS } from "@/lib/data/works"
import { TagFilterBar } from "@/components/shared/tag-filter-bar"

type FilterBarProps = {
  selectedTags: string[]
  onTagsChange: (tags: string[]) => void
  search: string
  onSearchChange: (value: string) => void
}

export function FilterBar(props: FilterBarProps) {
  return <TagFilterBar tagGroups={TAG_GROUPS} {...props} />
}
