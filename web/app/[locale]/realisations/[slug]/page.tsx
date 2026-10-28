import { DemoPage, demoMetadata, demoStaticParams } from "@/components/pages/demo-views";

export const dynamicParams = false;

// Project slugs are translated: this folder only holds the "fr" pages.
export function generateStaticParams() {
  return demoStaticParams("fr").map((params) => ({ locale: "fr", ...params }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/realisations/[slug]">) {
  return demoMetadata((await params).slug);
}

export default async function Page({ params }: PageProps<"/[locale]/realisations/[slug]">) {
  return <DemoPage slug={(await params).slug} />;
}
