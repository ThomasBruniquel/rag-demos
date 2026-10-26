import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import type { Locale } from "./config";

/** French is the reference: every key it defines must exist in English. */
export type Messages = typeof fr;

// Type check: the build fails if en.json misses a key that fr.json has.
const enMessages: Messages = en;

const dictionaries: Record<Locale, Messages> = { fr, en: enMessages };

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale];
}

/** Replaces `{name}` placeholders: format("© {year}", { year: 2026 }). */
export function format(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
