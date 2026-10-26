import Link from "next/link";
import type { ReactNode } from "react";
import { getDemoById } from "@/lib/content/load";
import type { Locale } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/routes";

/*
 * Building blocks shared by the editorial pages (what is RAG, services, data
 * engineering, about...). They keep text short and visual: titled sections,
 * step flows, numbered sources, FAQ, call-to-action band.
 */

/** Eyebrow, title and optional one-line lead at the top of a section. */
export function SectionHeading({ id, eyebrow, title, lead }: { id?: string; eyebrow?: string; title: string; lead?: string }) {
  return (
    <div className="mb-9 max-w-[760px]">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 id={id} className="text-[26px] font-bold sm:text-[34px]">
        {title}
      </h2>
      {lead ? <p className="mt-3 text-[17px] text-muted">{lead}</p> : null}
    </div>
  );
}

/** Horizontal chain of steps joined by arrows (vertical on small screens). */
export function Flow({ steps, numbered = false }: { steps: { label: string; text: string }[]; numbered?: boolean }) {
  return (
    <ol className="grid gap-3 md:auto-cols-fr md:grid-flow-col md:gap-8">
      {steps.map((step, i) => (
        <li key={step.label} className="relative border border-line bg-surface p-4">
          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="absolute top-1/2 -right-6.5 hidden -translate-y-1/2 text-xl font-extrabold text-gold-ink md:block">
              →
            </span>
          ) : null}
          <p className="mb-1 font-bold">
            {numbered ? <span className="mr-1.5 text-gold-ink">{i + 1}.</span> : null}
            {step.label}
          </p>
          {step.text ? <p className="text-sm leading-relaxed text-muted">{step.text}</p> : null}
        </li>
      ))}
    </ol>
  );
}

/** Superscript link to a numbered source at the bottom of the page. */
export function Cite({ n }: { n: number | number[] }) {
  const list = Array.isArray(n) ? n : [n];
  return (
    <sup className="ml-0.5 text-[0.7em] font-bold">
      {list.map((k, i) => (
        <span key={k}>
          {i > 0 ? "," : null}
          <a href={`#source-${k}`} className="text-gold-ink hover:underline">
            [{k}]
          </a>
        </span>
      ))}
    </sup>
  );
}

export type Source = { authors: string; title: string; date: string; url: string };

/** Numbered bibliography, targets of <Cite>. */
export function SourceList({ title, sources }: { title: string; sources: Source[] }) {
  return (
    <div>
      <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em]">{title}</h2>
      <ol className="space-y-2.5 text-sm">
        {sources.map((s, i) => (
          <li key={s.url} id={`source-${i + 1}`} className="flex scroll-mt-28 gap-3">
            <span className="w-7 shrink-0 font-bold text-gold-ink tabular-nums">[{i + 1}]</span>
            <span className="text-muted">
              {s.authors}, <a href={s.url} className="link font-medium text-fg" rel="noopener noreferrer">{s.title}</a>, {s.date}.
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Questions and answers, each one folded (native <details>, no JavaScript). */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.q} className="group py-4">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold [&::-webkit-details-marker]:hidden">
            {item.q}
            <span aria-hidden="true" className="text-xl text-gold-ink transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="mt-3 max-w-[760px] text-[15px] leading-relaxed text-muted">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Small pill listing a technology or service. */
export function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-block rounded-full border border-line bg-surface px-2.5 py-0.5 text-xs font-semibold">{children}</span>;
}

/** List with a gold mark in front of each item, separated by hairlines. */
export function MarkList({ items, mark = "—" }: { items: ReactNode[]; mark?: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 border-b border-line pb-3 text-[15px]">
          <span aria-hidden="true" className="w-4 shrink-0 font-extrabold text-gold-ink">
            {mark}
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Teal band closing a page with one or two actions. */
export function CtaBand({
  title,
  text,
  primary,
  secondary,
}: {
  title: string;
  text?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <section className="bg-brand px-4 py-14 text-on-brand sm:px-6 sm:py-16">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-8">
        <div className="max-w-[640px]">
          <h2 className="text-[26px] font-bold text-on-brand sm:text-[32px]">{title}</h2>
          {text ? <p className="mt-2 text-[17px] text-on-brand-muted">{text}</p> : null}
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={primary.href} className="btn-gold">
            {primary.label}
          </Link>
          {secondary ? (
            <Link href={secondary.href} className="btn border-white/40 text-on-brand hover:border-gold hover:text-gold">
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Link to a demo by its number, with its title in the current language. */
export function demoLink(locale: Locale, id: string): { href: string; title: string } | null {
  const demo = getDemoById(id);
  if (!demo) return null;
  return { href: href(locale, "demos", demo.meta.slugs[locale]), title: demo.text[locale].title };
}
