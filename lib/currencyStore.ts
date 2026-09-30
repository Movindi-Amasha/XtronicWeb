import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CurrencyCode } from "./currency";

interface CurrencyState {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
}

export const useCurrencyStore = create<CurrencyState>()(
  persist(
    (set) => ({
      currency: "AUD",
      setCurrency: (currency) => set({ currency }),
    }),
    { name: "xtronic-currency", skipHydration: true }
  )
);
