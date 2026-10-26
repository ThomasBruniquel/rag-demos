import type { Metadata } from "next";
import Link from "next/link";
import { Character } from "@/components/characters/character";
import { DemoCard } from "@/components/demos/demo-card";
import { Section } from "@/components/layout/container";
import { toSummary } from "@/components/pages/demo-views";
import { getDemos } from "@/lib/content/load";
import { format } from "@/lib/i18n/messages";
import { href } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  return pageMetadata({ locale, id: "home" });
}

/*
 * Home page, in this order: hook, RAG in brief, the demos, how projects run.
 * Short and impersonal: the visitor should understand the product at once.
 */
export default async function HomePage() {
  const { locale, t } = await getI18n();
  const h = t.home;
  const demos = getDemos().map((d) => toSummary(d, locale, t.catalog.status));

  return (
    <>
      {/* Hook */}
      <section className="relative overflow-hidden bg-sunken px-4 pt-16 pb-16 sm:px-8 sm:pt-20 sm:pb-[72px]">
        <div className="relative z-10 mx-auto max-w-[1240px]">
          <p className="eyebrow mb-3">{h.eyebrow}</p>
          <h1 className="mb-6 max-w-[760px] text-[40px] leading-[1.02] font-extrabold tracking-[-0.045em] sm:text-[56px] lg:text-[68px]">
            <span className="block text-gold-display">{h.titleTop}</span>
            <span className="block">{h.titleBottom}</span>
          </h1>
          <p className="max-w-[580px] text-lg leading-relaxed font-medium sm:text-[19px]">{h.lead}</p>
          <div className="mt-10 flex flex-wrap gap-3.5">
            <a href="#demos" className="btn-primary w-full sm:w-auto">
              {h.primaryCta}
            </a>
            <Link href={href(locale, "contact")} className="btn-outline w-full sm:w-auto">
              {h.secondaryCta}
            </Link>
          </div>
        </div>
        {/* Three characters, like the chess pieces of echic's hero. */}
        <div aria-hidden="true" className="pointer-events-none absolute right-[4%] -bottom-3 hidden items-end gap-1 lg:flex">
          <Character method="groundedness" family="verification" className="size-36" />
          <Character method="stair" family="structure" className="size-52" />
          <Character method="cag" family="search" className="size-64" />
        </div>
      </section>

      {/* RAG in brief */}
      <Section labelledBy="rag-title">
        <p className="eyebrow">{h.rag.eyebrow}</p>
        <h2 id="rag-title" className="mb-10 text-[26px] font-bold sm:text-[38px]">{h.rag.title}</h2>
        <ol className="rag-steps grid gap-8 md:grid-cols-3 md:gap-10">
          {h.rag.steps.map((step, i) => (
            <li key={step.title} className="rag-step relative pt-5" style={{ ["--i" as string]: i }}>
              <span className="mb-3.5 inline-flex size-8.5 items-center justify-center rounded-full bg-gold font-extrabold text-[#004446]">
                {i + 1}
              </span>
              <h3 className="mb-2 text-lg font-bold">{step.title}</h3>
              <p className="text-[15px] leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 grid gap-6 border border-line bg-sunken p-6 sm:p-8 lg:grid-cols-[auto_1fr] lg:gap-10">
          <h3 className="text-[13px] font-bold uppercase tracking-[0.1em]">{h.rag.notForTitle}</h3>
          <div>
            <ul className="grid gap-3 text-[15px] md:grid-cols-3 md:gap-6">
              {h.rag.notFor.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span aria-hidden="true" className="font-extrabold text-gold-ink">×</span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href={href(locale, "whatIsRag")} className="link mt-5 inline-block text-sm">
              {h.rag.more} →
            </Link>
          </div>
        </div>
      </Section>

      {/* The demos */}
      <Section tone="light" id="demos" labelledBy="demos-title">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">{h.demos.eyebrow}</p>
            <h2 id="demos-title" className="text-[26px] font-bold sm:text-[38px]">{h.demos.title}</h2>
            <p className="mt-3 max-w-[680px] text-[17px] text-muted">{h.demos.lead}</p>
          </div>
          <Link href={href(locale, "demos")} className="link text-sm">
            {h.demos.all} →
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 xl:grid-cols-5">
          {demos.map((demo) => (
            <li key={demo.id}>
              <DemoCard demo={demo} eyebrow={format(t.demo.number, { id: demo.id })} compact />
            </li>
          ))}
        </ul>
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
