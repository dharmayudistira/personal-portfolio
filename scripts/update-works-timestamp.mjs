/**
 * Updates `updatedAt` in lib/data/works.ts for any work whose slug matches
 * a file changed in the last git commit.
 *
 * Usage: node scripts/update-works-timestamp.mjs
 */

import { execSync } from "node:child_process"
import { readFileSync, writeFileSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")
const WORKS_FILE = resolve(ROOT, "lib/data/works.ts")
const TODAY = new Date().toISOString().slice(0, 10) // YYYY-MM-DD

// Get files changed in the last commit
const changed = execSync("git diff --name-only HEAD~1 HEAD", { cwd: ROOT })
  .toString()
  .trim()
  .split("\n")
  .filter(Boolean)

// Derive affected slugs from changed file paths
// e.g. "public/works/truequity.mp4" → "truequity"
// e.g. "app/works/[slug]/page.tsx" → skip (not slug-specific)
const affectedSlugs = new Set(
  changed.flatMap((f) => {
    const match = f.match(/works[/\\]([a-z0-9-]+)\./i)
    return match ? [match[1].toLowerCase()] : []
  })
)

// Always update if works.ts itself changed
const worksChanged = changed.some((f) => f.includes("lib/data/works.ts"))

if (affectedSlugs.size === 0 && !worksChanged) {
  console.log("No work-specific files changed. Skipping timestamp update.")
  process.exit(0)
}

let content = readFileSync(WORKS_FILE, "utf8")

if (worksChanged) {
  // Update all updatedAt entries when works.ts itself is modified
  content = content.replace(
    /updatedAt:\s*"[\d-]+"/g,
    `updatedAt: "${TODAY}"`
  )
  console.log(`Updated all updatedAt to ${TODAY} (works.ts changed)`)
} else {
  // Only update slugs that had related file changes
  for (const slug of affectedSlugs) {
    // Find the slug entry and update its updatedAt
    const slugPattern = new RegExp(
      `(slug:\\s*"${slug}"[\\s\\S]*?updatedAt:\\s*)"[\\d-]+"`,
      "i"
    )
    if (slugPattern.test(content)) {
      content = content.replace(slugPattern, `$1"${TODAY}"`)
      console.log(`Updated ${slug} updatedAt to ${TODAY}`)
    }
  }
}

writeFileSync(WORKS_FILE, content, "utf8")
