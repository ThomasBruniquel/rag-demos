import Link from "next/link";
import { getSlugPairs } from "@/lib/content/load";
import { format } from "@/lib/i18n/messages";
import { href } from "@/lib/i18n/routes";
import { getI18n } from "@/lib/i18n/server";
import { siteConfig } from "@/site.config";
import { LocaleSwitcher } from "./locale-switcher";
import { DesktopNav, MobileNav, type NavItem } from "./nav-links";
import { ThemeToggle } from "./theme";

/** Teal header with the gold wordmark, as on echic. */
export async function Header() {
  const { locale, t } = await getI18n();
  const other = locale === "fr" ? "en" : "fr";

  const items: NavItem[] = [
    { href: href(locale, "demos"), label: t.nav.demos },
    { href: href(locale, "methods"), label: t.nav.methods },
    { href: href(locale, "whatIsRag"), label: t.nav.whatIsRag },
    { href: href(locale, "services"), label: t.nav.services },
    { href: href(locale, "dataEngineering"), label: t.nav.dataEngineering },
  ];
  const cta: NavItem = { href: href(locale, "contact"), label: t.nav.contact };

  return (
    <header className="sticky top-0 z-40 bg-brand text-on-brand">
      <div className="relative mx-auto flex min-h-20 max-w-[1240px] items-center gap-6 px-4 py-3 sm:px-6 xl:gap-12">
        <Link
          href={href(locale, "home")}
          aria-label={format(t.a11y.homeLink, { brand: siteConfig.brand })}
          className="mr-auto text-[28px] font-medium tracking-wide text-gold sm:text-[32px] lg:mr-0"
        >
          {siteConfig.brand}
        </Link>

        <DesktopNav items={items} label={t.a11y.mainNav} />

        <div className="flex items-center gap-2">
          <LocaleSwitcher target={other} demoSlugs={getSlugPairs()} {...t.localeSwitcher} />
          <ThemeToggle toDark={t.theme.toDark} toLight={t.theme.toLight} />
          <Link href={cta.href} className="btn-gold ml-1 hidden min-h-9 px-5 py-1.5 text-[13px] xl:inline-flex">
            {cta.label}
          </Link>
          <MobileNav
            items={items}
            cta={cta}
            label={t.a11y.mainNav}
            openLabel={t.a11y.openMenu}
            closeLabel={t.a11y.closeMenu}
          />
        </div>
      </div>
    </header>
  );
}
