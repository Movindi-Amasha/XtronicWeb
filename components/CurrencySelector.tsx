"use client";

import { useCurrencyStore } from "@/lib/currencyStore";
import { SUPPORTED_CURRENCIES, isSupportedCurrency } from "@/lib/currency";

export default function CurrencySelector({ className = "" }: { className?: string }) {
  const currency = useCurrencyStore((s) => s.currency);
  const setCurrency = useCurrencyStore((s) => s.setCurrency);

  return (
    <label className={`flex items-center gap-1 text-xs font-bold text-brand-navy ${className}`}>
      <span className="sr-only">Currency</span>
      <select
        value={currency}
        onChange={(e) => {
          if (isSupportedCurrency(e.target.value)) setCurrency(e.target.value);
        }}
        className="rounded-btn-xs border border-line bg-surface px-2 py-1.5 text-xs font-bold text-brand-navy focus-visible:outline-brand-blue-deep"
      >
        {SUPPORTED_CURRENCIES.map((code) => (
          <option key={code} value={code}>
            {code}
          </option>
        ))}
      </select>
    </label>
  );
}
