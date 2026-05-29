# Diego Maury — Design System v3.1

**Brand System v3 · Violeta Protagonista**
*"Hagamos que las cosas pasen."*

Sistema de diseño personal de Diego Maury: Strategic Program & Innovation Manager operando en LATAM. Sirve cualquier superficie — web, documento, deck, prototipo — con identidad consistente.

> **v3.1 — Tipografía corregida.** Las fuentes oficiales ahora son **Montserrat + Bitter Italic + Space Mono** (las del logo real), reemplazando a Satoshi / Inter / JetBrains Mono.

---

## Esencia de marca

| Atributo | Definición |
|---|---|
| **Posicionamiento** | Strategic Program & Innovation Manager que convierte estrategia en resultados medibles |
| **Sub-línea** | "Programas y sistemas que convierten innovación en resultados medibles." |
| **Tagline** | "HAGAMOS QUE LAS COSAS PASEN" |
| **Fórmula visual** | Innovación + Halloween + Elegancia |
| **Audiencia** | Innovation leaders, corporativos, aceleradoras, hiring managers — LATAM |
| **Métricas clave** | 30+ programas · 900+ proyectos · 3,000+ emprendedores |

---

## Paleta — derivada del logo real

> **Estandarizada al logo.** Reemplaza la paleta antigua (amethyst `#7C3FBE` / ember `#FF5C39`). Los nombres de token `--dm-*` se conservan por compatibilidad, pero ahora resuelven a los colores reales del logo. Fuente canónica: `dm-brand.css`.

### Colores de Marca

| Token | Hex | Nombre | Rol |
|---|---|---|---|
| `--dm-amethyst` | `#4b2a87` | Morado Maury | **Identidad · titulares · isotipo · CTA** |
| `--dm-amethyst-600` | `#3a2170` | Morado profundo | Hover, depth |
| `--dm-catalyst` | `#4b2a87` | Morado | Gradientes, bg bloques |
| `--dm-catalyst-700` | `#3a2170` | Morado profundo | Wordmark, superficies profundas |
| `--dm-catalyst-900` | `#2a1854` | Casi-negro violeta | Hero bg, fondo oscuro |
| `--dm-ember` | `#f0592a` | Naranja Catalizador | **Spark · highlight · tagline** |
| `--dm-quantum` | `#246BFD` | Quantum Blue | Links funcionales (no es marca) |

### Neutrales

| Token | Hex | Nombre | Rol |
|---|---|---|---|
| `--dm-bone` | `#f3f0ec` | Bone | Texto sobre oscuro |
| `--dm-grey` | `#8b8598` | Muted | Texto secundario |
| `--dm-off-white` | `#f6f4f1` | Paper | Page bg claro |
| `--dm-pale` | `#efe9fb` | Pale | Section bg, chips |
| `--dm-ink` | `#241f33` | Tinta | Texto principal |

### Reglas de uso · 60 / 30 / 10

- **Neutral (60%)** → Fondos claros y blancos dominan. Dan aire.
- **Morado (30%)** → CTAs, isotipo, titulares, bloques destacados. La identidad.
- **Naranja (10%)** → Solo el acento: tagline, palabra clave, una llamada por vista. El carácter.
- **Quantum** → Links funcionales, indicadores de estado. No es color de marca.

---

## Tipografía

> **Fuentes oficiales (las del logo).** Reemplazan a las antiguas Satoshi / Inter / JetBrains Mono. Todas son **gratis, comerciales y universales** (Google Fonts) — se cargan igual en web, Canva, Figma y Office.

| Familia | Origen | Rol | Pesos |
|---|---|---|---|
| **Montserrat** | Google Fonts | Display · Headlines · UI · Body | 400–900 |
| **Bitter** *Italic* | Google Fonts | Subtítulos · editorial · citas | 400–600 (italic + roman) |
| **Space Mono** | Google Fonts | Etiquetas · KPIs · tagline | 400 · 700 |

Carga única en el `<head>` — **una sola línea** importa fuentes + tokens (archivos locales, sin depender del CDN):

```html
<link rel="stylesheet" href="dm-brand.css">
```

`dm-brand.css` declara las tres familias vía `@font-face` desde `fonts/` (Montserrat, Bitter y Space Mono). Funciona offline y en exports autónomos. `colors_and_type.css` lo importa y añade las clases semánticas.

### Escala

