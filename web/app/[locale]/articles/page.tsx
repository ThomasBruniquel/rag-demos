import { DraftPage, draftMetadata } from "@/components/pages/draft-page";

export const generateMetadata = () => draftMetadata("articles");

export default function Page() {
  return <DraftPage id="articles" />;
}
