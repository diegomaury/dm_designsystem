// estado: canónico — 2026-09-13
// Reglas dimensionales del chequeo de adherencia · v2.9
// Complemento de ds-adherence-check.mjs (R0–R7, color y tipografía).
// Fuente de verdad: v2-dimensions.css + "Contrato Dimensional.dc.html".
//
// Uso desde el chequeo principal:
//   import { DIMENSION_RULES, checkDimensions } from './ds-dimension-check.mjs';
//   findings.push(...checkDimensions(file, source));
//
// Igual que R1 y R5, solo escanea dentro de <style> real o de atributos
// style="..." — nunca prosa ni entidades HTML.

// Los pasos sobre 128 se agregaron el 2026-09-14: la lista original se escribió
// para superficies de documento y se cortaba en 128, así que un lienzo de
// 1080×1080 no tenía ningún margen legal. Arriba de 128 el paso es 32.
export const SPACE = [0, 1, 2, 3, 4, 8, 12, 16, 24, 32, 40, 48, 56, 72, 96, 128,
                      160, 192, 224, 256, 288];

export const TYPE_SCALES = {
  document:  [12, 16, 17, 19, 22, 38, 52],
  deck:      [24, 34, 44, 76, 104, 132],
  social:    [20, 28, 40, 64, 88],
  poster:    [20, 28, 40, 64, 88, 140],
  signature: [11, 13, 16, 32],
  docs:      [10, 11, 12, 13, 15, 16, 17, 26, 38, 40, 64],
};

// Qué escala aplica a cada archivo. Un archivo sin entrada usa 'document'.
export const SURFACE_MAP = {
  'Deck.html':        'deck',
  'Quote Cards.html': 'social',
  'poster.html':      'poster',
  'Footer.html':      'document',
  // Superficies de lectura del propio sistema. No son piezas de marca: su
  // escala es de documentación, no la de documento comercial.
  'Manual de Marca.html':  'docs',
  'consumer-example.html': 'docs',
  'thumbnail.html':        'docs',
};

// Cuerpos de titular por superficie · R15 · D-H.
// Las cifras hero (--doc-hero 52, --deck-hero 104, --pos-hero 88) NO entran:
// van en Plus Jakarta Sans 700 tabular, no en Archivo.
export const HEADLINE_SIZES = {
  document:  [38],
  deck:      [132, 76],
  social:    [64],
  poster:    [140, 64],
  signature: [],
  docs:      [64, 40, 26],
};

const DISPLAY_FAMILY = /archivo|--font-display|var\(\s*--display\s*\)/i;

// Solo la superficie web admite clamp(). Las demás son de medida fija.
const FLUID_OK = new Set(['document', 'docs']);

const SPACE_PROPS = /^(gap|column-gap|row-gap|margin|margin-top|margin-bottom|margin-left|margin-right|padding|padding-top|padding-bottom|padding-left|padding-right)$/;

export const DIMENSION_RULES = {
  R8:  'tamaño de fuente fuera de la escala de su superficie',
  R9:  'valor de espacio fuera de la escala base 4',
  R10: 'radio de esquina distinto de cero',
  R11: 'clamp() en una superficie de medida fija',
  R12: 'extremo de clamp() fuera de la escala',
  R13: 'peso de fuente no declarado (300/400/500/700)',
  R14: 'área táctil o filete fuera del contrato',
  R15: 'cuerpo de titular no pintado con Archivo',
};

const WEIGHTS = new Set([300, 400, 500, 700]);

