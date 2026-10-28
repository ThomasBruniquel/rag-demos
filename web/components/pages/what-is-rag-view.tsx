import Link from "next/link";
import { Character } from "@/components/characters/character";
import { Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { whatIsRag, type See } from "@/content/pages/what-is-rag";
import { getMethodBySlug } from "@/lib/content/load";
import { format } from "@/lib/i18n/messages";
import { href, projectsHref } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { Cite, CtaBand, demoLink, Flow, MarkList, SectionHeading, SourceList } from "./blocks";

/** "What is RAG?": problem, the two circuits, vocabulary, research, alternatives, limits. */
export async function WhatIsRagPage() {
  const { locale, t } = await getI18n();
  const c = whatIsRag[locale];

  function resolve(see: See | null): { href: string; label: string } | null {
    if (!see) return null;
    if ("demo" in see) {
      const demo = demoLink(locale, see.demo);
      return demo ? { href: demo.href, label: `${format(t.demo.number, { id: see.demo })} · ${demo.title}` } : null;
    }
    if ("method" in see) {
      const method = getMethodBySlug(see.method);
      return method ? { href: href(locale, "methods", see.method), label: method.text[locale].name } : null;
    }
    return { href: projectsHref(locale), label: t.demo.back };
  }

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={t.pages.whatIsRag.title} lead={t.pages.whatIsRag.lead} />

      {/* The problem, then the idea */}
      <Section labelledBy="problem">
        <SectionHeading id="problem" title={c.problem.title} />
        <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
          {c.problem.items.map((item, i) => (
            <li key={item.title} className="bg-surface p-6">
              <span aria-hidden="true" className="mb-3 block text-3xl font-extrabold text-line-strong tabular-nums">
                0{i + 1}
              </span>
              <h3 className="mb-1.5 text-lg font-bold">{item.title}</h3>
              <p className="text-[15px] text-muted">{item.text}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid items-center gap-6 md:grid-cols-[auto_1fr]">
          <Character method="classic" family="classic" className="hidden size-24 md:block" mood="happy" />
          <p className="max-w-[820px] border-l-4 border-gold pl-5 text-lg font-medium sm:text-xl">
            {c.problem.answer}
            <Cite n={1} />
          </p>
        </div>
      </Section>

      {/* Two circuits */}
      <Section tone="light" labelledBy="circuits">
        <SectionHeading id="circuits" title={c.circuits.title} lead={c.circuits.lead} />
        <div className="space-y-8">
          {[c.circuits.indexing, c.circuits.answering].map((circuit) => (
            <div key={circuit.label} className="grid gap-4 lg:grid-cols-[180px_1fr] lg:items-center lg:gap-8">
              <div>
                <p className="text-xl font-extrabold">{circuit.label}</p>
                <p className="text-sm text-muted">{circuit.when}</p>
              </div>
              <Flow steps={circuit.steps} />
            </div>
          ))}
        </div>
      </Section>

      {/* Vocabulary */}
      <Section labelledBy="glossary">
        <SectionHeading id="glossary" title={c.glossary.title} />
        <dl className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {c.glossary.items.map((item) => (
            <div key={item.term} className="bg-surface p-6">
              <dt className="mb-1.5 font-bold">{item.term}</dt>
              <dd className="text-[15px] text-muted">{item.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Research */}
      <Section tone="light" labelledBy="research">
        <SectionHeading id="research" eyebrow={c.research.eyebrow} title={c.research.title} lead={c.research.lead} />
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {c.research.items.map((item) => {
            const see = resolve(item.see);
            return (
              <li key={item.title} className="flex flex-col border-t-2 border-ink pt-5">
                <p className="mb-2 text-[13px] font-extrabold uppercase tracking-[0.08em] text-gold-ink">{item.key}</p>
                <h3 className="mb-2 text-lg font-bold">{item.title}</h3>
                <p className="mb-4 text-[15px] text-muted">
                  {item.text}
                  <Cite n={item.source} />
                </p>
                {see ? (
                  <p className="mt-auto text-sm">
                    <span className="text-muted">{c.research.seeLabel} </span>
                    <Link href={see.href} className="link">
                      {see.label}
                    </Link>
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* RAG or something else */}
      <Section labelledBy="choose">
        <SectionHeading id="choose" title={c.choose.title} lead={c.choose.lead} />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-[15px]">
            <thead>
              <tr className="border-b-2 border-ink">
                {c.choose.columns.map((col) => (
                  <th key={col} scope="col" className="py-2.5 pr-4 font-bold">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {c.choose.rows.map((row) => {
                const see = resolve(row.see);
                return (
                  <tr key={row.situation} className={`border-b border-line ${row.rag ? "bg-accent-soft" : ""}`}>
                    <th scope="row" className="py-3.5 pr-4 pl-2 font-medium">
                      {row.situation}
                    </th>
                    <td className="py-3.5 pr-4 font-bold whitespace-nowrap">
                      {see ? (
                        <Link href={see.href} className="link">
                          {row.answer}
                        </Link>
                      ) : (
                        row.answer
                      )}
                    </td>
                    <td className="py-3.5 pr-2 text-muted">{row.why}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Limits and sources */}
      <Section tone="light" labelledBy="limits">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 id="limits" className="mb-6 text-[26px] font-bold sm:text-[32px]">
              {c.limits.title}
            </h2>
            <MarkList items={c.limits.items} mark="!" />
          </div>
          <SourceList title={c.sourcesTitle} sources={whatIsRag.sources} />
        </div>
      </Section>

      <CtaBand
        title={c.cta.title}
        text={c.cta.text}
        primary={{ href: projectsHref(locale), label: c.cta.demos }}
        secondary={{ href: href(locale, "methods"), label: c.cta.methods }}
      />
    </>
  );
}
