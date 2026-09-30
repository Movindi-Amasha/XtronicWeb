import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  slug: string;
  name: string;
  emoji: string;
  image: string;
  priceCents: number;
  qty: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  toastMessage: string | null;
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, qty: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  dismissToast: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      toastMessage: null,

      addItem: (item, qty = 1) => {
        const existing = get().items.find((i) => i.slug === item.slug);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.slug === item.slug ? { ...i, qty: i.qty + qty } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, qty }] });
        }
        set({ toastMessage: `Added ${item.name} to cart ✓` });
      },

      removeItem: (slug) => {
        set({ items: get().items.filter((i) => i.slug !== slug) });
      },

      updateQty: (slug, qty) => {
        if (qty <= 0) {
          get().removeItem(slug);
          return;
        }
        set({
          items: get().items.map((i) => (i.slug === slug ? { ...i, qty } : i)),
        });
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      dismissToast: () => set({ toastMessage: null }),
    }),
    {
      name: "xtronic-cart",
      partialize: (state) => ({ items: state.items }),
      skipHydration: true,
    }
  )
);

export function cartSubtotalCents(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.priceCents * i.qty, 0);
}

export function cartItemCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.qty, 0);
}
