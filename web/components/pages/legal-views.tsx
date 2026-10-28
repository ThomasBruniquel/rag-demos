import type { ReactNode } from "react";
import { ToComplete } from "@/components/content/to-complete";
import { Section } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { legal } from "@/content/pages/legal";
import { getI18n } from "@/lib/i18n/server";
import { isPlaceholder, siteConfig } from "@/site.config";
import { MarkList } from "./blocks";

/** Shows a config value, or the [À COMPLÉTER] marker while it is missing. */
function value(v: string): ReactNode {
  return isPlaceholder(v) ? <ToComplete>{v.replace("[À COMPLÉTER]", "").trim()}</ToComplete> : v;
}

function Rows({ rows }: { rows: { label: string; value: ReactNode }[] }) {
  return (
    <dl className="border-t-2 border-ink">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 border-b border-line py-3 sm:grid-cols-[240px_1fr] sm:gap-6">
          <dt className="text-sm text-muted">{row.label}</dt>
          <dd className="font-medium">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function H2({ children }: { children: ReactNode }) {
  return <h2 className="mt-12 mb-4 text-[22px] font-bold first:mt-0">{children}</h2>;
}

function Mail() {
  const { email } = siteConfig.owner;
  return (
    <a href={`mailto:${email}`} className="link">
      {email}
    </a>
  );
}

export async function LegalPage() {
  const { locale, t } = await getI18n();
  const c = legal[locale].legal;
  const { owner } = siteConfig;

  return (
    <>
      <PageHeader title={t.pages.legal.title} lead={t.pages.legal.lead} />
      <Section>
        <div className="max-w-[900px]">
          <H2>{c.publisherTitle}</H2>
          <Rows
            rows={[
              { label: c.labels.name, value: owner.name },
              { label: c.labels.status, value: c.status },
              { label: c.labels.address, value: value(owner.address) },
              { label: c.labels.siret, value: value(owner.siret) },
              { label: c.labels.email, value: <Mail /> },
              { label: c.labels.director, value: owner.name },
            ]}
          />

          <H2>{c.hostingTitle}</H2>
          <Rows
            rows={c.hosts.map((host) => ({
              label: host.role,
              value: (
                <>
                  <a href={host.url} className="link" rel="noopener noreferrer">
                    {host.name}
                  </a>
                  <span className="block text-sm font-normal text-muted">{host.address}</span>
                </>
              ),
            }))}
          />

          <H2>{c.ipTitle}</H2>
          <MarkList items={c.ip} />

          <p className="mt-10 text-sm text-muted">{legal[locale].updated}</p>
        </div>
      </Section>
    </>
  );
}

export async function PrivacyPage() {
  const { locale, t } = await getI18n();
  const c = legal[locale].privacy;

  return (
    <>
      <PageHeader title={t.pages.privacy.title} lead={t.pages.privacy.lead} />
      <Section>
        <div className="max-w-[1000px]">
          <div className="bg-sunken p-6 sm:p-8">
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.1em]">{c.principlesTitle}</h2>
            <MarkList items={c.principles} mark="✓" />
          </div>

          <H2>{c.controllerTitle}</H2>
          <p>
            {siteConfig.owner.name} · <Mail />
          </p>

          <H2>{c.tableTitle}</H2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b-2 border-ink">
                  {c.columns.map((col) => (
                    <th key={col} scope="col" className="py-2.5 pr-4 font-bold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.rows.map(([first, ...rest]) => (
                  <tr key={first} className="border-b border-line align-top">
                    <th scope="row" className="py-3 pr-4 font-bold">
                      {first}
                    </th>
                    {rest.map((cell, i) => (
                      <td key={i} className={`py-3 pr-4 ${i === rest.length - 1 ? "font-bold whitespace-nowrap" : "text-muted"}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <H2>{c.liveTitle}</H2>
          <div className="max-w-[760px] space-y-3 text-[15px] leading-relaxed">
            {c.live.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="mt-10 border-l-4 border-gold bg-sunken px-6 py-5">
            <h2 className="mb-1 text-[13px] font-bold uppercase tracking-[0.1em]">{c.adviceTitle}</h2>
            <p className="text-[15px]">{c.advice}</p>
          </aside>

          <H2>{c.processorsTitle}</H2>
          <Rows
            rows={c.processors.map((p) => ({
              label: p.name,
              value: (
                <>
                  {p.role}
                  <span className="block text-sm font-normal text-muted">{p.place}</span>
                </>
              ),
            }))}
          />
          <p className="mt-4 text-sm text-muted">{c.transfers}</p>

          <H2>{c.rightsTitle}</H2>
          <p className="max-w-[760px] text-[15px] leading-relaxed">
            {c.rights}{" "}
            <a href="https://www.cnil.fr" className="link" rel="noopener noreferrer">
              {c.cnil}
            </a>
          </p>

          <p className="mt-10 text-sm text-muted">{legal[locale].updated}</p>
        </div>
      </Section>
    </>
  );
}
