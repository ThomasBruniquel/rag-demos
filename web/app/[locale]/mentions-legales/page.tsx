import { DraftPage, draftMetadata } from "@/components/pages/draft-page";

// This URL only exists in one language (see lib/i18n/routes.ts).
export const dynamicParams = false;
export const generateStaticParams = () => [{ locale: "fr" }];
export const generateMetadata = () => draftMetadata("legal");

export default function Page() {
  return <DraftPage id="legal" />;
}
