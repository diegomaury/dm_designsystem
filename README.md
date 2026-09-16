# Diego Maury — Design System V2

**Sistema "Ember on Ink"**\
*"Hagamos que las cosas pasen."*

> **Alcance de este proyecto:** este es el contrato de marca y sus fuentes (tokens, isotipos, lockups, piezas vivas). **No** es el repo del sitio: `diegomaury.mx` es un build de Astro que Cloudflare Pages despliega desde `master`; los estáticos de raíz de ese repo se eliminaron el 2026-08-13 y no se recrean aquí.

> **⚠️ Verificación 2026-09-11:** la sección "Archivos del sistema" más abajo describe el retiro de piezas/docs como ya ejecutado el 2026-09-11. Al verificar contra el proyecto real ese mismo día, una parte todavía no había pasado — ver el detalle exacto, archivo por archivo, en `archive/README.md`.

Sistema de diseño personal de Diego Maury: Strategic Program Director operando en LATAM. Sirve cualquier superficie — web, documento, deck, redes — con identidad consistente.

> **v2.0 — Ember on Ink.** Sistema completamente renovado. Dark-first, acento único Electric Ember, Plus Jakarta Sans + DM Mono. Sin gradientes, sin glows, sin efectos. Todo autocontenido.

---

## Esencia de marca

| Atributo | Definición |
| --- | --- |
| **Nombre** | Diego Maury |
| **Título** | Strategic Program Director |
| **Tagline** | Hagamos que las cosas pasen. |
| **URL** | diegomaury.mx |
| **Substack** | diegomaury.substack.com · Haz que Pase |
| **Métricas clave** | 30+ programas · 900+ proyectos · 3,000+ emprendedores |

---

## Estados de archivo

Todo documento del sistema declara su estado en la primera línea:

| Estado | Significado | Quién lo toca |
| --- | --- | --- |
| **canónico** | Fuente de verdad del contrato (tokens, README, linter, decisiones) | Solo con decisión explícita de Diego |
| **vigente** | Pieza de marca activa, en uso real | Se actualiza al cambiar el contrato |
| **copia-de-trabajo** | Borrador o experimento, no forma parte del contrato | Libre |
| **retirado** | Archivado en `archive/`, se conserva como registro | No se edita, solo se consulta |

---

## Paleta — Ember on Ink

| Token | Hex | Nombre | Uso |
| --- | --- | --- | --- |
| `--color-bg-primary` | `#0A0612` | Deep Ink | Fondo principal |
| `--color-bg-secondary` | `#1A1128` | Surface | Cards, paneles, hover |
| `--bg-stage` | `#06030F` | Deep Ink -2 | Fondo de escenario fuera del lienzo (Deck, poster) |
| `--color-border` | `#6A291B` | Ember Dark | Bordes y separadores |
| `--border-control` | `#B06A4E` | Ember Dark — control | Contorno de elementos accionables (botón fantasma, chip, toggle, tarjeta-botón). `--border` no alcanza 3:1 para este uso — ver D-B |
| `--color-text-primary` | `#FAF8FC` | Off White | Headlines, nombre |
| `--color-text-secondary` | `#DDDBE0` | Near White | Role, URL, metadata |
| `--color-text-tertiary` | `#A8A6AC` | Neutral Mid | Supporting copy |
| `--color-accent` | `#FF5C39` | Electric Ember | Acento único |

**Regla crítica:** ver "Reglas de diseño no negociables" · regla 1. Ember es color de señalización estructural, no decoración. Un solo acento en todo el sistema — no existe un segundo color vivo. Sin gradientes, drop shadows, blur ni glow.

**Texto sobre Ember:** siempre tinta `#0A0612` (`--bg`), contraste 6.53:1. Nunca blanco (`#fff` sobre `#FF5C39` = 3.07:1, no pasa AA). No existe un segundo valor de naranja en el sistema.

**Borde de control (D-B · 2026-09-15):** `--border` da 1.86:1 sobre `--bg` y 1.34:1 sobre `--bg-2` — no sirve de contorno para un control interactivo (necesita 3:1). Ese rol lo cubre `--border-control` (`#B06A4E`, 4.71:1 / 3.40:1). `--border` se queda para filetes y separadores; no se reemplaza globalmente. El hover de un control con `--border-control` reusa `var(--ember)`, sin añadir un color nuevo. Detalle y candidatos descartados: `decisions.md` D-B.

