"use client"

import { useState } from "react"
import Image from "next/image"

type WorkImageProps = {
  src: string
  alt: string
  slug: string
  sizes: string
  className?: string
  priority?: boolean
}

export function WorkImage({ src, alt, slug, sizes, className, priority }: WorkImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className="flex size-full items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary">
        <span className="font-mono text-sm uppercase tracking-widest text-muted-foreground/40">
          [{slug}_hero]
        </span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
    />
  )
}
