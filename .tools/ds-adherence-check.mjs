/* estado: canónico — 2026-09-11
 * Fase 3 · cambio 15 — reemplazo del linter de React por verificación de CSS/HTML.
 *
 * Node >= 18, sin dependencias. Se corre desde la raíz del repo del design system:
 *   node .tools/ds-adherence-check.mjs            # modo aviso (exit 0)
 *   node .tools/ds-adherence-check.mjs --strict   # bloquea el merge (exit 1 si hay hallazgos)
 *   node .tools/ds-adherence-check.mjs --json     # salida para CI
 *
 * Verifica lo que el contrato v2.3 realmente dice, sobre los archivos que este
 * sistema realmente tiene (CSS + HTML estático). Las excepciones aprobadas viven
 * en _adherence-exceptions.json, no en el código.
 */

async function main() {
const { readdir, readFile, stat } = await import('node:fs/promises');
const { join, relative, basename } = await import('node:path');

const ROOT = process.cwd();
const ARGS = new Set(process.argv.slice(2));
const STRICT = ARGS.has('--strict');
const AS_JSON = ARGS.has('--json');

const SKIP_DIRS = new Set(['.tools', 'archive', 'node_modules', '.git', '_ds_import', 'ui_kits', 'uploads', '_workspace', 'screenshots', 'preview']);
const EXT = /\.(css|html)$/i;
const TOKEN_FILE = 'v2-tokens.css';

const CONTRACT_FONTS = ['archivo', 'plus jakarta sans', 'dm mono', 'system-ui', 'sans-serif', 'ui-monospace', 'monospace', 'inherit', 'serif'];
const DEPRECATED_ALIASES = ['--bg-light', '--t1-light', '--t2-light', '--border-light'];
const EMBER = /#ff5c39|var\(--ember\)|var\(--color-accent\)/i;
const WHITE_INK = /#fff\b|#ffffff|#faf8fc|var\(--t1\)|var\(--color-text-primary\)/i;
const RAW_COLOR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?|oklch|color-mix)\s*\(/i;

let exceptions = { files: [], rules: {} };
try { exceptions = JSON.parse(await readFile(join(ROOT, '_adherence-exceptions.json'), 'utf8')); } catch {}
const excused = (file, rule) =>
  (exceptions.files || []).includes(file) ||
  ((exceptions.rules || {})[rule] || []).includes(file);

async function walk(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.isDirectory()) { if (!SKIP_DIRS.has(e.name)) await walk(join(dir, e.name), out); }
    else if (EXT.test(e.name)) out.push(join(dir, e.name));
  }
  return out;
}

const findings = [];
const add = (rule, file, line, msg) => { if (!excused(file, rule)) findings.push({ rule, file, line, msg }); };

const files = await walk(ROOT);
const sources = new Map();
for (const abs of files) sources.set(relative(ROOT, abs).replace(/\\/g, '/'), await readFile(abs, 'utf8'));

