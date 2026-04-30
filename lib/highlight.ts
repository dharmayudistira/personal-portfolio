import { createHighlighter, type Highlighter } from "shiki"

const THEME = "github-dark-default"

const LANGS = [
  "ts",
  "tsx",
  "js",
  "jsx",
  "bash",
  "sh",
  "json",
  "css",
  "html",
  "yaml",
  "md",
  "mdx",
  "python",
  "kotlin",
  "dart",
  "sql",
] as const

let _hl: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
  return (_hl ??= createHighlighter({
    themes: [THEME],
    langs: LANGS as unknown as string[],
  }))
}

export async function highlightCode(
  code: string,
  lang: string
): Promise<string> {
  const hl = await getHighlighter()
  const known = (LANGS as readonly string[]).includes(lang) ? lang : "text"
  return hl.codeToHtml(code, { lang: known, theme: THEME })
}
