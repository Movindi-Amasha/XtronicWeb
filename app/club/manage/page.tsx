"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { formatPriceAUD } from "@/lib/products";

type Status = "active" | "suspended" | "cancelled";
type Action = "pause" | "resume" | "cancel";

interface Membership {
  id: string;
  status: Status;
  priceCents: number;
  startedAt: string | null;
  cancelledAt: string | null;
  nextBillingAt: string | null;
}

const STATUS_LABEL: Record<Status, { text: string; tone: string }> = {
  active: { text: "Active", tone: "bg-brand-green/15 text-brand-green-700" },
  suspended: { text: "Paused", tone: "bg-brand-amber-50 text-brand-amber-600" },
  cancelled: { text: "Cancelled", tone: "bg-line text-muted" },
};

function formatDate(iso: string | null): string {
  return iso ? new Date(iso).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : "—";
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-4 py-16 md:px-6">
      <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-amber">XTRONIC Club</span>
      {children}
    </section>
  );
}

function RequestLink() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/club/manage/link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <Shell>
      <h1 className="mt-2 font-heading text-3xl font-bold text-brand-navy">Manage your membership</h1>
      {state === "sent" ? (
        <p className="mt-4 rounded-card border-2 border-line bg-white p-5 font-semibold text-brand-navy">
          If <strong>{email}</strong> has a Club membership, a sign-in link is on its way. It works
          for 1 hour, so check your inbox (and spam folder).
        </p>
      ) : (
        <>
          <p className="mt-2 text-lg font-semibold text-muted">
            Enter the email you joined with and we&apos;ll send you a link to pause or cancel your
            membership. No password needed.
          </p>
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
            <label htmlFor="club-manage-email" className="sr-only">Email address</label>
            <input
              id="club-manage-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="min-w-0 flex-1 rounded-btn border-2 border-line bg-white px-4 py-3 font-bold text-brand-navy placeholder:text-muted focus:border-brand-blue focus:outline-none"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="btn-brick rounded-btn bg-brand-amber px-6 py-3 font-heading font-semibold text-white disabled:opacity-60"
              style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}
            >
              {state === "loading" ? "Sending…" : "Email me a link"}
            </button>
          </form>
          {state === "error" && (
            <p role="alert" className="mt-3 text-sm font-bold text-brand-amber-600">
              Something went wrong, please try again.
            </p>
          )}
        </>
      )}
    </Shell>
  );
}

