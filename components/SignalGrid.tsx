"use client";

import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import signalGrids from "@/lib/generated/signalGrids.json";
import { products } from "@/lib/products";

type GridData = { slug: string; size: number; cells: (string | null)[] };
const GRIDS = signalGrids as Record<string, GridData>;

const SHORT_LABELS: Record<string, string> = {
  "solar-4wd-rover": "4WD Rover",
  "wooden-taxiing-aircraft": "Aircraft",
  "solar-speedboat": "Speedboat",
  "voice-robot": "Voice Robot",
  "solar-butterfly": "Butterfly",
};

const MODES = products
  .filter((p) => GRIDS[p.slug])
  .map((p) => ({
    slug: p.slug,
    label: SHORT_LABELS[p.slug] ?? p.name.replace(/^[^\w]+/, "").trim(),
    fullName: p.name.replace(/^[^\w]+/, "").trim(),
  }));

const AUTO_ADVANCE_MS = 4800;
const DISSOLVE_MS = 380;

// Deterministic pseudo-random in [0, 1) — pure function of the seed, so
// server and client render the same per-cell delays with no hydration diff.
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

export default function SignalGrid() {
  const reduceMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(0);
  const [dissolving, setDissolving] = useState(false);

  const shownIndex = reduceMotion ? index : displayIndex;
  const displayMode = MODES[shownIndex];
  const grid = displayMode ? GRIDS[displayMode.slug] : undefined;

  // Adjust state during render (React's recommended pattern) when the
  // target index changes, instead of setState in an effect body.
  if (!reduceMotion && index !== prevIndex && !dissolving) {
    setPrevIndex(index);
    setDissolving(true);
  }

  useEffect(() => {
    if (reduceMotion || MODES.length < 2) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % MODES.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [index, reduceMotion]);

  useEffect(() => {
    if (!dissolving) return;
    const t = setTimeout(() => {
      setDisplayIndex(index);
      setDissolving(false);
    }, DISSOLVE_MS);
    return () => clearTimeout(t);
  }, [dissolving, index]);

  // Per-cell dissolve delay only — no continuous per-cell animation, which is
  // what made the grid look like flickering noise instead of a stable shape.
  const cellDelays = useMemo(() => {
    const size = grid?.cells.length ?? 0;
    return Array.from({ length: size }, (_, i) => `${(seededRandom(i) * 0.22).toFixed(2)}s`);
  }, [grid?.cells.length]);

  if (!grid || !displayMode) return null;

  return (
    <section
      aria-labelledby="signal-grid-heading"
      className="relative overflow-hidden bg-brand-navy py-16"
    >
      <div className="mx-auto max-w-[1260px] px-4 md:px-6">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-brand-blue-50/60">
          Every kit speaks circuits
        </p>
        <h2
          id="signal-grid-heading"
          className="mt-2 font-heading text-3xl font-bold text-white md:text-4xl"
        >
          The board comes alive.
        </h2>

        <div className="relative mx-auto mt-8 w-full max-w-[440px] overflow-hidden rounded-card border border-white/10 bg-black/25 p-3">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent motion-safe:animate-[signal-sweep_5s_ease-in-out_infinite]"
          />

          <div
            aria-hidden
            className="relative grid w-full gap-px"
            style={{ gridTemplateColumns: `repeat(${grid.size}, 1fr)` }}
          >
            {grid.cells.map((color, i) => (
              <span
                key={i}
                className="aspect-square"
                style={{
                  backgroundColor: color ?? "rgba(255,255,255,0.05)",
                  opacity: dissolving ? 0 : 1,
                  transition: `opacity ${DISSOLVE_MS}ms ease ${cellDelays[i] ?? "0s"}, background-color ${DISSOLVE_MS}ms ease ${cellDelays[i] ?? "0s"}`,
                }}
              />
            ))}
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-navy/95 via-brand-navy/50 to-transparent px-4 pb-3 pt-10">
            <p
              className="text-center font-mono text-sm font-bold uppercase tracking-[0.1em] text-white transition-opacity ease-out"
              style={{ opacity: dissolving ? 0 : 1, transitionDuration: `${DISSOLVE_MS}ms` }}
            >
              {displayMode.fullName}
            </p>
          </div>
        </div>

        <div
          role="group"
          aria-label="Choose a kit to display"
          className="mt-5 flex flex-wrap justify-center gap-2"
        >
          {MODES.map((m, i) => (
            <button
              key={m.slug}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={index === i}
              aria-label={`Show ${m.fullName}`}
              className={`rounded-btn-xs px-3 py-2 font-mono text-[11px] font-medium uppercase tracking-wide transition-colors ${
                index === i
                  ? "bg-brand-amber text-brand-navy"
                  : "border border-white/15 text-brand-blue-50/70 hover:bg-white/10"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
