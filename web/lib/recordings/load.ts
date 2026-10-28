import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";
import { isLocale, type Locale } from "@/lib/i18n/config";
import type { Recording } from "@/lib/player/types";

/*
 * Recorded sessions (D-020), read at build time.
 *
 *   content/recordings/<NN-name>/<question_id>.<locale>.json   real sessions, published
 *   content/recordings/_dev/<NN-name>/…                         development samples
 *
 * Real files are written only by the recording script (rag_core.recording),
 * from a real run of the project: never by hand. Development samples are
 * loaded by `next dev` only, so they can never reach the production build.
 * Format: docs/03-architecture.md, "Format d'un enregistrement (version 1)".
 */

const root = path.join(process.cwd(), "content", "recordings");
const devRoot = path.join(root, "_dev");
const includeDevSamples = process.env.NODE_ENV === "development";

const eventSchema = z.discriminatedUnion("type", [
  z.object({ t: z.number().min(0), type: z.literal("status"), data: z.looseObject({ step: z.string(), label: z.string().optional() }) }),
  z.object({ t: z.number().min(0), type: z.literal("token"), data: z.object({ text: z.string() }) }),
  z.object({
    t: z.number().min(0),
    type: z.literal("citation"),
    data: z.looseObject({
      id: z.union([z.number(), z.string()]),
      marker: z.string().nullish(),
      doc_title: z.string(),
      location: z.string().nullish(),
      snippet: z.string(),
      url: z.string().nullish(),
      score: z.number().nullish(),
    }),
  }),
  z.object({ t: z.number().min(0), type: z.literal("artifact"), data: z.looseObject({ kind: z.string() }) }),
  z.object({ t: z.number().min(0), type: z.literal("trace"), data: z.looseObject({}) }),
  z.object({ t: z.number().min(0), type: z.literal("done"), data: z.looseObject({}) }),
  z.object({ t: z.number().min(0), type: z.literal("error"), data: z.looseObject({ code: z.string(), message: z.string().optional() }) }),
]);

const recordingSchema = z
  .object({
    version: z.literal(1),
    demo: z.string().regex(/^\d{2}$/),
    locale: z.string(),
    question_id: z.string().regex(/^[a-z0-9_-]+$/),
    question: z.string().min(1),
    variant: z.string().nullish(),
    recorded_at: z.iso.datetime({ offset: true }),
    stack: z.record(z.string(), z.array(z.string())),
    duration_ms: z.number().min(0),
    cost_eur: z.number().min(0),
    events: z.array(eventSchema).min(1),
  })
  .refine((r) => r.events.every((e, i) => i === 0 || e.t >= r.events[i - 1].t), {
    message: "events must be in time order (`t` never decreases)",
  })
  .refine((r) => ["done", "error"].includes(r.events[r.events.length - 1].type), {
    message: "the last event must be `done` or `error`",
  });

function readFolder(folder: string, demoId: string, dev: boolean): Recording[] {
  if (!existsSync(folder)) return [];
  return readdirSync(folder)
    .filter((name) => name.endsWith(".json"))
    .sort()
    .map((name) => {
      const file = path.join(folder, name);
      const where = path.relative(process.cwd(), file);
      const match = /^([a-z0-9_-]+)\.([a-z]{2})\.json$/.exec(name);
      if (!match || !isLocale(match[2])) throw new Error(`${where}: expected <question_id>.<locale>.json`);
      const result = recordingSchema.safeParse(JSON.parse(readFileSync(file, "utf8")));
      if (!result.success) throw new Error(`Invalid recording ${where}:\n${z.prettifyError(result.error)}`);
      const recording = result.data;
      if (recording.demo !== demoId) throw new Error(`${where}: "demo" is ${recording.demo}, the folder is ${demoId}`);
      if (recording.locale !== match[2]) throw new Error(`${where}: "locale" does not match the file name`);
      if (recording.question_id !== match[1]) throw new Error(`${where}: "question_id" does not match the file name`);
      // The schema checks the shape; extra fields are kept as recorded.
      return { ...(recording as unknown as Recording), ...(dev ? { dev: true } : {}) };
    });
}

const cache = new Map<string, Recording[]>();

/** Sessions of one project (folder name, e.g. "05-documentation-technique") in one language. */
export function getRecordings(dir: string, locale: Locale): Recording[] {
  if (!cache.has(dir)) {
    const id = dir.slice(0, 2);
    cache.set(dir, [
      ...readFolder(path.join(root, dir), id, false),
      ...(includeDevSamples ? readFolder(path.join(devRoot, dir), id, true) : []),
    ]);
  }
  return cache.get(dir)!.filter((r) => r.locale === locale);
}
