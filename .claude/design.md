# Design System

Detailed reference. See [`CLAUDE.md`](../CLAUDE.md) for the design philosophy (monochromatic, no accent colors, three fonts, fixed).

## Palette

Strict monochromatic. **No accent colors.** Primary is `#131313` (light) / `#ffffff` (dark). All semantic tokens are CSS variables defined in `app/globals.css`.

```
Light: background #f9f9f9 / foreground #131313 / muted-foreground #6b6b6b
Dark:  background #131313 / foreground #e5e2e1 / muted-foreground #919191
```

Other tokens follow shadcn conventions: `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`. Sidebar tokens exist but are unused on this site.

## Typography

Three font variables, all loaded via `next/font/google` in `app/layout.tsx`:

| Variable | Font | Usage |
|---|---|---|
| `--font-heading` | Space Grotesk | `font-heading`, all headings, uppercase |
| `--font-sans` | Inter | Default body |
| `--font-mono` | IBM Plex Mono | `font-mono`, labels, metadata, code, nav |

Don't introduce new typefaces. Don't reach for arbitrary `font-family` values.

## Layout

- Pages use `max-w-5xl mx-auto` (1024px max).
- Vertical dashed grid lines render as decorative `div`s inside `AppShell`.
- Content sections separated by `<SectionDivider label="TAG:NN" />`.
- Page horizontal padding: `px-6 lg:px-12`.

## Theme toggle

`components/shared/theme-toggle.tsx` uses the View Transition API (`document.startViewTransition`) to animate a radial ripple from the button position. Falls back to instant swap if View Transitions are unsupported or `prefers-reduced-motion` is set.

The Tailwind v4 `dark` variant is defined in `globals.css`:

```css
@custom-variant dark (&:where(.dark, .dark *));
```

`:where` keeps specificity at zero so user overrides win.

## Custom utilities

Defined in `globals.css`:

- `grid-line-v` / `grid-line-h` — dashed background-image utilities for the structural grid lines.
- `animate-marquee` — 40s linear infinite translation, used by `TechMarquee`.

## Visual texture

A grain noise overlay renders at `z-9990` over the entire viewport in `app/layout.tsx`. Opacity: `0.035` light / `0.055` dark. Implemented as inline SVG turbulence; do not replace with a raster.
