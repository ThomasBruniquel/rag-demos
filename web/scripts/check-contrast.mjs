// Checks WCAG contrast of the colour tokens in app/globals.css, in both themes.
// Usage: node scripts/check-contrast.mjs   (exits with code 1 if a pair fails)
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../app/globals.css", import.meta.url), "utf8");

function tokens(selector) {
  const start = css.indexOf(`${selector} {`);
  const block = css.slice(start, css.indexOf("}", start));
  return Object.fromEntries([...block.matchAll(/--([\w-]+):\s*(#[0-9a-f]{6})/gi)].map((m) => [m[1], m[2]]));
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

// [foreground, background, minimum]. 4.5 = text, 3 = large text and UI parts
// (form field borders, characters' shapes against the page).
const pairs = [
  ["fg", "paper", 4.5], ["fg", "sunken", 4.5], ["fg", "surface", 4.5],
  ["muted", "paper", 4.5], ["muted", "sunken", 4.5], ["muted", "surface", 4.5],
  ["gold-ink", "paper", 4.5], ["gold-ink", "sunken", 4.5], ["gold-display", "sunken", 3], ["gold-display", "paper", 3],
  ["on-accent", "accent", 4.5], ["on-accent", "accent-strong", 4.5],
  ["on-brick", "brick", 4.5],
  ["on-brand", "brand", 4.5], ["on-brand-muted", "brand", 4.5], ["gold", "brand", 4.5],
  ["warn", "warn-soft", 4.5], ["danger", "danger-soft", 4.5], ["danger", "paper", 4.5],
  ["field", "paper", 3],
  // Keyword badges, citation markers, player panes, highlighted Skills row.
  ["ink", "surface", 4.5], ["ink", "accent-soft", 4.5], ["gold-ink", "surface", 4.5],
  ["danger", "surface", 4.5], ["fg", "warn-soft", 4.5], ["muted", "warn-soft", 4.5],
  ["fam-search", "paper", 3], ["fam-structure", "paper", 3], ["fam-verification", "paper", 3],
  ["fam-agents", "paper", 2], ["fam-sovereignty", "paper", 3], ["fam-multimodal", "paper", 1.5],
];

let failed = false;
const light = tokens(":root");
const dark = { ...light, ...tokens('[data-theme="dark"]') };
for (const [theme, t] of [["light", light], ["dark", dark]]) {
  for (const [fg, bg, min] of pairs) {
    const r = ratio(t[fg], t[bg]);
    const ok = r >= min;
    failed ||= !ok;
    console.log(`${ok ? "ok  " : "FAIL"} ${theme.padEnd(5)} ${fg.padEnd(16)} on ${bg.padEnd(13)} ${r.toFixed(2)} (min ${min})`);
  }
}
process.exit(failed ? 1 : 0);
