# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Qué es este repo

Contrato de marca del design system personal de Diego Maury ("Ember on Ink" v2.5): tokens CSS, isotipos/lockups, y las piezas HTML vivas que los consumen. **No** es el repo del sitio (`diegomaury.mx` es el proyecto Astro `newlandingpage`, separado). Este repo también está vinculado a un proyecto de Claude Design (`claude.ai/design`) que consume un bundle sincronizado de estos mismos tokens — ver "Sincronización con Claude Design" abajo.

Fuente de verdad si hay contradicción: este repo (`main`) gana sobre cualquier copia vendoreada (bundle `_ds/`, `vendor/ds-v2-tokens.css` en otro repo).

## Comandos

```bash
# Chequeo de adherencia al contrato — correr antes de publicar cualquier pieza nueva o editada
node .tools/ds-adherence-check.mjs --strict   # bloquea (exit 1 si hay hallazgos) — el que corre en CI
node .tools/ds-adherence-check.mjs            # modo aviso (exit 0)
node .tools/ds-adherence-check.mjs --json     # salida machine-readable
```

No hay build/test suite de JS: el repo es CSS + HTML estático + un script Node sin dependencias (`.tools/ds-adherence-check.mjs`, que importa `.tools/ds-dimension-check.mjs`). CI (`.github/workflows/adherence.yml`) corre el chequeo `--strict` en cada push a `main`/`v2**` y en cada PR.

## Arquitectura

### Cadena de tokens

`styles.css` es el entry point canónico: hace `@import` de `v2-tokens.css` (color + tipografía) y de `v2-dimensions.css` (espaciado, escalas tipográficas por superficie, radios, área táctil). Toda pieza nueva debe consumir estos dos archivos por `@import` real — nunca copiar valores a mano en un `:root` local, salvo el caso documentado abajo.

`consumer-example.html` es el único archivo del repo que demuestra el patrón de consumo correcto (`@import` sin `:root` local). Las piezas de formato fijo que se abren por doble clic (Deck, Footer, Quote Cards, poster) conservan un `:root` local pero con un sello obligatorio en la primera línea: `/* estado: ... */` + `/* snapshot vX.Y — AAAA-MM-DD */`.

### El chequeo de adherencia es la especificación ejecutable

`README.md` es la documentación humana de las reglas; `.tools/ds-adherence-check.mjs` (reglas R0–R7: sello, hex crudo fuera de `:root`, tipografía, pesos, contraste sobre Ember, efectos prohibidos, alias deprecados, tokens sin consumidor) y `.tools/ds-dimension-check.mjs` (reglas R8–R15: escala tipográfica por superficie, espacio base 4, radio cero, `clamp()` solo en piezas web, pesos declarados, filetes/área táctil, familia de titular) son la misma regla en forma de linter. Cuando el README y el código de estos dos scripts parecen decir cosas distintas, el script gana para efectos de qué bloquea CI — pero la discrepancia es un bug a corregir, no un empate a resolver por preferencia.

Ambos scripts escanean solo dentro de `<style>` real o de atributos `style="..."` — nunca prosa ni entidades HTML — para evitar falsos positivos de docs que mencionan hex o CSS como texto.

Excepciones aprobadas viven en `_adherence-exceptions.json` (por archivo o por regla), nunca como comentario silenciando el linter en el código. Antes de añadir una excepción ahí, confirmar con Diego — el archivo es un registro de decisiones aprobadas, no un mecanismo de conveniencia.

`_ds_manifest.json` es un snapshot generado (no se edita a mano) que enumera los tokens y piezas para el proyecto de Claude Design; se regenera, no se parchea.

### Superficies y su escala dimensional

`ds-dimension-check.mjs` mapea cada archivo a una escala tipográfica cerrada (`SURFACE_MAP` → `TYPE_SCALES`): `deck`, `social`, `poster`, `signature`, `document`, `docs`. Una pieza nueva debe declarar su superficie (clase `surface-*` o entrada en `SURFACE_MAP` si el linter necesita reconocerla) y usar solo los tamaños de esa escala — no valores arbitrarios. El espaciado sigue la escala base 4 en `SPACE` (0–288, paso 32 arriba de 128).

