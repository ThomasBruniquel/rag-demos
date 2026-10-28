"use client";

import { Fragment, useId, useState, type ReactNode } from "react";
import { Character } from "@/components/characters/character";
import type { Family } from "@/lib/content/taxonomy";
import { moodFor, type AnswerState } from "@/lib/player/state";
import type { Citation, Trace } from "@/lib/player/types";
import { ArtifactView } from "./artifacts";
import type { PlayerLabels } from "./labels";

/* ------------------------------------------------------------ formatting */

export function formatCost(value: number, locale: string): string {
  return new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumSignificantDigits: 2 }).format(value);
}

function stepLabel(status: AnswerState["status"], labels: PlayerLabels): string {
  if (!status) return "";
  if (status.label) return status.label;
  const steps = labels.steps as Record<string, string>;
  if (status.step === "generating" && typeof status.candidates === "number") {
    return labels.steps.generatingCandidates.replace("{n}", String(status.candidates));
  }
  return steps[status.step] ?? labels.steps.default;
}

function citationKey(c: Citation): string {
  return c.marker ?? `[${c.id}]`;
}

/**
 * Answer text with a light Markdown subset (paragraphs, bullet lists, bold)
 * and citation markers turned into buttons that open the matching source.
 */
function RichText({ text, citations, onCite, citeLabel }: { text: string; citations: Citation[]; onCite: (c: Citation) => void; citeLabel: string }) {
  const byMarker = new Map<string, Citation>();
  for (const c of citations) {
    byMarker.set(citationKey(c), c);
    byMarker.set(`[${c.id}]`, c);
  }

  const inline = (line: string, key: string): ReactNode[] =>
    line.split(/(\*\*[^*\n]+\*\*|\[[^\]\n]{1,16}\])/).map((part, i) => {
      const k = `${key}-${i}`;
      if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={k}>{part.slice(2, -2)}</strong>;
      const citation = byMarker.get(part);
      if (citation) {
        return (
          <button
            key={k}
            type="button"
            onClick={() => onCite(citation)}
            className="mx-0.5 rounded bg-accent-soft px-1 align-baseline text-[0.8em] font-bold text-ink hover:bg-gold hover:text-[#004446]"
            aria-label={citeLabel.replace("{marker}", part)}
          >
            {part}
          </button>
        );
      }
      return <Fragment key={k}>{part}</Fragment>;
    });

  return (
    <>
      {text.split(/\n{2,}/).map((block, b) => {
        const lines = block.split("\n").filter((l) => l.trim());
        if (!lines.length) return null;
        if (lines.every((l) => /^\s*([-*•]|\d+\.)\s/.test(l))) {
          return (
            <ul key={b} className="mb-3 list-disc space-y-1 pl-5">
              {lines.map((l, i) => (
                <li key={i}>{inline(l.replace(/^\s*([-*•]|\d+\.)\s/, ""), `${b}-${i}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={b} className="mb-3">
            {lines.map((l, i) => (
              <Fragment key={i}>
                {i > 0 ? <br /> : null}
                {inline(l, `${b}-${i}`)}
              </Fragment>
            ))}
          </p>
        );
      })}
    </>
  );
}

/* ---------------------------------------------------------------- panes */

function Sources({ citations, open, toggle, idPrefix, labels }: {
  citations: Citation[];
  open: Set<string>;
  toggle: (id: string, value: boolean) => void;
  idPrefix: string;
  labels: PlayerLabels;
}) {
  if (!citations.length) return null;
  return (
    <div className="mt-5">
      <h4 className="mb-2 text-[12px] font-bold uppercase tracking-[0.1em]">{labels.sources}</h4>
      <ol className="space-y-2">
        {citations.map((c) => {
          const id = String(c.id);
          return (
            <li key={id} id={`${idPrefix}-src-${id}`} className="scroll-mt-28">
              <details
                open={open.has(id)}
                onToggle={(e) => toggle(id, (e.currentTarget as HTMLDetailsElement).open)}
                className="group border border-line bg-paper open:border-line-strong"
              >
                <summary className="flex cursor-pointer list-none items-baseline gap-3 px-3 py-2 text-sm">
                  <span className="font-bold text-gold-ink">{citationKey(c)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="font-semibold">{c.doc_title}</span>
                    {c.location ? <span className="text-muted"> · {c.location}</span> : null}
                  </span>
                  {typeof c.score === "number" ? (
                    <span className="shrink-0 text-xs text-muted tabular-nums">{labels.score.replace("{score}", c.score.toFixed(2))}</span>
                  ) : null}
                </summary>
                <div className="border-t border-line px-3 py-2.5 text-sm">
                  <blockquote className="border-l-2 border-gold pl-3 text-muted">{c.snippet}</blockquote>
                  {c.url ? (
                    <a href={c.url} className="link mt-2 inline-block text-[13px]" rel="noopener noreferrer" target="_blank">
                      {labels.openSource} ↗
                    </a>
                  ) : null}
                </div>
              </details>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function BehindTheScenes({ trace, fallbackModels, labels, locale }: { trace: Trace; fallbackModels: string[]; labels: PlayerLabels; locale: string }) {
  const nf = new Intl.NumberFormat(locale);
  const models = trace.models?.length ? trace.models : trace.model_id ? [trace.model_id] : fallbackModels;
  const latency =
    typeof trace.latency_ms === "number"
      ? `${nf.format(trace.latency_ms)} ms`
      : Object.entries(trace.latency_ms ?? {})
          .map(([step, ms]) => `${step} ${nf.format(ms)} ms`)
          .join(" · ");
  const tokenKinds = labels.tokenKinds as Record<string, string>;
  const tokens = Object.entries(trace.usage ?? trace.tokens ?? {})
    .filter(([, n]) => n > 0)
    .map(([kind, n]) => `${nf.format(n)} ${tokenKinds[kind] ?? kind}`)
    .join(" · ");
  const rows: [string, string][] = [
    [labels.models, models.join(", ")],
    [labels.latency, latency],
    [labels.tokens, tokens],
    [labels.cost, typeof trace.cost_eur === "number" ? formatCost(trace.cost_eur, locale) : ""],
  ];

  return (
    <details className="group mt-5 border-t border-line pt-3">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-bold">
        <span>{labels.behind}</span>
        <span aria-hidden="true" className="text-xl text-gold-ink transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="mt-3 space-y-4 text-sm">
        <dl className="grid gap-x-6 sm:grid-cols-2">
          {rows
            .filter(([, value]) => value)
            .map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-line py-2">
                <dt className="text-muted">{label}</dt>
                <dd className="text-right font-semibold tabular-nums">{value}</dd>
              </div>
            ))}
        </dl>
        {trace.chunks?.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse text-left text-[13px]">
              <caption className="mb-1.5 text-left font-bold">{labels.chunks}</caption>
              <thead>
                <tr className="border-b-2 border-ink">
                  <th scope="col" className="py-1.5 pr-3">{labels.rank}</th>
                  <th scope="col" className="py-1.5 pr-3">{labels.document}</th>
                  <th scope="col" className="py-1.5 pr-3">{labels.scoreLabel}</th>
                  <th scope="col" className="py-1.5">{labels.excerpt}</th>
                </tr>
              </thead>
              <tbody>
                {trace.chunks.map((chunk, i) => (
                  <tr key={i} className="border-b border-line align-top">
                    <td className="py-1.5 pr-3 tabular-nums">{chunk.rank ?? i + 1}</td>
                    <td className="py-1.5 pr-3 font-semibold">{chunk.doc_title ?? chunk.doc_id}</td>
                    <td className="py-1.5 pr-3 tabular-nums">{typeof chunk.score === "number" ? chunk.score.toFixed(3) : "—"}</td>
                    <td className="py-1.5 text-muted">{chunk.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {trace.notes?.length ? (
          <div>
            <p className="font-bold">{labels.notes}</p>
            <ul className="list-disc pl-5 text-muted">
              {trace.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </details>
  );
}

export function AnswerPane({
  state,
  question,
  heading,
  method,
  family,
  characterName,
  footer,
  fallbackModels,
  labels,
  locale,
}: {
  state: AnswerState;
  question: string | null;
  /** Variant name, shown above the pane in side-by-side mode. */
  heading?: string;
  method: string;
  family: Family;
  characterName: string;
  /** Recording mention ("Real session recorded on…") or live-mode note. */
  footer?: ReactNode;
  fallbackModels: string[];
  labels: PlayerLabels;
  locale: string;
}) {
  const idPrefix = useId().replace(/:/g, "");
  const [open, setOpen] = useState<Set<string>>(new Set());
  const toggle = (id: string, value: boolean) =>
    setOpen((prev) => {
      if (prev.has(id) === value) return prev;
      const next = new Set(prev);
      if (value) next.add(id);
      else next.delete(id);
      return next;
    });
  const cite = (c: Citation) => {
    toggle(String(c.id), true);
    const item = document.getElementById(`${idPrefix}-src-${c.id}`);
    item?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    item?.querySelector("summary")?.focus({ preventScroll: true });
  };

  const running = state.phase === "running";
  const errors = labels.errors as Record<string, string>;

  return (
    <section className="flex min-w-0 flex-col border border-line bg-surface" aria-label={heading ?? labels.answer} data-phase={state.phase}>
      {heading ? <p className="border-b border-line bg-sunken px-4 py-2 text-[13px] font-bold">{heading}</p> : null}
      <div className="flex items-start gap-4 p-4 sm:p-5">
        <Character method={method} family={family} mood={moodFor(state)} label={characterName} className="size-16 shrink-0 sm:size-20" />
        <div className="min-w-0 flex-1 pt-1">
          {question ? (
            <p className="mb-2 inline-block max-w-full rounded-2xl rounded-tl-sm bg-accent-soft px-3.5 py-2 text-[15px] font-semibold text-ink">
              {question}
            </p>
          ) : null}
          <p className="min-h-5 text-[13px] font-semibold text-muted" aria-live="polite">
            {running ? (
              <>
                <span aria-hidden="true" className="mr-1.5 inline-block size-2 animate-pulse rounded-full bg-gold align-middle" />
                {stepLabel(state.status, labels) || labels.steps.default}
              </>
            ) : null}
          </p>
        </div>
      </div>

      <div className="flex-1 px-4 pb-5 text-[16px] leading-relaxed sm:px-5" aria-busy={running}>
        {state.text ? (
          <RichText text={state.text} citations={state.citations} onCite={cite} citeLabel={labels.citeLabel} />
        ) : null}
        {state.phase === "error" && state.error ? (
          <p role="alert" className="border-l-4 border-danger bg-danger-soft px-4 py-3 text-sm text-danger">
            {errors[state.error.code] ?? state.error.message ?? labels.errors.internal}
          </p>
        ) : null}
        {state.artifacts.length ? (
          <div className="mt-4 grid gap-4">
            {state.artifacts.map((artifact, i) => (
              <ArtifactView key={i} artifact={artifact} labels={labels} locale={locale} />
            ))}
          </div>
        ) : null}
        <Sources citations={state.citations} open={open} toggle={toggle} idPrefix={idPrefix} labels={labels} />
        {state.trace ? <BehindTheScenes trace={state.trace} fallbackModels={fallbackModels} labels={labels} locale={locale} /> : null}
      </div>

      {footer ? <div className="border-t border-line px-4 py-2.5 text-[12px] text-muted sm:px-5">{footer}</div> : null}
    </section>
  );
}
