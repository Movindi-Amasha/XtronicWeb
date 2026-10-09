"use client";

import { useState } from "react";

const TOPICS = ["Order help", "Product question", "School or club enquiry", "Returns or replacement parts", "Something else"];

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          topic: form.get("topic"),
          message: form.get("message"),
        }),
      });
      if (!response.ok) throw new Error("Message could not be sent");
      formElement.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[24px] border border-brand-green/20 bg-brand-green-50 p-8 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-brand-green text-2xl text-white">✓</span>
        <h3 className="mt-4 font-heading text-2xl font-bold text-brand-navy">Message sent!</h3>
        <p className="mt-2 text-sm font-semibold text-muted">Thanks for getting in touch. We&apos;ll get back to you as soon as we can.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-5 font-heading text-sm font-bold text-brand-blue hover:underline">Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-bold text-brand-navy">Your name</label>
        <input id="contact-name" name="name" autoComplete="name" required maxLength={100} className="w-full rounded-btn border-2 border-line bg-white px-4 py-3 text-sm font-semibold outline-none transition-colors focus:border-brand-blue" placeholder="e.g. Alex Smith" />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1.5 block text-sm font-bold text-brand-navy">Email address</label>
        <input id="contact-email" name="email" type="email" autoComplete="email" required maxLength={254} className="w-full rounded-btn border-2 border-line bg-white px-4 py-3 text-sm font-semibold outline-none transition-colors focus:border-brand-blue" placeholder="you@example.com" />
      </div>
      <div>
        <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-bold text-brand-navy">Phone <span className="font-medium text-muted">(optional)</span></label>
        <input id="contact-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} className="w-full rounded-btn border-2 border-line bg-white px-4 py-3 text-sm font-semibold outline-none transition-colors focus:border-brand-blue" placeholder="Your number" />
      </div>
      <div>
        <label htmlFor="contact-topic" className="mb-1.5 block text-sm font-bold text-brand-navy">What can we help with?</label>
        <select id="contact-topic" name="topic" className="w-full rounded-btn border-2 border-line bg-white px-4 py-3 text-sm font-semibold outline-none transition-colors focus:border-brand-blue">
          {TOPICS.map((topic) => <option key={topic}>{topic}</option>)}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-bold text-brand-navy">Your message</label>
        <textarea id="contact-message" name="message" required minLength={10} maxLength={4000} rows={5} className="w-full resize-y rounded-btn border-2 border-line bg-white px-4 py-3 text-sm font-semibold outline-none transition-colors focus:border-brand-blue" placeholder="Tell us a little about how we can help…" />
      </div>
      {status === "error" && <p role="alert" className="text-sm font-bold text-brand-red sm:col-span-2">We couldn&apos;t send your message right now. Please try again later or check the help links.</p>}
      <button type="submit" disabled={status === "sending"} className="btn-brick inline-flex w-full items-center justify-center gap-2 rounded-btn bg-brand-amber px-6 py-3.5 font-heading font-bold text-white disabled:cursor-wait disabled:opacity-60 sm:col-span-2 sm:w-fit" style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}>
        {status === "sending" ? "Sending…" : "Send your message"}<span aria-hidden>→</span>
      </button>
    </form>
  );
}
