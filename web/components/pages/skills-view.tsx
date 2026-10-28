import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/layout/container";
import { categoryColor } from "@/components/demos/stack-badges";
import { PageHeader } from "@/components/layout/page-header";
import { getDemos } from "@/lib/content/load";
import { keywordAnchor, stackKeywords } from "@/lib/content/stack";
import { allKeywords, stackCategories, type StackCategory } from "@/lib/content/taxonomy";
import { format } from "@/lib/i18n/messages";
import { href } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

/*
 * Skills (D-022): every keyword of the matrix and the projects that
 * demonstrate it. Badges elsewhere link to a row (#kw-<id>), which is
 * highlighted with :target, so it works without JavaScript.
 */
export async function SkillsPage() {
  const { locale, t } = await getI18n();
  const demos = getDemos();
  const keywords = allKeywords()
    .map((k) => ({ ...k, demos: demos.filter((d) => stackKeywords(d.meta.stack).includes(k.id)) }))
    .filter((k) => k.demos.length > 0);
  const catalogue = href(locale, "demos");

  return (
    <>
      <PageHeader title={t.pages.skills.title} lead={t.pages.skills.lead} />
      <Section>
        <div className="space-y-12">
          {(Object.keys(stackCategories) as StackCategory[]).map((category) => {
            const rows = keywords.filter((k) => k.category === category);
            if (!rows.length) return null;
            return (
              <section key={category} aria-labelledby={`cat-${category}`}>
                <h2 id={`cat-${category}`} className="mb-3 flex items-center gap-3 text-[22px] font-bold">
                  <span aria-hidden="true" className="inline-block size-3 rounded-full" style={{ background: categoryColor(category) }} />
                  {stackCategories[category][locale]}
                </h2>
                <table className="w-full border-collapse text-left text-[15px]">
                  <thead className="sr-only">
                    <tr>
                      <th scope="col">{t.skills.keyword}</th>
                      <th scope="col">{t.skills.projects}</th>
                    </tr>
                  </thead>
                  <tbody className="border-t-2" style={{ borderColor: categoryColor(category) }}>
                    {rows.map((k) => (
                      <tr
                        key={k.id}
                        id={keywordAnchor(k.id)}
                        className="scroll-mt-28 border-b border-line align-top transition-colors target:bg-warn-soft"
                      >
                        <th scope="row" className="w-[34%] py-3.5 pr-4 pl-2 font-bold">
                          {k.labels[locale]}
                          <Link href={`${catalogue}?keywords=${k.id}`} className="mt-1 block text-[12px] font-semibold text-muted hover:text-ink hover:underline">
                            {t.skills.catalogue} →
                          </Link>
                        </th>
                        <td className="py-3.5 pr-2">
                          <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                            {k.demos.map((d) => (
                              <li key={d.meta.id}>
                                <Link href={href(locale, "demos", d.meta.slugs[locale])} className="link font-semibold">
                                  <span className="mr-1.5 text-[12px] font-extrabold text-gold-ink tabular-nums">{d.meta.id}</span>
                                  {d.text[locale].title}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            );
          })}
        </div>
      </Section>
    </>
  );
}

export async function skillsMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  const names = allKeywords()
    .filter((k) => k.category !== "integrations")
    .map((k) => k.labels[locale])
    .slice(0, 18)
    .join(", ");
  return pageMetadata({ locale, id: "skills", title: t.pages.skills.title, description: format("{lead} {names}.", { lead: t.pages.skills.lead, names }) });
}
