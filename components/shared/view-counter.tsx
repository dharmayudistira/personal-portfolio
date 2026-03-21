"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Eye } from "lucide-react"
import { useEffect } from "react"

type ViewCounterProps = {
  slug: string
  increment?: boolean
}

const fetchViews = async (slug: string): Promise<number> => {
  const res = await fetch(`/api/views/${slug}`)
  const data = await res.json()
  return data.views ?? 0
}

const incrementViews = async (slug: string): Promise<number> => {
  const res = await fetch(`/api/views/${slug}`, { method: "POST" })
  const data = await res.json()
  return data.views ?? 0
}

export function ViewCounter({ slug, increment = false }: ViewCounterProps) {
  const queryClient = useQueryClient()

  const { data: views } = useQuery({
    queryKey: ["views", slug],
    queryFn: () => fetchViews(slug),
  })

  const { mutate } = useMutation({
    mutationFn: () => incrementViews(slug),
    onSuccess: (newViews: number) => {
      queryClient.setQueryData(["views", slug], newViews)
    },
  })

  useEffect(() => {
    if (increment) mutate()
  }, [increment, mutate])

  return (
    <span className="flex items-center gap-1.5">
      <Eye className="size-3" />
      {views != null ? `${formatViews(views)}_Views` : "—"}
    </span>
  )
}

function formatViews(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return String(n)
}
