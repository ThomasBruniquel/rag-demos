import type { Metadata, Viewport } from "next";
import "../globals.css";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ThemeScript } from "@/components/layout/theme";
import { fontVariables } from "@/lib/fonts";
import { htmlLang, locales } from "@/lib/i18n/config";
import { format } from "@/lib/i18n/messages";
import { getI18n } from "@/lib/i18n/server";
import { siteConfig } from "@/site.config";

// Only /fr and /en exist; any other first segment is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const { t } = await getI18n();
  const brand = siteConfig.brand;
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: format(t.meta.defaultTitle, { brand }),
      template: format(t.meta.titleTemplate, { brand }),
    },
    description: t.meta.description,
    applicationName: brand,
    openGraph: { siteName: brand },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#0f151d" },
  ],
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const { locale, t } = await getI18n();
  return (
    <html lang={htmlLang[locale]} className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-md bg-accent px-4 py-2 text-on-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.a11y.skipToContent}
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
