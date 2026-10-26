import Link from "next/link";
import { Character } from "@/components/characters/character";
import type { Method } from "@/lib/content/load";
import type { Locale } from "@/lib/i18n/config";
import { href } from "@/lib/i18n/routes";
import { MethodBadge } from "./method-bits";

/** One method in the gallery grid: character, name, badge, the need it solves. */
export function MethodCard({ method, locale }: { method: Method; locale: Locale }) {
  const text = method.text[locale];
  return (
    <Link
      href={href(locale, "methods", method.meta.slug)}
      className="group flex h-full flex-col bg-surface p-7 transition-colors hover:bg-sunken"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <Character method={method.meta.id} family={method.meta.family} className="size-20 shrink-0" />
        <MethodBadge badge={method.meta.badge} locale={locale} />
      </div>
      <h3 className="mb-2 text-xl font-bold group-hover:underline group-hover:decoration-gold group-hover:underline-offset-4">
        {text.name}
      </h3>
      <p className="flex-1 text-[15px] text-muted">{text.need}</p>
    </Link>
  );
}