for (const [file, src] of sources) {
  const lines = src.split('\n');
  const sealed = /estado:\s*(canónico|canonico|vigente)/i.test(lines.slice(0, 3).join('\n'));
  const isTokenStore = basename(file) === TOKEN_FILE;
  const isCss = /\.css$/i.test(file);
  let inRoot = false;
  let inStyleTag = isCss; // un .css es contenido de estilo completo, de punta a punta

  lines.forEach((raw, i) => {
    const n = i + 1;
    const l = raw.toLowerCase();
    if (/:root\s*{/.test(l)) inRoot = true;
    if (inRoot && l.includes('}')) inRoot = false;
    if (!isCss && /<style\b/.test(l)) inStyleTag = true;

    // Contenido realmente CSS de esta línea: el <style> completo en .css, o solo
    // lo que cae dentro de <style> o de un atributo style="..." en HTML — nunca
    // texto/prosa ni entidades (&#8592;, una celda de tabla que MENCIONA un hex
    // no son una declaración CSS).
    const styleAttrMatch = raw.match(/style\s*=\s*"([^"]*)"/i) || raw.match(/style\s*=\s*'([^']*)'/i);
    const styleContent = inStyleTag ? raw : (styleAttrMatch ? styleAttrMatch[1] : null);

    // R1 — color crudo (hex o rgba/hsla/oklch/color-mix) fuera del bloque :root sellado
    if (!isTokenStore && styleContent != null && RAW_COLOR.test(styleContent) && !/^\s*(\/\*|\*|<!--)/.test(raw)) {
      const inSealedRoot = inRoot && sealed;
      if (!inSealedRoot) add('R1-hex-crudo', file, n, 'Color literal fuera del bloque :root sellado — usar var(--token).');
    }

    // R2 — familia tipográfica fuera del contrato
    const ff = raw.match(/font-family\s*:\s*([^;}"']+)/i);
    if (ff) {
      const fams = ff[1].split(',').map(s => s.replace(/['"]/g, '').trim().toLowerCase()).filter(Boolean);
      const bad = fams.filter(f => !f.startsWith('var(') && !CONTRACT_FONTS.includes(f));
      if (bad.length) add('R2-fuente', file, n, `Fuera del contrato de fuentes: ${bad.join(', ')}. Solo Archivo / Plus Jakarta Sans / DM Mono (D-H).`);
    }

    // R3 — D-C: el peso 800 no existe en el contrato
    if (/font-weight\s*:\s*(800|900)|font-weight="?(800|900)/i.test(raw)) {
      add('R3-peso-800', file, n, 'Peso 800/900 no existe en el contrato (faux bold). Máximo 700; 300 arriba de 48px.');
    }

    // R4 — regla 11: texto sobre Ember = tinta #0A0612
    if (EMBER.test(raw) && /background/i.test(raw) && WHITE_INK.test(raw) && /color\s*:/i.test(raw)) {
      add('R4-texto-sobre-ember', file, n, 'Texto claro sobre Ember (3.07:1). El contrato exige tinta #0A0612 — regla 11 / D-P3.');
    }

    // R5 — regla 2: sin efectos. Mismo criterio de styleContent que R1.
    if (styleContent != null) {
      const fx = styleContent.match(/(linear-gradient|radial-gradient|conic-gradient|box-shadow\s*:\s*(?!none)|text-shadow\s*:\s*(?!none)|filter\s*:\s*[^;]*blur|backdrop-filter)/i);
      if (fx && !/none/i.test(styleContent.split(':')[1] || '')) {
        add('R5-efectos', file, n, `Efecto prohibido (${fx[1].trim()}) — regla 2. Si es funcional, entra en _adherence-exceptions.json.`);
      }
    }

    if (!isCss && /<\/style>/.test(l)) inStyleTag = false;

    // R6 — alias de modo claro deprecados (retiro en v3.0)
    for (const a of DEPRECATED_ALIASES) {
      if (raw.includes(a) && !isTokenStore) {
        add('R6-alias-deprecado', file, n, `${a} está deprecado — usar la nomenclatura canónica --light-*. Se retira en v3.0.`);
      }
    }
  });

  // R0 — sello de estado obligatorio en toda pieza
  if (!sealed && !/^_/.test(basename(file))) {
    add('R0-sin-sello', file, 1, 'Falta el sello /* estado: ... */ en las primeras líneas.');
  }
}

// R8–R15 — contrato dimensional (v2-dimensions.css). Mismo criterio de
// excepciones: lo aprobado vive en _adherence-exceptions.json.
const { checkDimensions } = await import('./ds-dimension-check.mjs');
for (const [file, src] of sources) {
  for (const d of checkDimensions(file, src)) add(d.rule, file, d.line, `${d.detail} [${d.surface}]`);
}

// R7 — token documentado sin consumidor (criterio de salida de la fase 3)
const tokenSrc = sources.get(TOKEN_FILE) || '';
const declared = [...tokenSrc.matchAll(/^\s*(--[a-z0-9-]+)\s*:/gim)].map(m => m[1]);
const allOther = [...sources].filter(([f]) => f !== TOKEN_FILE).map(([, s]) => s).join('\n');
for (const t of [...new Set(declared)]) {
  const usedInStore = new RegExp(`var\\(\\s*${t}\\b`).test(tokenSrc.replace(new RegExp(`^\\s*${t}\\s*:.*$`, 'gm'), ''));
  const usedOutside = new RegExp(`var\\(\\s*${t}\\b`).test(allOther);
  if (!usedInStore && !usedOutside) add('R7-token-sin-consumidor', TOKEN_FILE, 0, `${t} está documentado y no lo consume ninguna pieza viva.`);
}

if (AS_JSON) {
  console.log(JSON.stringify({ strict: STRICT, count: findings.length, findings }, null, 2));
} else {
  const byRule = findings.reduce((a, f) => ((a[f.rule] = a[f.rule] || []).push(f), a), {});
  console.log(`\nAdherencia v2.5 — ${sources.size} archivos · ${findings.length} hallazgos${STRICT ? ' · modo estricto' : ' · modo aviso'}\n`);
  for (const rule of Object.keys(byRule).sort()) {
    console.log(`${rule} (${byRule[rule].length})`);
    for (const f of byRule[rule]) console.log(`  ${f.file}${f.line ? ':' + f.line : ''} — ${f.msg}`);
    console.log('');
  }
  if (!findings.length) console.log('Sin hallazgos.\n');
}

process.exit(STRICT && findings.length ? 1 : 0);
}
main();
