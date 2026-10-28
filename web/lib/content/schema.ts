import { z } from "zod";
import { badges, constraints, docTypes, families, keysOf, keywords, sectors, volumes, type StackCategory } from "./taxonomy";

/*
 * Content schemas, checked at build time: a typo in a YAML field or a missing
 * translation stops the build with a readable message instead of shipping a
 * broken page.
 *
 * Each demo / method folder holds:
 *   demo.yaml | method.yaml   fields shared by both languages
 *   fr.mdx, en.mdx            translated fields (front matter) + prose (body)
 */

const text = z.string().trim().min(1);
const gauge = z.number().int().min(1).max(5);
const keywordList = (category: StackCategory) => z.array(z.enum(keysOf(keywords[category])));

// ---------------------------------------------------------------- methods

export const methodMetaSchema = z.object({
  id: text,
  slug: z.string().regex(/^[a-z0-9-]+$/),
  family: z.enum(keysOf(families)),
  badge: z.enum(keysOf(badges)),
  /** Publication or release, as YYYY-MM. */
  date: z.string().regex(/^\d{4}(-\d{2})?$/),
  /** Link to the paper or reference documentation. */
  sourceUrl: z.url().optional(),
  /** Demo that showcases this method ("01"…"09"); none for the baseline. */
  demo: z.string().regex(/^\d{2}$/).optional(),
  gauges: z.object({ quality: gauge, cost: gauge, complexity: gauge }),
  order: z.number().int(),
});

const duelRow = z.object({
  criterion: text,
  classic: text,
  method: text,
  winner: z.enum(["classic", "method", "tie"]),
});

export const methodTextSchema = z.object({
  name: text,
  /** Who published it and when, e.g. "Méthode publiée par IBM Research (sept. 2026)". */
  origin: text,
  sourceLabel: text.optional(),
  need: text,
  how: z.array(z.object({ label: text, text })).length(3),
  strengths: z.array(text).min(2),
  limits: z.array(text).min(2),
  choose: z.array(text).min(2),
  avoid: z.array(text).min(2),
  /** Faithfulness note when the demo adapts the published method. */
  adaptation: text.optional(),
  duel: z
    .object({
      measured: z.boolean(),
      rows: z.array(duelRow).min(3),
    })
    .optional(),
  seo: z.object({ title: text, description: text }),
});

// ---------------------------------------------------------------- demos

export const demoMetaSchema = z.object({
  id: z.string().regex(/^\d{2}$/),
  slugs: z.object({ fr: z.string().regex(/^[a-z0-9-]+$/), en: z.string().regex(/^[a-z0-9-]+$/) }),
  status: z.enum(["soon", "live"]),
  featured: z.boolean().default(false),
  method: text,
  docTypes: z.array(z.enum(keysOf(docTypes))).min(1),
  volume: z.enum(keysOf(volumes)),
  constraints: z.array(z.enum(keysOf(constraints))).min(1),
  sectors: z.array(z.enum(keysOf(sectors))).min(1),
  /** Keyword badges per category (D-022), from the matrix in docs/02-catalogue-rag.md. */
  stack: z.object({
    cloud: keywordList("cloud").min(1),
    framework: keywordList("framework").min(1),
    models: keywordList("models").min(1),
    vectorStores: keywordList("vectorStores").min(1),
    integrations: keywordList("integrations").default([]),
    compliance: keywordList("compliance").default([]),
  }),
  /** Folder of the demo in the GitHub monorepo. */
  sourcePath: text,
  player: z
    .object({
      /** Show the variants of one question next to each other (e.g. classic RAG vs GraphRAG). */
      sideBySide: z.boolean().default(false),
      /** Labels of the `variant` values found in the recordings (route compared, role chosen…). */
      variants: z.record(z.string(), z.object({ fr: text, en: text })).default({}),
      /** Live mode only: name of the /ask body field that carries the variant (e.g. "route"). */
      variantField: z.string().regex(/^[a-z_]+$/).optional(),
    })
    .default({ sideBySide: false, variants: {} }),
});

const fact = z.object({ label: text, value: text, measured: z.boolean().default(false) });

export const demoTextSchema = z.object({
  title: text,
  tagline: text,
  problem: text,
  corpus: z.object({ name: text, size: text, licence: text, url: z.url().optional() }),
  examples: z.array(text).min(3).max(5),
  architecture: z.object({
    alt: text,
    choices: z.array(z.object({ title: text, why: text })).min(2),
    discarded: z.array(z.object({ title: text, why: text })).min(1),
  }),
  pipeline: z.object({
    alt: text,
    facts: z.array(fact).min(3),
  }),
  evaluation: z
    .object({
      measured: z.boolean(),
      caption: text,
      columns: z.array(text).min(2),
      rows: z.array(z.array(text)).min(1),
    })
    .refine((e) => e.rows.every((row) => row.length === e.columns.length), {
      message: "every evaluation row must have as many cells as there are columns (quote labels that contain a comma)",
    }),
  mission: z.object({ duration: text, scope: z.array(text).min(2) }),
  limits: z.array(text).min(1),
  seo: z.object({ title: text, description: text }),
});

export type MethodMeta = z.infer<typeof methodMetaSchema>;
export type MethodText = z.infer<typeof methodTextSchema>;
export type DemoMeta = z.infer<typeof demoMetaSchema>;
export type DemoText = z.infer<typeof demoTextSchema>;
