import { DemoCatalogPage, demoCatalogMetadata } from "@/components/pages/demo-views";

export const generateMetadata = () => demoCatalogMetadata();

export default function Page() {
  return <DemoCatalogPage />;
}
