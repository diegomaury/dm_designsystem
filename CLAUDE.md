# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

Personal brand design system for Diego Maury — Strategic Program & Innovation Manager. All artifacts are **static HTML/CSS** files. No build step, no package manager, no bundler.

To preview any file: open it directly in a browser (`start <file>.html` on Windows) or use a local server (`npx serve .`).

## Architecture

### CSS layer (canonical order)

1. **`dm-brand.css`** — the single source of truth. Declares `@font-face` blocks (local `fonts/` files) and all `--dm-*` CSS custom properties. Never edit token values anywhere else.
2. **`colors_and_type.css`** — imports `dm-brand.css`, then adds semantic utility classes (`.dm-display`, `.dm-h1`…, `.dm-body`, `.dm-mono`, `.dm-spark`, `.dm-btn-*`, `.dm-badge-*`, `.dm-card`, `.dm-link`, etc.).
3. Individual HTML files import only `colors_and_type.css` (which chains to `dm-brand.css`). Never import `dm-brand.css` alone in an HTML file.

### Assets

- `fonts/` — all font files loaded locally (Montserrat variable, Bitter variable, Space Mono static). No CDN dependency.
- `assets/` — canonical logo files (`logo-principal.png`, `logo-horizontal.png`, `logo-tagline.png`, `logo-alt.png`), isotipo, hexagon patterns.
- `assets_b64_logos.js` / `assets_b64_rest.js` — base64 versions for self-contained single-file exports.

### HTML files

Each `.html` at root is a standalone design tool or demo (typography system, logo specs, social banners, quote cards, etc.). They are self-contained — open and view directly.

`export/` and `exports/` hold past exports; `export/src/ui_kits/portfolio/` has the React portfolio kit.

### SKILL.md

Machine-readable Claude skill descriptor. When Claude Code invokes the `diego-maury-design` skill, it reads this file and `README.md` to act as an expert designer with this brand.

## Brand rules (hard constraints)

- **Colors:** Morado Maury `#4b2a87` · Naranja `#f0592a` · Tinta `#241f33` · Paper `#f6f4f1`. No turquoise, no bluish-purple gradients.
- **60·30·10 rule:** 60% neutrals · 30% Morado · 10% Naranja (one accent per view).
- **Fonts:** Montserrat (display/UI/body) · Bitter Italic (subtítulos/citas) · Space Mono (KPIs/tagline/labels). No Arial, Times, Calibri, Satoshi, Inter, or JetBrains Mono.
- **Only sanctioned gradient:** tricolor bar `linear-gradient(90deg, #7C3FBE → #4B2672 → #FF5C39)` — 3px footer signature only.
- **Tagline:** "HAGAMOS QUE LAS COSAS PASEN" — Space Mono, Naranja `#f0592a`, 0.18em tracking.
- **Tone:** operational, evidence-led, first-person, measurable. Format: Verbo + qué + impacto + timeframe.
- **Language:** Spanish unless told otherwise.

## When creating new artifacts

1. Start with `<link rel="stylesheet" href="colors_and_type.css">` (adjust path as needed).
2. Use only the semantic classes from `colors_and_type.css` — do not recreate token values inline.
3. For self-contained single-file exports, inline `dm-brand.css` + `colors_and_type.css` and swap `<img>` tags for base64 values from `assets_b64_*.js`.
4. Keep `index.html` (Brand System v2 reference) as read-only historical reference — it uses the old Satoshi/Inter stack.
