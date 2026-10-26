import { ArticlesPage } from "@/components/pages/articles-view";
import { textPageMetadata } from "@/lib/page-metadata";

export const generateMetadata = () => textPageMetadata("articles");

export default function Page() {
  return <ArticlesPage />;
}
