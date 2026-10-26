import { WhatIsRagPage } from "@/components/pages/what-is-rag-view";
import { textPageMetadata } from "@/lib/page-metadata";

// This URL only exists in one language (see lib/i18n/routes.ts).
export const dynamicParams = false;
export const generateStaticParams = () => [{ locale: "en" }];
export const generateMetadata = () => textPageMetadata("whatIsRag");

export default function Page() {
  return <WhatIsRagPage />;
}
