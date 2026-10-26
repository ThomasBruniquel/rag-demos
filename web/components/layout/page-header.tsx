import type { ReactNode } from "react";

/** Title block of an inner page: light grey band, as on echic. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <header className="border-b border-line bg-sunken px-4 pt-14 pb-12 sm:px-6 sm:pt-16">
      <div className="mx-auto max-w-[1240px]">
        {eyebrow ? <p className="eyebrow mb-2.5">{eyebrow}</p> : null}
        <h1 className="max-w-[820px] text-[34px] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[54px]">{title}</h1>
        {lead ? <p className="mt-3.5 max-w-[660px] text-lg font-medium text-muted">{lead}</p> : null}
        {children}
      </div>
    </header>
  );
}
