"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { ContactFormText } from "@/content/pages/contact";

/*
 * Contact form handled by Netlify Forms. Netlify finds the form in the
 * static HTML at deploy time thanks to `data-netlify` and the hidden
 * `form-name` field. With JavaScript, the form is sent in the background and
 * the reply shows in place; without it, the browser posts it and Netlify
 * shows its own confirmation page.
 */

const FORM_NAME = "contact";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ t, email, privacyHref }: { t: ContactFormText; email: string; privacyHref: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const data = new FormData(event.currentTarget);
    const body = new URLSearchParams(Array.from(data.entries(), ([k, v]) => [k, String(v)])).toString();
    try {
      // Posted to the page itself: "/" redirects by language (netlify.toml).
      const response = await fetch(window.location.pathname, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="border-l-4 border-gold bg-surface px-6 py-5 text-lg font-medium">
        {t.sent}
      </p>
    );
  }

  const field =
    "mt-1.5 block w-full rounded-md border border-field bg-surface px-3.5 py-2.5 text-[15px] text-fg focus:border-ink focus:outline-2 focus:outline-offset-1 focus:outline-gold";

  return (
    <form name={FORM_NAME} method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={onSubmit} className="space-y-5">
      <input type="hidden" name="form-name" value={FORM_NAME} />
      {/* Honeypot: invisible to people, filled in by spam bots. */}
      <p className="hidden" aria-hidden="true">
        <label>
          Ne pas remplir / Do not fill <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-bold">
          {t.name}
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="block text-sm font-bold">
          {t.email}
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block text-sm font-bold">
        {t.company} <span className="font-normal text-muted">({t.optional})</span>
        <input name="company" autoComplete="organization" className={field} />
      </label>
      <label className="block text-sm font-bold">
        {t.message}
        <span className="mt-0.5 block font-normal text-muted">{t.messageHint}</span>
        <textarea name="message" required rows={7} className={field} />
      </label>

      <p className="text-[13px] text-muted">
        {t.consent}{" "}
        <Link href={privacyHref} className="link">
          {t.privacy}
        </Link>
        .
      </p>

      {status === "error" ? (
        <p role="alert" className="rounded-md bg-danger-soft px-4 py-3 text-sm text-danger">
          {t.error}{" "}
          <a href={`mailto:${email}`} className="font-bold underline">
            {email}
          </a>
          .
        </p>
      ) : null}

      <button type="submit" className="btn-primary" disabled={status === "sending"}>
        {status === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
}
