"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import type { Family } from "@/lib/content/taxonomy";
import type { Recording } from "@/lib/player/types";
import { AnswerPane, formatCost } from "./answer-pane";
import type { PlayerLabels } from "./labels";
import { useLive } from "./use-live";
import { speeds, useReplay, type Speed } from "./use-replay";

/*
 * The project player (D-020). By default it replays real recorded sessions:
 * the visitor picks one of the recorded questions (no free input), the events
 * come back with their original timing, and every session states when it was
 * recorded, with which model and at what cost. When an API URL is configured
 * (a meeting, NEXT_PUBLIC_DEMO_API_<NN>), a "Live" tab talks to the real API.
 */

type Props = {
  locale: string;
  method: string;
  family: Family;
  characterName: string;
  recordings: Recording[];
  /** Example questions of the project, shown while sessions are being recorded. */
  examples: string[];
  /** Localised names of the `variant` values (route compared, role chosen…). */
  variantLabels: Record<string, string>;
  sideBySide: boolean;
  apiUrl: string | null;
  variantField?: string;
  contactHref: string;
  labels: PlayerLabels;
};

type Group = { question: string; recordings: Recording[] };

/** One question can have several recordings, one per variant. */
function groupByQuestion(recordings: Recording[], variantOrder: string[]): Group[] {
  const groups = new Map<string, Recording[]>();
  for (const r of recordings) groups.set(r.question, [...(groups.get(r.question) ?? []), r]);
  const rank = (v?: string | null) => (v ? variantOrder.indexOf(v) : -1);
  return [...groups].map(([question, list]) => ({
    question,
    recordings: list.sort((a, b) => rank(a.variant) - rank(b.variant)),
  }));
}

function Mention({ recording, labels, locale }: { recording: Recording; labels: PlayerLabels; locale: string }) {
  // data-dev-sample: scripts/record-video.mjs refuses to publish a video of a sample.
  if (recording.dev) return <strong data-dev-sample className="font-bold text-danger">{labels.devSample}</strong>;
  const models = recording.stack.models ?? [];
  const date = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(new Date(recording.recorded_at));
  return (
    <>
      {labels.recordedLine
        .replace("{date}", date)
        .replace("{models}", (models.length > 1 ? labels.modelMany : labels.modelOne).replace("{names}", models.join(", ")))
        .replace("{cost}", formatCost(recording.cost_eur, locale))}
    </>
  );
}

