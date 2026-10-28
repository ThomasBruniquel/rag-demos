import { DemoPage, demoMetadata, demoStaticParams } from "@/components/pages/demo-views";

export const dynamicParams = false;

// Project slugs are translated: this folder only holds the "en" pages.
export function generateStaticParams() {
  return demoStaticParams("en").map((params) => ({ locale: "en", ...params }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/projects/[slug]">) {
  return demoMetadata((await params).slug);
}

export default async function Page({ params }: PageProps<"/[locale]/projects/[slug]">) {
  return <DemoPage slug={(await params).slug} />;
}
