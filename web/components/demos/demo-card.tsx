import Link from "next/link";
import { Character } from "@/components/characters/character";
import type { Family } from "@/lib/content/taxonomy";
import { StackRows, type StackGroup } from "./stack-badges";

/** Everything a project card needs; plain data so it can cross to the client. */
export type DemoSummary = {
  id: string;
  href: string;
  title: string;
  tagline: string;
  family: Family;
  methodId: string;
  methodName: string;
  familyLabel: string;
  statusLabel: string;
  live: boolean;
  docTypes: string[];
  volume: string;
  constraints: string[];
  sectors: string[];
  /** Keyword ids, for the catalogue filter. */
  keywords: string[];
  /** Badges shown on the card. */
  stack: StackGroup[];
};

/**
 * Card in the echic style: a 4:3 cover (the method's character), then text.
 * The title link covers the whole card; the badges sit above it and lead to
 * the Skills page (no link inside a link).
 */
export function DemoCard({
  demo,
  eyebrow,
  stackLabel,
}: {
  demo: DemoSummary;
  eyebrow: string;
  stackLabel: string;
}) {
  return (
    <article className="group relative flex h-full flex-col">
      <div
        className="relative flex aspect-[4/3] items-center justify-center overflow-hidden"
        style={{ background: `var(--fam-${demo.family}-soft)` }}
      >
        <span className={`absolute top-3 left-4 font-extrabold text-ink/15 tabular-nums dark:text-ink/25 text-4xl`}>
          {demo.id}
        </span>
        <Character
          method={demo.methodId}
          family={demo.family}
          className={`size-32 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105`}
        />
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <p className="eyebrow mb-1.5 text-[10px]">
          {eyebrow} · {demo.familyLabel}
        </p>
        <h3 className="mb-1 text-lg font-bold">
          <Link
            href={demo.href}
            className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4"
          >
            {demo.title}
          </Link>
        </h3>
        <p className="mb-3 text-sm text-muted">{demo.tagline}</p>
        {demo.stack.length ? (
          <div className="mb-4">
            <StackRows groups={demo.stack} label={stackLabel} />
          </div>
        ) : null}
        <p className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs">
          <span className={`tag ${demo.live ? "text-[var(--fam-verification)]" : "text-gold-ink"}`}>{demo.statusLabel}</span>
          <span className="font-semibold text-muted">{demo.methodName}</span>
        </p>
      </div>
    </article>
  );
}
