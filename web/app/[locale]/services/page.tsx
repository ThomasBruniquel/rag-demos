import { ServicesPage } from "@/components/pages/services-view";
import { textPageMetadata } from "@/lib/page-metadata";

// This URL only exists in one language (see lib/i18n/routes.ts).
export const dynamicParams = false;
export const generateStaticParams = () => [{ locale: "en" }];
export const generateMetadata = () => textPageMetadata("services");

export default function Page() {
  return <ServicesPage />;
}
