"use client";

import type { ReactNode } from "react";
import { normalizeArtifact } from "@/lib/player/state";
import type { Artifact } from "@/lib/player/types";
import type { PlayerLabels } from "./labels";

/*
 * Rich content attached to an answer. Shapes follow the demo APIs:
 *   sql    { sql, dialect?, bytes_scanned?, assumptions? }            (demo 04)
 *   table  { columns, rows, row_count?, truncated? }                   (demo 04)
 *   chart  { type: "bar" | "line", x, y: [name], points: [[x, y]] }  (demo 04)
 *   figure | page | image  { title, image_url | url, caption, location } (demo 05)
 *   video  { url | video_url, start | start_s, title }                 (demo 09)
 * Anything else is shown as formatted JSON, so nothing recorded is hidden.
 */

type Fields = Record<string, unknown>;

const str = (value: unknown): string | undefined => (typeof value === "string" && value ? value : undefined);
const num = (value: unknown): number | undefined => (typeof value === "number" && Number.isFinite(value) ? value : undefined);

function Frame({ title, children, note }: { title: string; children: ReactNode; note?: ReactNode }) {
  return (
    <figure className="min-w-0 border border-line bg-paper">
      <figcaption className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line px-4 py-2 text-[12px] font-bold uppercase tracking-[0.08em] text-muted">
        <span>{title}</span>
        {note ? <span className="font-semibold normal-case tracking-normal">{note}</span> : null}
      </figcaption>
      <div className="p-4">{children}</div>
    </figure>
  );
}

function cell(value: unknown, locale: string): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "number") return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(value);
  return String(value);
}

