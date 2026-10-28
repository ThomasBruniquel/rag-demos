import Link from "next/link";
import { Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { dataEngineering } from "@/content/pages/data-engineering";
import { StackRows } from "@/components/demos/stack-badges";
import { getDemos } from "@/lib/content/load";
import { stackGroups } from "@/lib/content/stack";
import { format } from "@/lib/i18n/messages";
import { href, projectsHref } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { Chip, CtaBand, demoLink, MarkList, SectionHeading } from "./blocks";

/** Data engineering for AI: the seven pipeline stages, DEA domains, the stack of each project. */
export async function DataEngineeringPage() {
  const { locale, t } = await getI18n();
  const c = dataEngineering[locale];
  const demos = getDemos();

  return (
    <>
      <PageHeader eyebrow={c.eyebrow} title={t.pages.dataEngineering.title} lead={t.pages.dataEngineering.lead} />

      <Section labelledBy="claim">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
          <h2 id="claim" className="text-[28px] leading-tight font-extrabold text-gold-display sm:text-[38px]">
            {c.claim}
          </h2>
          <p className="text-lg text-muted">{c.claimText}</p>
        </div>
      </Section>

      {/* Seven stages: one row each, as a table on large screens. */}
      <Section tone="light" labelledBy="stages">
        <SectionHeading id="stages" title={c.stagesTitle} />
        <ol className="border-t-2 border-ink">
          {c.stages.map((stage, i) => (
            <li
              key={stage.label}
              className="grid gap-3 border-b border-line py-5 lg:grid-cols-[220px_1fr_1fr_240px] lg:items-start lg:gap-8"
            >
              <p className="flex items-baseline gap-3 text-lg font-bold">
                <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-sm font-extrabold text-[#004446]">
                  {i + 1}
                </span>
                {stage.label}
              </p>
              <p className="text-[15px]">{stage.text}</p>
              <p className="text-[15px] text-muted">
                <span className="mr-1 font-bold text-brick dark:text-danger">{c.risk}</span>
                {stage.risk}
              </p>
              <p className="flex flex-wrap gap-1.5">
                {stage.aws.map((service) => (
                  <Chip key={service}>{service}</Chip>
                ))}
              </p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Certification domains */}
      <Section labelledBy="domains">
        <SectionHeading id="domains" eyebrow={c.domainsEyebrow} title={c.domainsTitle} lead={c.domainsLead} />
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {c.domains.map((domain) => (
            <li key={domain.name} className="flex flex-col bg-surface p-6">
              <p className="mb-2 text-3xl font-extrabold text-gold-display tabular-nums">{domain.share}</p>
              <h3 className="mb-2 font-bold">{domain.name}</h3>
              <p className="mb-4 text-sm text-muted">{domain.text}</p>
              <p className="mt-auto text-sm">
                <span className="text-muted">{c.domainsDemos} </span>
                {domain.demos.map((id, i) => {
                  const demo = demoLink(locale, id);
                  return demo ? (
                    <span key={id}>
                      {i > 0 ? ", " : null}
                      <Link href={demo.href} className="link" title={demo.title}>
                        {id}
                      </Link>
                    </span>
                  ) : null;
                })}
              </p>
            </li>
          ))}
        </ul>
      </Section>

      {/* Stack of each project, read from content/demos/*\/demo.yaml */}
      <Section tone="light" labelledBy="services">
        <SectionHeading id="services" title={c.servicesTitle} lead={c.servicesLead} />
        <ul className="border-t-2 border-ink">
          {demos.map((demo) => (
            <li key={demo.meta.id} className="grid gap-2 border-b border-line py-4 md:grid-cols-[320px_1fr] md:items-center md:gap-6">
              <Link href={href(locale, "demos", demo.meta.slugs[locale])} className="group">
                <span className="eyebrow text-[10px]">{format(t.demo.number, { id: demo.meta.id })}</span>
                <span className="font-bold group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
                  {demo.text[locale].title}
                </span>
              </Link>
              <StackRows groups={stackGroups(demo.meta.stack, locale)} label={t.demo.stack} />
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="principles">
        <div className="max-w-[820px]">
          <h2 id="principles" className="mb-6 text-[26px] font-bold sm:text-[32px]">
            {c.principlesTitle}
          </h2>
          <MarkList items={c.principles} mark="✓" />
        </div>
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
