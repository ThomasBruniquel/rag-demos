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
    name: "Thomas Bruniquel",
    jobTitle: {
      fr: "Développeur freelance RAG & data engineering (AWS)",
      en: "Freelance RAG & data engineering developer (AWS)",
    },
    email: "bruniquelthomas@gmail.com",
    /** Legal notice (French law): business address and SIRET number. */
    address: "[À COMPLÉTER] Adresse postale",
    siret: "[À COMPLÉTER] Numéro SIRET",
    city: "[À COMPLÉTER] Ville",
    country: "FR",
  },
  links: {
    github: "https://github.com/ThomasBruniquel/rag-demos", // public monorepo
    linkedin: "https://www.linkedin.com/in/thomas-bruniquel",
    // Optional: shown on the contact page only once filled in.
    malt: "https://www.malt.fr/profile/[À COMPLÉTER]",
    booking: "https://cal.com/[À COMPLÉTER]", // meeting booking link
  },
  /**
   * Public URL of the site, used for canonical links, hreflang and the sitemap.
   * Set NEXT_PUBLIC_SITE_URL in Netlify once the domain is known; until then
   * Netlify's own `URL` variable (main site address, set at build time) is used.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3000").replace(/\/$/, ""),
} as const;

/** True when a value still contains a placeholder to fill in. */
export function isPlaceholder(value: string): boolean {
  return value.includes("[À COMPLÉTER]");
}
