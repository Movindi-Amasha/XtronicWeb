"use client";

import { useActionState } from "react";
import type { AdminActionResult } from "@/lib/adminAuth";

const TONES = {
  danger: "bg-brand-red text-white hover:opacity-90",
  quiet: "border-2 border-line bg-white text-brand-navy hover:border-brand-red hover:text-brand-red",
} as const;

/**
 * A one-button form for an admin Server Action that asks "are you sure?"
 * first (refunds and cancellations can't be undone) and shows the result.
 */
export default function ConfirmActionButton({
  action,
  fields,
  label,
  pendingLabel,
  confirmMessage,
  tone = "quiet",
}: {
  action: (prev: AdminActionResult, formData: FormData) => Promise<AdminActionResult>;
  fields: Record<string, string>;
  label: string;
  pendingLabel: string;
  confirmMessage: string;
  tone?: keyof typeof TONES;
}) {
  const [result, formAction, pending] = useActionState(action, null);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        if (!window.confirm(confirmMessage)) e.preventDefault();
      }}
      className="inline-flex flex-col items-start gap-1"
    >
      {Object.entries(fields).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <button
        type="submit"
        disabled={pending}
        className={`whitespace-nowrap rounded-btn px-3.5 py-2 text-xs font-bold disabled:opacity-60 ${TONES[tone]}`}
      >
        {pending ? pendingLabel : label}
      </button>
      {result?.error && <span role="alert" className="max-w-[260px] text-xs font-bold text-brand-red">{result.error}</span>}
      {result?.ok && <span className="max-w-[260px] text-xs font-bold text-brand-green-700">{result.ok}</span>}
    </form>
  );
}
