"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { switchLocale, type SlugPairs } from "@/lib/i18n/routes";

/** Link to the same page in the other language. */
export function LocaleSwitcher({
  target,
  short,
  ariaLabel,
  demoSlugs,
}: {
  target: Locale;
  short: string;
  ariaLabel: string;
  demoSlugs: SlugPairs;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={switchLocale(pathname, target, demoSlugs)}
      hrefLang={target}
      lang={target}
      aria-label={ariaLabel}
      prefetch={false}
      className="inline-flex h-8 items-center rounded-full border border-white/35 px-3 text-xs font-bold tracking-wide transition-colors hover:border-gold hover:text-gold"
    >
      <span aria-hidden="true">{short}</span>
    </Link>
  );
}
