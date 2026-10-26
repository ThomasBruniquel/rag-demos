import { siteConfig } from "@/site.config";

/**
 * "Rag4you" wordmark. The 4 sits in a gold pill and tilts its head like the
 * method characters; it straightens up with a small bounce on hover (see
 * `.wordmark` in globals.css). Screen readers get the plain brand name.
 */
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`wordmark inline-flex items-center font-semibold tracking-wide ${className}`}>
      <span className="sr-only">{siteConfig.brand}</span>
      <span aria-hidden="true" className="inline-flex items-center">
        Rag
        <span className="wordmark-four">4</span>
        you
      </span>
    </span>
  );
}
