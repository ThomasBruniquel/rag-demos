import Link from "next/link";
import { format } from "@/lib/i18n/messages";
import { href, projectsHref } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { siteConfig } from "@/site.config";
import { Wordmark } from "./wordmark";

/** Light footer with the gold wordmark (echic layout). */
export async function Footer() {
  const { locale, t } = await getI18n();

  const columns = [
    {
      title: t.footer.explore,
      links: [
        { href: projectsHref(locale), label: t.nav.demos },
        { href: href(locale, "skills"), label: t.nav.skills },
        { href: href(locale, "methods"), label: t.nav.methods },
        { href: href(locale, "whatIsRag"), label: t.nav.whatIsRag },
        { href: href(locale, "articles"), label: t.nav.articles },
      ],
    },
    {
      title: t.footer.work,
      links: [
        { href: href(locale, "services"), label: t.nav.services },
        { href: href(locale, "dataEngineering"), label: t.nav.dataEngineering },
        { href: href(locale, "about"), label: t.nav.about },
        { href: href(locale, "contact"), label: t.nav.contact },
      ],
    },
    {
      title: t.footer.legalTitle,
      links: [
        { href: href(locale, "legal"), label: t.footer.legal },
        { href: href(locale, "privacy"), label: t.footer.privacy },
      ],
    },
  ];

  return (
    <footer>
      <div className="border-t border-line bg-sunken">
        <div className="mx-auto grid max-w-[1080px] gap-9 px-6 py-11 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="sm:col-span-2 lg:col-span-1">
            <p className="text-[32px] text-gold-display">
              <Wordmark />
            </p>
            <p className="mt-1.5 max-w-[300px] text-[13px] text-muted">{t.footer.tagline}</p>
            <div className="mt-3 flex gap-3 text-muted">
              <a href={siteConfig.links.github} className="hover:text-ink" aria-label="GitHub">
                <GitHubIcon />
              </a>
              <a href={siteConfig.links.linkedin} className="hover:text-ink" aria-label="LinkedIn">
                <LinkedInIcon />
              </a>
            </div>
          </div>
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mt-2.5 mb-4 text-[13px] font-bold">{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="mb-2.5 block text-[13px] text-muted hover:text-ink hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <p className="border-t border-line px-6 py-4.5 text-center text-xs text-muted">
          {format(t.footer.rights, { year: new Date().getFullYear(), owner: siteConfig.owner.name })}
        </p>
      </div>
    </footer>
  );
}

function GitHubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4.5" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.48-2.7-1.07-2.7-1.07-.36-.92-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.8.06 1.23.83 1.23.83.72 1.22 1.88.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </svg>
  );
}
