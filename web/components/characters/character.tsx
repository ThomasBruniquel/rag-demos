import type { ReactNode } from "react";
import type { Family } from "@/lib/content/taxonomy";

/*
 * Method characters, drawn in code. One silhouette and one colour per family,
 * plus a method-specific accessory. All share the same grid (96×96), flat
 * shapes, round eyes and small mouth, so they read as one cast.
 *
 * The `mood` drives small CSS animations (app/globals.css, "Characters"):
 * the demo player sets it from the `status` events of the answer stream.
 */

export type Mood = "idle" | "search" | "verify" | "hesitate" | "refuse" | "happy";

type Body = {
  /** Body outline. */
  shape: ReactNode;
  /** Eye centres and the y of the body bottom (where legs start). */
  eyes: [number, number, number];
  bottom: number;
};

const LINE = "var(--char-line)";
/** Eyes and mouth: always dark, they sit on the coloured body. */
const FACE = "var(--char-face)";
/** Line style of the accessories (navy details on the flat bodies). */
const stroke = { stroke: LINE, strokeWidth: 2.5, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

function bodies(fill: string): Record<Family, Body> {
  // Flat shapes without outline, like the chess pieces on echic.
  const detail = { stroke: "var(--paper)", strokeWidth: 2.5, strokeLinecap: "round" as const, fill: "none" };
  return {
    // Retrieval: a round lens.
    search: { shape: <circle cx="48" cy="48" r="28" fill={fill} />, eyes: [40, 56, 44], bottom: 74 },
    // Structure: a block with a shelf.
    structure: {
      shape: (
        <>
          <rect x="22" y="22" width="52" height="54" rx="5" fill={fill} />
          <path d="M22 60h52" {...detail} />
        </>
      ),
      eyes: [39, 57, 39],
      bottom: 75,
    },
    // Verification: a shield.
    verification: {
      shape: <path d="M48 16 76 26v24c0 17-12 27-28 33-16-6-28-16-28-33V26Z" fill={fill} />,
      eyes: [40, 56, 40],
      bottom: 72,
    },
    // Agents: a capsule with arms (it uses tools).
    agents: {
      shape: (
        <>
          <path d="M30 46 15 57M66 46l15 11" stroke={fill} strokeWidth={6} strokeLinecap="round" fill="none" />
          <rect x="28" y="18" width="40" height="58" rx="20" fill={fill} />
        </>
      ),
      eyes: [41, 55, 38],
      bottom: 74,
    },
    // Sovereignty: a house (it runs on the client's premises).
    sovereignty: {
      shape: <path d="M18 44 48 18l30 26v32H18Z" fill={fill} />,
      eyes: [40, 56, 43],
      bottom: 75,
    },
    // Multimodal: a screen with antennas.
    multimodal: {
      shape: (
        <>
          <path d="M40 30 32 15M56 30l8-15" stroke={fill} strokeWidth={3} strokeLinecap="round" fill="none" />
          <circle cx="32" cy="14" r="3.5" fill={fill} />
          <circle cx="64" cy="14" r="3.5" fill={fill} />
          <rect x="16" y="30" width="64" height="44" rx="8" fill={fill} />
        </>
      ),
      eyes: [38, 58, 45],
      bottom: 72,
    },
    // Baseline: a plain document with a folded corner.
    classic: {
      shape: (
        <>
          <path d="M26 16h32l12 12v48H26Z" fill={fill} />
          <path d="M58 16v12h12" {...detail} strokeLinejoin="round" />
        </>
      ),
      eyes: [40, 56, 40],
      bottom: 75,
    },
  };
}

const paper = "var(--paper)";

/** Method-specific details, keyed by method id (content/methods/*\/method.yaml). */
const accessories: Record<string, ReactNode> = {
  // Cache-augmented generation: the whole corpus already loaded, a stack on its head.
  cag: (
    <g>
      <rect x="52" y="13" width="20" height="6" rx="1.5" fill={paper} {...stroke} strokeWidth={2} />
      <rect x="55" y="7" width="20" height="6" rx="1.5" fill={paper} {...stroke} strokeWidth={2} />
      <rect x="52" y="1" width="20" height="6" rx="1.5" fill={paper} {...stroke} strokeWidth={2} />
    </g>
  ),
  // STAIR: a staircase, i.e. climbing down the table of contents.
  stair: <path d="M44 22v-6h9V9h9V2h10" {...stroke} fill="none" strokeWidth={3} />,
  // Graph RAG: a small graph of entities as antennas.
  graphrag: (
    <g>
      <path d="M48 22V12M48 12 34 6M48 12l14-5" {...stroke} fill="none" strokeWidth={2} />
      <circle cx="34" cy="6" r="4" fill={paper} {...stroke} strokeWidth={2} />
      <circle cx="48" cy="12" r="4" fill={paper} {...stroke} strokeWidth={2} />
      <circle cx="62" cy="7" r="4" fill={paper} {...stroke} strokeWidth={2} />
    </g>
  ),
  // Groundedness check: a check mark.
  groundedness: <path d="m38 57 7 7 13-14" {...stroke} fill="none" strokeWidth={4} />,
  // Multi-candidate text-to-SQL: three candidate result tables, one kept.
  "multi-sql": (
    <g>
      <rect x="32" y="52" width="10" height="13" rx="1.5" fill={paper} {...stroke} strokeWidth={2} opacity={0.55} />
      <rect x="54" y="52" width="10" height="13" rx="1.5" fill={paper} {...stroke} strokeWidth={2} opacity={0.55} />
      <rect x="42" y="49" width="12" height="16" rx="1.5" fill={paper} {...stroke} strokeWidth={2} />
      <path d="M42 54h12M48 49v16" stroke={LINE} strokeWidth={1.5} />
    </g>
  ),
  // Corrective / adaptive RAG: a loop arrow (it checks and tries again).
  corrective: (
    <g fill="none" {...stroke} strokeWidth={2.5}>
      <path d="M41 9a8 8 0 1 1 7 8" />
      <path d="m44 13 4 4-4 4" />
    </g>
  ),
  // Open models on premise: a locked door.
  "open-models": (
    <g>
      <rect x="40" y="56" width="16" height="20" rx="1.5" fill={paper} {...stroke} strokeWidth={2} />
      <path d="M45 65v-3a3 3 0 0 1 6 0v3" {...stroke} fill="none" strokeWidth={1.8} />
      <rect x="43.5" y="65" width="9" height="7" rx="1" fill={LINE} />
    </g>
  ),
  // ColPali: reads the page as an image.
  colpali: (
    <g>
      <rect x="56" y="54" width="18" height="14" rx="1.5" fill={paper} {...stroke} strokeWidth={2} />
      <path d="m58 66 5-6 4 4 2-2 4 4" stroke={LINE} strokeWidth={1.6} fill="none" strokeLinejoin="round" />
      <circle cx="69" cy="58" r="1.6" fill={LINE} />
    </g>
  ),
  // Timestamped hierarchical summaries: a timeline with chapters.
  summaries: (
    <g {...stroke} fill="none" strokeWidth={2}>
      <path d="M24 64h48" />
      <path d="M32 60v8M48 60v8M62 60v8" />
      <path d="m22 54 6 3-6 3Z" fill={LINE} strokeWidth={1.5} />
    </g>
  ),
  // Baseline: lines of text.
  classic: <path d="M33 56h30M33 63h30M33 70h18" stroke="var(--paper)" strokeWidth={2.5} strokeLinecap="round" />,
};

export function Character({
  method,
  family,
  mood = "idle",
  label,
  className = "",
}: {
  method: string;
  family: Family;
  mood?: Mood;
  /** Accessible name; without it the drawing is decorative. */
  label?: string;
  className?: string;
}) {
  const body = bodies(`var(--fam-${family})`)[family];
  const [leftEye, rightEye, eyeY] = body.eyes;
  const mouthY = eyeY + 9;

  return (
    <svg
      viewBox="0 0 96 96"
      className={`char mood-${mood} ${className}`}
      {...(label ? { role: "img", "aria-label": label } : { "aria-hidden": true })}
    >
      <ellipse cx="48" cy="90" rx="22" ry="3" fill="var(--line)" />
      <g className="char-figure">
        {/* Legs first, so the body covers their top. */}
        <rect x="36" y={body.bottom - 4} width="8" height={88 - body.bottom + 4} rx="3" fill={LINE} />
        <rect x="52" y={body.bottom - 4} width="8" height={88 - body.bottom + 4} rx="3" fill={LINE} />
        {body.shape}
        <g className="char-accessory">{accessories[method]}</g>
        <g className="char-eyes">
          <circle cx={leftEye} cy={eyeY} r="3.6" fill={FACE} />
          <circle cx={rightEye} cy={eyeY} r="3.6" fill={FACE} />
        </g>
        <g fill="none" stroke={FACE} strokeWidth={2.2} strokeLinecap="round">
          <path className="char-mouth char-mouth-smile" d={`M${44} ${mouthY}q4 3.5 8 0`} />
          <path className="char-mouth char-mouth-flat" d={`M${44} ${mouthY + 1}h8`} />
          <path className="char-mouth char-mouth-frown" d={`M${44} ${mouthY + 2}q4-3.5 8 0`} />
        </g>
      </g>
      {/* Mood signs, hidden unless the mood needs them. */}
      <path className="char-sign char-sign-q" d="M78 9c0-5 9-5 9 0 0 4-4.5 4-4.5 8m0 4.5v.5" fill="none" stroke={LINE} strokeWidth={2.4} strokeLinecap="round" />
      <path className="char-sign char-sign-x" d="m78 6 9 9m0-9-9 9" fill="none" stroke="var(--danger)" strokeWidth={3} strokeLinecap="round" />
      <path className="char-sign char-sign-ok" d="m77 11 4 4 7-8" fill="none" stroke="var(--fam-verification)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
