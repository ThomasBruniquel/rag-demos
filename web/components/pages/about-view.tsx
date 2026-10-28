import { Character } from "@/components/characters/character";
import { Section } from "@/components/layout/container";
import { about } from "@/content/pages/about";
import { href, projectsHref } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { siteConfig } from "@/site.config";
import { Chip, CtaBand, SectionHeading } from "./blocks";

/** About: who, what can be checked, toolbox, key facts. */
export async function AboutPage() {
  const { locale } = await getI18n();
  const c = about[locale];
  const { owner, links } = siteConfig;
  const targets = { github: links.github, linkedin: links.linkedin, demos: projectsHref(locale) };

  return (
    <>
      <header className="border-b border-line bg-sunken px-4 pt-14 pb-12 sm:px-6 sm:pt-16">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow mb-2.5">{c.eyebrow}</p>
            <h1 className="text-[34px] font-extrabold tracking-[-0.03em] sm:text-5xl lg:text-[54px]">{owner.name}</h1>
            <p className="mt-2 text-lg font-bold text-gold-display">{owner.jobTitle[locale]}</p>
            <div className="mt-6 max-w-[660px] space-y-3 text-lg text-muted">
              {c.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          {/* The cast of methods, in place of a photo. */}
          <div aria-hidden="true" className="hidden items-end gap-1 md:flex">
            <Character method="stair" family="structure" className="size-24" />
            <Character method="classic" family="classic" className="size-32" mood="happy" />
            <Character method="graphrag" family="structure" className="size-24" />
          </div>
        </div>
      </header>

      <Section labelledBy="conviction">
        <p id="conviction" className="max-w-[900px] text-[26px] leading-snug font-extrabold sm:text-[34px]">
          <span aria-hidden="true" className="mr-2 text-gold">{locale === "fr" ? "«" : "“"}</span>
          {c.conviction}
        </p>
      </Section>

      <Section tone="light" labelledBy="proofs">
        <SectionHeading id="proofs" title={c.proofsTitle} />
        <ul className="grid gap-px border border-line bg-line md:grid-cols-3">
          {c.proofs.map((proof) => (
            <li key={proof.title} className="flex flex-col bg-surface p-6">
              <h3 className="mb-1.5 text-lg font-bold">{proof.title}</h3>
              <p className="mb-4 text-[15px] text-muted">{proof.text}</p>
              <a
                href={targets[proof.link]}
                className="link mt-auto text-sm"
                {...(proof.link === "demos" ? {} : { rel: "noopener noreferrer" })}
              >
                {c.linkLabels[proof.link]} →
              </a>
            </li>
          ))}
        </ul>
      </Section>

      <Section labelledBy="skills">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          <div>
            <h2 id="skills" className="mb-6 text-[26px] font-bold sm:text-[32px]">
              {c.skillsTitle}
            </h2>
            <div className="space-y-6">
              {c.skills.map((group) => (
                <div key={group.group}>
                  <h3 className="mb-2.5 text-[13px] font-bold uppercase tracking-[0.1em]">{group.group}</h3>
                  <p className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="mb-6 text-[26px] font-bold sm:text-[32px]">{c.factsTitle}</h2>
            <dl className="border-t-2 border-ink">
              {c.facts.map((fact) => (
                <div key={fact.label} className="border-b border-line py-3.5">
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="font-bold">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <CtaBand
        title={c.cta.title}
        text={c.cta.text}
        primary={{ href: href(locale, "contact"), label: c.cta.contact }}
        secondary={{ href: href(locale, "services"), label: c.cta.services }}
      />
    </>
  );
}
