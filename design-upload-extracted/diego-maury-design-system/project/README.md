# Diego Maury — Design System v4

**Sistema "Deep Tech & Friction"**
*"Hagamos que las cosas pasen."*

Sistema de diseño personal de Diego Maury: Strategic Program & Innovation Manager operando en LATAM. Sirve cualquier superficie — web, documento, deck, prototipo — con identidad consistente.

> **v3.1 — Tipografía corregida.** Las fuentes oficiales ahora son **Montserrat + Bitter Italic + Space Mono** (las del logo real), reemplazando a Satoshi / Inter / Space Mono.

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

## Paleta — "Deep Tech & Friction"

> **Sistema de 5 roles estratégicos** derivado del logo real. Comunica **ingeniería de negocios**: ejecución técnica sobre retórica corporativa. Fuente canónica: `dm-brand.css`.

### Colores de marca · 5 roles

| Rol | Token | Hex | Nombre | Aplicación |
|---|---|---|---|---|
| **Dominante** | `--purple` | `#4b2a87` | Morado Maury | Identidad, titulares, isotipo, CTA |
| **Provocador** | `--orange` | `#f0592a` | Ember | Fricción, CTA, métricas, palabra clave |
| **Técnico** | `--blue` | `#2862cf` | Quantum | Links, estados UI, navegación |
| **Enfoque** | `--spark` | `#e6a100` | Spark | KPI, datos críticos, alertas |
| **Suelo** | `--purple-darker` | `#2a1854` | Catalyst 900 | Fondos oscuros, superficies |

> **Quantum y Spark son ahora estratégicos** (antes "uso puntual / no es marca"). Convierten la marca en un entorno de **operación e ingeniería**: Quantum dicta la interacción, Spark señala el dato que importa. Sobre oscuro: Quantum `#7aa6ff`, Spark `#f0b429`.

### Escala tonal · Morado Maury

`100 #efe9fb` · `300 #a98fdb` *(solo superficies/bordes)* · `500 #4b2a87` · `700 #3a2170` · `900 #2a1854`

### Neutrales

| Token | Hex | Nombre | Rol |
|---|---|---|---|
| `--bone` | `#f3f0ec` | Bone | Texto sobre oscuro |
| `--muted` | `#5e4f86` | Violeta Neutro | Texto secundario (NUNCA gris #808080) |
| `--paper` | `#f6f4f1` | Paper | Page bg claro |
| `--pale` | `#efe9fb` | Pale | Section bg, chips |
| `--ink` | `#241f33` | Tinta | Texto principal |

Texto sobre oscuro **blanco-base** (sin lavanda): `--on-dark-1 #f3f0ec` · `--on-dark-2` blanco 78% · `--on-dark-3` blanco 55% · acento técnico `--accent-on-dark #7aa6ff`.

### Jerarquía de fricción

- **Neutral (60%)** → Fondos claros / Catalyst 900. El soporte que deja respirar.
- **Morado (30%)** → CTAs, isotipo, titulares, bloques. La identidad.
- **Ember (provoca)** → Fricción y acción: una llamada por vista.
- **Quantum (opera)** → Interacción: links, estados, navegación.
- **Spark (enfoca)** → Solo el dato crítico: KPI, alerta. Máx 2 por vista.

### Paleta alterna · High Voltage

Para decks de inversión y portadas de impacto: fondo **Catalyst 900** + **blanco puro** + acentos **exclusivamente** Ember/Spark. Tokens `--hv-bg`, `--hv-fg`, `--hv-ember`, `--hv-spark`; helper `.dm-hv`.

### Colores a evitar

- ✕ **Gris medio #808080** → desactiva la disrupción, "corporativo genérico".
- ✕ **Tonos tierra / desaturados** → restan agilidad tecnológica.
- ✕ **Pasteles / lavandas como acento** → contravienen la ejecución (la lavanda solo sobrevive como tint 300 de superficie).

---

## Tipografía

> **Fuentes oficiales (las del logo).** Reemplazan a las antiguas Satoshi / Inter / Space Mono. Todas son **gratis, comerciales y universales** (Google Fonts) — se cargan igual en web, Canva, Figma y Office.

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
.dm-card          /* Dark · Catalyst 900 #2a1854 bg */
.dm-card-light    /* Light · #FFFFFF bg */
.dm-card-feature  /* Dark con tricolor top border */
```

### Links

```css
.dm-link  /* Quantum · dashed underline */
```

---

## Gradientes y barras

```css
--grad-tricolor:    linear-gradient(90deg, #4b2a87 → #6a3a9e → #f0592a)
--grad-purple:      linear-gradient(135deg, #4b2a87 → #3a2170)

.dm-tricolor-bar   /* 3px bar — firma de pie de página (único gradiente sancionado) */
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
