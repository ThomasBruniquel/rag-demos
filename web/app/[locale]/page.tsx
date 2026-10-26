import type { Metadata } from "next";
import Link from "next/link";
import { Character } from "@/components/characters/character";
import { getI18n } from "@/lib/i18n/server";
import { href } from "@/lib/i18n/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const { locale } = await getI18n();
  return pageMetadata({ locale, id: "home" });
}

// Home page, step 1: the hook. The other sections (RAG in 30 seconds, needs,
// method gallery, proof, contact) come with the commercial pages.
export default async function HomePage() {
  const { locale, t } = await getI18n();
  return (
    <section className="relative overflow-hidden bg-sunken px-4 pt-16 pb-16 sm:px-8 sm:pt-20 sm:pb-[72px]">
      <div className="relative z-10 mx-auto max-w-[1240px]">
        <p className="eyebrow mb-3">{t.home.eyebrow}</p>
        <h1 className="mb-6 max-w-[760px] text-[40px] leading-[1.02] font-extrabold tracking-[-0.045em] sm:text-[56px] lg:text-[68px]">
          <span className="block text-gold-display">{t.home.titleTop}</span>
          <span className="block">{t.home.titleBottom}</span>
        </h1>
        <p className="mb-3 max-w-[600px] text-lg leading-relaxed font-medium sm:text-[19px]">{t.home.lead}</p>
        <div className="mt-10 flex flex-wrap gap-3.5">
          <Link href={href(locale, "demos")} className="btn-primary w-full sm:w-auto">
            {t.home.primaryCta}
          </Link>
          <Link href={href(locale, "contact")} className="btn-outline w-full sm:w-auto">
            {t.home.secondaryCta}
          </Link>
        </div>
      </div>
      {/* Three characters, like the chess pieces of echic's hero. */}
      <div aria-hidden="true" className="pointer-events-none absolute right-[4%] -bottom-3 hidden items-end gap-1 lg:flex">
        <Character method="groundedness" family="verification" className="size-36" />
        <Character method="stair" family="structure" className="size-52" />
        <Character method="cag" family="search" className="size-64" />
      </div>
    </section>
  );
}
