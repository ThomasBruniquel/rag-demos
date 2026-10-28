"use client";

import { useId, useMemo, useSyncExternalStore } from "react";
import { DemoCard, type DemoSummary } from "./demo-card";

type FacetKey = "docTypes" | "volume" | "constraints" | "sectors" | "keywords";
type Filters = Record<FacetKey, string>;

/** `group` puts an option under an <optgroup> (keywords are grouped by category). */
export type FacetOptions = { key: FacetKey; label: string; options: { value: string; label: string; group?: string }[] }[];

const empty: Filters = { docTypes: "", volume: "", constraints: "", sectors: "", keywords: "" };
const keys = Object.keys(empty) as FacetKey[];

const URL_EVENT = "demo-filters-change";

function subscribe(onChange: () => void) {
  window.addEventListener("popstate", onChange);
  window.addEventListener(URL_EVENT, onChange);
  return () => {
    window.removeEventListener("popstate", onChange);
    window.removeEventListener(URL_EVENT, onChange);
  };
}

function parse(search: string): Filters {
  const params = new URLSearchParams(search);
  const filters = { ...empty };
  for (const key of keys) filters[key] = params.get(key) ?? "";
  return filters;
}

function matches(demo: DemoSummary, filters: Filters): boolean {
  return keys.every((key) => {
    const wanted = filters[key];
    if (!wanted) return true;
    const value = demo[key];
    return Array.isArray(value) ? value.includes(wanted) : value === wanted;
  });
}

/**
 * Catalogue with dropdown filters (as on echic's collection page): the visitor's
 * situation (documents, volume, constraint, sector) and a technology keyword.
 * Filters are mirrored in the URL (?docTypes=pdf&keywords=langchain) so a
 * filtered view can be shared or linked to.
 */
export function DemoCatalog({
  demos,
  facets,
  labels,
}: {
  demos: DemoSummary[];
  facets: FacetOptions;
  labels: {
    any: string;
    reset: string;
    countOne: string;
    countMany: string;
    empty: string;
    eyebrow: string;
    filters: string;
    stack: string;
  };
}) {
  // The URL is the single source of truth for the filters.
  const search = useSyncExternalStore(subscribe, () => window.location.search, () => "");
  const filters = useMemo(() => parse(search), [search]);
  const idPrefix = useId();

  function update(next: Filters) {
    const params = new URLSearchParams();
    for (const key of keys) if (next[key]) params.set(key, next[key]);
    const query = params.toString();
    window.history.replaceState(null, "", query ? `?${query}` : window.location.pathname);
    window.dispatchEvent(new Event(URL_EVENT));
  }

  const visible = useMemo(() => demos.filter((d) => matches(d, filters)), [demos, filters]);
  const active = keys.some((key) => filters[key]);
  const count = visible.length === 1 ? labels.countOne : labels.countMany.replace("{n}", String(visible.length));

  return (
    <div>
      <form role="search" aria-label={labels.filters} onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-5">
          {facets.map((facet) => (
            // Five filters on a two-column phone grid: the last one takes the full width.
            <div key={facet.key} className={facet.key === "keywords" ? "col-span-2 lg:col-span-1" : ""}>
              <label htmlFor={`${idPrefix}-${facet.key}`} className="block text-xs font-bold">
                {facet.label}
              </label>
              <select
                id={`${idPrefix}-${facet.key}`}
                value={filters[facet.key]}
                onChange={(e) => update({ ...filters, [facet.key]: e.target.value })}
                className="mt-1.5 w-full min-w-0 rounded border border-field bg-surface px-3 py-2.5 text-sm font-medium text-fg"
              >
                <option value="">{labels.any}</option>
                <FacetChoices options={facet.options} />
              </select>
            </div>
          ))}
        </div>
      </form>

      <div className="mt-5 mb-7 flex items-center justify-between border-b border-line pb-3.5">
        <p className="text-sm text-muted" aria-live="polite">
          {count}
        </p>
        {active ? (
          <button type="button" onClick={() => update(empty)} className="link text-sm">
            {labels.reset}
          </button>
        ) : null}
      </div>

      {visible.length ? (
        <ul className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((demo) => (
            <li key={demo.id}>
              <DemoCard demo={demo} eyebrow={labels.eyebrow.replace("{id}", demo.id)} stackLabel={labels.stack} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="bg-sunken px-5 py-14 text-center text-muted">{labels.empty}</p>
      )}
    </div>
  );
}

function FacetChoices({ options }: { options: FacetOptions[number]["options"] }) {
  const groups = [...new Set(options.map((o) => o.group))];
  if (groups.length === 1 && groups[0] === undefined) {
    return options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ));
  }
  return groups.map((group) => (
    <optgroup key={group} label={group}>
      {options
        .filter((o) => o.group === group)
        .map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </optgroup>
  ));
}
