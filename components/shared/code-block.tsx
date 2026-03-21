import { highlightCode } from "@/lib/highlight"

type CodeBlockProps = {
  code?: string
  children?: React.ReactNode
  language: string
  filename: string
}

export async function CodeBlock({
  code,
  children,
  language,
  filename,
}: CodeBlockProps) {
  // Support both code prop (direct) and children (MDX usage)
  const source = code ?? (typeof children === "string" ? children : "")
  const html = await highlightCode(source, language)

  return (
    <div className="relative my-6 overflow-x-auto border border-foreground/5 bg-[#0d1117]">
      <div className="absolute right-0 top-0 bg-secondary px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {filename}
      </div>
      <div
        className="p-6 pt-10 font-mono text-sm leading-relaxed [&_pre]:!bg-transparent [&_code]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