---

## Tipografía

```html
<!-- Google Fonts — cargar en el <head> -->
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,700;1,400;1,700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

| Familia | Rol | Pesos |
| --- | --- | --- |
| **Archivo** | Titulares | 400 · 700 |
| **Plus Jakarta Sans** | Cuerpo · UI · Cifras | 300 · 400 · 500 · 700 · Itálica |
| **DM Mono** | Eyebrows · Fechas · Labels · Metadata | 400 · 500 |

**Archivo siempre:** peso 700, `letter-spacing: -0.035em`, `line-height: 1.02`. El tracking negativo es parte de la decisión (D-H), no un ajuste por pieza: sin él, Archivo lee genérica.

**DM Mono siempre:** uppercase, letter-spacing 0.06–0.18em. Nunca para párrafos largos.

**Pesos:** el contrato carga únicamente 300 / 400 / 500 / 700. El peso 800 no existe en la escala — si aparece, el navegador lo sintetiza (faux bold). Ver regla 10 (D4).

---

## Tokens CSS

Importar `v2-tokens.css` (o `styles.css`, que hace `@import` de `v2-tokens.css` y es el entry point canónico) o usar las variables directamente:

```css
:root {
  --bg: #0A0612;  --bg-2: #1A1128;  --bg-stage: #06030F;  --border: #6A291B;
  --border-control: #B06A4E;
  --t1: #FAF8FC;  --t2: #DDDBE0;  --t3: #A8A6AC;
  --ember: #FF5C39;
  --display: 'Archivo', system-ui, sans-serif;
  --sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --mono: 'DM Mono', ui-monospace, monospace;
}
```

Modo claro (D2): nomenclatura canónica `--light-bg` / `--light-text-1` / `--light-text-2` / `--light-border` / `--light-accent`. Los alias `--bg-light` / `--t1-light` / `--t2-light` / `--border-light` están **retirados en v3.0 · sin consumidores desde 2026-09-11** (verificado con `.tools/ds-adherence-check.mjs`, regla R6 — `Footer.html` era el único consumidor y se migró a la nomenclatura canónica).

`consumer-example.html` es el único archivo del repo que demuestra el patrón de consumo correcto (`@import` sin `:root` local) — úsalo como referencia antes de copiar tokens a mano.

---

## Assets de marca

### SVG isotipo (fuente de verdad)

| Archivo | Modo | Uso |
| --- | --- | --- |
| `assets/isotipo-dark.svg` | **Dark — primario** | Fondos oscuros (`#0A0612`, `#1A1128`, fotos oscuras). Hexágono `#FAF8FC` + facetas Ember. |
| `assets/isotipo-light.svg` | **Light — alterno** | Fondos claros (`#FAF8FC`, blancos), impresión. Hexágono `#2A1F3D` + facetas Ember. *(Excepción confirmada: `stroke:#2A1F3D` del hexágono es fijo — no propagar `--border`.)* |
| `assets/isotipo-final-ember.svg` | Original | Hexágono Off-White + facetas Ember — sin fondo |
| `assets/isotipo-final-white.svg` | Una tinta | Todo en blanco |
| `assets/isotipo-final-circulo.svg` | Contenedor | Circular · fondo Deep Ink |
| `assets/isotipo-final-cuadrado.svg` | Contenedor | Cuadrado · fondo Deep Ink |

**Regla de modo:** la elección la determina el fondo, no la preferencia. Fondo oscuro → `isotipo-dark.svg`. Fondo claro → `isotipo-light.svg`. Las facetas Ember (`#FF5C39`) son invariables en ambos modos. Si el fondo es ambiguo, usa un contenedor sólido y aplica el modo correspondiente.

El isotipo nunca se deforma, rota ni se le agregan efectos. Solo se usan estas variantes.

### Lockups horizontales y verticales

