import type { MDXComponents } from "mdx/types";
import { ToComplete } from "@/components/content/to-complete";

// Components available in every MDX file, and styling of plain Markdown.
// Long-form text is styled by the `.prose` class (app/globals.css).
const components: MDXComponents = {
  ToComplete,
  a: ({ href = "", children, ...props }) => {
    const external = /^https?:\/\//.test(href);
    return (
      <a href={href} {...(external ? { rel: "noopener noreferrer" } : {})} {...props}>
        {children}
      </a>
    );
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
