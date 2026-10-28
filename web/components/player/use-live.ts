"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { idleAnswer, reduceAnswer, runningAnswer, type AnswerState } from "@/lib/player/state";
import type { StreamEvent } from "@/lib/player/types";

/*
 * Live mode (meetings only, D-020): talks to a running demo API, the same one
 * the recordings come from. Enabled when NEXT_PUBLIC_DEMO_API_<NN> is set at
 * build time. Protocol of the demo APIs (demos/*\/api/app.py):
 *   POST {api}/session  { turnstile_token, locale }        → { session_id }
 *   POST {api}/ask      { session_id, question, locale, … } → Server-Sent Events
 * Errors come back as HTTP errors with { error: { code, message } }.
 * The API is run with its captcha check off (turnstile_mode "off") for a
 * meeting, so the player sends an empty token.
 */

/** Without any event after this delay, the database is probably waking up. */
const WAKE_HINT_MS = 2500;

async function readError(response: Response): Promise<StreamEvent> {
  let code = response.status === 429 ? "quota_exceeded" : "internal";
  let message: string | undefined;
  try {
    const body = (await response.json()) as { error?: { code?: string; message?: string } };
    code = body.error?.code ?? code;
    message = body.error?.message;
  } catch {
    // Not JSON: keep the code derived from the status.
  }
  return { type: "error", data: { code, message } };
}

/** Parses a Server-Sent Events body into stream events. */
async function* readEvents(body: ReadableStream<Uint8Array>): AsyncGenerator<StreamEvent> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    buffer += value ? decoder.decode(value, { stream: true }) : decoder.decode();
    const blocks = buffer.split(/\r?\n\r?\n/);
    buffer = done ? "" : (blocks.pop() ?? "");
    for (const block of blocks) {
      let type = "message";
      const data: string[] = [];
      for (const line of block.split(/\r?\n/)) {
        if (line.startsWith("event:")) type = line.slice(6).trim();
        else if (line.startsWith("data:")) data.push(line.slice(5).trimStart());
      }
      if (!data.length) continue;
      yield { type, data: JSON.parse(data.join("\n")) } as StreamEvent;
    }
    if (done) return;
  }
}

export function useLive(apiUrl: string | null, locale: string) {
  const [state, setState] = useState<AnswerState>(idleAnswer);
  const session = useRef<string | null>(null);
  const controller = useRef<AbortController | null>(null);

  useEffect(() => () => controller.current?.abort(), []);

  const ask = useCallback(
    async (question: string, extra: Record<string, string> = {}) => {
      if (!apiUrl) return;
      const base = apiUrl.replace(/\/$/, "");
      controller.current?.abort();
      const abort = new AbortController();
      controller.current = abort;

      let current = runningAnswer;
      let heard = false;
      const apply = (event: StreamEvent) => {
        heard = true;
        current = reduceAnswer(current, event);
        setState(current);
      };
      setState(current);
      const wakeTimer = setTimeout(() => {
        if (!heard) apply({ type: "status", data: { step: "waking" } });
      }, WAKE_HINT_MS);

      const post = (path: string, body: unknown) =>
        fetch(`${base}${path}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          signal: abort.signal,
        });

      try {
        if (!session.current) {
          const response = await post("/session", { turnstile_token: "", locale });
          if (!response.ok) return apply(await readError(response));
          session.current = ((await response.json()) as { session_id: string }).session_id;
        }
        const response = await post("/ask", { session_id: session.current, question, locale, ...extra });
        if (!response.ok) {
          if (response.status === 401) session.current = null; // expired: a new one next time
          return apply(await readError(response));
        }
        if (!response.body) return apply({ type: "error", data: { code: "internal" } });
        for await (const event of readEvents(response.body)) apply(event);
        if (current.phase === "running") apply({ type: "done", data: {} });
      } catch {
        if (!abort.signal.aborted) apply({ type: "error", data: { code: "network" } });
      } finally {
        clearTimeout(wakeTimer);
      }
    },
    [apiUrl, locale],
  );

  return { state, ask };
}
