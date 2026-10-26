import type { ReactNode } from "react";

/** Page width (1240 px, as on echic) and side gutters. */
export function Container({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "article";
}) {
  return <Tag className={`mx-auto w-full max-w-[1240px] px-4 sm:px-6 ${className}`}>{children}</Tag>;
}

/** Full-width section with echic's vertical rhythm; `tone` alternates the background. */
export function Section({
  children,
  tone = "plain",
  className = "",
  id,
  labelledBy,
}: {
  children: ReactNode;
  tone?: "plain" | "light" | "brand";
  className?: string;
  id?: string;
  labelledBy?: string;
}) {
  const tones = {
    plain: "",
    light: "bg-sunken",
    brand: "bg-brand text-on-brand [&_h2]:text-on-brand [&_.eyebrow]:text-gold",
  };
  return (
    <section id={id} aria-labelledby={labelledBy} className={`px-4 py-14 sm:px-6 sm:py-20 ${tones[tone]} ${className}`}>
      <div className="mx-auto max-w-[1240px]">{children}</div>
    </section>
  );
}
