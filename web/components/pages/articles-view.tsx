import Link from "next/link";
import { Character } from "@/components/characters/character";
import { Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { articles } from "@/content/pages/articles";
import { getDemos, getMethodById } from "@/lib/content/load";
import { format } from "@/lib/i18n/messages";
import { href } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { Flow } from "./blocks";

/** Articles: the planned write-ups, one per demo, built from the demo content. */
export async function ArticlesPage() {
  const { locale, t } = await getI18n();
  const c = articles[locale];
  const planned = getDemos().map((demo) => {
    const method = getMethodById(demo.meta.method);
    return { demo, method };
  });

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={t.pages.articles.title} lead={t.pages.articles.lead} />

      <Section labelledBy="outline">
        <h2 id="outline" className="mb-6 text-[13px] font-bold uppercase tracking-[0.1em]">
          {c.outlineTitle}
        </h2>
        <Flow steps={c.outline.map((label) => ({ label, text: "" }))} numbered />
      </Section>

      <Section tone="light" labelledBy="planned">
        <div className="mb-9 max-w-[760px]">
          <h2 id="planned" className="text-[26px] font-bold sm:text-[34px]">
            {c.plannedTitle}
          </h2>
          <p className="mt-3 text-[17px] text-muted">{c.plannedLead}</p>
        </div>
        <ul className="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {planned.map(({ demo, method }) => (
            <li key={demo.meta.id}>
              <Link href={href(locale, "demos", demo.meta.slugs[locale])} className="group flex h-full gap-4 bg-surface p-6 hover:bg-paper">
                {method ? <Character method={method.meta.id} family={method.meta.family} className="size-14 shrink-0" /> : null}
                <span className="flex flex-col">
                  <span className="eyebrow mb-1 text-[10px]">
                    {format(t.demo.number, { id: demo.meta.id })} · {c.soon}
                  </span>
                  <span className="font-bold leading-snug group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
                    {demo.text[locale].title}
                  </span>
                  {method ? (
                    <span className="mt-1 text-sm text-muted">
                      {method.text[locale].name} {c.versus}
                    </span>
                  ) : null}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
