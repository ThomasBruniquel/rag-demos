import type { MetadataRoute } from "next";
import { getDemos, getMethods } from "@/lib/content/load";
import { locales } from "@/lib/i18n/config";
import { alternates, routes, type RouteId } from "@/lib/i18n/routes";
import { siteConfig } from "@/site.config";

// Written to out/sitemap.xml at build time (static export).
export const dynamic = "force-static";

/** One entry per page and language, each listing its other-language twin. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { id: RouteId; slug?: string | Record<"fr" | "en", string> }[] = [
    ...(Object.keys(routes) as RouteId[]).map((id) => ({ id })),
    ...getDemos().map((d) => ({ id: "demos" as const, slug: d.meta.slugs })),
    ...getMethods().map((m) => ({ id: "methods" as const, slug: m.meta.slug })),
  ];

  return pages.flatMap(({ id, slug }) => {
    const paths = alternates(id, slug);
    const languages = Object.fromEntries(locales.map((l) => [l, `${siteConfig.url}${paths[l]}`]));
    return locales.map((locale) => ({
      url: `${siteConfig.url}${paths[locale]}`,
      alternates: { languages },
    }));
  });
}
