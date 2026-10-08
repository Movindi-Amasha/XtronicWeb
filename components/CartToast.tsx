"use client";

import { useEffect } from "react";
import { useCartStore } from "@/lib/cartStore";

export default function CartToast() {
  const { toastMessage, dismissToast } = useCartStore();

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(dismissToast, 2500);
    return () => clearTimeout(timer);
  }, [toastMessage, dismissToast]);

  if (!toastMessage) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="toast-pop fixed bottom-20 left-1/2 z-[9999] -translate-x-1/2 rounded-full border border-brand-navy/10 bg-brand-green px-5 py-3 text-sm font-bold text-brand-navy md:bottom-6"
    >
      {toastMessage}
    </div>
  );
}
