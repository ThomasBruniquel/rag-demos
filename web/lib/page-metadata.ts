import type { Metadata } from "next";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

type PageId = keyof Awaited<ReturnType<typeof getI18n>>["t"]["pages"];

/** Metadata of an editorial page, from its title and lead in messages/*.json. */
export async function textPageMetadata(id: PageId): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({ locale, id, title: t.pages[id].title, description: t.pages[id].lead });
}