function SqlArtifact({ a, labels, locale }: { a: Fields; labels: PlayerLabels; locale: string }) {
  const bytes = num(a.bytes_scanned);
  const assumptions = Array.isArray(a.assumptions) ? a.assumptions.filter((x): x is string => typeof x === "string") : [];
  return (
    <Frame
      title={labels.artifacts.sql}
      note={bytes !== undefined ? labels.artifacts.scanned.replace("{mb}", cell(bytes / 1e6, locale)) : undefined}
    >
      <pre className="overflow-x-auto text-[13px] leading-relaxed">
        <code className="font-mono">{str(a.sql) ?? ""}</code>
      </pre>
      {assumptions.length ? (
        <div className="mt-3 border-t border-line pt-3 text-sm">
          <p className="mb-1 font-bold">{labels.artifacts.assumptions}</p>
          <ul className="list-disc space-y-1 pl-5 text-muted">
            {assumptions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </Frame>
  );
}

function TableArtifact({ a, labels, locale }: { a: Fields; labels: PlayerLabels; locale: string }) {
  const columns = Array.isArray(a.columns) ? a.columns.map(String) : [];
  const rows = Array.isArray(a.rows) ? (a.rows as unknown[][]) : [];
  const total = num(a.row_count) ?? rows.length;
  const note =
    total > rows.length
      ? labels.artifacts.truncated.replace("{shown}", String(rows.length)).replace("{n}", cell(total, locale))
      : labels.artifacts.rows.replace("{n}", cell(total, locale));
  return (
    <Frame title={str(a.title) ?? labels.artifacts.table} note={note}>
      <div className="-m-4 max-h-80 overflow-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead className="sticky top-0 bg-paper">
            <tr className="border-b-2 border-ink">
              {columns.map((c) => (
                <th key={c} scope="col" className="px-3 py-2 font-bold whitespace-nowrap">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-line">
                {row.map((value, j) => (
                  <td key={j} className={`px-3 py-1.5 whitespace-nowrap ${typeof value === "number" ? "text-right tabular-nums" : ""}`}>
                    {cell(value, locale)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Frame>
  );
}

/** Bar or line chart in plain SVG (no chart library: the player stays light). */
function ChartArtifact({ a, labels, locale }: { a: Fields; labels: PlayerLabels; locale: string }) {
  const points = (Array.isArray(a.points) ? a.points : [])
    .filter((p): p is [unknown, number] => Array.isArray(p) && typeof p[1] === "number")
    .map(([x, y]) => ({ x: String(x), y }));
  if (points.length < 2) return null;
  const yName = Array.isArray(a.y) ? String(a.y[0]) : (str(a.y) ?? "");
  const xName = str(a.x) ?? "";
  const line = a.type === "line";

  const width = 640;
  const height = 280;
  const pad = { top: 16, right: 16, bottom: 56, left: 64 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;
  const max = Math.max(...points.map((p) => p.y), 0);
  const min = Math.min(...points.map((p) => p.y), 0);
  const span = max - min || 1;
  const y = (v: number) => pad.top + innerH - ((v - min) / span) * innerH;
  const step = innerW / points.length;
  const x = (i: number) => pad.left + step * i + step / 2;
  const fmt = new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 });
  const ticks = [min, min + span / 2, max];
  // Keep the x labels readable: at most ~12 of them.
  const every = Math.ceil(points.length / 12);

  return (
    <Frame title={str(a.title) ?? labels.artifacts.chart} note={yName}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full max-w-[720px]"
        role="img"
        aria-label={`${yName} / ${xName} : ${points.map((p) => `${p.x} ${fmt.format(p.y)}`).join(", ")}`}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={pad.left} x2={width - pad.right} y1={y(tick)} y2={y(tick)} stroke="var(--line)" />
            <text x={pad.left - 8} y={y(tick)} textAnchor="end" dominantBaseline="middle" fontSize="12" fill="var(--muted)">
              {fmt.format(tick)}
            </text>
          </g>
        ))}
        {line ? (
          <>
            <polyline
              points={points.map((p, i) => `${x(i)},${y(p.y)}`).join(" ")}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            {points.map((p, i) => (
              <circle key={i} cx={x(i)} cy={y(p.y)} r="3.5" fill="var(--accent)" />
            ))}
          </>
        ) : (
          points.map((p, i) => (
            <rect
              key={i}
              x={x(i) - Math.min(step * 0.35, 24)}
              width={Math.min(step * 0.7, 48)}
              y={Math.min(y(p.y), y(0))}
              height={Math.abs(y(p.y) - y(0))}
              fill="var(--accent)"
              rx="2"
            />
          ))
        )}
        {points.map((p, i) =>
          i % every === 0 ? (
            <text
              key={i}
              x={x(i)}
              y={height - pad.bottom + 14}
              fontSize="11"
              fill="var(--muted)"
              textAnchor="end"
              transform={`rotate(-35 ${x(i)} ${height - pad.bottom + 14})`}
            >
              {p.x.length > 16 ? `${p.x.slice(0, 15)}…` : p.x}
            </text>
          ) : null,
        )}
      </svg>
    </Frame>
  );
}

function ImageArtifact({ a, labels, kind }: { a: Fields; labels: PlayerLabels; kind: string }) {
  const src = str(a.image_url) ?? str(a.url);
  const title = str(a.title);
  const caption = [str(a.location), str(a.caption)].filter(Boolean).join(" — ");
  const heading = kind === "page" ? labels.artifacts.page : kind === "figure" ? labels.artifacts.figure : labels.artifacts.image;
  return (
    <Frame title={heading} note={title}>
      {src ? (
        // Recorded images are files copied next to the site, already sized: no optimizer needed.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={title ?? caption} loading="lazy" className="mx-auto max-h-[420px] w-auto border border-line bg-white" />
      ) : null}
      {caption ? <p className="mt-2 text-sm text-muted">{caption}</p> : null}
    </Frame>
  );
}

function youtubeId(url: string): string | null {
  const match = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{6,})/.exec(url);
  return match ? match[1] : null;
}

function VideoArtifact({ a, labels }: { a: Fields; labels: PlayerLabels }) {
  const url = str(a.video_url) ?? str(a.url);
  if (!url) return null;
  const start = Math.max(0, Math.floor(num(a.start) ?? num(a.start_s) ?? 0));
  const title = str(a.title) ?? labels.artifacts.video;
  const youtube = youtubeId(url);
  return (
    <Frame title={labels.artifacts.video} note={str(a.location)}>
      {youtube ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtube}?start=${start}`}
          title={title}
          loading="lazy"
          allow="encrypted-media; picture-in-picture"
          allowFullScreen
          className="aspect-video w-full border-0"
        />
      ) : (
        // #t= positions the video on the cited moment; the visitor presses play.
        <video src={`${url}#t=${start}`} controls preload="metadata" playsInline className="aspect-video w-full bg-black" title={title} />
      )}
    </Frame>
  );
}

export function ArtifactView({ artifact, labels, locale }: { artifact: Artifact; labels: PlayerLabels; locale: string }) {
  const a = normalizeArtifact(artifact);
  switch (a.kind) {
    case "sql":
      return <SqlArtifact a={a} labels={labels} locale={locale} />;
    case "table":
      return <TableArtifact a={a} labels={labels} locale={locale} />;
    case "chart":
      return <ChartArtifact a={a} labels={labels} locale={locale} />;
    case "figure":
    case "page":
    case "image":
      return <ImageArtifact a={a} labels={labels} kind={a.kind} />;
    case "video":
      return <VideoArtifact a={a} labels={labels} />;
    default:
      return (
        <Frame title={a.kind}>
          <pre className="overflow-x-auto text-[12px]">{JSON.stringify(a, null, 2)}</pre>
        </Frame>
      );
  }
}
