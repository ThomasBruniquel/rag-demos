import { MethodPage, methodMetadata, methodStaticParams } from "@/components/pages/methods-views";

export const dynamicParams = false;

// One page per method, in this folder's language only.
export function generateStaticParams() {
  return methodStaticParams().map((params) => ({ locale: "en", ...params }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/methods/[slug]">) {
  return methodMetadata((await params).slug);
}

export default async function Page({ params }: PageProps<"/[locale]/methods/[slug]">) {
  return <MethodPage slug={(await params).slug} />;
}
