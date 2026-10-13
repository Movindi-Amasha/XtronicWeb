import { create } from "zustand";
import type { ThemeId } from "./seasonalThemes";

// The seasonal theme showing in this browser (server choice, or a
// ?theme-preview), so components like the header logo and product cards can
// add their themed touches. Set by SeasonalTheme.
export const useSeasonStore = create<{ season: ThemeId | null; setSeason: (s: ThemeId | null) => void }>((set) => ({
  season: null,
  setSeason: (season) => set({ season }),
}));
