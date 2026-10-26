"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export type NavItem = { href: string; label: string };

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** Desktop navigation: uppercase links, the current section underlined in gold. */
export function DesktopNav({ items, label }: { items: NavItem[]; label: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label={label} className="mx-auto hidden lg:block">
      <ul className="flex items-center gap-7 xl:gap-9">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className="border-b-2 border-transparent py-0.5 text-xs font-bold uppercase tracking-[0.08em] transition-colors hover:text-gold aria-[current=page]:border-gold aria-[current=page]:text-gold"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/** Mobile navigation: a button that opens a teal panel under the header. */
export function MobileNav({
  items,
  cta,
  label,
  openLabel,
  closeLabel,
}: {
  items: NavItem[];
  cta: NavItem;
  label: string;
  openLabel: string;
  closeLabel: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close the panel after navigating.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-full transition-colors hover:text-gold"
      >
        <span className="sr-only">{open ? closeLabel : openLabel}</span>
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>
      <nav
        id="mobile-nav"
        aria-label={label}
        hidden={!open}
        className="absolute inset-x-0 top-full border-t border-white/10 bg-brand shadow-lg"
      >
        <ul className="mx-auto flex max-w-[1240px] flex-col px-4 py-3 sm:px-6">
          {items.map((item) => (
            <li key={item.href} className="border-b border-white/10 last:border-0">
              <Link
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
                className="block py-3.5 text-sm font-bold uppercase tracking-[0.08em] hover:text-gold aria-[current=page]:text-gold"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <Link href={cta.href} className="btn-gold w-full">
              {cta.label}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