| Carpeta | Contenido |
| --- | --- |
| `assets/logos/` | 6 lockups SVG: horizontal (dark / light), vertical (dark / light), vertical con tagline (dark / light). Fuente de verdad de la firma isotipo + nombre en formato bloque. |
| `assets/logo-pack/svg/` · `assets/logo-pack/png/` | Pack distribuible — mismas 6 variantes + isotipos sueltos, en SVG y PNG @2x. |

### Lockup base (código)

Definición canónica: `.lockup` / `.lockup-divider` / `.lockup-name` / `.lockup-role` en `v2-tokens.css` — isotipo 32px · gap 2.4px · divisor `var(--t1)` 1×30 · nombre 14px/700/+.04em · rol itálica sans 8.5px `var(--t2)`.

```html
<!-- Lockup isotipo + nombre -->
<div class="lockup">
  <img src="assets/isotipo-final-ember.svg" width="32" height="32">
  <div class="lockup-divider"></div>
  <div>
    <div class="lockup-name">Diego Maury</div>
    <div class="lockup-role">Strategic Program Director</div>
  </div>
</div>
```

---

## Archivos del sistema

Tras la limpieza de 2026-09 (ver `decisions.md` y `archive/README.md`), el núcleo vivo es:

### Contrato

| Archivo | Estado |
| --- | --- |
| `v2-tokens.css` | canónico |
| `styles.css` | canónico — entry point, `@import` de `v2-tokens.css` |
| `README.md` | canónico |
| `CLAUDE.md` | canónico |
| `decisions.md` | canónico |
| `_ds_manifest.json` | canónico |
| `_adherence.oxlintrc.json` | canónico |
| `SKILL.md` · `_ds_bundle.js` | canónico |
| `consumer-example.html` | canónico — único consumidor real del token store |

### Marca

`assets/isotipo-*.svg` (8) · `assets/logos/` (6 lockups) · `assets/logo-pack/` — todos canónicos.

### Piezas vivas

| Archivo | Formato | Estado |
| --- | --- | --- |
| `Deck.html` | 1280×720 · 8 slides | vigente |
| `Footer.html` | Web footer · oscuro y claro | vigente |
| `Quote Cards.html` | 1080×1080 · carousel · 10 quotes | vigente |
| `poster.html` | 1080×1080 · poster editorial | vigente |

**Las piezas descargables de v2.0–v2.1 (LinkedIn, Facebook, fondos de perfil, tarjeta, animación, Substack, banners sociales) y la documentación HTML de esa misma era (Manual de Marca v2.0, Logo Specs, Sistema Tipográfico, Guía de Uso, Inventario de Assets, Isotipo Dark Light, y las preview cards `preview/v2-*`) se retiraron el 2026-09-11: quedaban construidas contra la paleta pre-v2.2 (`#2A1F3D` / `#9A8CB0` / `#8B7C9E`, no pasa AA) y sin `@import` real de los tokens.** Se archivaron en `archive/piezas/` y `archive/docs/preview-v2/` (ver `archive/README.md`). Se rehacen desde cero contra v2.3, en el orden documentado en `cleanup-runbook.md` — hasta entonces no hay assets de canal publicados para LinkedIn, Substack, tarjeta, one-pager, CV ni firma de correo v2.

**Paso 0.3c completo (2026-09-11):** `uploads/index.html`, `ui_kits/version2/` y `ui_kits/portfolio/` (sitios/portfolio muertos) y `design_handoff_azul_medianoche/` · `design_handoff_quote_cards/` (handoffs cerrados) se archivaron en `archive/sitios/`, `archive/ui-kits/` y `archive/handoffs/`. Los archivos grandes sin dato de marca (los dos `index.html` de ~2,500 líneas y el andamiaje `image-slot.js`) se archivaron como stub con nota, no copia completa — su contenido decisional ya vivía en `decisions.md`. Detalle exacto en `archive/README.md`.

---

## Reglas de diseño no negociables

