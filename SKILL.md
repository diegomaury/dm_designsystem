---
name: diego-maury-design
description: Use this skill to generate well-branded interfaces and assets for Diego Maury (Strategic Program & Innovation Manager personal brand), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Diego Maury — Design Skill

Read the `README.md` file within this skill, and explore the other available files. Key entry points:

- `README.md` — full brand context, content fundamentals, visual foundations, iconography rules.
- `colors_and_type.css` — drop-in CSS tokens, estandarizados al logo real (Morado Maury `#4b2a87`, Morado profundo `#3a2170`, Casi-negro violeta `#2a1854`, Naranja `#f0592a`, Tinta `#241f33`, Paper `#f6f4f1`) + Montserrat/Bitter/Space Mono type scale + semantic classes. Importa `dm-brand.css` (fuente canónica de tokens).
- `assets/` — official logos (principal, with-tagline, horizontal), hexagon honeycomb patterns, and the isotipo SVG.
- `preview/` — small per-token / per-component HTML cards.
- `ui_kits/portfolio/` — React recreation of the `diegomaury.mx` portfolio (Nav, Hero, Work, Services, About, Contact, Footer + case modal).

## When invoked

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules in `README.md` to become an expert in designing with this brand.

If the user invokes this skill without other guidance, ask them what they want to build or design, ask a few questions (audience, surface, format, tone), then act as an expert designer who outputs HTML artifacts *or* production code.

## Hard rules to honor

- **Spanish first** unless told otherwise.
- **60·30·10**: 60% paper/blanco · 30% Morado · 10% Naranja (un solo acento por vista).
- **Tagline:** "HAGAMOS QUE LAS COSAS PASEN" — Space Mono, 0.18em tracking, Naranja `#f0592a`.
- **Type:** Montserrat (display/UI/body) — 800/900 mayúsculas para titulares. Bitter Italic para subtítulos y citas. Space Mono para IDs/fechas/cifras y la tagline.
- **Tone:** operational, evidence-led, first-person, measurable. Verbo + qué + impacto + timeframe.
- **Forbidden:** turquoise `#64D8C8`, bluish-purple gradients, Arial/Times/Calibri, emoji-as-icons in body.
- **The only sanctioned gradient** is the tricolor bar (Morado → Naranja), used as a 3px footer signature.
