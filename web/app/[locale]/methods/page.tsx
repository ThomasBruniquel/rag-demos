import { MethodsGallery, methodsGalleryMetadata } from "@/components/pages/methods-views";

// This URL only exists in one language (see lib/i18n/routes.ts).
export const dynamicParams = false;
export const generateStaticParams = () => [{ locale: "en" }];
export const generateMetadata = () => methodsGalleryMetadata();

export default function Page() {
  return <MethodsGallery />;
}
