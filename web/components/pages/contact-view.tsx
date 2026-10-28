import { Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { contact } from "@/content/pages/contact";
import { href } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { isPlaceholder, siteConfig } from "@/site.config";
import { MarkList } from "./blocks";
import { ContactForm } from "./contact-form";

/** Contact: form on the left, direct channels and a checklist on the right. */
export async function ContactPage() {
  const { locale, t } = await getI18n();
  const c = contact[locale];
  const { owner, links } = siteConfig;

  const channels = [
    { label: c.direct.email, value: owner.email, href: `mailto:${owner.email}` },
    { label: c.direct.linkedin, value: links.linkedin.replace("https://www.", ""), href: links.linkedin },
    { label: c.direct.github, value: links.github.replace("https://", ""), href: links.github },
    { label: c.direct.malt, value: links.malt.replace("https://www.", ""), href: links.malt },
    { label: c.direct.booking, value: links.booking.replace("https://", ""), href: links.booking },
  ].filter((channel) => !isPlaceholder(channel.href));

  return (
    <>
      <PageHeader title={t.pages.contact.title} lead={t.pages.contact.lead} />
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="mb-6 text-[22px] font-bold">{c.form.title}</h2>
            <ContactForm t={c.form} email={owner.email} privacyHref={href(locale, "privacy")} />
          </div>

          <div className="space-y-12">
            {/* D-020: projects are shown live only by appointment. */}
            <div id="live-demo" className="scroll-mt-28 border-l-4 border-gold bg-sunken px-6 py-5">
              <h2 className="mb-2 text-[20px] font-bold">{c.live.title}</h2>
              <p className="mb-2 text-[15px] leading-relaxed">{c.live.text}</p>
              <p className="mb-4 text-sm text-muted">{c.live.note}</p>
              <a
                href={isPlaceholder(links.booking) ? `mailto:${owner.email}?subject=${encodeURIComponent(c.live.subject)}` : links.booking}
                className="btn-primary"
                {...(isPlaceholder(links.booking) ? {} : { rel: "noopener noreferrer" })}
              >
                {isPlaceholder(links.booking) ? c.live.email : c.live.booking}
              </a>
            </div>

            <div>
              <h2 className="mb-1 text-[22px] font-bold">{owner.name}</h2>
              <p className="mb-5 text-sm text-muted">{owner.jobTitle[locale]}</p>
              <dl className="border-t border-line">
                {channels.map((channel) => (
                  <div key={channel.label} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-line py-3">
                    <dt className="text-sm text-muted">{channel.label}</dt>
                    <dd>
                      <a
                        href={channel.href}
                        className="link text-[15px] break-all"
                        {...(channel.href.startsWith("http") ? { rel: "noopener noreferrer" } : {})}
                      >
                        {channel.value}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="mt-4 text-sm text-muted">{c.direct.delay}</p>
            </div>

            <div className="bg-sunken p-6">
              <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em]">{c.helpful.title}</h2>
              <MarkList items={c.helpful.items} mark="✓" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
