"use client";

import { useCurrencyStore } from "@/lib/currencyStore";
import {
  SUPPORTED_CURRENCIES,
  CURRENCY_SYMBOLS,
  CURRENCY_FLAGS,
  isSupportedCurrency,
} from "@/lib/currency";

export default function CurrencySelector({ className = "" }: { className?: string }) {
  const currency = useCurrencyStore((s) => s.currency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);

  return (
    <label className={`relative items-center ${className}`}>
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => {
          if (isSupportedCurrency(e.target.value)) setCurrency(e.target.value);
        }}
        className="appearance-none rounded-btn-xs border border-white/15 bg-white/5 py-1.5 pl-3 pr-7 font-mono text-xs font-medium uppercase tracking-wide text-brand-blue-50/80 transition-colors hover:bg-white/10 focus-visible:outline-brand-amber"
      >
        {SUPPORTED_CURRENCIES.map((code) => (
          <option key={code} value={code} className="bg-brand-navy text-white">
            {CURRENCY_FLAGS[code]} {CURRENCY_SYMBOLS[code]}
          </option>
        ))}
      </select>
      <svg
        aria-hidden
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-2.5 top-1/2 h-2 w-2.5 -translate-y-1/2 text-brand-blue-50/60"
        fill="none"
      >
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </label>
  );
}
