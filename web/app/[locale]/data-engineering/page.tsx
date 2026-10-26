import { DataEngineeringPage } from "@/components/pages/data-engineering-view";
import { textPageMetadata } from "@/lib/page-metadata";

export const generateMetadata = () => textPageMetadata("dataEngineering");

export default function Page() {
  return <DataEngineeringPage />;
}
