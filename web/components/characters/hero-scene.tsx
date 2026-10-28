import type { ReactNode } from "react";
import { Character } from "./character";

/*
 * Home page scene: four method characters behind a desk, going through
 * documents, each one its own: verification (green) a page of text, structure
 * (purple) a table of contents, retrieval (blue) a page with the passage
 * found highlighted, multimodal (yellow) a page with a picture. Decorative only
 * (aria-hidden); the only motion is the characters' blinking. The desk legs
 * reach the bottom of the stage, so the desk stands on the line below it.
 *
 * Layering: characters first, then the desk drawn over their legs.
 * Positions are given on a 440 × 200 stage and turned into percentages, so
 * the whole scene scales with its width. A character's body ends at ~78 % of
 * its box: `top = 152 - 0.78 × size` puts it just behind the desk edge.
 */

const cast = [
  { method: "groundedness", family: "verification", size: 88, left: 20, top: 83, mood: "idle" },
  { method: "stair", family: "structure", size: 104, left: 98, top: 71, mood: "idle" },
  { method: "cag", family: "search", size: 118, left: 192, top: 60, mood: "idle" },
  { method: "colpali", family: "multimodal", size: 100, left: 318, top: 74, mood: "idle" },
] as const;

const W = 440;
const H = 200;
const pct = (value: number, total: number) => `${(value / total) * 100}%`;

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
        <path d="M20 180v20M420 180v20" stroke="var(--line-strong)" strokeWidth="4" />

        {/* Documents in front of each character. Verification: a page of text. */}
        <Sheet x={38} tilt={-3} />
        {/* Structure: a table of contents (entries, one indented, page numbers on the right). */}
        <Sheet x={126} tilt={2}>
          <g fill="var(--fam-structure)">
            <circle cx="8.5" cy="153" r="1.3" />
            <circle cx="11" cy="156.5" r="1.1" />
            <circle cx="6" cy="160" r="1.3" />
          </g>
          <path d="M11 153h22M13.5 156.5h18M8.5 160h24" stroke="var(--line-strong)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M40 153h4M42 156.5h4M43 160h4" stroke="var(--fam-structure)" strokeWidth="1.2" strokeLinecap="round" />
        </Sheet>
        {/* Retrieval: the page being searched, the passage found highlighted. */}
        <Sheet x={226} tilt={-1}>
          <path d="M8 153h34M6 160h28" stroke="var(--line-strong)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M7 156.5h40" stroke="var(--gold)" strokeWidth="2.4" strokeLinecap="round" />
        </Sheet>
        {/* Multimodal: a page of text with a picture in the middle. */}
        <Sheet x={340} tilt={3}>
          <path d="M8 152.5h34M5.5 161h30" stroke="var(--line-strong)" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M17 154.5h17l.8 4.5H16.2Z" fill="var(--fam-multimodal-soft)" stroke="var(--fam-multimodal)" strokeWidth="1" strokeLinejoin="round" />
        </Sheet>
        {/* A small stack of files at the end of the desk. */}
        <g>
          <path d="M408 146h20l3 6h-26Z" fill="var(--fam-structure-soft)" stroke="var(--line-strong)" strokeWidth="1.2" />
          <path d="M406 140h20l3 6h-26Z" fill="var(--fam-search-soft)" stroke="var(--line-strong)" strokeWidth="1.2" />
        </g>

      </svg>
    </div>
  );
}
