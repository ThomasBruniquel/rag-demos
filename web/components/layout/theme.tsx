"use client";

import { useLayoutEffect } from "react";

const STORAGE_KEY = "theme";

/**
 * Runs while the HTML is parsed, before the first paint: applies the saved
 * theme, or the system preference, so there is no light/dark flash.
 */
const themeScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark"){t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

export function ThemeScript() {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: themeScript }}
    />
  );
}

function currentTheme(): "light" | "dark" {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function ThemeToggle({ toDark, toLight }: { toDark: string; toLight: string }) {
  // React Strict Mode resets <html> attributes on its dev-only remount:
  // apply the theme again. No-op in production.
  useLayoutEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "light" || saved === "dark") {
        document.documentElement.setAttribute("data-theme", saved);
      } else if (!document.documentElement.hasAttribute("data-theme")) {
        const dark = matchMedia("(prefers-color-scheme: dark)").matches;
        document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
      }
    } catch {
      // Storage blocked (private mode): keep the system theme.
    }
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // The choice simply won't be remembered.
    }
  }

  // Both labels are rendered; CSS shows the one matching the current theme,
  // so the server HTML is correct whatever the visitor's theme.
  return (
    <button
      type="button"
      onClick={toggle}
      className="inline-flex size-8 items-center justify-center rounded-full border border-white/35 transition-colors hover:border-gold hover:text-gold"
    >
      <span className="dark:hidden">
        <span className="sr-only">{toDark}</span>
        <MoonIcon />
      </span>
      <span className="hidden dark:inline">
        <span className="sr-only">{toLight}</span>
        <SunIcon />
      </span>
    </button>
  );
}

function MoonIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
    </svg>
  );
}
