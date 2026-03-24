import type { MDXComponents } from "mdx/types"
import NextImage from "next/image"
import { CodeBlock } from "@/components/shared/code-block"

type CalloutProps = {
  type: "note" | "warning" | "tip"
  children: React.ReactNode
}

function Callout({ type, children }: CalloutProps) {
  const label =
    type === "note"
      ? "Architect's_Note"
      : type === "tip"
        ? "Pro_Tip"
        : "Warning"

  return (
    <div className="my-6 border-l-2 border-primary bg-secondary/30 p-6">
      <span className="mb-2 block font-mono text-[10px] font-bold uppercase tracking-widest text-foreground">
        {label}
      </span>
      <div className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

const components: MDXComponents = {
  h2: ({ children }) => (
    <h2 className="mb-6 mt-16 font-heading text-2xl font-bold tracking-tight">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-4 mt-12 font-heading text-xl font-bold tracking-tight">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 list-disc space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 list-decimal space-y-2 pl-6 text-sm leading-relaxed text-muted-foreground">
      {children}
    </ol>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 border-l-2 border-foreground/20 pl-6 italic text-muted-foreground">
      {children}
    </blockquote>
  ),
  code: ({ children }) => (
    <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-xs text-foreground">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto border border-foreground/5 bg-[#0d1117] p-6 font-mono text-sm leading-relaxed">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    <span className="my-8 block">
      <span className="relative block w-full">
        <NextImage
          src={src ?? ""}
          alt={alt ?? ""}
          width={1200}
          height={675}
          className="w-full border border-foreground/5 bg-secondary/20"
          style={{ height: "auto" }}
        />
      </span>
      {alt && (
        <span className="mt-2 block text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
          {alt}
        </span>
      )}
    </span>
  ),
  hr: () => <hr className="my-12 border-foreground/5" />,
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  Callout,
  CodeBlock,
}

export function useMDXComponents(): MDXComponents {
  return components
}
