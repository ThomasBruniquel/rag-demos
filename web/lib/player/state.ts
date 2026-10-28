import type { Mood } from "@/components/characters/character";
import type { Artifact, Citation, ErrorData, StatusData, StreamEvent, Trace } from "./types";

/** What the player shows for one answer, built event by event. */
export type AnswerState = {
  phase: "idle" | "running" | "done" | "error";
  status: StatusData | null;
  text: string;
  citations: Citation[];
  artifacts: Artifact[];
  trace: Trace | null;
  error: ErrorData | null;
};

export const idleAnswer: AnswerState = {
  phase: "idle",
  status: null,
  text: "",
  citations: [],
  artifacts: [],
  trace: null,
  error: null,
};

export const runningAnswer: AnswerState = { ...idleAnswer, phase: "running" };

/** Applies one stream event. Pure, so replay and live mode share it. */
export function reduceAnswer(state: AnswerState, event: StreamEvent): AnswerState {
  switch (event.type) {
    case "status":
      return { ...state, phase: "running", status: event.data };
    case "token":
      return { ...state, text: state.text + event.data.text };
    case "citation":
      // A source can be announced twice (retrieval, then the answer): keep the latest.
      return { ...state, citations: [...state.citations.filter((c) => c.id !== event.data.id), event.data] };
    case "artifact":
      return { ...state, artifacts: [...state.artifacts, event.data] };
    case "trace":
      return { ...state, trace: event.data };
    case "done":
      return { ...state, phase: state.phase === "error" ? "error" : "done", status: null };
    case "error":
      return { ...state, phase: "error", status: null, error: event.data };
    default:
      return state;
  }
}

/*
 * The character reacts to the `status` steps. Step names come from the demo
 * APIs (rag_core and demos/*): "retrieving", "generating", "candidate",
 * "selecting", "writing", "reading_document"… Unknown steps fall back on
 * "search", the most common activity.
 */
const verifySteps = /verif|check|grad|judg|guard|select|validat|ground/;
const hesitateSteps = /clarif|rewrit|retry|fallback|reformul|wak/;
const refuseSteps = /refus|escalat|handoff|human|block/;

export function moodFor(state: AnswerState): Mood {
  if (state.phase === "idle") return "idle";
  if (state.phase === "error") return "refuse";
  if (state.phase === "done") return state.text.trim() ? "happy" : "hesitate";
  const step = state.status?.step.toLowerCase() ?? "";
  if (refuseSteps.test(step)) return "refuse";
  if (hesitateSteps.test(step)) return "hesitate";
  if (verifySteps.test(step)) return "verify";
  return "search";
}

/** Accepts both artifact shapes: fields at the top level, or under `data`. */
export function normalizeArtifact(artifact: Artifact): Record<string, unknown> & { kind: string } {
  const { data, ...rest } = artifact;
  if (data && typeof data === "object" && !Array.isArray(data)) return { ...rest, ...(data as Record<string, unknown>) };
  return { ...rest, ...(data !== undefined ? { data } : {}) };
}
