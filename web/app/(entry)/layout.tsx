import type { Metadata } from "next";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { siteConfig } from "@/site.config";

/*
 * Root layout for "/" only. In production, Netlify redirects "/" to /fr or
 * /en from the browser language before this page is served (netlify.toml).
 * This page is the fallback: local dev, other hosts, or JavaScript-only redirect.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.brand,
  robots: { index: false, follow: true },
};

export default function EntryLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={fontVariables}>
      <body className="bg-paper text-fg">{children}</body>
    </html>
  );
}
