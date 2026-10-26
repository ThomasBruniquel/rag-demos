import { DraftPage, draftMetadata } from "@/components/pages/draft-page";

// This URL only exists in one language (see lib/i18n/routes.ts).
export const dynamicParams = false;
export const generateStaticParams = () => [{ locale: "en" }];
export const generateMetadata = () => draftMetadata("about");

export default function Page() {
  return <DraftPage id="about" />;
}
