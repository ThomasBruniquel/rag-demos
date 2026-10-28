/*
 * Events of the common answer stream (docs/03-architecture.md, "Contrat d'API
 * commun"; Python side: packages/rag_core/src/rag_core/events.py). The same
 * events are replayed from recordings and received live from a demo API.
 * Client-safe: no Node imports here.
 */

export type StatusData = { step: string; label?: string; [key: string]: unknown };

export type Citation = {
  id: number | string;
  /** Text that refers to it in the answer, e.g. "[1]" or "[p. 3]". */
  marker?: string | null;
  doc_title: string;
  /** Page, section, article or timestamp. */
  location?: string | null;
  snippet: string;
  url?: string | null;
  score?: number | null;
};

/**
 * Rich content shown next to the answer. rag_core sends the fields at the top
 * level ({ kind: "sql", sql, ... }); the contract also allows { kind, data }.
 * normalizeArtifact() merges both shapes.
 */
export type Artifact = {
  kind: string;
  title?: string | null;
  caption?: string | null;
  location?: string | null;
  citation_id?: number | null;
  image_url?: string | null;
  data?: unknown;
  [key: string]: unknown;
};

export type Chunk = {
  rank?: number;
  doc_id?: string;
  doc_title?: string;
  score?: number | null;
  text?: string;
};

export type Trace = {
  trace_id?: string;
  mode?: string;
  model_id?: string;
  models?: string[];
  chunks?: Chunk[];
  usage?: Record<string, number>;
  tokens?: Record<string, number>;
  latency_ms?: number | Record<string, number>;
  cost_eur?: number;
  notes?: string[];
  details?: Record<string, unknown>;
};

export type ErrorData = { code: string; message?: string };

export type StreamEvent =
  | { type: "status"; data: StatusData }
  | { type: "token"; data: { text: string } }
  | { type: "citation"; data: Citation }
  | { type: "artifact"; data: Artifact }
  | { type: "trace"; data: Trace }
  | { type: "done"; data: Record<string, unknown> }
  | { type: "error"; data: ErrorData };

/** An event of a recording: `t` is the time since the start, in milliseconds. */
export type TimedEvent = StreamEvent & { t: number };

/** One recorded session (format version 1), as passed to the player. */
export type Recording = {
  version: 1;
  demo: string;
  locale: string;
  question_id: string;
  question: string;
  variant?: string | null;
  recorded_at: string;
  stack: Record<string, string[]>;
  duration_ms: number;
  cost_eur: number;
  events: TimedEvent[];
  /** Development sample (content/recordings/_dev): never a real session, never published. */
  dev?: boolean;
};
