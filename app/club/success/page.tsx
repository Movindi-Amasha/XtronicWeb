"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
  const searchParams = useSearchParams();
  const subscriptionId = searchParams.get("subscription_id");

  const [state, setState] = useState<"confirming" | "done" | "error">(
    subscriptionId ? "confirming" : "error"
  );

  useEffect(() => {
    if (!subscriptionId) return;

    let cancelled = false;
    fetch("/api/subscribe/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subscriptionId }),
    })
      .then((res) => {
        if (cancelled) return;
        setState(res.ok ? "done" : "error");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [subscriptionId]);

  if (state === "confirming") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <h1 className="font-heading text-2xl font-bold text-brand-navy">
          Setting up your membership&hellip;
        </h1>
      </section>
    );
  }

  if (state === "error") {
    return (
      <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center md:px-6">
        <h1 className="font-heading text-2xl font-bold text-brand-navy">
          We couldn&apos;t confirm that subscription
        </h1>
        <p className="mt-2 text-brand-navy-700">
          If PayPal charged you, contact us with your receipt and we&apos;ll
          sort it out, otherwise no subscription was started.
        </p>
        <Link
          href="/#subscribe"
          className="mt-6 inline-block rounded-full bg-brand-blue px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
        >
          Back to the Club
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <span className="text-5xl">🎉</span>
      <h1 className="mt-4 font-heading text-3xl font-extrabold text-brand-navy">
        You&apos;re a member!
      </h1>
      <p className="mt-2 text-brand-navy-700">
        Welcome to the XTRONIC Club. A confirmation email is on its way, and
        your first kit will ship soon.
      </p>
      <Link
        href="/shop"
        className="mt-6 inline-block rounded-full bg-brand-blue px-7 py-3.5 text-base font-bold uppercase tracking-wide text-white transition-transform hover:-translate-y-0.5 hover:opacity-90"
      >
        Keep Exploring Kits
      </Link>
    </section>
  );
}

export default function ClubSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessContent />
    </Suspense>
  );
}
