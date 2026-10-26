import { z } from "zod";
import { badges, constraints, docTypes, families, keysOf, sectors, volumes } from "./taxonomy";

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
  aws: z.array(text).min(1),
  vectorStore: text,
  /** Folder of the demo in the GitHub monorepo. */
  sourcePath: text,
  player: z
    .object({
      upload: z.boolean().default(false),
      roles: z.boolean().default(false),
      sideBySide: z.boolean().default(false),
    })
    .default({ upload: false, roles: false, sideBySide: false }),
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
