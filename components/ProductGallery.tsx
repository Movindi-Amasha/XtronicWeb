"use client";

import { useRef, useState } from "react";
import ProductImage from "./ProductImage";

const SWIPE_THRESHOLD_PX = 50;

export default function ProductGallery({
  images,
  alt,
  emoji,
  badge,
}: {
  images: string[];
  alt: string;
  emoji: string;
  badge?: string;
}) {
  const [index, setIndex] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);

  const count = images.length;
  const canSwipe = count > 1;

  function goTo(next: number) {
    setIndex(Math.max(0, Math.min(count - 1, next)));
  }

  function handlePointerDown(e: React.PointerEvent) {
    if (!canSwipe) return;
    dragStartX.current = e.clientX;
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (dragStartX.current === null) return;
    setDragPx(e.clientX - dragStartX.current);
  }

  function handlePointerUp() {
    if (dragStartX.current === null) return;
    if (dragPx <= -SWIPE_THRESHOLD_PX) goTo(index + 1);
    else if (dragPx >= SWIPE_THRESHOLD_PX) goTo(index - 1);
    dragStartX.current = null;
    setIsDragging(false);
    setDragPx(0);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!canSwipe) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    }
  }

  const offsetPct = count > 0 ? -index * (100 / count) : 0;

  return (
    <div className="flex flex-col gap-3">
      <div
        className="relative aspect-square w-full touch-pan-y select-none overflow-hidden rounded-card bg-brand-blue-50"
        role="group"
        aria-roledescription="carousel"
        aria-label={`${alt} photos`}
        tabIndex={canSwipe ? 0 : -1}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          className="flex h-full"
          style={{
            width: `${count * 100}%`,
            transform: `translateX(calc(${offsetPct}% + ${dragPx}px))`,
            transition: isDragging ? "none" : "transform 0.3s ease",
          }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              className="relative h-full shrink-0"
              style={{ width: `${100 / count}%` }}
              aria-hidden={i !== index}
            >
              <ProductImage src={src} alt={`${alt} — photo ${i + 1} of ${count}`} emoji={emoji} />
            </div>
          ))}
        </div>

        {badge && (
          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-surface/90 px-3 py-1.5 text-sm font-bold text-brand-navy shadow">
            {badge}
          </span>
        )}

        {canSwipe && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-lg text-brand-navy shadow transition-opacity hover:bg-surface disabled:opacity-0"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={index === count - 1}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-lg text-brand-navy shadow transition-opacity hover:bg-surface disabled:opacity-0"
            >
              ›
            </button>
          </>
        )}
      </div>

      {canSwipe && (
        <div className="flex items-center justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-brand-blue" : "w-2 bg-line hover:bg-brand-blue/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
