import type { Metadata } from "next";
import "./globals.css";
import { ThemeScript } from "@/components/layout/theme";
import { fontVariables } from "@/lib/fonts";
import en from "@/messages/en.json";
import fr from "@/messages/fr.json";
import { siteConfig } from "@/site.config";

// Served for every unknown URL. The language is unknown, so the page is bilingual.
export const metadata: Metadata = {
  title: `${fr.notFound.title} · ${en.notFound.title} · ${siteConfig.brand}`,
};

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontVariables} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-paper text-fg">
        <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center gap-10 px-4 py-16 sm:px-6">
          <p className="font-mono text-sm text-accent">404</p>
          <div className="grid gap-10 sm:grid-cols-2">
            {[
              { lang: "fr", t: fr.notFound, home: "/fr" },
              { lang: "en", t: en.notFound, home: "/en" },
            ].map(({ lang, t, home }) => (
              <section key={lang} lang={lang}>
                <h1 className="text-3xl font-semibold">{t.title}</h1>
                <p className="mt-3 text-muted">{t.body}</p>
                <a href={home} className="mt-5 inline-block font-medium text-accent hover:underline">
                  {t.back} →
                </a>
              </section>
            ))}
          </div>
        </main>
      </body>
    </html>
  );
}
