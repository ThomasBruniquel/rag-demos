import { Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { services } from "@/content/pages/services";
import { href, projectsHref } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { CtaBand, Faq, SectionHeading } from "./blocks";

/** Services: the four mission formats, working principles, pricing note, FAQ. */
export async function ServicesPage() {
  const { locale, t } = await getI18n();
  const c = services[locale];

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={t.pages.services.title} lead={t.pages.services.lead} />

      <Section labelledBy="offers">
        <SectionHeading id="offers" title={c.offersTitle} />
        <ol className="grid gap-px border border-line bg-line md:grid-cols-2">
          {c.offers.map((offer, i) => (
            <li key={offer.name} className="flex flex-col bg-surface p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-2xl font-extrabold">
                  <span className="mr-2 text-gold-ink">{i + 1}.</span>
                  {offer.name}
                </h3>
                <span className="tag text-gold-ink">{offer.duration}</span>
              </div>
              <p className="mb-5 text-[15px]">
                <span className="font-bold">{c.fit} </span>
                <span className="text-muted">{offer.fit}</span>
              </p>
              <h4 className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em]">{c.deliverables}</h4>
              <ul className="mb-5 space-y-2">
                {offer.deliverables.map((d) => (
                  <li key={d} className="flex gap-2.5 text-[15px]">
                    <span aria-hidden="true" className="font-extrabold text-gold-ink">
                      ✓
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t border-line pt-4 text-sm text-muted">
                <span className="font-bold text-fg">{c.youProvide} </span>
                {offer.youProvide}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="light" labelledBy="principles">
        <SectionHeading id="principles" title={c.principlesTitle} />
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {c.principles.map((p) => (
            <li key={p.title} className="border-t-2 border-ink pt-4">
              <h3 className="mb-1.5 text-lg font-bold">{p.title}</h3>
              <p className="text-[15px] text-muted">{p.text}</p>
            </li>
          ))}
        </ul>
        <aside className="mt-12 border-l-4 border-gold bg-surface px-6 py-5">
          <h3 className="mb-1 text-[13px] font-bold uppercase tracking-[0.1em]">{c.priceTitle}</h3>
          <p className="text-[15px]">{c.priceText}</p>
        </aside>
      </Section>

      <Section labelledBy="faq">
        <SectionHeading id="faq" title={c.faqTitle} />
        <Faq items={c.faq} />
      </Section>

      <CtaBand
        title={c.cta.title}
        text={c.cta.text}
        primary={{ href: href(locale, "contact"), label: c.cta.contact }}
        secondary={{ href: projectsHref(locale), label: c.cta.demos }}
      />
    </>
  );
}