| Token | Valor | Uso | Familia |
|---|---|---|---|
| `--t-display` | clamp(2.5rem → 4.5rem) | Nombre, hero headline | Montserrat 900 |
| `--t-h1` | clamp(2rem → 3.75rem) | Títulos de sección | Montserrat 800 |
| `--t-h2` | clamp(1.75rem → 2.5rem) | Sub-secciones | Montserrat 700 |
| `--t-h3` | 1.5rem | Cards, items + subtítulos | Montserrat 700 / Bitter italic |
| `--t-body-lg` | 1.125rem | Entradillas | Bitter 400 |
| `--t-body` | 0.875rem | Body principal | Montserrat 400 |
| `--t-mono` | 0.8125rem | KPIs, cifras | Space Mono |
| `--t-mono-tag` | 0.625rem | Labels, chips, tagline | Space Mono 700 |

### Clases semánticas

```css
.dm-display     /* Montserrat 900, -2.5% tracking, uppercase */
.dm-h1 / .dm-h2 / .dm-h3 / .dm-h4  /* Montserrat 700–800 */
.dm-sub         /* Bitter Italic — subtítulos / acentos editoriales */
.dm-lead        /* Bitter roman — entradillas de lectura */
.dm-body-lg / .dm-body / .dm-body-sm  /* Montserrat */
.dm-mono / .dm-mono-tag / .dm-tagline /* Space Mono */
.dm-metric      /* KPI numbers — Montserrat 800, amethyst */
.dm-spark       /* span inline — ember highlight */
```

---

## Componentes

### Botones

```css
.dm-btn .dm-btn-primary      /* Amethyst gradient · CTA principal */
.dm-btn .dm-btn-secondary    /* Ember outline · Acción secundaria */
.dm-btn .dm-btn-ghost        /* Bone border · Navegación */
.dm-btn .dm-btn-primary-light /* Amethyst solid · sobre fondos claros */
```

Tipografía: **Montserrat 700 · sentence-case** (no mono, no uppercase).

### Badges / Chips

```css
.dm-badge .dm-badge-amethyst  /* Violeta · categoría */
.dm-badge .dm-badge-ember     /* Naranja · urgente/destaque */
.dm-badge .dm-badge-quantum   /* Azul · status/info */
.dm-badge-status              /* Añade dot de color antes del texto */
```

### Cards

```css
.dm-card          /* Dark · #0F0A1A bg */
.dm-card-light    /* Light · #FFFFFF bg */
.dm-card-feature  /* Dark con tricolor top border */
```

### Links

```css
.dm-link  /* Quantum blue · dashed underline */
```

---

## Gradientes y barras

```css
--dm-tricolor:      linear-gradient(90deg, #7C3FBE → #4B2672 → #FF5C39)
--dm-amethyst-grad: linear-gradient(135deg, #7C3FBE → #5E2A95)

.dm-tricolor-bar   /* 3px bar — firma de pie de página */
```

---

## Espaciado y radii

Base 4px. Tokens: `--space-1` (4px) → `--space-12` (96px).

Radii: `--r-xs` 4px · `--r-sm` 6px · `--r-md` 10px · `--r-lg` 16px · `--r-pill` 999px.

Sombras: `--shadow-1/2/3` · `--shadow-glow-ember` · amethyst glow vía `box-shadow`.

---

## Assets

| Archivo | Descripción |
|---|---|
| `assets/logo-principal.png` | Logo principal — sobre oscuro |
| `assets/logo-horizontal.png` | Logo horizontal — transparente |
| `assets/logo-tagline.png` | Logo con tagline |
| `assets/logo-alt.png` | Logo alternativo — claro |
| `assets/isotipo.svg` | Hexágono DM — SVG vectorial |
| `assets/hexagon-pattern.png` | Patrón hexagonal — dark |
| `assets/hexagon-pattern-light.png` | Patrón hexagonal — light |

---

## UI Kit

`ui_kits/portfolio/` — mock clickable del portfolio completo:
- Navbar fija con indicador activo
- Hero con métricas band
- Work list con cases (Heineken, ITESM, REDUX)
- Services grid
- About + Contact sections

Importar: `<link rel="stylesheet" href="ui_kits/portfolio/styles.css">` + `<script type="text/babel" src="ui_kits/portfolio/app.jsx"></script>`

---

## Fuentes de información

| Fuente | Tipo |
|---|---|
| https://dmbrand.netlify.app/ | Brand System v2 (referencia canónica) |
| `newlandingpage/docs/superpowers/specs/` | Spec del portfolio |
| Logos y assets subidos | `/uploads/` → `/assets/` |