1. **Ember = señalización estructural (D-A · 2026-09-10):** Ember `#FF5C39` es color de señalización estructural: eyebrow / label de sección y llamada a la acción. Nunca en cifras, bullets, puntos, iconos decorativos ni palabras sueltas de un titular. No cuenta como violación el logo del nav. Cualquier otro uso requiere entrada en la tabla de excepciones.
2. **Sin efectos:** Prohibidos gradientes, drop shadows, blur, glow, efectos decorativos. El movimiento perpetuo puramente decorativo (marquees sin función, loops infinitos de adorno) no va; una marquesina que cumple una función de contenido es una excepción a registrar, no una prohibición absoluta.
3. **Dark mode primario:** Fondo `#0A0612` por defecto.
4. **DM Mono restringido:** Solo para eyebrows, fechas, labels y metadata. Nunca párrafos, nunca cifras — las cifras van en Plus Jakarta Sans 700 tabular a cualquier tamaño.
5. **Estructura en tinta + ember:** El violeta queda solo en los fondos (`#0A0612`, `#1A1128`); texto de apoyo y bordes son neutros casi blancos y ember oscuro/quemado (`#DDDBE0`, `#A8A6AC`, `#6A291B`).
6. **Espacio generoso:** Ante la duda, más espacio.
7. **Autocontenido:** Sin dependencias externas salvo Google Fonts. Sin `colors_and_type.css`.
8. **Ember sobre claro (D3):** El ember nunca aparece como identificador aislado sobre fondo blanco. Sobre claro, siempre acompañado de la tinta (`#0A0612`). Nunca como color de texto sobre claro (contraste 2.91:1 sobre `#FAF8FC`, no pasa AA).
9. **Logotipo (D5):** Toda mención de `DIEGO MAURY` o `DIEGOMAURY.MX` como logotipo o firma usa Plus Jakarta Sans 700, uppercase, `letter-spacing: 0.04em`, en Off-White `#FAF8FC` sobre fondo oscuro. Única excepción: impresión a una tinta sobre papel claro (tinta `#0A0612`, mismos parámetros tipográficos).
10. **Display grande (D-H · 2026-09-12):** Los titulares usan **Archivo 700** con `letter-spacing: -0.035em` en toda la escala. El peso 300 de Plus Jakarta Sans deja de ser el recurso de display y queda solo para texto grande que no es titular. El peso 800 sigue sin existir. *(Reemplaza la redacción anterior de D4: "titulares hero (>48px) usan Plus Jakarta Sans peso 300".)*
11. **Texto sobre Ember (D-P3 · 2026-09-10):** Siempre tinta `#0A0612` (`--bg`), 6.53:1. Nunca blanco ni `--t1`. No se agrega un segundo valor de naranja al sistema.
12. **Contorno de control (D-B · 2026-09-15):** Todo elemento accionable (botón fantasma, chip, toggle, tarjeta con rol de botón) usa `--border-control` (`#B06A4E`), no `--border` — `--border` no llega a 3:1 sobre ninguno de los dos fondos del sistema. El hover de un control reusa `var(--ember)`.

---

## Fuente de valores en cada pieza

Toda pieza importa `v2-tokens.css` o declara su bloque `:root` con un sello en la primera línea: `/* estado: ... */` + `/* snapshot vX.Y — AAAA-MM-DD */`. `consumer-example.html` hace `@import`; las piezas de formato fijo que se abren por doble clic conservan su `:root` local con sello obligatorio.

**Verificación automatizada (2026-09-12):** `.tools/ds-adherence-check.mjs` corre contra los `.css`/`.html` vivos y confirma el sello, el hex fuera de `:root`, la tipografía, los pesos, el contraste sobre Ember, los efectos prohibidos y los alias deprecados (reglas R0–R6), más los tokens documentados sin consumidor (R7). Desde v2.5 engancha además `ds-dimension-check.mjs`: escala tipográfica por superficie (R8), espacio base 4 (R9), radio cero (R10), `clamp()` solo en web (R11–R12), pesos declarados (R13), filetes y área táctil (R14) y familia de titular (R15 · D-H). Correr `node .tools/ds-adherence-check.mjs --strict` antes de publicar cualquier pieza nueva o editada; excepciones aprobadas viven en `_adherence-exceptions.json`, no en el código. Detalle y tabla de excepciones del chequeo: `design_handoff_design_system_remediation/fase3/README.md`.

---

## Excepciones confirmadas

