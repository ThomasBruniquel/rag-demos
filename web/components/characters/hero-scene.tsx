import type { ReactNode } from "react";
import { Character } from "./character";

/*
 * Home page scene: four method characters behind a desk, going through
 * documents. Retrieval (blue) scans with a magnifying glass, verification
 * (green) checks, structure (purple) and multimodal (yellow) read along.
 * Decorative only (aria-hidden). Motion is light (the glass drifts, eyes
 * scan) and stops with prefers-reduced-motion (app/globals.css).
 *
 * Layering: characters first, then the desk drawn over their legs.
 * Positions are given on a 440 × 200 stage and turned into percentages, so
 * the whole scene scales with its width. A character's body ends at ~78 % of
 * its box: `top = 152 - 0.78 × size` puts it just behind the desk edge.
 */

const cast = [
  { method: "groundedness", family: "verification", size: 88, left: 20, top: 83, mood: "verify" },
  { method: "stair", family: "structure", size: 104, left: 98, top: 71, mood: "idle" },
  { method: "cag", family: "search", size: 118, left: 192, top: 60, mood: "search" },
  { method: "colpali", family: "multimodal", size: 100, left: 318, top: 74, mood: "idle" },
] as const;

const W = 440;
const H = 200;
const pct = (value: number, total: number) => `${(value / total) * 100}%`;

const line = "var(--char-line)";

/** A sheet lying on the desk, seen in perspective (a parallelogram) with text lines. */
function Sheet({ x, tilt = 0, children }: { x: number; tilt?: number; children?: ReactNode }) {
  return (
    <g transform={`translate(${x} 0) rotate(${tilt} 30 158)`}>
      <path d="M4 149h48l6 14H-2Z" fill="var(--paper)" stroke="var(--line-strong)" strokeWidth="1.2" strokeLinejoin="round" />
      {children ?? <path d="M8 153h34M7 156.5h40M6 160h28" stroke="var(--line-strong)" strokeWidth="1.2" strokeLinecap="round" />}
    </g>
  );
}

export function HeroScene({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative aspect-[440/200] w-[500px] ${className}`}>
      {cast.map((c) => (
        <div
          key={c.method}
          className="absolute"
          style={{ left: pct(c.left, W), top: pct(c.top, H), width: pct(c.size, W), height: pct(c.size, H) }}
        >
          <Character method={c.method} family={c.family} mood={c.mood} className="size-full" />
        </div>
      ))}

      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible">
        {/* Desk: top surface in perspective, then a slim front edge. */}
        <path d="M18 146h404l14 20H4Z" fill="var(--surface)" stroke="var(--line-strong)" strokeWidth="1.5" strokeLinejoin="round" />
        <rect x="4" y="166" width="432" height="14" rx="2" fill="var(--line)" />
        <path d="M4 166h432" stroke="var(--line-strong)" strokeWidth="1.5" />
        {/* Two thin legs. */}
        <path d="M20 180v18M420 180v18" stroke="var(--line-strong)" strokeWidth="4" strokeLinecap="round" />

        {/* Documents in front of each character. */}
        <Sheet x={38} tilt={-3} />
        <Sheet x={126} tilt={2} />
        {/* Under the glass: the page being searched, one line highlighted. */}
        <Sheet x={226} tilt={-1}>
          <path d="M8 153h34M6 160h28" stroke="var(--line-strong)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M7 156.5h40" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" />
        </Sheet>
        {/* The multimodal character's page holds a figure. */}
        <Sheet x={340} tilt={3}>
          <rect x="10" y="152" width="18" height="8" rx="1" fill="none" stroke="var(--line-strong)" strokeWidth="1.2" />
          <path d="m11 159 5-4 4 3 3-2 4 3" fill="none" stroke="var(--fam-multimodal)" strokeWidth="1.3" strokeLinejoin="round" />
          <path d="M33 154h12M33 158h9" stroke="var(--line-strong)" strokeWidth="1.2" strokeLinecap="round" />
        </Sheet>
        {/* A small stack of files at the end of the desk. */}
        <g>
          <path d="M408 146h20l3 6h-26Z" fill="var(--fam-structure-soft)" stroke="var(--line-strong)" strokeWidth="1.2" />
          <path d="M406 140h20l3 6h-26Z" fill="var(--fam-search-soft)" stroke="var(--line-strong)" strokeWidth="1.2" />
        </g>

        {/* The magnifying glass, drifting slowly over the highlighted line. */}
        <g className="scene-loupe">
          <path d="m272 162 15 13" stroke={line} strokeWidth="5" strokeLinecap="round" />
          <circle cx="262" cy="153" r="12" fill="var(--accent-soft)" fillOpacity="0.6" stroke={line} strokeWidth="3.5" />
          <path d="M256 148a7 7 0 0 1 6-2.5" stroke="var(--paper)" strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}
