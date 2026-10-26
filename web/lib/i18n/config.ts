export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];

/** French first: it is the main market and the fallback language. */
export const defaultLocale: Locale = "fr";

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (locales as readonly string[]).includes(value);
}

/** Value for `<html lang>` and Open Graph `og:locale`. */
export const htmlLang: Record<Locale, string> = { fr: "fr-FR", en: "en" };
export const ogLocale: Record<Locale, string> = { fr: "fr_FR", en: "en_US" };