| Archivo / scope | Regla | Excepción | Aprobado |
| --- | --- | --- | --- |
| `assets/isotipo-light.svg` | `--border` token | `stroke:#2A1F3D` fijo en el path del hexágono — no sincronizar con `--border` | Diego |
| `archive/Firma de Correo v1.html` | Hex crudos | Clientes de email no soportan variables CSS — hex directos son necesarios. Los valores sí se actualizan. | Diego |
| Foto de perfil · nav sticky · modal (sitio) | Regla 2 — sin efectos | `mask-image` de la foto de perfil, `backdrop-filter` del nav y el modal, hover de elevación `translateY(-2/-3px)` — funcionales, no decorativos | Diego · 2026-09-10 |
| `v2-tokens.css` (`--light-accent`) | R7 — token sin consumidor | Reservado: D2 documenta la paleta clara como bloque completo y D-E (Fase 2) planea migrar superficies de lectura a modo claro. Revisar al cerrar D-E — si sigue sin consumidor, se retira. | Diego · 2026-09-11 |

**Cerrada el 2026-09-16:** `--border-control` (D-B · 2026-09-15) tenía una excepción R7 temporal registrada aquí el mismo día que se creó, condicionada a que un consumidor real lo usara. Cerró en cuanto el sitio `newlandingpage` lo consumió (`.btn-ghost`, toggle de idioma, `.chip`, `.events-cat-chip`, `.events-view-btn`, `.showcase-card`, tarjetas de caso — commit `fix(ds): agrega --border-control...`, 2026-09-16). La excepción de `_adherence-exceptions.json` sigue con `v2-tokens.css` en su lista de R7 porque el mecanismo excepciona por archivo, no por token — `--light-accent` (arriba) sigue siendo la razón de esa entrada; no se retira hasta cerrar D-E.

**Retiradas el 2026-09-11 (D-V1):** el Azul Medianoche (`--accent-secondary` `#2F6FE0` / `--accent-secondary-text` `#457FE3`) y `--ember-cta` (`#BF452B`) salen del contrato por completo — nunca se usaron y no se acotan a un scope, se eliminan. Ver `decisions.md` D-V1. Las excepciones de `ui_kits/portfolio/styles.css` (blur funcional, Ember dos veces) quedan pendientes de retiro formal hasta que ese directorio se archive (ver nota en "Archivos del sistema").

---

## Este repositorio

Contrato del sistema v2.5. `main` es la fuente de verdad: si este repo y una
copia distribuida (un bundle `_ds/`, un `vendor/` de otro proyecto) se
contradicen, gana este repo y la copia se regenera.

El sistema v1 (mayo–junio 2026) vive en la historia, en el commit `2dfbeca`.
No está en el árbol y no se restaura: su paleta no pasa AA y su CSS viola la
regla 7.

### Verificación

Todo push corre el chequeo de adherencia en modo `--strict`:

```bash
node .tools/ds-adherence-check.mjs --strict
```

Reglas R0–R7 (sello, hex crudo, tipografía, pesos, contraste sobre Ember,
efectos, alias retirados, tokens sin consumidor) y R8–R15 (escala por
superficie, espacio base 4, radio cero, `clamp()`, pesos, filetes, área
táctil, familia de titular). Las excepciones aprobadas viven en
`_adherence-exceptions.json`, nunca en el código.

### Consumidores

| Consumidor | Cómo consume |
| --- | --- |
| `diegomaury-mx/newlandingpage` | `src/styles/vendor/ds-v2-tokens.css`, re-vendoreado a mano · guardia de deriva en `ds-tokens-drift.test.ts` |
| Proyectos de Claude Design | bundle `_ds/…`, sincronizado desde la sesión del proyecto consumidor |

Ninguno de los dos consume este repo por referencia directa: los dos tienen
copia. Cada vez que cambie un token hay que regenerar las dos, y el criterio
de salida de cualquier fase que toque tokens incluye correr el `grep` sobre
este repo **y** sobre las copias.

---

## Changelog

