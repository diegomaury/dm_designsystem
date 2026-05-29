---
name: diego-maury-design
description: Use this skill to generate well-branded interfaces and assets for Diego Maury (Strategic Program & Innovation Manager personal brand), either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.
user-invocable: true
---

# Diego Maury — Design Skill

Read the `README.md` file within this skill, and explore the other available files. Key entry points:

- `README.md` — full brand context, content fundamentals, visual foundations, iconography rules.
- `colors_and_type.css` — drop-in CSS tokens del sistema "Deep Tech & Friction": 5 roles estratégicos (Morado Maury `#4b2a87`, Ember `#f0592a`, Quantum `#2862cf`, Spark `#e6a100`, Catalyst 900 `#2a1854`) + escala tonal + paleta alterna High Voltage + Montserrat/Bitter/Space Mono. Importa `dm-brand.css` (fuente canónica de tokens).
- `assets/` — official logos (principal, with-tagline, horizontal), hexagon honeycomb patterns, and the isotipo SVG.
- `preview/` — small per-token / per-component HTML cards.
- `ui_kits/portfolio/` — React recreation of the `diegomaury.mx` portfolio (Nav, Hero, Work, Services, About, Contact, Footer + case modal).

## When invoked

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, copy assets and read the rules in `README.md` to become an expert in designing with this brand.

If the user invokes this skill without other guidance, ask them what they want to build or design, ask a few questions (audience, surface, format, tone), then act as an expert designer who outputs HTML artifacts *or* production code.

## Hard rules to honor

- **Spanish first** unless told otherwise.
- **5 roles de fricción**: Morado Maury *manda* (identidad, 30%) · Ember *provoca* (CTA/fricción, una llamada por vista) · Quantum *opera* (links/estados/navegación) · Spark *enfoca* (KPI/alerta, máx 2 por vista) · Catalyst 900 *sostiene* (suelo). Neutral 60%.
- **Quantum y Spark son estratégicos**, no decorativos: dictan la interacción operativa. Sobre oscuro usa `#7aa6ff` / `#f0b429`.
- **Tagline:** "HAGAMOS QUE LAS COSAS PASEN" — Space Mono, 0.18em tracking, Ember `#f0592a`.
- **High Voltage** (impacto/inversión): fondo Catalyst 900 + blanco puro + acentos solo Ember/Spark (`.dm-hv`).
- **Type:** Montserrat (display/UI/body) — 800/900 mayúsculas para titulares. Bitter Italic para subtítulos y citas. Space Mono para IDs/fechas/cifras y la tagline.
- **Tone:** operational, evidence-led, first-person, measurable. Verbo + qué + impacto + timeframe.
- **Forbidden:** gris medio `#808080`, tonos tierra/desaturados, **lavanda como acento** (solo tint 300 de superficie), Arial/Times/Calibri, emoji-as-icons in body.
- **The only sanctioned gradient** is the tricolor bar (Morado → Ember), used as a 3px footer signature.