### Regla de negocio central del sistema visual

Un solo acento vivo (Ember `#FF5C39`) en todo el sistema, reservado a señalización estructural (eyebrow/label + CTA) — nunca en cifras, bullets, iconos o texto suelto de titular. El resto de las reglas no negociables (dark-mode primario, sin efectos/gradientes/glow, DM Mono restringido a metadata, Archivo 700 para titulares con tracking `-0.035em`, contraste AA en cualquier combinación texto/fondo, `--border-control` en vez de `--border` para contornos de elementos accionables) están detalladas en `README.md` § "Reglas de diseño no negociables" y son lo que R0–R15 verifican mecánicamente. Léelas ahí antes de crear una pieza nueva; no se repiten aquí porque el linter y el README ya son la fuente viva.

### Sincronización con Claude Design (`/design-sync`)

Este repo alimenta un bundle `_ds/…` que los Design Components del proyecto de Claude Design cargan por la etiqueta del sistema. Ese bundle es una copia, no una referencia en vivo: si cambias un token aquí, el proyecto de Claude Design no se entera hasta que se regenera desde su propia sesión. `DesignSync` (herramienta de Claude Code) solo lee/escribe archivos fuente de un proyecto de Claude Design — no expone un método de publish/sync de bundle, así que la propagación de tokens nuevos hacia ese bundle no se puede automatizar desde aquí (ver `decisions.md`, nota de v2.4 sobre el bundle `_ds/` desactualizado). Cuando cambies un token: (1) actualízalo en `v2-tokens.css`/`v2-dimensions.css`, (2) corre el chequeo de adherencia, (3) avisa que el bundle del proyecto de Claude Design necesita re-sincronizarse desde su propia sesión — no asumas que ya se propagó.

**La skill `/design-sync` (distinta de la herramienta `DesignSync`) no aplica a este repo.** Esa skill convierte un paquete de componentes JS/React compilable (con `package.json`, lockfile, build de esbuild, opcionalmente Storybook) al formato que consume Claude Design. Este repo no tiene `package.json` ni componentes — es CSS de tokens + piezas HTML estáticas — así que no hay nada que instalar/compilar en el sentido que esa skill espera. Confirmado con Diego el 2026-09-17: no correr `/design-sync` aquí. Si en el futuro existe un repo hermano de componentes React/JS que consuma estos tokens, `/design-sync` corre ahí, no en este repo.

### Consumidores externos

`diegomaury-mx/newlandingpage` vendorea una copia de los tokens en `src/styles/vendor/ds-v2-tokens.css`, con una guardia de deriva (`ds-tokens-drift.test.ts`) en ese repo. Un cambio de token aquí requiere regenerar esa copia y correr el `grep` sobre ambos repos (este y la copia) antes de cerrar cualquier cambio de tokens — no hay referencia directa entre los dos.

## Regla del logotipo (obligatoria)

Siempre que aparezca el nombre **DIEGO MAURY** o el dominio **DIEGOMAURY.MX** como logotipo o firma de marca, se aplican estas reglas sin excepción:

- Texto: `DIEGOMAURY.MX` (o `DIEGO MAURY`) en **uppercase**
- Familia: **Plus Jakarta Sans**, peso **700**
- Tracking: **letter-spacing: 0.04em**
- Color: **Off-White `#FAF8FC` siempre sobre fondo oscuro** (`#0A0612` / `#1A1128` / foto oscura). Nunca ember, nunca sobre fondo claro.

```css
.logotipo{font-family:'Plus Jakarta Sans',system-ui,sans-serif;font-weight:700;text-transform:uppercase;letter-spacing:.04em;color:#FAF8FC}
```

Excepción única: en piezas impresas a una tinta sobre papel claro, el logotipo va en tinta `#0A0612` conservando familia, peso y tracking.