### v2.5 — Septiembre 2026 (en curso)
- **`--border-control` (D-B · 2026-09-15):** token nuevo, `#B06A4E` — único de tres candidatos evaluados que pasa 3:1 sobre `--bg` (4.71:1) y sobre `--bg-2` (3.40:1). Cubre el contorno de elementos accionables; `--border` (1.86:1 / 1.34:1) se queda para filetes y separadores, sin cambiar. Hover reusa `--ember`, sin color nuevo. Consumo: `.border-control` en `v2-tokens.css`. Detalle y candidatos descartados: `decisions.md` D-B.
- **`--border-control` con consumidor real, excepción R7 cerrada (2026-09-16):** consumidor es `diegomaury.mx` (repo `newlandingpage`), PR 2 de la remediación de auditoría del design system, commit `7950df8` — seis piezas (`.btn-ghost`, toggle de idioma, `.chip`, `.events-cat-chip`, `.events-view-btn`, `.showcase-card`, tarjetas de caso; ver tabla de excepciones). Trazable a ese commit si el token vuelve a aparecer huérfano en una corrida de R7.

### v2.4 — Septiembre 2026 (limpieza)
- **Chequeo de adherencia CSS/HTML ejecutado y en verde (2026-09-11):** `.tools/ds-adherence-check.mjs` corrió contra las 8 piezas vivas del canónico. Primera corrida: 60 hallazgos. Tras sellar `Deck.html`/`Footer.html`/`poster.html`/`Quote Cards.html`/`styles.css` (R0) y migrar `Footer.html` a `--light-*` (R6), quedaban 13 — de los cuales 2 eran bugs del propio script (R1/R5 matcheaban texto/prosa y entidades HTML `&#8592;` como si fueran CSS real; corregido acotando ambas reglas a contenido dentro de `<style>` o de un atributo `style="..."`). Corrida final: **0 hallazgos, incluido `--strict`**, con 1 excepción aprobada (R7 · `--light-accent`).
- **Dos hex reales encontrados fuera del conteo inicial, corregidos en código:** `Quote Cards.html` tenía `color:#1A1128` en dos overrides `.s-light` (era literalmente el valor de `--bg-2`, usado como texto sobre claro — no un valor ad hoc) y `background:#D9D2E8` en `.s-light .v-rule-sm` (valor inventado, sin token — se acopló a `--light-border`, el más cercano, en vez de crear un token de un solo uso). `Deck.html` tenía `background:#0A0612` hardcodeado dentro de `@media print`. Los tres eran hex reales en CSS real, no ruido del script — el conteo original salió de leer la salida de la corrida, no el disco.
- **Isotipo de `Quote Cards.html` migrado de SVG inline a `assets/isotipo-dark.svg`:** el `<svg>` embebido a mano (con `stroke:#FF5C39`/`#FAF8FC` hardcodeados) era una cuarta copia del isotipo divergiendo del asset canónico — mismo patrón que motivó la auditoría original. Reemplazado por `<img src="assets/isotipo-dark.svg">`.
- **Alias de modo claro retirados en v3.0, confirmado sin consumidores (2026-09-11):** cambio 17 cerrado — `Footer.html` era el único consumidor de `--bg-light`/`--t1-light`/`--t2-light`/`--border-light`, migrado a `--light-bg`/`--light-text-1`/`--light-text-2`/`--light-border`. Comentario del bloque en `v2-tokens.css` y esta sección "Tokens CSS" actualizados de "deprecados" a "retirados en v3.0 · sin consumidores".
- **D-V1 cerrada:** `--accent-secondary`, `--accent-secondary-text` y `--ember-cta` se eliminan del contrato (`v2-tokens.css`, `_adherence.oxlintrc.json`, README). Ningún color entra en su lugar — un solo acento.
- **Limpieza de piezas:** 11 piezas descargables de v2.0–v2.1 y 6 documentos HTML de esa era, más 9 preview cards (`preview/v2-*`), archivados en `archive/` — construidos contra la paleta pre-v2.2, sin `@import` de tokens. Se rehacen desde cero contra v2.3.
- **`consumer-example.html`** nuevo — único consumidor real del token store tras archivar el portfolio React.
- **`.lockup-role` de `v2-tokens.css`** ya usaba `var(--t2)` (fix de v2.3 confirmado, no un hex hardcodeado).
- **Fase 1 verificada valor-por-valor (2026-09-11):** 1.1–1.6 confirmados contra el CSS real de `Footer.html` y `Quote Cards.html` (no por impresión general) — los seis ya coincidían con el target del handoff. `_adherence.oxlintrc.json` (1.7) seguía dirigido a un sistema de componentes React que no existe en este repo; se reescribió contra CSS+HTML, apuntando a `consumer-example.html`, con nota explícita de que no está confirmado que corra en ningún pipeline (P7 sigue abierta).
- **1.8 — bloqueante, no "regenerar al cerrar la fase" (corrección 2026-09-11):** el canónico (`v2-tokens.css` en este proyecto) está limpio de Azul Medianoche desde el Paso 0.6. Pero `_ds/diego-maury-design-system-v2-0-ember-on-019dd0ff…/v2-tokens.css` — el **bundle que cada Design Component de este proyecto carga por la etiqueta del sistema** — sigue teniendo `--accent-secondary`/`--accent-secondary-text` con el bloque de excepción completo, con fecha 2026-07-02, anterior a D-V1. Es un espejo desactualizado, no una regresión del trabajo de esta sesión (versión de archivo `v1789031632193106` contra `v1789091756624574` de los documentos ya escritos). Mientras no se regenere, todo Design Component nuevo en este proyecto resuelve `--accent-secondary` a un color vivo — el mismo patrón de "contrato bien diseñado, mal propagado" que motivó la auditoría original, repitiéndose un nivel más abajo. **Sin herramienta para regenerarlo desde Claude Code**: `DesignSync` no expone un método de publish/sync de bundle, solo lee y escribe archivos fuente de este proyecto; `get_file` sobre esa ruta devuelve 404 — el bundle no vive en el file store que la herramienta alcanza. Requiere re-montar/re-sincronizar el sistema desde la sesión de Claude Design del proyecto consumidor.
- **Criterio de salida corregido:** el `grep accent-secondary|2F6FE0|457FE3|BF452B` del Paso 0.8 no especificaba sobre qué raíz correr — se asumía la fuente, no las copias distribuidas. Corregido: debe correr sobre el canónico **y** sobre todo bundle `_ds/` que este proyecto alimente, cada vez que se cierre una fase que toque tokens.

