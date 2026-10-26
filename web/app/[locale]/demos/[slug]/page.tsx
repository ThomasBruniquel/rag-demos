import { DemoPage, demoMetadata, demoStaticParams } from "@/components/pages/demo-views";
import { isLocale } from "@/lib/i18n/config";

export const dynamicParams = false;

// Demo slugs are translated: each language gets its own list.
export function generateStaticParams({ params }: { params: { locale: string } }) {
  return isLocale(params.locale) ? demoStaticParams(params.locale) : [];
}

export async function generateMetadata({ params }: PageProps<"/[locale]/demos/[slug]">) {
  return demoMetadata((await params).slug);
}

export default async function Page({ params }: PageProps<"/[locale]/demos/[slug]">) {
  return <DemoPage slug={(await params).slug} />;
}
