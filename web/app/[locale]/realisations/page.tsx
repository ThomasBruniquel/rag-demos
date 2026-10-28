import { DemoCatalogPage, demoCatalogMetadata } from "@/components/pages/demo-views";

// This URL only exists in one language (see lib/i18n/routes.ts).
export const dynamicParams = false;
export const generateStaticParams = () => [{ locale: "fr" }];
export const generateMetadata = () => demoCatalogMetadata();

export default function Page() {
  return <DemoCatalogPage />;
}
