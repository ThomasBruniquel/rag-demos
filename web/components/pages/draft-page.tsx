import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { PageHeader } from "@/components/layout/page-header";
import { getI18n } from "@/lib/i18n/server";
import { pageMetadata } from "@/lib/seo";

type DraftId = keyof Awaited<ReturnType<typeof getI18n>>["t"]["pages"];

/**
 * Temporary page used while a section is being written: real title and
 * introduction, plus a visible notice. Replaced page by page in later steps.
 */
export async function DraftPage({ id }: { id: DraftId }) {
  const { t } = await getI18n();
  const page = t.pages[id];
  return (
    <>
      <PageHeader title={page.title} lead={page.lead} />
      <Container>
        <p className="rounded-md border border-dashed border-line-strong bg-surface px-4 py-3 text-sm text-muted">
          {t.draft.notice}
        </p>
      </Container>
    </>
  );
}

export async function draftMetadata(id: DraftId): Promise<Metadata> {
  const { locale, t } = await getI18n();
  return pageMetadata({ locale, id, title: t.pages[id].title, description: t.pages[id].lead });
}
