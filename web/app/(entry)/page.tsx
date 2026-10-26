import Link from "next/link";
import { Wordmark } from "@/components/layout/wordmark";

// French unless the browser prefers another language (then English).
const redirectScript = `(function(){var l=(navigator.languages&&navigator.languages[0])||navigator.language||"fr";location.replace(/^fr\\b/i.test(l)?"/fr":"/en")})()`;

export default function EntryPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-4 text-center">
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <p className="text-3xl text-gold-display">
        <Wordmark />
      </p>
      <p className="text-muted">
        <span lang="fr">Choisissez votre langue</span> · <span lang="en">Choose your language</span>
      </p>
      <div className="flex gap-3">
        <Link href="/fr" hrefLang="fr" lang="fr" className="rounded-md bg-accent px-5 py-2.5 font-medium text-on-accent">
          Français
        </Link>
        <Link href="/en" hrefLang="en" lang="en" className="rounded-md border border-line-strong px-5 py-2.5 font-medium text-ink">
          English
        </Link>
      </div>
    </main>
  );
}
