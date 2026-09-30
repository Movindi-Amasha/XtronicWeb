import { create } from "zustand";

interface QuickViewState {
  openSlug: string | null;
  open: (slug: string) => void;
  close: () => void;
}

export const useQuickViewStore = create<QuickViewState>((set) => ({
  openSlug: null,
  open: (slug) => set({ openSlug: slug }),
  close: () => set({ openSlug: null }),
}));
