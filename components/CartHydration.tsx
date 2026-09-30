"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cartStore";
import { useCurrencyStore } from "@/lib/currencyStore";

export default function CartHydration() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
    useCurrencyStore.persist.rehydrate();
  }, []);

  return null;
}
