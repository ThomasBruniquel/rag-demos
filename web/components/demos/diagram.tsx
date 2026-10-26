/**
 * Architecture or pipeline diagram, pre-rendered from Mermaid to SVG
 * (scripts/render-diagrams.mjs) and inlined so it follows the theme colours.
 * The SVG file comes from the repository, never from user input.
 */
export function Diagram({ svg, alt, pending }: { svg: string | null; alt: string; pending: string }) {
  if (!svg) {
    return (
      <figure className="flex min-h-48 items-center justify-center border border-dashed border-line-strong bg-sunken p-6 text-center">
        <figcaption className="max-w-[520px] text-sm text-muted">
          <span className="mb-1 block font-bold text-fg">{pending}</span>
          {alt}
        </figcaption>
      </figure>
    );
  }
  return (
    <figure className="overflow-x-auto border border-line bg-surface p-4 sm:p-6">
      <div role="img" aria-label={alt} className="diagram mx-auto min-w-[560px] max-w-[980px]" dangerouslySetInnerHTML={{ __html: svg }} />
    </figure>
  );
}
