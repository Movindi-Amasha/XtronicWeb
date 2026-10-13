import { unstable_cache } from "next/cache";
import { db } from "@/lib/db";
import { isThemeId, resolveTheme, type ThemeSetting } from "@/lib/seasonalThemes";

export const THEME_SETTING_KEY = "theme";
export const THEME_CACHE_TAG = "site-theme";

function parseSetting(raw: string | undefined): ThemeSetting | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(raw) as { mode?: unknown; message?: unknown };
    const mode = v.mode === "auto" || v.mode === "off" || isThemeId(v.mode) ? v.mode : "auto";
    const message = typeof v.message === "string" && v.message.trim() ? v.message.trim() : undefined;
    return { mode, message };
  } catch {
    return null;
  }
}

/** The admin's theme choice. Cached; the admin action refreshes it on save.
 * Falls back to "follow the dates" if the database can't be read (e.g. the
 * SiteSetting table hasn't been created yet). */
export const getThemeSetting = unstable_cache(
  async (): Promise<ThemeSetting | null> => {
    try {
      const row = await db.siteSetting.findUnique({ where: { key: THEME_SETTING_KEY } });
      return parseSetting(row?.value);
    } catch {
      return null;
    }
  },
  ["site-theme-setting"],
  { revalidate: 300, tags: [THEME_CACHE_TAG] }
);

/** The theme to show right now, plus any custom banner message. */
export async function getActiveTheme() {
  const setting = await getThemeSetting();
  return { themeId: resolveTheme(setting, new Date()), message: setting?.message };
}
