import Link from "next/link";
import { getThemeSetting } from "@/lib/siteTheme";
import { THEMES, THEME_IDS, resolveTheme, themeForDate } from "@/lib/seasonalThemes";
import { saveThemeSetting } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminThemePage({ searchParams }: PageProps<"/admin/theme">) {
  const { saved } = await searchParams;
  const setting = await getThemeSetting();
  const now = new Date();
  const mode = setting?.mode ?? "auto";
  const showing = resolveTheme(setting, now);
  const byDate = themeForDate(now);

  const options = [
    { value: "auto", label: "Automatic", hint: byDate ? `Follows the dates. Today: ${THEMES[byDate].name}` : "Follows the dates. No theme today" },
    { value: "off", label: "Off", hint: "No theme, even during its dates" },
    ...THEME_IDS.map((id) => ({ value: id, label: `Always ${THEMES[id].name}`, hint: `Normally ${THEMES[id].when}` })),
  ];

  return (
    <div className="mx-auto max-w-[860px] px-4 py-10 md:px-6">
      <p className="text-sm font-bold">
        <Link href="/admin/orders" className="text-brand-blue hover:underline">
          ← Orders
        </Link>
      </p>
      <h1 className="mt-2 font-heading text-2xl font-extrabold text-brand-navy">Seasonal theme</h1>
      <p className="mt-1 text-sm font-semibold text-muted">
        Showing on the site now:{" "}
        <strong className="text-brand-navy">{showing ? THEMES[showing].name : "No theme"}</strong>
      </p>
      {saved && (
        <p role="status" className="mt-4 rounded-btn bg-brand-green/15 px-4 py-2 text-sm font-bold text-brand-green-700">
          Saved. The whole site is updated.
        </p>
      )}

      <form action={saveThemeSetting} className="mt-6 flex flex-col gap-6">
        <fieldset className="grid gap-2 sm:grid-cols-2">
          <legend className="mb-2 text-sm font-extrabold text-brand-navy">When to show a theme</legend>
          {options.map((o) => (
            <label key={o.value} className="flex cursor-pointer items-start gap-3 rounded-card border border-line bg-surface p-3 has-[:checked]:border-brand-blue has-[:checked]:bg-brand-blue-50">
              <input type="radio" name="mode" value={o.value} defaultChecked={mode === o.value} className="mt-1" />
              <span>
                <span className="block text-sm font-bold text-brand-navy">{o.label}</span>
                <span className="block text-xs font-semibold text-muted">{o.hint}</span>
              </span>
            </label>
          ))}
        </fieldset>

        <label className="flex flex-col gap-1.5">
          <span className="text-sm font-extrabold text-brand-navy">Banner message (optional)</span>
          <input
            name="message"
            defaultValue={setting?.message ?? ""}
            maxLength={160}
            placeholder="Leave empty to use each theme's own message"
            className="rounded-btn border border-line bg-white px-3 py-2.5 text-sm"
          />
          <span className="text-xs font-semibold text-muted">
            For example: &quot;Use code XMAS10 for 10% off&quot;. Shown next to the theme&apos;s title on larger screens.
          </span>
        </label>

        <button type="submit" className="w-fit rounded-full bg-brand-blue px-6 py-3 text-sm font-bold uppercase tracking-wide text-white hover:opacity-90">
          Save
        </button>
      </form>

      <h2 className="mt-10 font-heading text-lg font-bold text-brand-navy">Preview a theme</h2>
      <p className="mt-1 text-sm font-semibold text-muted">Opens the site with that theme in your browser only. Nobody else sees it.</p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {THEME_IDS.map((id) => (
          <li key={id}>
            <a href={`/?theme-preview=${id}`} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full border-2 border-line bg-white px-4 py-2 text-sm font-bold text-brand-navy hover:border-brand-blue">
              {THEMES[id].name} ↗
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
