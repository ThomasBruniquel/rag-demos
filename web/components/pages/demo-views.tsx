import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { Character } from "@/components/characters/character";
import { ToMeasure } from "@/components/content/to-complete";
import { DemoCatalog, type FacetOptions } from "@/components/demos/demo-catalog";
import type { DemoSummary } from "@/components/demos/demo-card";
import { Diagram } from "@/components/demos/diagram";
import { StackGrid } from "@/components/demos/stack-badges";
import { Section } from "@/components/layout/container";
import { MethodBadge } from "@/components/methods/method-bits";
import { DemoPlayer } from "@/components/player/demo-player";
import { getDemoBySlug, getDemos, getDemoVideo, getDiagram, getMethodById, type Demo } from "@/lib/content/load";
import { stackGroups, stackKeywords } from "@/lib/content/stack";
import { allKeywords, constraints, docTypes, families, sectors, stackCategories, volumes } from "@/lib/content/taxonomy";
import type { Locale } from "@/lib/i18n/config";
import { format, type Messages } from "@/lib/i18n/messages";
import { href, projectsHref } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import type { Recording } from "@/lib/player/types";
import { getRecordings } from "@/lib/recordings/load";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/site.config";

// "Demo" stays the word in the code; visitors read "réalisation" / "project" (D-021).

// ------------------------------------------------------------------ catalogue

/** Plain data for a card (used by the catalogue and the home page). */
export function toSummary(demo: Demo, locale: Locale, statusLabels: Record<"soon" | "live", string>): DemoSummary {
  const method = getMethodById(demo.meta.method);
  if (!method) throw new Error(`Unknown method ${demo.meta.method}`);
  return {
    id: demo.meta.id,
    href: href(locale, "demos", demo.meta.slugs[locale]),
    title: demo.text[locale].title,
    tagline: demo.text[locale].tagline,
    family: method.meta.family,
    methodId: method.meta.id,
    methodName: method.text[locale].name,
    familyLabel: families[method.meta.family][locale],
    statusLabel: statusLabels[demo.meta.status],
    live: demo.meta.status === "live",
    docTypes: demo.meta.docTypes,
    volume: demo.meta.volume,
    constraints: demo.meta.constraints,
    sectors: demo.meta.sectors,
    keywords: stackKeywords(demo.meta.stack),
    stack: stackGroups(demo.meta.stack, locale),
  };
}

function facetOptions(locale: Locale, labels: Messages["catalog"]): FacetOptions {
  const options = (map: Record<string, Record<Locale, string>>) =>
    Object.entries(map).map(([value, l]) => ({ value, label: l[locale] }));
  // Only keywords that at least one project demonstrates.
  const used = new Set(getDemos().flatMap((d) => stackKeywords(d.meta.stack)));
  return [
    { key: "docTypes", label: labels.docTypes, options: options(docTypes) },
    { key: "volume", label: labels.volume, options: options(volumes) },
    { key: "constraints", label: labels.constraints, options: options(constraints) },
    { key: "sectors", label: labels.sectors, options: options(sectors) },
    {
      key: "keywords",
      label: labels.keywords,
      options: allKeywords()
        .filter((k) => used.has(k.id))
        .map((k) => ({ value: k.id, label: k.labels[locale], group: stackCategories[k.category][locale] })),
    },
  ];
}

/**
 * The project list with its filters (situation and technology keyword). It
 * lives on the home page: there is no separate catalogue page.
 */
export async function ProjectList() {
  const { locale, t } = await getI18n();
  const demos = getDemos().map((d) => toSummary(d, locale, t.catalog.status));
  return (
    <>
      <DemoCatalog
        demos={demos}
        facets={facetOptions(locale, t.catalog)}
        labels={{
          any: t.catalog.any,
          reset: t.catalog.reset,
          countOne: t.catalog.countOne,
          countMany: t.catalog.countMany,
          empty: t.catalog.empty,
          eyebrow: t.demo.number,
          filters: t.catalog.filtersLabel,
          stack: t.demo.stack,
        }}
      />
      <p className="mt-12 text-sm">
        <Link href={href(locale, "skills")} className="link">
          {t.catalog.skillsLink} →
        </Link>
      </p>
    </>
  );
}

// ------------------------------------------------------------------ one project

export function demoStaticParams(locale: Locale) {
  return getDemos().map((d) => ({ slug: d.meta.slugs[locale] }));
}

