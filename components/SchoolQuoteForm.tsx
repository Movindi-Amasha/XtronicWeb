"use client";

import { useState } from "react";

export default function SchoolQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (submitted) {
    return (
      <div className="rounded-card bg-brand-green-50 p-8 text-center">
        <p className="text-3xl">✅</p>
        <h3 className="mt-3 font-heading text-xl font-bold text-brand-navy">
          Quote request received
        </h3>
        <p className="mt-2 text-sm text-brand-navy-700">
          We&apos;ll be in touch within one business day with a custom quote
          for your school or club.
        </p>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: form.get("name"),
      school: form.get("school"),
      email: form.get("email"),
      phone: form.get("phone"),
      kitsInterest: form.get("kits"),
      timeframe: form.get("timeframe"),
      message: form.get("message"),
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Something went wrong. Please try again.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-4 rounded-card bg-surface p-6 border border-line sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-sm font-bold text-brand-navy">
          Full name
        </label>
        <input
          id="name"
          name="name"
          required
          className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="school" className="text-sm font-bold text-brand-navy">
          School / organisation
        </label>
        <input
          id="school"
          name="school"
          required
          className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-sm font-bold text-brand-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="phone" className="text-sm font-bold text-brand-navy">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="kits" className="text-sm font-bold text-brand-navy">
          Kits of interest
        </label>
        <select
          id="kits"
          name="kits"
          className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
        >
          <option>10-pack bundle</option>
          <option>30-pack bundle</option>
          <option>Classroom Discovery Pack (mixed)</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="timeframe" className="text-sm font-bold text-brand-navy">
          Timeframe
        </label>
        <select
          id="timeframe"
          name="timeframe"
          className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
        >
          <option>As soon as possible</option>
          <option>Within a month</option>
          <option>This term</option>
          <option>Just exploring</option>
        </select>
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="message" className="text-sm font-bold text-brand-navy">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="rounded-btn border border-line px-4 py-2.5 text-sm focus-visible:outline-brand-blue-deep"
        />
      </div>

      {error && (
        <p className="text-sm font-bold text-red-600 sm:col-span-2" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-brick rounded-btn bg-brand-amber px-7 py-3.5 font-heading text-base font-semibold text-white disabled:opacity-60 sm:col-span-2 sm:w-fit"
        style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
      >
        {submitting ? "Sending..." : "Request School Quote"}
      </button>
    </form>
  );
}
