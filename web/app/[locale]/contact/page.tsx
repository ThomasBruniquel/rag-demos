import { ContactPage } from "@/components/pages/contact-view";
import { textPageMetadata } from "@/lib/page-metadata";

export const generateMetadata = () => textPageMetadata("contact");

export default function Page() {
  return <ContactPage />;
}
