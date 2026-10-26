import { DraftPage, draftMetadata } from "@/components/pages/draft-page";

export const generateMetadata = () => draftMetadata("contact");

export default function Page() {
  return <DraftPage id="contact" />;
}
