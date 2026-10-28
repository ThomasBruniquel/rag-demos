import Link from "next/link";
import type { CSSProperties } from "react";

/**
 * Keyword badges of a project (D-022), always shown category by category:
 * cloud, framework, models, vector store, integrations, compliance. Each
 * category has its name and its colour (tokens --cat-* in app/globals.css);
 * the name is always written, so the colour is never the only cue.
 * Text only, no brand logos; each badge links to its row on the Skills page.
 * Plain data, so it works on the server and inside client components.
 */
export type StackGroup = {
  category: string;
  label: string;
  /** One-word name, for the rows of the cards. */
  short: string;
  items: { id: string; label: string; href: string }[];
};

/** Category id (lib/content/taxonomy.ts) → colour token suffix. */
const tokens: Record<string, string> = {
  cloud: "cloud",
  framework: "framework",
  models: "models",
  vectorStores: "vector",
  integrations: "integrations",
  compliance: "compliance",
};

/** Colour of a category, for labels and markers (Skills page headings too). */
export function categoryColor(category: string): string {
  return `var(--cat-${tokens[category] ?? "integrations"})`;
}

function badgeStyle(category: string): CSSProperties {
  const token = tokens[category] ?? "integrations";
  return {
    background: `var(--cat-${token}-soft)`,
    borderColor: `color-mix(in srgb, var(--cat-${token}) 40%, transparent)`,
  };
}

function Badge({ category, item, linked }: { category: string; item: StackGroup["items"][number]; linked: boolean }) {
  const className =
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[12px] leading-5 font-semibold text-ink";
  return linked ? (
    <Link href={item.href} style={badgeStyle(category)} className={`${className} relative z-10 transition-[filter] hover:brightness-95 dark:hover:brightness-125`}>
      {item.label}
    </Link>
  ) : (
    <span style={badgeStyle(category)} className={className}>
      {item.label}
    </span>
  );
}

function CategoryLabel({ group, short = false }: { group: StackGroup; short?: boolean }) {
  return (
    <span
      className="text-[10px] font-extrabold whitespace-nowrap uppercase tracking-[0.12em]"
      style={{ color: categoryColor(group.category) }}
      title={short ? group.label : undefined}
    >
      {short ? group.short : group.label}
    </span>
  );
}

/**
 * Cards and lists: one row per category, the name in a fixed column on the
 * left, so the categories line up from one card to the next.
 */
export function StackRows({ groups, label, linked = true }: { groups: StackGroup[]; label: string; linked?: boolean }) {
  return (
    <dl aria-label={label} className="grid gap-y-1.5">
      {groups.map((group) => (
        <div key={group.category} className="grid grid-cols-[6.25rem_1fr] items-baseline gap-x-2">
          <dt>
            <CategoryLabel group={group} short />
          </dt>
          <dd className="flex flex-wrap gap-1">
            {group.items.map((item) => (
              <Badge key={item.id} category={group.category} item={item} linked={linked} />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Project page: one block per category, a coloured rule above each name. */
export function StackGrid({ groups, label }: { groups: StackGroup[]; label: string }) {
  return (
    <dl aria-label={label} className="grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
      {groups.map((group) => (
        <div key={group.category} className="border-t-2 pt-2" style={{ borderColor: categoryColor(group.category) }}>
          <dt className="mb-1.5">
            <CategoryLabel group={group} />
          </dt>
          <dd className="flex flex-wrap gap-1">
            {group.items.map((item) => (
              <Badge key={item.id} category={group.category} item={item} linked />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
