import { DraftPage, draftMetadata } from "@/components/pages/draft-page";

export const generateMetadata = () => draftMetadata("dataEngineering");

export default function Page() {
  return <DraftPage id="dataEngineering" />;
}
