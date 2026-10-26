import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import { z } from "zod";
import { locales, type Locale } from "@/lib/i18n/config";
import {
  demoMetaSchema,
  demoTextSchema,
  methodMetaSchema,
  methodTextSchema,
  type DemoMeta,
  type DemoText,
  type MethodMeta,
  type MethodText,
} from "./schema";

/*
 * Reads content/ at build time (server only: uses the file system).
 * Results are kept in memory for the duration of the build.
 */

const contentRoot = path.join(process.cwd(), "content");

export type Demo = { dir: string; meta: DemoMeta; text: Record<Locale, DemoText> };
export type Method = { dir: string; meta: MethodMeta; text: Record<Locale, MethodText> };

function validate<S extends z.ZodType>(schema: S, data: unknown, file: string): z.infer<S> {
  const result = schema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid content in ${path.relative(process.cwd(), file)}:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

function readYaml(file: string): unknown {
  return parse(readFileSync(file, "utf8"));
}

function readFrontMatter(file: string): unknown {
  const source = readFileSync(file, "utf8");
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (!match) throw new Error(`Missing front matter in ${path.relative(process.cwd(), file)}`);
  return parse(match[1]);
}

function subfolders(kind: "demos" | "methods"): string[] {
  return readdirSync(path.join(contentRoot, kind), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

function loadTexts<S extends z.ZodType>(kind: "demos" | "methods", dir: string, schema: S) {
  return Object.fromEntries(
    locales.map((locale) => {
      const file = path.join(contentRoot, kind, dir, `${locale}.mdx`);
      return [locale, validate(schema, readFrontMatter(file), file)];
    }),
  ) as Record<Locale, z.infer<S>>;
}

let cache: { demos: Demo[]; methods: Method[] } | undefined;

function load() {
  if (cache) return cache;

  const methods: Method[] = subfolders("methods").map((dir) => {
    const file = path.join(contentRoot, "methods", dir, "method.yaml");
    return {
      dir,
      meta: validate(methodMetaSchema, readYaml(file), file),
      text: loadTexts("methods", dir, methodTextSchema),
    };
  });
  methods.sort((a, b) => a.meta.order - b.meta.order);

  const demos: Demo[] = subfolders("demos").map((dir) => {
    const file = path.join(contentRoot, "demos", dir, "demo.yaml");
    return {
      dir,
      meta: validate(demoMetaSchema, readYaml(file), file),
      text: loadTexts("demos", dir, demoTextSchema),
    };
  });
  demos.sort((a, b) => a.meta.id.localeCompare(b.meta.id));

  // Cross-checks between demos and methods.
  for (const demo of demos) {
    const method = methods.find((m) => m.meta.id === demo.meta.method);
    if (!method) throw new Error(`Demo ${demo.meta.id}: unknown method "${demo.meta.method}"`);
    if (method.meta.demo !== demo.meta.id) {
      throw new Error(`Method ${method.meta.id} should point to demo ${demo.meta.id} (demo: "${demo.meta.id}")`);
    }
  }
  for (const method of methods) {
    if (method.meta.family !== "classic" && !method.text.fr.duel) {
      throw new Error(`Method ${method.meta.id}: a duel against classic RAG is required`);
    }
  }

  cache = { demos, methods };
  return cache;
}

export const getDemos = () => load().demos;
export const getMethods = () => load().methods;

export function getDemoBySlug(locale: Locale, slug: string): Demo | undefined {
  return getDemos().find((d) => d.meta.slugs[locale] === slug);
}

export function getMethodBySlug(slug: string): Method | undefined {
  return getMethods().find((m) => m.meta.slug === slug);
}

export function getMethodById(id: string): Method | undefined {
  return getMethods().find((m) => m.meta.id === id);
}

export function getDemoById(id: string): Demo | undefined {
  return getDemos().find((d) => d.meta.id === id);
}

/** Pre-rendered diagram (see scripts/render-diagrams.mjs), or null if not drawn yet. */
export function getDiagram(kind: "demos" | "methods", dir: string, name: string, locale: Locale): string | null {
  const file = path.join(contentRoot, kind, dir, `${name}.${locale}.svg`);
  return existsSync(file) ? readFileSync(file, "utf8") : null;
}

/**
 * Translated slugs, so the language switcher can find the same demo in the
 * other language: { "/fr/demos/revue-de-contrats": "/en/demos/contract-review", ... }.
 */
export function getSlugPairs(): Record<string, Record<Locale, string>> {
  return Object.fromEntries(
    getDemos().map((d) => [d.meta.id, { fr: d.meta.slugs.fr, en: d.meta.slugs.en }]),
  );
}
