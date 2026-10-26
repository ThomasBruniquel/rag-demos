import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Fully static site: `next build` writes plain HTML/CSS/JS into `out/`,
// which Netlify serves as-is (see netlify.toml). No server runtime.
const nextConfig: NextConfig = {
  output: "export",
  // No image optimizer without a server: images are prepared at the right size.
  images: { unoptimized: true },
  // MDX files are imported as content, never used as routes.
  pageExtensions: ["ts", "tsx"],
  experimental: {
    // One bilingual 404 page for every unmatched URL (we have two root layouts).
    globalNotFound: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

// Demo and method pages are written in MDX (content/). The YAML front matter
// holds the structured fields (read by lib/content); the body is the prose.
// Plugins are given by name so Turbopack can load them.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-frontmatter", "remark-gfm"],
  },
});

export default withMDX(nextConfig);
