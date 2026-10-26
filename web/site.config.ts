/**
 * Site identity in one place. The brand name is provisional: change it here
 * and it updates everywhere (header, footer, metadata, structured data).
 *
 * Values marked [À COMPLÉTER] must be filled in before going live.
 */
export const siteConfig = {
  /** Brand name (the wordmark with its round 4 is in components/layout/wordmark.tsx). */
  brand: "Rag4you",
  owner: {
    name: "[À COMPLÉTER] Prénom Nom",
    jobTitle: {
      fr: "Développeur freelance RAG & data engineering (AWS)",
      en: "Freelance RAG & data engineering developer (AWS)",
    },
    email: "contact@example.com", // [À COMPLÉTER]
    city: "[À COMPLÉTER] Ville",
    country: "FR",
  },
  links: {
    github: "https://github.com/ThomasBruniquel/rag-demos", // public monorepo
    linkedin: "https://www.linkedin.com/in/[À COMPLÉTER]",
    malt: "https://www.malt.fr/profile/[À COMPLÉTER]",
    booking: "https://cal.com/[À COMPLÉTER]", // meeting booking link
  },
  /**
   * Public URL of the site, used for canonical links, hreflang and the sitemap.
   * Set NEXT_PUBLIC_SITE_URL in Netlify once the domain is known.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
} as const;

/** True when a value still contains a placeholder to fill in. */
export function isPlaceholder(value: string): boolean {
  return value.includes("[À COMPLÉTER]");
}