// Un filete, un isotipo o un divisor de lockup no son controles. El mínimo de
// 44px aplica a lo accionable, y eso se decide por el selector del bloque —
// no por que el archivo mencione "button" en alguna otra regla.
const INTERACTIVE = /\b(button|btn|\.cta|a:|:hover|role=["']?button|input|select|textarea|\[href|nav-link|menu-item)\b/i;
const RULES_OK = new Set([0, 1, 2, 3, 4]);

// Extrae solo las regiones que son CSS real.
function cssRegions(src) {
  const out = [];
  for (const m of src.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) {
    out.push({ text: m[1], offset: m.index + m[0].indexOf(m[1]) });
  }
  for (const m of src.matchAll(/\sstyle="([^"]*)"/gi)) {
    out.push({ text: m[1], offset: m.index + m[0].indexOf(m[1]) });
  }
  return out;
}

const lineOf = (src, i) => src.slice(0, i).split('\n').length;

// El lockup no obedece la escala tipográfica: sus cuerpos son razones de X
// y caen en valores fraccionarios. Una declaración marcada como lockup
// queda excusada de R8.
const isLockup = (region) => /lockup|isotipo|--lockup-/i.test(region.text);

// El logotipo (regla 9 · D5) se dimensiona para llenar su contenedor, no se
// elige de la escala tipográfica: un wordmark a 104px en una miniatura de
// 1280×854 es correcto. La firma de la regla 9 lo identifica sola —
// uppercase + .04em + 700 — así que no necesita anotación en la pieza.
const isWordmark = (block) =>
  /text-transform:\s*uppercase/i.test(block) &&
  /letter-spacing:\s*\.?0?\.04em/i.test(block) &&
  /font-weight:\s*700/.test(block);

// Devuelve el bloque de declaraciones que contiene el índice dado, con su
// selector. Un atributo style="..." es un bloque único.
function blockAround(text, i) {
  const open = text.lastIndexOf('{', i);
  if (open === -1) return text;
  const close = text.indexOf('}', i);
  const selStart = Math.max(
    text.lastIndexOf('}', open), text.lastIndexOf('{', open - 1)) + 1;
  return text.slice(selStart, close === -1 ? text.length : close);
}

export function checkDimensions(file, src) {
  const surface = SURFACE_MAP[file.split('/').pop()] ?? 'document';
  const scale = TYPE_SCALES[surface];
  const fluidOk = FLUID_OK.has(surface);
  const found = [];
  const add = (rule, line, detail) =>
    found.push({ file, line, rule, detail, surface });

  for (const region of cssRegions(src)) {
    const { text, offset } = region;

    for (const m of text.matchAll(/font-size:\s*([^;"}]+)/g)) {
      const val = m[1].trim();
      const line = lineOf(src, offset + m.index);
      const clamp = val.match(/clamp\(\s*([\d.]+)px[^,]*,[^,]+,\s*([\d.]+)px\s*\)/);
      if (clamp) {
        if (!fluidOk) { add('R11', line, `font-size: ${val}`); continue; }
        for (const end of [clamp[1], clamp[2]]) {
          if (!scale.includes(parseFloat(end))) add('R12', line, `${end}px no está en la escala ${surface}`);
        }
        continue;
      }
      const px = val.match(/^([\d.]+)px$/);
      if (px && !scale.includes(parseFloat(px[1])) && !isLockup(region)
          && !isWordmark(blockAround(text, m.index))) {
        add('R8', line, `${px[1]}px no está en la escala ${surface}`);
      }
    }

    for (const m of text.matchAll(/([a-z-]+)\s*:\s*([^;"}]+)/g)) {
      const prop = m[1], val = m[2].trim();
      const line = lineOf(src, offset + m.index);

      if (SPACE_PROPS.test(prop)) {
        if (/clamp\(/.test(val)) {
          if (!fluidOk) { add('R11', line, `${prop}: ${val}`); continue; }
          for (const c of val.matchAll(/clamp\(\s*([\d.]+)px[^,]*,[^,]+,\s*([\d.]+)px\s*\)/g)) {
            for (const end of [c[1], c[2]]) {
              if (!SPACE.includes(parseFloat(end))) add('R12', line, `${end}px fuera de base 4`);
            }
          }
          continue;
        }
        if (/calc\(|auto|%|em\b/.test(val)) continue;
        if (isLockup(region)) continue;
        for (const p of val.matchAll(/([\d.]+)px/g)) {
          if (!SPACE.includes(parseFloat(p[1]))) add('R9', line, `${prop}: ${p[1]}px`);
        }
      }

      if (prop === 'border-radius' && !/^0(px)?$/.test(val)) {
        add('R10', line, `border-radius: ${val}`);
      }

      if (prop === 'font-weight') {
        const w = parseInt(val, 10);
        if (!Number.isNaN(w) && !WEIGHTS.has(w)) add('R13', line, `font-weight: ${val}`);
      }

      if (/^(border|border-top|border-bottom|border-left|border-right)$/.test(prop)) {
        const w = val.match(/([\d.]+)px/);
        if (w && !RULES_OK.has(parseFloat(w[1]))) add('R14', line, `${prop}: ${w[1]}px`);
      }

      if (prop === 'font-size' && !isLockup(region)) {
        const px = val.match(/^([\d.]+)px$/);
        const heads = HEADLINE_SIZES[surface] ?? [];
        if (px && heads.includes(parseFloat(px[1]))) {
          const block = blockAround(text, m.index);
          if (!DISPLAY_FAMILY.test(block)) {
            add('R15', line, `${px[1]}px es cuerpo de titular y no declara Archivo`);
          }
        }
      }

      if (/^(min-height|height)$/.test(prop)) {
        const px = val.match(/^([\d.]+)px$/);
        if (px && parseFloat(px[1]) < 44 && INTERACTIVE.test(blockAround(text, m.index))) {
          add('R14', line, `área táctil ${px[1]}px < 44px`);
        }
      }
    }
  }
  return found;
}