/** A segmented control (radio group) used for variants, speed and mode. */
function Segmented<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}) {
  const name = useId();
  return (
    <fieldset className="min-w-0">
      <legend className="mb-1.5 text-[12px] font-bold uppercase tracking-[0.1em]">{label}</legend>
      <div className="inline-flex flex-wrap gap-1 rounded-[1.25rem] border border-line-strong p-1">
        {options.map((option) => (
          <label
            key={String(option.value)}
            className="cursor-pointer rounded-full px-3 py-1 text-[13px] font-semibold text-muted transition-colors has-[:checked]:bg-accent has-[:checked]:text-on-accent has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-gold"
          >
            <input
              type="radio"
              name={name}
              className="sr-only"
              checked={option.value === value}
              onChange={() => onChange(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function ReplayPane({
  recording,
  run,
  speed,
  heading,
  props,
}: {
  recording: Recording;
  run: number;
  speed: Speed;
  heading?: string;
  props: Props;
}) {
  const state = useReplay(recording, run, speed);
  // The baseline lane of a comparison shows the grey "classic RAG" character.
  const classic = recording.variant === "classic";
  return (
    <AnswerPane
      state={state}
      question={run > 0 ? recording.question : null}
      heading={heading}
      method={classic ? "classic" : props.method}
      family={classic ? "classic" : props.family}
      characterName={classic ? (props.variantLabels.classic ?? "RAG") : props.characterName}
      fallbackModels={recording.stack.models ?? []}
      footer={<Mention recording={recording} labels={props.labels} locale={props.locale} />}
      labels={props.labels}
      locale={props.locale}
    />
  );
}

function RecordedMode(props: Props) {
  const { labels, variantLabels, sideBySide } = props;
  const groups = useMemo(() => groupByQuestion(props.recordings, Object.keys(variantLabels)), [props.recordings, variantLabels]);
  const [index, setIndex] = useState<number | null>(null);
  const [variant, setVariant] = useState<string | null>(null);
  const [speed, setSpeed] = useState<Speed>(1);
  const [run, setRun] = useState(0);

  const group = index === null ? null : groups[index];
  const variants = group?.recordings.map((r) => r.variant ?? "") ?? [];
  const multiple = variants.length > 1;
  const current = group?.recordings.find((r) => (r.variant ?? "") === variant) ?? group?.recordings[0] ?? null;
  const label = (v: string) => variantLabels[v] ?? v;

  const choose = (i: number) => {
    setIndex(i);
    setVariant(groups[i].recordings[0].variant ?? "");
    setRun((r) => r + 1);
  };

  return (
    <div>
      <h3 className="mb-3 text-[12px] font-bold uppercase tracking-[0.1em]">{labels.chooseQuestion}</h3>
      <ul className="mb-6 flex flex-wrap gap-2.5">
        {groups.map((g, i) => (
          <li key={g.question}>
            <button
              type="button"
              aria-pressed={i === index}
              onClick={() => choose(i)}
              data-question={i}
              className="rounded-full border border-line-strong bg-surface px-4 py-2 text-left text-sm font-medium transition-colors hover:border-ink aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-on-accent"
            >
              {g.question}
            </button>
          </li>
        ))}
      </ul>

      <div className="mb-5 flex flex-wrap items-end gap-x-6 gap-y-4">
        {multiple && !sideBySide ? (
          <Segmented
            label={labels.variant}
            options={variants.map((v) => ({ value: v, label: label(v) }))}
            value={variant ?? variants[0]}
            onChange={(v) => {
              setVariant(v);
              setRun((r) => r + 1);
            }}
          />
        ) : null}
        <Segmented
          label={labels.speed}
          options={speeds.map((s) => ({ value: s, label: s === Infinity ? labels.speedInstant : `×${s}` }))}
          value={speed}
          onChange={setSpeed}
        />
        {group ? (
          <button type="button" onClick={() => setRun((r) => r + 1)} className="btn-outline min-h-9 px-4 py-1.5 text-[13px]">
            ↻ {labels.replay}
          </button>
        ) : null}
      </div>

      {group && multiple && sideBySide ? (
        <div className={`grid gap-4 ${group.recordings.length > 2 ? "lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {group.recordings.map((r) => (
            <ReplayPane key={`${index}-${r.variant}`} recording={r} run={run} speed={speed} heading={label(r.variant ?? "")} props={props} />
          ))}
        </div>
      ) : current ? (
        <ReplayPane key={`${index}-${current.variant}`} recording={current} run={run} speed={speed} props={props} />
      ) : (
        <p className="border border-dashed border-line-strong px-5 py-10 text-center text-sm text-muted">{labels.pickPrompt}</p>
      )}
    </div>
  );
}

function LiveMode(props: Props) {
  const { labels, variantLabels, variantField, apiUrl, locale } = props;
  const { state, ask } = useLive(apiUrl, locale);
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState<string | null>(null);
  const variants = Object.keys(variantLabels);
  const [variant, setVariant] = useState(variants[0] ?? "");
  const inputId = useId();

  const submit = (q: string) => {
    const text = q.trim();
    if (text.length < 2) return;
    setAsked(text);
    void ask(text, variantField && variant ? { [variantField]: variant } : {});
  };

  return (
    <div>
      <p className="mb-4 text-sm text-muted">{labels.liveIntro}</p>
      <form
        className="mb-4 flex flex-col gap-2.5 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          submit(question);
        }}
      >
        <label htmlFor={inputId} className="sr-only">
          {labels.askPlaceholder}
        </label>
        <input
          id={inputId}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          maxLength={1000}
          placeholder={labels.askPlaceholder}
          className="min-h-11 flex-1 rounded-full border border-field bg-surface px-4 text-[15px] text-fg"
        />
        <button type="submit" className="btn-primary" disabled={state.phase === "running"}>
          {labels.ask}
        </button>
      </form>
      <ul className="mb-5 flex flex-wrap gap-2">
        {props.examples.map((q) => (
          <li key={q}>
            <button
              type="button"
              onClick={() => {
                setQuestion(q);
                submit(q);
              }}
              className="rounded-full border border-line-strong px-3.5 py-1.5 text-left text-[13px] font-medium hover:border-ink"
            >
              {q}
            </button>
          </li>
        ))}
      </ul>
      {variantField && variants.length > 1 ? (
        <div className="mb-5">
          <Segmented label={labels.variant} options={variants.map((v) => ({ value: v, label: variantLabels[v] }))} value={variant} onChange={setVariant} />
        </div>
      ) : null}
      <AnswerPane
        state={state}
        question={asked}
        method={props.method}
        family={props.family}
        characterName={props.characterName}
        fallbackModels={[]}
        footer={labels.liveFooter}
        labels={labels}
        locale={locale}
      />
    </div>
  );
}

export function DemoPlayer(props: Props) {
  const { labels, recordings, apiUrl, contactHref } = props;
  const [mode, setMode] = useState<"recorded" | "live">("recorded");
  const hasRecordings = recordings.length > 0;

  return (
    <div className="border border-line bg-paper p-4 sm:p-7" data-player>
      {apiUrl ? (
        <div className="mb-6">
          <Segmented
            label={labels.mode}
            options={[
              { value: "recorded", label: labels.recorded },
              { value: "live", label: labels.live },
            ]}
            value={mode}
            onChange={setMode}
          />
        </div>
      ) : null}

      {mode === "live" && apiUrl ? (
        <LiveMode {...props} />
      ) : hasRecordings ? (
        <RecordedMode {...props} />
      ) : (
        <div>
          <p className="mb-1 inline-flex items-center gap-2 text-[15px] font-bold">
            <span aria-hidden="true" className="inline-block size-2.5 animate-pulse rounded-full bg-gold" />
            {labels.pending}
          </p>
          <p className="mb-4 text-sm text-muted">{labels.pendingText}</p>
          <ul className="flex flex-wrap gap-2.5">
            {props.examples.map((q) => (
              <li key={q} className="rounded-full border border-dashed border-line-strong px-4 py-2 text-sm font-medium text-muted">
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-4 text-sm">
        <Link href={contactHref} className="link">
          {labels.liveCta} →
        </Link>
        <span className="text-muted">{labels.liveCtaText}</span>
      </p>
    </div>
  );
}
