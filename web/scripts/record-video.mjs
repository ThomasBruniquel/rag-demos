// Films the replay of a recorded session on a project page, in French and English
// (D-020). The video goes into public/videos/<NN-name>/<locale>.webm, with a poster
// <locale>.jpg; the project page shows it above the player as soon as it exists.
//
// Usage (with the site running: `pnpm dev`, or `pnpm build && pnpm preview`):
//   node scripts/record-video.mjs 05-documentation-technique
//   node scripts/record-video.mjs 05-documentation-technique --question 2 --speed 2 --locales fr
//
// Options:
//   --question <n>   recorded question to replay, from 1 (default 1)
//   --speed 1|2      replay speed (default 1)
//   --locales fr,en  languages to film (default fr,en)
//   --base <url>     site address (default http://localhost:3000)
//   --dark           dark theme
//   --out <dir>      output folder (default public/videos)
//
// A development sample (content/recordings/_dev) is never a real session: the
// script refuses to film it into public/. Use --out with a folder outside
// public/ to test the script on a sample.
//
// Playwright records WebM. When ffmpeg is on the PATH, the page-load moment is
// trimmed and an MP4 (H.264, no sound) is written next to the WebM.

import { execFileSync, spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { parse } from "yaml";

const webRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

function options(argv) {
  const [dir, ...rest] = argv;
  if (!dir || dir.startsWith("--")) {
    console.error("Usage: node scripts/record-video.mjs <NN-name> [--question n] [--speed 1|2] [--locales fr,en] [--base url] [--dark] [--out dir]");
    process.exit(2);
  }
  const value = (name, fallback) => {
    const i = rest.indexOf(`--${name}`);
    return i >= 0 ? rest[i + 1] : fallback;
  };
  return {
    dir,
    question: Number(value("question", "1")) - 1,
    speed: value("speed", "1"),
    locales: value("locales", "fr,en").split(","),
    base: value("base", "http://localhost:3000").replace(/\/$/, ""),
    dark: rest.includes("--dark"),
    out: path.resolve(webRoot, value("out", "public/videos")),
  };
}

/** URL segment of the project pages, read from the routes map (single source of truth). */
function projectSegments() {
  const routes = readFileSync(path.join(webRoot, "lib/i18n/routes.ts"), "utf8");
  const match = /demos:\s*\{\s*fr:\s*"([^"]+)",\s*en:\s*"([^"]+)"\s*\}/.exec(routes);
  if (!match) throw new Error("Cannot find the `demos` route in lib/i18n/routes.ts");
  return { fr: match[1], en: match[2] };
}

function hasFfmpeg() {
  return spawnSync("ffmpeg", ["-version"], { stdio: "ignore" }).status === 0;
}

async function film(opts, locale, slug, segment) {
  const url = `${opts.base}/${locale}/${segment}/${slug}`;
  const videoDir = mkdtempSync(path.join(tmpdir(), "rag-video-"));
  const size = { width: 1280, height: 800 };
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: size,
    deviceScaleFactor: 1,
    locale,
    colorScheme: opts.dark ? "dark" : "light",
    recordVideo: { dir: videoDir, size },
  });
  const page = await context.newPage();
  const started = Date.now();

  try {
    await page.goto(url, { waitUntil: "networkidle" });
    const player = page.locator("[data-player]");
    await player.waitFor();
    const questions = page.locator("[data-question]");
    const count = await questions.count();
    if (count === 0) throw new Error(`${url}: no recorded session yet (the player shows "sessions being recorded")`);
    if (opts.question >= count) throw new Error(`${url}: only ${count} recorded question(s)`);

    // Put the player at the top of the screen, below the sticky header.
    await player.evaluate((el) => window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96 }));
    if (opts.speed === "2") await page.getByRole("radio", { name: "×2" }).check({ force: true });
    await page.waitForTimeout(600);
    const clickedAt = Date.now();
    await questions.nth(opts.question).click();

    // Follow the answer as it grows, until every pane is done.
    for (;;) {
      const finished = await page.evaluate(() => {
        const panes = [...document.querySelectorAll("[data-phase]")];
        const lowest = Math.max(...panes.map((p) => p.getBoundingClientRect().bottom));
        if (lowest > window.innerHeight - 24) window.scrollBy({ top: Math.min(lowest - window.innerHeight + 48, 180), behavior: "smooth" });
        return panes.length > 0 && panes.every((p) => ["done", "error"].includes(p.getAttribute("data-phase")));
      });
      if (finished) break;
      if (Date.now() - clickedAt > 180_000) throw new Error("the replay did not finish within 3 minutes");
      await page.waitForTimeout(250);
    }

    const sample = await page.locator("[data-dev-sample]").count();
    const fromPublic = path.relative(path.join(webRoot, "public"), opts.out);
    // Outside public/: a "../" path, or another drive on Windows (absolute result).
    const insidePublic = !fromPublic.startsWith("..") && !path.isAbsolute(fromPublic);
    if (sample && insidePublic) {
      throw new Error("this is a development sample, not a real session: it must not be published (use --out outside public/ to test)");
    }

    await page.waitForTimeout(1500);
    const target = path.join(opts.out, opts.dir);
    mkdirSync(target, { recursive: true });
    await page.screenshot({ path: path.join(target, `${locale}.jpg`), type: "jpeg", quality: 82 });

    await context.close(); // writes the video file
    const raw = await page.video().path();
    const webm = path.join(target, `${locale}.webm`);
    const offset = Math.max(0, (clickedAt - started) / 1000 - 0.8);
    if (hasFfmpeg()) {
      const common = ["-y", "-loglevel", "error", "-ss", offset.toFixed(2), "-i", raw, "-an"];
      execFileSync("ffmpeg", [...common, "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", "36", webm]);
      execFileSync("ffmpeg", [...common, "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-pix_fmt", "yuv420p", "-movflags", "+faststart", path.join(target, `${locale}.mp4`)]);
    } else {
      copyFileSync(raw, webm);
      console.warn("  ffmpeg not found: WebM kept as recorded (with the page load at the start), no MP4.");
    }
    console.log(`  ${locale}: ${path.relative(webRoot, webm)}${sample ? "  (development sample, test only)" : ""}`);
  } finally {
    await context.close().catch(() => {});
    await browser.close();
    rmSync(videoDir, { recursive: true, force: true });
  }
}

const opts = options(process.argv.slice(2));
const demoFile = path.join(webRoot, "content", "demos", opts.dir, "demo.yaml");
if (!existsSync(demoFile)) {
  console.error(`Unknown project folder: content/demos/${opts.dir}`);
  process.exit(2);
}
const { slugs } = parse(readFileSync(demoFile, "utf8"));
const segments = projectSegments();
console.log(`Filming ${opts.dir} from ${opts.base}`);
try {
  for (const locale of opts.locales) await film(opts, locale, slugs[locale], segments[locale]);
} catch (error) {
  console.error(`Failed: ${error.message}`);
  process.exit(1);
}
