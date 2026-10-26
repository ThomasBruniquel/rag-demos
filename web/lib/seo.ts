import type { Metadata } from "next";
import { htmlLang, locales, ogLocale, type Locale } from "@/lib/i18n/config";
import { alternates, type RouteId } from "@/lib/i18n/routes";
import { siteConfig } from "@/site.config";

/**
 * Metadata for one page in one language: canonical URL, hreflang links to
 * the other language, Open Graph. Titles go through the layout's template.
 */
export function pageMetadata({
  locale,
  id,
  slug,
  title,
  description,
}: {
  locale: Locale;
  id: RouteId;
  /** One slug for both languages, or one per language (demo pages). */
  slug?: string | Record<Locale, string>;
  title?: string;
  description?: string;
}): Metadata {
  const paths = alternates(id, slug);
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [htmlLang[l], paths[l]]),
  );
  // French is the default version for visitors whose language we don't serve.
  languages["x-default"] = paths.fr;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    alternates: { canonical: paths[locale], languages },
    // Next.js replaces (does not merge) the layout's openGraph: repeat siteName.
    openGraph: {
      type: "website",
      siteName: siteConfig.brand,
      url: paths[locale],
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      ...(title ? { title: `${title} · ${siteConfig.brand}` } : {}),
      ...(description ? { description } : {}),
    },
  };
}
