// Renders the Mermaid diagrams of the content folder to themed SVG files.
//
//   pnpm diagrams            (renders every *.mmd that changed)
//   pnpm diagrams --force    (renders all of them)
//
// Each source file holds both languages: a label written <<Recherche|Search>>
// becomes "Recherche" in architecture.fr.svg and "Search" in architecture.en.svg.
// The SVGs are committed: the Netlify build never runs Mermaid (it would need
// a headless Chromium). Colours are rewritten to the site's CSS variables so
// diagrams follow the light and dark themes once inlined in the page.
//
// Requires a local Chromium the first time (downloaded by mermaid-cli via npx).
// Set MMDC=/path/to/mmdc to use an already installed mermaid-cli instead.

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..", "content");
const locales = ["fr", "en"];
const force = process.argv.includes("--force");
const work = mkdtempSync(path.join(tmpdir(), "diagrams-"));

const config = {
  theme: "base",
  themeVariables: { fontFamily: "Arial, Helvetica, sans-serif", fontSize: "14px" },
  flowchart: { htmlLabels: true, curve: "basis", padding: 14, nodeSpacing: 36, rankSpacing: 44 },
};
const configFile = path.join(work, "config.json");
writeFileSync(configFile, JSON.stringify(config));

function findSources(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return findSources(full);
    return entry.name.endsWith(".mmd") ? [full] : [];
  });
}

function translate(source, locale) {
  const index = locales.indexOf(locale);
  // Non-greedy on one line: labels may contain <br/>.
  return source.replace(/<<(.*?)\|(.*?)>>/g, (_, ...parts) => parts[index]);
}

/** Site colours, scoped to this diagram (mermaid scopes its own styles by id too). */
function themeStyle(id) {
  const s = `#${id}`;
  return `<style>
${s} .node rect, ${s} .node polygon, ${s} .node circle, ${s} .node path, ${s} .node ellipse { fill: var(--surface) !important; stroke: var(--line-strong) !important; stroke-width: 1.2px !important; filter: none !important; }
${s} .node.store rect, ${s} .node.store path, ${s} .node.store ellipse { fill: var(--sunken) !important; }
${s} .node.key rect, ${s} .node.key polygon, ${s} .node.key path { fill: var(--sunken) !important; stroke: var(--gold) !important; stroke-width: 2.2px !important; }
${s} .node.user rect, ${s} .node.user path { fill: var(--brand) !important; stroke: var(--brand) !important; }
${s} .node.user .nodeLabel, ${s} .node.user .nodeLabel p { color: var(--on-brand) !important; }
${s} .nodeLabel, ${s} .nodeLabel p, ${s} .label, ${s} span { color: var(--fg) !important; fill: var(--fg) !important; }
${s} .node.key .nodeLabel { font-weight: 700; }
${s} .cluster rect { fill: var(--sunken) !important; stroke: var(--line) !important; }
${s} .cluster-label .nodeLabel, ${s} .cluster-label span { color: var(--muted) !important; font-weight: 700; }
${s} .flowchart-link, ${s} .edgePath path { stroke: var(--muted) !important; }
${s} marker path, ${s} .marker { fill: var(--muted) !important; stroke: var(--muted) !important; }
${s} .edgeLabel, ${s} .edgeLabel p, ${s} .edgeLabel span, ${s} .labelBkg { background-color: var(--surface) !important; color: var(--muted) !important; font-size: 12px; }
${s} .edgeLabel rect { fill: var(--surface) !important; }
</style>`;
}

const mmdc = process.env.MMDC;
let rendered = 0;
for (const file of findSources(root)) {
  const name = path.basename(file, ".mmd");
  const dir = path.dirname(file);
  const source = readFileSync(file, "utf8");
  for (const locale of locales) {
    const out = path.join(dir, `${name}.${locale}.svg`);
    if (!force && existsSync(out) && statSync(out).mtimeMs > statSync(file).mtimeMs) continue;

    // Unique id per diagram: several diagrams share a page.
    const id = `dg-${path.basename(dir).replace(/[^a-z0-9]+/gi, "-")}-${name}-${locale}`.toLowerCase();
    const input = path.join(work, `${id}.mmd`);
    const raw = path.join(work, `${id}.svg`);
    writeFileSync(input, translate(source, locale));
    const args = ["-i", input, "-o", raw, "-c", configFile, "-b", "transparent", "--svgId", id, "-q"];
    if (mmdc) execFileSync(mmdc, args, { stdio: "inherit", shell: process.platform === "win32" });
    else execFileSync("npx", ["--yes", "@mermaid-js/mermaid-cli@12.0.0", ...args], { stdio: "inherit", shell: process.platform === "win32" });

    const svg = readFileSync(raw, "utf8").replace(/(<svg[^>]*>)/, `$1${themeStyle(id)}`);
    writeFileSync(out, svg);
    rendered += 1;
    console.log("rendered", path.relative(root, out));
  }
}
console.log(rendered ? `${rendered} diagram(s) rendered.` : "All diagrams are up to date.");
