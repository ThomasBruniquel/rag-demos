import type { ReactNode } from "react";

/**
 * Highlights information the site owner still has to provide, so it can't
 * go unnoticed on the page. Usage in MDX: <ToComplete>tarif journalier</ToComplete>
 */
export function ToComplete({ children }: { children?: ReactNode }) {
  return (
    <mark className="rounded-sm bg-warn-soft px-1 font-mono text-[0.85em] text-warn">
      [À COMPLÉTER{children ? <> : {children}</> : null}]
    </mark>
  );
}

/** Same marker for values that will come from the evaluation bench. */
export function ToMeasure() {
  return (
    <span className="ml-1 inline-block rounded-sm bg-warn-soft px-1 align-middle font-mono text-[0.7rem] leading-5 text-warn">
      [À MESURER]
    </span>
  );
}
