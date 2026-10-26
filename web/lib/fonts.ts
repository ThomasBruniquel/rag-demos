import { JetBrains_Mono, Manrope } from "next/font/google";

// Fonts are downloaded at build time and served from the site itself
// (no request to Google from the visitor's browser).

/** Single text face, as on echic: Manrope, from regular to extra-bold. */
export const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false, // only used in traces and SQL blocks, rarely above the fold
});

export const fontVariables = `${sans.variable} ${mono.variable}`;
