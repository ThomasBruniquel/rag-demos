import type { Metadata } from "next";
import Link from "next/link";
import { Character } from "@/components/characters/character";
import { Section } from "@/components/layout/container";
import { ProjectList } from "@/components/pages/demo-views";
import { href, projectsAnchor } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { businessJsonLd, pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  return pageMetadata({ locale, id: "home" });
}

/*
 * Home page, in this order: a short hook, the projects, how missions run.
 * Short and impersonal: the visitor should understand the product at once.
 */
export default async function HomePage() {
  const { locale, t } = await getI18n();
  const h = t.home;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: businessJsonLd(locale, t.meta.description) }} />

      {/* Hook: the promise, one sentence on what RAG is, two buttons; the characters on the right. */}
      <section className="relative overflow-hidden bg-sunken px-4 py-12 sm:px-8 sm:py-14">
        <div className="relative z-10 mx-auto grid max-w-[1240px] items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-[720px]">
            <p className="eyebrow mb-3">{h.eyebrow}</p>
            <h1 className="mb-5 text-[34px] leading-[1.06] font-extrabold tracking-[-0.04em] sm:text-[46px] xl:text-[52px]">
              <span className="block text-gold-display">{h.titleTop}</span>
              <span className="block">{h.titleBottom}</span>
            </h1>
            <p className="mb-8 max-w-[620px] text-[17px] leading-relaxed font-medium text-muted sm:text-lg">{h.lead}</p>
            <div className="flex flex-wrap gap-3.5">
              <a href={`#${projectsAnchor(locale)}`} className="btn-primary w-full sm:w-auto">
                {h.primaryCta}
              </a>
              <Link href={href(locale, "contact")} className="btn-outline w-full sm:w-auto">
                {h.secondaryCta}
              </Link>
            </div>
          </div>
          {/* Three characters, like the chess pieces of echic's hero. */}
          <div aria-hidden="true" className="hidden items-end gap-1 lg:flex">
            <Character method="groundedness" family="verification" className="size-20" />
            <Character method="stair" family="structure" className="size-28" />
            <Character method="cag" family="search" className="size-36" />
          </div>
        </div>
      </section>

      {/* The projects ("réalisations", D-021), with their filters: no separate catalogue page. */}
      <Section tone="light" id={projectsAnchor(locale)} labelledBy="projects-title">
        <div className="mb-9">
          <p className="eyebrow">{h.demos.eyebrow}</p>
          <h2 id="projects-title" className="text-[26px] font-bold sm:text-[38px]">{h.demos.title}</h2>
          <p className="mt-3 max-w-[680px] text-[17px] text-muted">{h.demos.lead}</p>
        </div>
        <ProjectList />
      </Section>

      {/* How projects run: teal band, as echic's commitments */}
      <Section tone="brand" labelledBy="process-title">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="eyebrow">{h.process.eyebrow}</p>
            <h2 id="process-title" className="mb-4 text-[26px] font-bold sm:text-[38px]">{h.process.title}</h2>
            <p className="mb-8 max-w-[440px] text-[17px] text-on-brand-muted">{h.process.lead}</p>
            <div className="flex flex-wrap gap-3">
              <Link href={href(locale, "contact")} className="btn-gold">
                {h.process.contact}
              </Link>
              <Link href={href(locale, "services")} className="btn border-white/40 text-on-brand hover:border-gold hover:text-gold">
                {h.process.services}
              </Link>
            </div>
          </div>
          <ol className="grid gap-4 sm:grid-cols-2">
            {h.process.steps.map((step, i) => (
              <li key={step.title} className="border-t border-white/20 pt-4">
                <p className="mb-1 flex items-baseline justify-between gap-3">
                  <span className="font-bold">
                    <span className="mr-2 text-gold">{i + 1}.</span>
                    {step.title}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-gold">{step.duration}</span>
                </p>
                <p className="text-[15px] text-on-brand-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    </>
  );
}
