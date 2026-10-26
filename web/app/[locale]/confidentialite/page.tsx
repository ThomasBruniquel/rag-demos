import { PrivacyPage } from "@/components/pages/legal-views";
import { textPageMetadata } from "@/lib/page-metadata";

// This URL only exists in one language (see lib/i18n/routes.ts).
export const dynamicParams = false;
export const generateStaticParams = () => [{ locale: "fr" }];
export const generateMetadata = () => textPageMetadata("privacy");

export default function Page() {
  return <PrivacyPage />;
}
