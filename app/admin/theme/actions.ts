"use server";

import { headers } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { isAdminAuthorization } from "@/lib/adminAuth";
import { isThemeId, type ThemeSetting } from "@/lib/seasonalThemes";
import { THEME_CACHE_TAG, THEME_SETTING_KEY } from "@/lib/siteTheme";

export async function saveThemeSetting(formData: FormData) {
  // Server Actions are reachable by direct POST, so re-check the admin login.
  if (!isAdminAuthorization((await headers()).get("authorization"))) {
    throw new Error("Unauthorized");
  }

  const rawMode = String(formData.get("mode") ?? "auto");
  const mode = rawMode === "off" || isThemeId(rawMode) ? rawMode : "auto";
  const message = String(formData.get("message") ?? "").trim().slice(0, 160);
  const setting: ThemeSetting = { mode, ...(message ? { message } : {}) };

  try {
    await db.siteSetting.upsert({
      where: { key: THEME_SETTING_KEY },
      update: { value: JSON.stringify(setting) },
      create: { key: THEME_SETTING_KEY, value: JSON.stringify(setting) },
    });
  } catch (err) {
    // Most likely the SiteSetting table doesn't exist yet (it's created by
    // `prisma db push` on deploy). Report it on the page instead of crashing.
    console.error("Saving the theme setting failed:", err);
    redirect("/admin/theme?error=1");
  }

  // Show the change on every page straight away.
  revalidateTag(THEME_CACHE_TAG, { expire: 0 });
  revalidatePath("/", "layout");
  redirect("/admin/theme?saved=1");
}
