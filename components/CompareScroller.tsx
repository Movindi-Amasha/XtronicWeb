"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LOGO } from "@/lib/brandColors";

// Horizontal pager for the "Compare Our STEM Kits" table on the shop page.
// The table (server-rendered, passed as children) sizes its kit columns from
// two CSS variables set here: --label (the sticky feature column) and
// --visible (kit columns per view: 2 on phones, 3 from md up). Side arrows
// page by one view, dots jump to a kit, and swiping/trackpad scrolling snaps
// to whole columns. New kits in lib/products.ts just become more pages.

type View = { first: number; visible: number; label: number; top: number; atStart: boolean; atEnd: boolean };

function Arrow({ dir, hidden, onClick, style }: { dir: 1 | -1; hidden: boolean; onClick: () => void; style: React.CSSProperties }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={hidden}
      aria-label={dir < 0 ? "Previous kits" : "Next kits"}
      className={`absolute z-20 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border-[3px] border-white text-white shadow-[0_6px_14px_-4px_rgba(13,31,53,0.45)] transition-[opacity,scale,background-color] duration-300 hover:scale-110 disabled:pointer-events-none disabled:opacity-0 sm:h-11 sm:w-11 ${
        dir < 0 ? "-translate-x-1/2" : "translate-x-[35%] sm:translate-x-1/2"
      }`}
      style={{ background: LOGO.blue, ...style }}
    >
      <svg aria-hidden viewBox="0 0 24 24" className={`h-5 w-5 ${dir > 0 ? "arrow-nudge" : ""}`} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        <path d={dir < 0 ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
      </svg>
    </button>
  );
}

export default function CompareScroller({ count, children }: { count: number; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [view, setView] = useState<View>({ first: 0, visible: 3, label: 180, top: 90, atStart: true, atEnd: count <= 3 });

  // Read the live layout (column widths, scroll position) once per frame.
  const measure = useCallback(() => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const el = ref.current;
      if (!el) return;
      const heads = el.querySelectorAll<HTMLElement>("thead th");
      const label = heads[0]?.offsetWidth ?? 0;
      const col = heads[1]?.offsetWidth || 1;
      setView({
        first: Math.round(el.scrollLeft / col),
        visible: Math.max(1, Math.round((el.clientWidth - label) / col)),
        label,
        top: (el.querySelector("thead")?.offsetHeight ?? 180) / 2,
        atStart: el.scrollLeft < 4,
        atEnd: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    });
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Fires once on observe (initial measure) and again on any resize.
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame.current);
    };
  }, [measure]);

  const columnWidth = () => ref.current?.querySelector<HTMLElement>("thead th:nth-child(2)")?.offsetWidth ?? 0;
  const page = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * columnWidth() * view.visible, behavior: "smooth" });
  const goTo = (i: number) => ref.current?.scrollTo({ left: i * columnWidth(), behavior: "smooth" });

  const fits = view.atStart && view.atEnd;
  const last = Math.min(count, view.first + view.visible);

  return (
    <div>
      <div className="relative">
        <div
          ref={ref}
          onScroll={measure}
          role="region"
          aria-label="Kit comparison. Scroll sideways or use the arrows to see more kits."
          tabIndex={0}
          className="snap-x snap-mandatory overflow-x-auto overscroll-x-contain rounded-card border-2 border-line bg-white [container-type:inline-size] [scroll-padding-left:var(--label)] [scrollbar-width:none] [--label:112px] [--visible:2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue sm:[--label:170px] md:[--visible:3] lg:[--label:180px] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </div>
        {!fits && (
          <>
            <Arrow dir={-1} hidden={view.atStart} onClick={() => page(-1)} style={{ left: view.label + 2, top: view.top + 2 }} />
            <Arrow dir={1} hidden={view.atEnd} onClick={() => page(1)} style={{ right: 0, top: view.top + 2 }} />
          </>
        )}
      </div>

      {!fits && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {Array.from({ length: count }, (_, i) => {
            const on = i >= view.first && i < last;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show kit ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${on ? "w-6 bg-brand-amber" : "w-2.5 bg-line hover:bg-brand-blue/40"}`}
              />
            );
          })}
          <span className="ml-1 text-xs font-bold text-muted" aria-live="polite">
            {view.first + 1}–{last} of {count} kits
          </span>
        </div>
      )}
    </div>
  );
}