export async function demoMetadata(slug: string): Promise<Metadata> {
  const { locale } = await getI18n();
  const demo = getDemoBySlug(locale, slug);
  if (!demo) return {};
  const { seo } = demo.text[locale];
  return pageMetadata({ locale, id: "demos", slug: demo.meta.slugs, title: seo.title, description: seo.description });
}

async function loadBody(dir: string, locale: Locale): Promise<ComponentType> {
  const mod = (await import(`@/content/demos/${dir}/${locale}.mdx`)) as { default: ComponentType };
  return mod.default;
}

/** Base URL of the project's API, for live mode (meetings only). Read at build time. */
function liveApiUrl(id: string): string | null {
  return process.env[`NEXT_PUBLIC_DEMO_API_${id}`]?.trim() || null;
}

export async function DemoPage({ slug }: { slug: string }) {
  const { locale, t } = await getI18n();
  const demo = getDemoBySlug(locale, slug);
  if (!demo) notFound();
  const method = getMethodById(demo.meta.method);
  if (!method) notFound();
  const { meta } = demo;
  const text = demo.text[locale];
  const d = t.demo;
  const Body = await loadBody(demo.dir, locale);
  const stack = stackGroups(meta.stack, locale);
  const recordings = getRecordings(demo.dir, locale);
  const video = getDemoVideo(demo.dir, locale);
  const variantLabels = Object.fromEntries(Object.entries(meta.player.variants).map(([key, labels]) => [key, labels[locale]]));

  return (
    <>
      {/* Title band */}
      <header className="border-b border-line bg-sunken px-4 pt-10 pb-12 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-[1240px]">
          <Link href={projectsHref(locale)} className="mb-6 inline-block text-[13px] font-bold text-muted hover:text-ink">
            ← {d.back}
          </Link>
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-3">
                <span className="eyebrow mb-0">{format(d.number, { id: meta.id })}</span>
                <span className={`tag ${meta.status === "live" ? "text-[var(--fam-verification)]" : "text-gold-ink"}`}>
                  {t.catalog.status[meta.status]}
                </span>
              </div>
              <h1 className="max-w-[820px] text-[34px] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[54px]">{text.title}</h1>
              <p className="mt-4 max-w-[660px] text-lg font-medium text-muted">{text.tagline}</p>
              {/* D-021: a personal project on public data, never presented as client work. */}
              <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line-strong px-3.5 py-1 text-[12px] font-bold text-muted" title={d.personalNote}>
                <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m8 8-4 4 4 4M16 8l4 4-4 4" />
                </svg>
                {d.personal}
                <span className="sr-only"> — {d.personalNote}</span>
              </p>
              <div className="mt-6 max-w-[760px]">
                <StackGrid groups={stack} label={d.stack} />
              </div>
            </div>
            <Character
              method={method.meta.id}
              family={method.meta.family}
              className="size-40 justify-self-center md:size-48"
              label={method.text[locale].name}
            />
          </div>
        </div>
      </header>

      {/* 1. The need */}
      <Section labelledBy="problem">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow">01</p>
            <h2 id="problem" className="mb-4 text-[26px] font-bold sm:text-[32px]">{d.problem}</h2>
            <p className="max-w-[720px] text-[19px] leading-relaxed font-medium">{text.problem}</p>
          </div>
          <Link
            href={href(locale, "methods", method.meta.slug)}
            className="group flex items-center gap-5 self-start border border-line p-5 transition-colors hover:bg-sunken"
          >
            <Character method={method.meta.id} family={method.meta.family} className="size-20 shrink-0" />
            <span>
              <span className="eyebrow mb-1">{d.methodCard}</span>
              <span className="block font-bold leading-snug">{method.text[locale].name}</span>
              <span className="mt-1.5 flex items-center gap-2">
                <MethodBadge badge={method.meta.badge} locale={locale} />
              </span>
              <span className="mt-2 block text-sm font-semibold underline decoration-gold underline-offset-4">{d.seeMethod} →</span>
            </span>
          </Link>
        </div>
      </Section>

      {/* 2. In action: short video (once it exists), then the replay player */}
      <Section tone="light" labelledBy="try" id="try">
        <p className="eyebrow">02</p>
        <h2 id="try" className="mb-5 text-[26px] font-bold sm:text-[32px]">{d.try}</h2>
        {video ? (
          <figure className="mb-6 max-w-[900px]">
            {/* Silent, never autoplayed: the visitor starts it. */}
            <video controls muted playsInline preload="none" poster={video.poster ?? undefined} className="aspect-[16/10] w-full border border-line bg-black">
              {video.sources.map((source) => (
                <source key={source.src} src={source.src} type={source.type} />
              ))}
            </video>
            <figcaption className="mt-2 text-[13px] text-muted">{d.video}</figcaption>
          </figure>
        ) : null}
        <DemoPlayer
          locale={locale}
          method={method.meta.id}
          family={method.meta.family}
          characterName={method.text[locale].name}
          recordings={recordings}
          examples={text.examples}
          variantLabels={variantLabels}
          sideBySide={meta.player.sideBySide}
          apiUrl={liveApiUrl(meta.id)}
          variantField={meta.player.variantField}
          contactHref={`${href(locale, "contact")}#live-demo`}
          labels={t.player}
        />
        {recordings.length ? <Transcripts recordings={recordings} variantLabels={variantLabels} t={t} locale={locale} /> : null}
        <div className="mt-8">
          <h3 className="mb-3 text-[13px] font-bold uppercase tracking-[0.1em]">{d.limits}</h3>
          <ul className="space-y-2 text-[15px] text-muted">
            {text.limits.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span aria-hidden="true" className="font-extrabold text-gold-ink">×</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* 3. How it's built */}
      <Section labelledBy="built">
        <p className="eyebrow">03</p>
        <h2 id="built" className="mb-5 text-[26px] font-bold sm:text-[32px]">{d.built}</h2>
        <div className="mb-8 max-w-[760px] text-[17px] leading-relaxed [&_p]:mb-4">
          <Body />
        </div>
        <Diagram svg={getDiagram("demos", demo.dir, "architecture", locale)} alt={text.architecture.alt} pending={d.diagramPending} />
        <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
          <ReasonList title={d.choices} items={text.architecture.choices} />
          <ReasonList title={d.discarded} items={text.architecture.discarded} muted />
        </div>
        <h3 className="mt-10 mb-4 text-[13px] font-bold uppercase tracking-[0.1em]">{d.stack}</h3>
        <StackGrid groups={stack} label={d.stack} />
      </Section>

      {/* 4. Data pipeline */}
      <Section tone="light" labelledBy="pipeline">
        <p className="eyebrow">04</p>
        <h2 id="pipeline" className="mb-6 text-[26px] font-bold sm:text-[32px]">{d.pipeline}</h2>
        <Diagram svg={getDiagram("demos", demo.dir, "pipeline", locale)} alt={text.pipeline.alt} pending={d.diagramPending} />
        <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr]">
          <div>
            <h3 className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em]">{d.facts}</h3>
            <dl>
              {text.pipeline.facts.map((fact) => (
                <Detail key={fact.label} label={fact.label} value={fact.value} estimate={fact.measured ? undefined : d.estimate} />
              ))}
            </dl>
          </div>
          <div>
            <h3 className="mb-2 text-[13px] font-bold uppercase tracking-[0.1em]">{d.corpus}</h3>
            <dl>
              <Detail label={d.corpus} value={text.corpus.name} url={text.corpus.url} />
              <Detail label={t.catalog.volume} value={text.corpus.size} />
              <Detail label={d.licence} value={text.corpus.licence} />
            </dl>
          </div>
        </div>
      </Section>

      {/* 5. Measured results */}
      <Section labelledBy="results">
        <p className="eyebrow">05</p>
        <h2 id="results" className="mb-6 text-[26px] font-bold sm:text-[32px]">{d.results}</h2>
        <div className="overflow-x-auto bg-surface">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <caption className="px-4 pt-4 pb-3 text-left text-[13px] text-muted">
              {text.evaluation.caption}
              {!text.evaluation.measured ? (
                <span className="mt-1.5 block">
                  <ToMeasure /> {t.marks.toMeasure}
                </span>
              ) : null}
            </caption>
            <thead>
              <tr className="border-b-2 border-ink">
                {text.evaluation.columns.map((c) => (
                  <th key={c} scope="col" className="px-4 py-2.5 font-bold">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {text.evaluation.rows.map((row, i) => (
                <tr key={row[0]} className={`border-b border-line ${i === text.evaluation.rows.length - 1 ? "font-bold" : ""}`}>
                  {row.map((cell, j) =>
                    j === 0 ? (
                      <th key={j} scope="row" className="px-4 py-3 font-semibold">{cell}</th>
                    ) : (
                      <td key={j} className="px-4 py-3 tabular-nums">{cell}</td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 6. For your project: teal band, as echic's commitments */}
      <Section tone="brand" labelledBy="project">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">06</p>
            <h2 id="project" className="mb-4 text-[26px] font-bold sm:text-[38px]">{d.project}</h2>
            <p className="mb-1 text-[13px] font-bold uppercase tracking-[0.1em] text-on-brand-muted">{d.duration}</p>
            <p className="mb-7 text-[19px] font-semibold">{text.mission.duration}</p>
            <Link href={href(locale, "contact")} className="btn-gold">
              {d.contactCta}
            </Link>
          </div>
          <div>
            <p className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em] text-on-brand-muted">{d.scope}</p>
            <ul className="grid gap-4">
              {text.mission.scope.map((item) => (
                <li key={item} className="flex items-start gap-3.5 border-b border-white/15 pb-4 font-semibold">
                  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6 shrink-0 text-gold" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <path d="m8 12 3 3 5-6" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 7. Source code */}
      <Section labelledBy="source">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="eyebrow">07</p>
            <h2 id="source" className="text-[26px] font-bold sm:text-[32px]">{d.source}</h2>
            <p className="mt-2 font-mono text-sm text-muted">{meta.sourcePath}/</p>
          </div>
          <a href={`${siteConfig.links.github}/tree/main/${meta.sourcePath}`} className="btn-outline" rel="noopener noreferrer">
            {d.sourceCta}
          </a>
        </div>
      </Section>
    </>
  );
}

/**
 * The recorded answers as plain text, in the HTML from the start: readable
 * without JavaScript and indexable by search engines (docs/07, SEO).
 */
function Transcripts({
  recordings,
  variantLabels,
  t,
  locale,
}: {
  recordings: Recording[];
  variantLabels: Record<string, string>;
  t: Messages;
  locale: Locale;
}) {
  const dateFormat = new Intl.DateTimeFormat(locale, { dateStyle: "long" });
  return (
    <details className="group mt-6 border border-line bg-surface">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-3.5 text-sm font-bold">
        {t.demo.transcripts}
        <span aria-hidden="true" className="text-xl text-gold-ink transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="space-y-6 border-t border-line px-5 py-5">
        {recordings.map((r) => {
          const answer = r.events.flatMap((e) => (e.type === "token" ? [e.data.text] : [])).join("");
          const sources = r.events.flatMap((e) => (e.type === "citation" ? [e.data] : []));
          return (
            <article key={`${r.question_id}-${r.variant ?? ""}`} className="text-[15px]">
              <h3 className="mb-1 text-[16px] font-bold">
                {r.question}
                {r.variant ? <span className="font-semibold text-muted"> — {variantLabels[r.variant] ?? r.variant}</span> : null}
              </h3>
              <p className="mb-2 text-[12px] text-muted">
                {r.dev ? t.player.devSample : format(t.demo.transcriptMeta, { date: dateFormat.format(new Date(r.recorded_at)) })}
              </p>
              <p className="whitespace-pre-line text-muted">{answer}</p>
              {sources.length ? (
                <ul className="mt-2 text-[13px] text-muted">
                  {sources.map((c) => (
                    <li key={String(c.id)}>
                      {c.marker ?? `[${c.id}]`} {c.doc_title}
                      {c.location ? `, ${c.location}` : ""}
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          );
        })}
      </div>
    </details>
  );
}

function ReasonList({ title, items, muted = false }: { title: string; items: { title: string; why: string }[]; muted?: boolean }) {
  return (
    <div>
      <h3 className="mb-4 text-[20px] font-bold">{title}</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.title} className="border-b border-line pb-4">
            <p className={`font-bold ${muted ? "text-muted" : ""}`}>{item.title}</p>
            <p className="mt-1 text-[15px] leading-relaxed text-muted">{item.why}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Detail({ label, value, url, estimate }: { label: string; value: string; url?: string; estimate?: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-line py-3">
      <dt className="text-[13px] text-muted">{label}</dt>
      <dd className="text-right text-sm font-bold">
        {url ? (
          <a href={url} className="link" rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          value
        )}
        {estimate ? (
          <span className="ml-1.5 text-xs font-medium text-muted" title={estimate}>
            <span aria-hidden="true">≈</span>
            <span className="sr-only"> ({estimate})</span>
          </span>
        ) : null}
      </dd>
    </div>
  );
}