function MembershipCard({
  membership,
  busy,
  onAction,
}: {
  membership: Membership;
  busy: boolean;
  onAction: (action: Action) => void;
}) {
  const [confirmingCancel, setConfirmingCancel] = useState(false);
  const label = STATUS_LABEL[membership.status];

  return (
    <div className="mt-6 rounded-card border-2 border-line bg-white p-5 sm:p-6">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-heading text-xl font-semibold text-brand-navy">Monthly STEM kit</h2>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${label.tone}`}>{label.text}</span>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
        <dt className="font-bold text-muted">Price</dt>
        <dd className="font-bold text-brand-navy">{formatPriceAUD(membership.priceCents)} / month</dd>
        <dt className="font-bold text-muted">Member since</dt>
        <dd className="font-bold text-brand-navy">{formatDate(membership.startedAt)}</dd>
        {membership.status === "active" && (
          <>
            <dt className="font-bold text-muted">Next payment</dt>
            <dd className="font-bold text-brand-navy">{formatDate(membership.nextBillingAt)}</dd>
          </>
        )}
        {membership.status === "cancelled" && (
          <>
            <dt className="font-bold text-muted">Cancelled on</dt>
            <dd className="font-bold text-brand-navy">{formatDate(membership.cancelledAt)}</dd>
          </>
        )}
      </dl>

      {membership.status !== "cancelled" && (
        <div className="mt-6 border-t border-line pt-5">
          {confirmingCancel ? (
            <div>
              <p className="font-bold text-brand-navy">
                Cancel for good? You won&apos;t be charged again and no more kits will ship.
              </p>
              <div className="mt-3 flex flex-wrap gap-2.5">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onAction("cancel")}
                  className="rounded-btn bg-brand-red px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60"
                >
                  {busy ? "Cancelling…" : "Yes, cancel membership"}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setConfirmingCancel(false)}
                  className="rounded-btn border-2 border-line px-5 py-2.5 text-sm font-bold text-brand-navy"
                >
                  Keep it
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2.5">
              {membership.status === "active" ? (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onAction("pause")}
                  className="btn-brick rounded-btn bg-brand-yellow px-5 py-2.5 text-sm font-heading font-semibold text-brand-navy disabled:opacity-60"
                  style={{ "--btn-brick-shadow": "var(--color-brand-yellow-600)" } as React.CSSProperties}
                >
                  {busy ? "Pausing…" : "Pause membership"}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => onAction("resume")}
                  className="btn-brick rounded-btn bg-brand-green px-5 py-2.5 text-sm font-heading font-semibold text-white disabled:opacity-60"
                  style={{ "--btn-brick-shadow": "var(--color-brand-green-700)" } as React.CSSProperties}
                >
                  {busy ? "Resuming…" : "Resume membership"}
                </button>
              )}
              <button
                type="button"
                disabled={busy}
                onClick={() => setConfirmingCancel(true)}
                className="rounded-btn border-2 border-line px-5 py-2.5 text-sm font-bold text-muted hover:border-brand-red hover:text-brand-red"
              >
                Cancel membership
              </button>
            </div>
          )}
          {membership.status === "active" && !confirmingCancel && (
            <p className="mt-3 text-xs font-semibold text-muted">
              Pausing stops payments and deliveries until you resume.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

type MembershipData = { email: string; subscriptions: Membership[] };

async function fetchMemberships(token: string): Promise<MembershipData> {
  const res = await fetch("/api/club/manage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Something went wrong");
  return json;
}

function Dashboard({ token }: { token: string }) {
  const [data, setData] = useState<MembershipData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchMemberships(token)
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function handleAction(id: string, action: Action) {
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch("/api/club/manage/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, subscriptionId: id, action }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Something went wrong");
      setData(await fetchMemberships(token));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusyId(null);
    }
  }

  if (!data) {
    return (
      <Shell>
        <h1 className="mt-2 font-heading text-3xl font-bold text-brand-navy">
          {error ? "That link didn't work" : "Loading your membership…"}
        </h1>
        {error && (
          <>
            <p className="mt-2 font-semibold text-muted">{error}</p>
            <Link href="/club/manage" className="mt-5 font-extrabold text-brand-blue hover:text-brand-blue-600">
              Send me a new link →
            </Link>
          </>
        )}
      </Shell>
    );
  }

  return (
    <Shell>
      <h1 className="mt-2 font-heading text-3xl font-bold text-brand-navy">Your membership</h1>
      <p className="mt-1 font-semibold text-muted">Signed in as {data.email}</p>
      {error && (
        <p role="alert" className="mt-4 rounded-card bg-brand-amber-50 p-4 text-sm font-bold text-brand-amber-600">
          {error}
        </p>
      )}
      {data.subscriptions.length === 0 ? (
        <p className="mt-6 font-semibold text-brand-navy">We couldn&apos;t find a membership for this email.</p>
      ) : (
        data.subscriptions.map((m) => (
          <MembershipCard key={m.id} membership={m} busy={busyId === m.id} onAction={(a) => handleAction(m.id, a)} />
        ))
      )}
    </Shell>
  );
}

function ManageContent() {
  const token = useSearchParams().get("token");
  return token ? <Dashboard token={token} /> : <RequestLink />;
}

export default function ClubManagePage() {
  return (
    <Suspense fallback={null}>
      <ManageContent />
    </Suspense>
  );
}
