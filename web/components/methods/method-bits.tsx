import { ToMeasure } from "@/components/content/to-complete";
import type { MethodMeta, MethodText } from "@/lib/content/schema";
import { badges, families, type Badge, type Family } from "@/lib/content/taxonomy";
import type { Locale } from "@/lib/i18n/config";
import { format, type Messages } from "@/lib/i18n/messages";

/** "Récent" (brick) or "Éprouvé" (navy), as a pill tag. */
export function MethodBadge({ badge, locale }: { badge: Badge; locale: Locale }) {
  return (
    <span className={`tag ${badge === "recent" ? "text-brick dark:text-danger" : "text-ink"}`}>
      {badges[badge][locale]}
    </span>
  );
}

/** Family name with its colour dot. */
export function FamilyLabel({ family, locale }: { family: Family; locale: Locale }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-muted">
      <span aria-hidden="true" className="size-2.5 rounded-full" style={{ background: `var(--fam-${family})` }} />
      {families[family][locale]}
    </span>
  );
}

/** Quality, cost and complexity as five-segment gauges. */
export function Gauges({ gauges, t }: { gauges: MethodMeta["gauges"]; t: Messages["methods"] }) {
  const rows = [
    { label: t.quality, value: gauges.quality },
    { label: t.cost, value: gauges.cost },
    { label: t.complexity, value: gauges.complexity },
  ];
  return (
    <dl className="space-y-3">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center justify-between gap-4 border-b border-line pb-3">
          <dt className="text-sm text-muted">{row.label}</dt>
          <dd className="flex items-center gap-1" role="img" aria-label={format(t.gaugeValue, { label: row.label, value: row.value })}>
            {[1, 2, 3, 4, 5].map((i) => (
              <span key={i} className={`h-2.5 w-5 rounded-full ${i <= row.value ? "bg-ink" : "bg-line"}`} />
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The three steps of a method, numbered gold circles joined by arrows. */
export function MiniSchema({ steps }: { steps: MethodText["how"] }) {
  return (
    <ol className="grid gap-8 md:grid-cols-3 md:gap-10">
      {steps.map((step, i) => (
        <li key={step.label} className="relative border-t-2 border-ink pt-5">
          <span className="mb-3.5 inline-flex size-8.5 items-center justify-center rounded-full bg-gold font-extrabold text-[#004446]">
            {i + 1}
          </span>
          {i < steps.length - 1 ? (
            <span aria-hidden="true" className="absolute top-5 -right-8 hidden text-2xl text-gold-ink md:block">
              →
            </span>
          ) : null}
          <h3 className="mb-2 text-lg font-bold">{step.label}</h3>
          <p className="text-[15px] leading-relaxed text-muted">{step.text}</p>
        </li>
      ))}
    </ol>
  );
}

/** Scored duel against classic RAG. */
export function DuelTable({
  duel,
  methodName,
  t,
  measureNote,
}: {
  duel: NonNullable<MethodText["duel"]>;
  methodName: string;
  t: Messages["methods"];
  measureNote: string;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-left text-sm">
        <caption className="mb-3 text-left text-[13px] text-muted">
          {!duel.measured ? (
            <>
              <ToMeasure /> {measureNote}
            </>
          ) : null}
        </caption>
        <thead>
          <tr className="border-b-2 border-ink">
            <th scope="col" className="py-2.5 pr-4 font-bold">{t.criterion}</th>
            <th scope="col" className="px-4 py-2.5 font-bold">{t.classic}</th>
            <th scope="col" className="px-4 py-2.5 font-bold">{methodName}</th>
          </tr>
        </thead>
        <tbody>
          {duel.rows.map((row) => (
            <tr key={row.criterion} className="border-b border-line">
              <th scope="row" className="py-3 pr-4 font-medium text-muted">{row.criterion}</th>
              <Score value={row.classic} wins={row.winner === "classic"} label={t.advantage} />
              <Score value={row.method} wins={row.winner === "method"} label={t.advantage} />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Score({ value, wins, label }: { value: string; wins: boolean; label: string }) {
  return (
    <td className={`px-4 py-3 tabular-nums ${wins ? "font-extrabold text-ink" : "text-muted"}`}>
      {value}
      {wins ? (
        <span className="ml-1.5 text-gold-ink" title={label}>
          <span aria-hidden="true">✓</span>
          <span className="sr-only"> ({label})</span>
        </span>
      ) : null}
    </td>
  );
}