### v2.3 — Septiembre 2026
- **D-A:** regla 1 reescrita — Ember = señalización estructural (eyebrow/label + CTA). Sale de cifras, bullets, puntos de rol y palabras sueltas de titular.
- **D-P3:** texto sobre Ember = tinta `#0A0612` (12.2:1). No hay segundo naranja.
- **D-C:** peso 300 arriba de 48px, 700 en el resto. El 800 se elimina (faux bold).
- **D-D:** el cinturón de logos deja de ser marquesina animada — rejilla estática, sin máscaras en gradiente.
- **Tokens:** `--bg-stage` (`#06030F`) tokenizado; alias de modo claro `--bg-light`/`--t1-light`/`--t2-light`/`--border-light` agregados como deprecados (retiro en v3.0).

### v2.2 — Julio 2026
- **Tokens:** poda de 33 tokens dimensionales (P4b); contrato reducido a color + tipografía.
- **Paleta:** `--border`, `--t2`, `--t3` migrados a familia neutra/cálida (sale el morado de estructura).
- **Modo Documento (D2):** bloque completo — `--light-bg`, `--light-text-1`, `--light-text-2` (`#3D2A52`), `--light-border` (`#E4DAEE`), `--light-accent`.
- **Portfolio:** migrado a V2 completo — 0 variables `--dm-*`, foco visible (H7), sin box-shadows.
- **Limpieza:** 3 HTML muertos eliminados; 8 fuentes V1 eliminadas; `styles.css` como entry point canónico.

### v2.1 — Junio 2026
- Quote Cards carousel, poster editorial, sistema tipográfico v2.

### v2.0 — Junio 2026
- Sistema completo Ember on Ink. Dark-first, acento único, Plus Jakarta Sans + DM Mono.

---

## Notas de workspace

`uploads/`, `_workspace/` y `screenshots/` eran carpetas de trabajo interno — la mayoría de su contenido se eliminó en la limpieza de 2026-09-11 (ver `archive/README.md`).

---

*Diego Maury Design System V2 · Ember on Ink · v2.5 · Septiembre 2026*
