import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Character } from "@/components/characters/character";
import { Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { DuelTable, FamilyLabel, Gauges, MethodBadge, MiniSchema } from "@/components/methods/method-bits";
import { getDemoById, getMethodBySlug, getMethods, type Method } from "@/lib/content/load";
import { families, type Family } from "@/lib/content/taxonomy";
import { format } from "@/lib/i18n/messages";
import { href } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

const familyOrder: Exclude<Family, "classic">[] = ["search", "structure", "verification", "agents", "sovereignty", "multimodal"];

// ------------------------------------------------------------------ gallery

export async function MethodsGallery() {
  const { locale, t } = await getI18n();
  const methods = getMethods();
  const classic = methods.find((m) => m.meta.family === "classic");

  return (
    <>
      <PageHeader eyebrow={t.methods.eyebrow} title={t.pages.methods.title} lead={t.pages.methods.lead} />

      {classic ? (
        <Section>
          <div className="grid items-center gap-8 md:grid-cols-[auto_1fr]">
            <Character method="classic" family="classic" className="size-36 md:size-44" />
            <div>
              <p className="eyebrow mb-2.5">{t.methods.reference}</p>
              <h2 className="text-[28px] font-extrabold sm:text-[34px]">{classic.text[locale].name}</h2>
              <p className="mt-3 max-w-[620px] text-[17px] text-muted">
                {classic.text[locale].need} {t.methods.referenceIntro}
              </p>
              <Link href={href(locale, "methods", classic.meta.slug)} className="link mt-4 inline-block text-sm">
                {classic.text[locale].name} →
              </Link>
            </div>
          </div>
        </Section>
      ) : null}

      <Section tone="light" labelledBy="families-title">
        <p className="eyebrow">{t.methods.family}</p>
        <h2 id="families-title" className="mb-8 text-[26px] font-bold sm:text-[38px]">
          {t.methods.familiesTitle}
        </h2>
        {/* Hairline grid: 1px gaps over the line colour, as on echic. */}
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {familyOrder.map((family) => (
            <FamilyCell key={family} family={family} methods={methods.filter((m) => m.meta.family === family)} />
          ))}
        </div>
      </Section>
    </>
  );
}

async function FamilyCell({ family, methods }: { family: Exclude<Family, "classic">; methods: Method[] }) {
  const { locale, t } = await getI18n();
  return (
    <div className="flex flex-col bg-surface p-7">
      <h3 className="mb-2 flex items-center gap-2 text-xl font-bold">
        <span aria-hidden="true" className="size-3 rounded-full" style={{ background: `var(--fam-${family})` }} />
        {families[family][locale]}
      </h3>
      <p className="mb-5 text-[15px] text-muted">{t.methods.familyIntro[family]}</p>
      <ul className="mt-auto space-y-1">
        {methods.map((method) => (
          <li key={method.meta.id}>
            <Link
              href={href(locale, "methods", method.meta.slug)}
              className="group -mx-2 flex items-center gap-3 rounded-md p-2 hover:bg-sunken"
            >
              <Character method={method.meta.id} family={family} className="size-14 shrink-0" />
              <span className="flex-1">
                <span className="block font-bold leading-snug group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
                  {method.text[locale].name}
                </span>
                <span className="mt-1 block">
                  <MethodBadge badge={method.meta.badge} locale={locale} />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export async function methodsGalleryMetadata(): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({ locale, id: "methods", title: t.pages.methods.title, description: t.pages.methods.lead });
}

// ------------------------------------------------------------------ one method

export function methodStaticParams() {
  return getMethods().map((m) => ({ slug: m.meta.slug }));
}

export async function methodMetadata(slug: string): Promise<Metadata> {
  const { locale } = await getI18n();
  const method = getMethodBySlug(slug);
  if (!method) return {};
  const { seo } = method.text[locale];
  return pageMetadata({ locale, id: "methods", slug, title: seo.title, description: seo.description });
}

export async function MethodPage({ slug }: { slug: string }) {
  const { locale, t } = await getI18n();
  const method = getMethodBySlug(slug);
  if (!method) notFound();
  const { meta } = method;
  const text = method.text[locale];
  const demo = meta.demo ? getDemoById(meta.demo) : undefined;

  return (
    <>
      <header className="border-b border-line bg-sunken px-4 pt-10 pb-12 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-[1240px]">
          <Link href={href(locale, "methods")} className="mb-6 inline-block text-[13px] font-bold text-muted hover:text-ink">
            ← {t.methods.allMethods}
          </Link>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <FamilyLabel family={meta.family} locale={locale} />
                <MethodBadge badge={meta.badge} locale={locale} />
              </div>
              <h1 className="max-w-[820px] text-[34px] font-extrabold tracking-[-0.03em] sm:text-5xl">{text.name}</h1>
              <p className="mt-4 max-w-[660px] text-lg font-medium">{text.need}</p>
              <p className="mt-5 text-sm text-muted">
                <span className="font-bold text-fg">{t.methods.origin} </span>
                {text.origin}
                {meta.sourceUrl ? (
                  <>
                    {" · "}
                    <a href={meta.sourceUrl} className="link" rel="noopener noreferrer">
                      {t.methods.readPaper}
                    </a>
                    {text.sourceLabel ? <span className="block mt-1 italic">{text.sourceLabel}</span> : null}
                  </>
                ) : null}
              </p>
            </div>
            <Character method={meta.id} family={meta.family} className="size-40 justify-self-center md:size-52" label={text.name} />
          </div>
        </div>
      </header>

      <Section labelledBy="how">
        <h2 id="how" className="mb-8 text-[26px] font-bold sm:text-[32px]">{t.methods.how}</h2>
        <MiniSchema steps={text.how} />
      </Section>

      <Section tone="light">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div className="grid gap-10 sm:grid-cols-2">
            <ListBlock title={t.methods.strengths} items={text.strengths} mark="+" />
            <ListBlock title={t.methods.limits} items={text.limits} mark="−" />
          </div>
          <div>
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em]">{t.methods.gauges}</h2>
            <Gauges gauges={meta.gauges} t={t.methods} />
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2">
          <ListBlock title={t.methods.choose} items={text.choose} mark="✓" large />
          <ListBlock title={t.methods.avoid} items={text.avoid} mark="×" large />
        </div>
        {text.adaptation ? (
          <aside className="mt-12 border-l-4 border-gold bg-sunken px-6 py-5">
            <h2 className="mb-1.5 text-[13px] font-bold uppercase tracking-[0.1em]">{t.methods.adaptation}</h2>
            <p className="max-w-[820px] text-[15px] leading-relaxed">{text.adaptation}</p>
          </aside>
        ) : null}
      </Section>

      {text.duel ? (
        <Section tone="light" labelledBy="duel">
          <div className="mb-8 flex flex-wrap items-center gap-5">
            <Character method="classic" family="classic" className="size-16" />
            <span className="text-2xl font-extrabold text-gold-ink">vs</span>
            <Character method={meta.id} family={meta.family} className="size-16" mood="happy" />
            <h2 id="duel" className="text-[26px] font-bold sm:text-[32px]">{t.methods.duel}</h2>
          </div>
          <DuelTable duel={text.duel} methodName={text.name} t={t.methods} measureNote={t.marks.toMeasure} />
        </Section>
      ) : null}

      <Section>
        <div className="flex flex-wrap items-center justify-between gap-6">
          {demo ? (
            <>
              <div>
                <p className="eyebrow">{format(t.demo.number, { id: demo.meta.id })}</p>
                <p className="text-2xl font-bold">{demo.text[locale].title}</p>
                <p className="mt-1 max-w-[620px] text-muted">{demo.text[locale].tagline}</p>
              </div>
              <Link href={href(locale, "demos", demo.meta.slugs[locale])} className="btn-primary">
                {t.methods.tryDemo}
              </Link>
            </>
          ) : (
            <Link href={href(locale, "demos")} className="btn-primary">
              {t.home.primaryCta}
            </Link>
          )}
        </div>
      </Section>
    </>
  );
}

function ListBlock({ title, items, mark, large = false }: { title: string; items: string[]; mark: string; large?: boolean }) {
  return (
    <div>
      <h2 className={large ? "mb-4 text-[22px] font-bold" : "mb-4 text-[13px] font-bold uppercase tracking-[0.1em]"}>{title}</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3 border-b border-line pb-3 text-[15px]">
            <span aria-hidden="true" className="w-4 shrink-0 font-extrabold text-gold-ink">
              {mark}
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
