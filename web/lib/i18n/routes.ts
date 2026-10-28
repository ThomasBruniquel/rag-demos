import { locales, type Locale } from "./config";

/**
 * Translated URL segments. Each page exists under one folder per language
 * (e.g. app/[locale]/offres and app/[locale]/services) and both folders
 * render the same view. This map is the single source of truth for links,
 * the language switcher, hreflang and the sitemap.
 */
export const routes = {
  home: { fr: "", en: "" },
  demos: { fr: "realisations", en: "projects" },
  skills: { fr: "competences", en: "skills" },
  methods: { fr: "methodes", en: "methods" },
  whatIsRag: { fr: "qu-est-ce-qu-un-rag", en: "what-is-rag" },
  services: { fr: "offres", en: "services" },
  dataEngineering: { fr: "data-engineering", en: "data-engineering" },
  articles: { fr: "articles", en: "articles" },
  about: { fr: "a-propos", en: "about" },
  contact: { fr: "contact", en: "contact" },
  legal: { fr: "mentions-legales", en: "legal-notice" },
  privacy: { fr: "confidentialite", en: "privacy" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteId = keyof typeof routes;

/** Pages that take a slug after their segment (project, method and article pages). */
const pagesWithSlug: RouteId[] = ["demos", "methods", "articles"];

/** Demo slugs are translated: { "02": { fr: "revue-de-contrats", en: "contract-review" } }. */
export type SlugPairs = Record<string, Record<Locale, string>>;

/** Path of a page, e.g. href("en", "services") → "/en/services". */
export function href(locale: Locale, id: RouteId, slug?: string): string {
  const segment = routes[id][locale];
  const parts = [locale, segment, slug].filter(Boolean);
  return `/${parts.join("/")}`;
}

/**
 * The projects ("réalisations") are listed on the home page, with their
 * filters; there is no separate catalogue page. The `demos` segment only
 * prefixes the project pages (/fr/realisations/<slug>).
 */
export function projectsAnchor(locale: Locale): string {
  return routes.demos[locale];
}

/** Link to the project list on the home page, e.g. "/fr#realisations". */
export function projectsHref(locale: Locale): string {
  return `${href(locale, "home")}#${projectsAnchor(locale)}`;
}

/** Same page in every language, used for hreflang and the language switcher. */
export function alternates(id: RouteId, slug?: string | Record<Locale, string>): Record<Locale, string> {
  return Object.fromEntries(
    locales.map((l) => [l, href(l, id, typeof slug === "object" ? slug[l] : slug)]),
  ) as Record<Locale, string>;
}

/**
 * Reverse lookup: which page is this path? Works in the browser, so the
 * language switcher can find the equivalent page in the other language.
 */
export function matchPath(
  pathname: string,
): { locale: Locale; id: RouteId; slug?: string } | null {
  const [first, segment = "", slug] = pathname.replace(/^\/+|\/+$/g, "").split("/");
  const locale = locales.find((l) => l === first);
  if (!locale) return null;
  for (const id of Object.keys(routes) as RouteId[]) {
    if (routes[id][locale] !== segment) continue;
    if (slug && !pagesWithSlug.includes(id)) continue;
    return { locale, id, slug };
  }
  return null;
}

/** Path of the current page in another language (falls back to its home page). */
export function switchLocale(pathname: string, target: Locale, demoSlugs: SlugPairs = {}): string {
  const match = matchPath(pathname);
  if (!match) return href(target, "home");
  let slug = match.slug;
  if (match.id === "demos" && slug) {
    const pair = Object.values(demoSlugs).find((p) => p[match.locale] === slug);
    slug = pair?.[target] ?? slug;
  }
  return href(target, match.id, slug);
}
