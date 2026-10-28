import type { StackGroup } from "@/components/demos/stack-badges";
import type { Locale } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/routes";
import type { DemoMeta } from "./schema";
import { keywords, stackCategories, stackCategoriesShort, type StackCategory } from "./taxonomy";

/** Anchor of a keyword row on the Skills page. */
export function keywordAnchor(id: string): string {
  return `kw-${id}`;
}

/** Badges of a project, grouped by category, with links to the Skills page. */
export function stackGroups(stack: DemoMeta["stack"], locale: Locale, only?: StackCategory[]): StackGroup[] {
  const skills = href(locale, "skills");
  return (Object.keys(stackCategories) as StackCategory[])
    .filter((category) => (only ? only.includes(category) : true) && stack[category].length > 0)
    .map((category) => {
      const labels = keywords[category] as Record<string, Record<Locale, string>>;
      return {
        category,
        label: stackCategories[category][locale],
        short: stackCategoriesShort[category][locale],
        items: (stack[category] as string[]).map((id) => ({
          id,
          label: labels[id][locale],
          href: `${skills}#${keywordAnchor(id)}`,
        })),
      };
    });
}

/** Every keyword id of a project, for the catalogue filter. */
export function stackKeywords(stack: DemoMeta["stack"]): string[] {
  return (Object.keys(stackCategories) as StackCategory[]).flatMap((category) => stack[category] as string[]);
}
