import { SkillsPage, skillsMetadata } from "@/components/pages/skills-view";

// This URL only exists in one language (see lib/i18n/routes.ts).
export const dynamicParams = false;
export const generateStaticParams = () => [{ locale: "en" }];
export const generateMetadata = () => skillsMetadata();

export default function Page() {
  return <SkillsPage />;
}
