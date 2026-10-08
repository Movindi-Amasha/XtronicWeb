"use client";

import { useState } from "react";

type Variant = "footer" | "band";

export default function NewsletterForm({ variant = "footer" }: { variant?: Variant }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [code, setCode] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const email = new FormData(e.currentTarget).get("email");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong");
      setCode(data.code);
      setState("done");
    } catch {
      setState("error");
    }
  }

  const isBand = variant === "band";

  if (state === "done") {
    return (
      <div
        className={
          isBand
            ? "w-full max-w-md rounded-[18px] bg-white p-5"
            : "mt-6 max-w-sm rounded-card border border-white/20 bg-white/10 p-4"
        }
      >
        <p className={`text-sm font-bold ${isBand ? "text-brand-navy" : "text-white"}`}>
          You&apos;re in! 🎉
        </p>
        <p className={`mt-1 text-sm ${isBand ? "text-brand-navy-700" : "text-brand-blue-50"}`}>
          Your code: <span className="font-mono font-bold">{code}</span>
        </p>
      </div>
    );
  }

  return (
    <div className={isBand ? "w-full max-w-md" : "mt-6 max-w-sm"}>
      <form
        onSubmit={handleSubmit}
        className={
          isBand
            ? "flex flex-col gap-2 rounded-[18px] bg-white p-2 sm:flex-row sm:gap-2.5"
            : "flex gap-2"
        }
        aria-label="Newsletter signup"
      >
        <label htmlFor={`newsletter-email-${variant}`} className="sr-only">
          Email address
        </label>
        <input
          id={`newsletter-email-${variant}`}
          name="email"
          type="email"
          required
          placeholder="Your email address"
          className={
            isBand
              ? "min-w-0 flex-1 rounded-lg border-0 bg-transparent px-3 py-3 text-sm sm:py-0 font-bold text-brand-navy placeholder:text-muted focus:outline-none"
              : "min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/50 focus-visible:outline-brand-amber"
          }
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className={
            isBand
              ? "btn-brick shrink-0 rounded-btn bg-brand-amber px-6 py-3 font-heading text-sm font-semibold text-white disabled:opacity-60"
              : "shrink-0 rounded-full bg-brand-amber px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-brand-navy focus-visible:outline-brand-amber disabled:opacity-60"
          }
          style={isBand ? ({ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties) : undefined}
        >
          {state === "loading" ? "..." : "Get 10% off"}
        </button>
      </form>
      {state === "error" && (
        <p
          role="alert"
          className={`mt-2 text-xs font-bold ${isBand ? "text-brand-amber-600" : "text-brand-amber"}`}
        >
          Something went wrong, please try again.
        </p>
      )}
    </div>
  );
}
