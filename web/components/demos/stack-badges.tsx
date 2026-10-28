import Link from "next/link";

/**
 * Keyword badges of a project (D-022), grouped by category. Plain data so the
 * component works on the server and inside client components (catalogue).
 * Text only, no brand logos; each badge links to its row on the Skills page.
 */
export type StackGroup = {
  category: string;
  label: string;
  items: { id: string; label: string; href: string }[];
};

const badge =
  "inline-flex items-center rounded-full border border-line-strong bg-surface px-2.5 py-0.5 text-[12px] leading-5 font-semibold text-ink";
const badgeLink = `${badge} relative z-10 transition-colors hover:border-ink hover:bg-accent-soft`;

/** Full version (project page): one row per category, with its name. */
export function StackTable({ groups, label }: { groups: StackGroup[]; label: string }) {
  return (
    <dl aria-label={label} className="grid gap-x-8 sm:grid-cols-2">
      {groups.map((group) => (
        <div key={group.category} className="flex flex-col gap-2 border-b border-line py-3 sm:flex-row sm:items-baseline sm:justify-between">
          <dt className="shrink-0 text-[13px] text-muted">{group.label}</dt>
          <dd className="flex flex-wrap gap-1.5 sm:justify-end">
            {group.items.map((item) => (
              <Link key={item.id} href={item.href} className={badgeLink}>
                {item.label}
              </Link>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Compact version (cards, title band): badges in category order, each group
 * kept together and named for screen readers.
 */
export function StackBadges({ groups, label, linked = true }: { groups: StackGroup[]; label: string; linked?: boolean }) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-1.5">
      {groups.flatMap((group) =>
        group.items.map((item, i) => (
          <li key={`${group.category}-${item.id}`} title={group.label} className={i === 0 ? "[&:not(:first-child)]:ml-2" : ""}>
            {/* The category is read once, before its first badge. */}
            {i === 0 ? <span className="sr-only">{group.label} : </span> : null}
            {linked ? (
              <Link href={item.href} className={badgeLink}>
                {item.label}
              </Link>
            ) : (
              <span className={badge}>{item.label}</span>
            )}
          </li>
        )),
      )}
    </ul>
  );
}
