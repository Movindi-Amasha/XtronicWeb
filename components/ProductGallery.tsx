"use client";

import { useRef, useState } from "react";
import ProductImage from "./ProductImage";

const SWIPE_THRESHOLD_PX = 50;

type Slide = { type: "video"; src: string } | { type: "image"; src: string };

function VideoSlide({ src, poster }: { src: string; poster?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        controls
        playsInline
        preload="metadata"
        className="h-full w-full object-contain"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <track kind="captions" />
      </video>

      {!isPlaying && (
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => videoRef.current?.play()}
          aria-label="Play video"
          className="absolute inset-0 flex items-center justify-center bg-brand-navy/10 transition-colors hover:bg-brand-navy/15"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-brand-navy shadow-lg transition-transform hover:scale-105">
            <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}

export default function ProductGallery({
  images,
  video,
  alt,
  emoji,
  badge,
}: {
  images: string[];
  video?: string | null;
  alt: string;
  emoji: string;
  badge?: string;
}) {
  const [index, setIndex] = useState(0);
  const [dragPx, setDragPx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);

  const slides: Slide[] = [
    ...(video ? [{ type: "video", src: video } as const] : []),
    ...images.map((src) => ({ type: "image", src }) as const),
  ];

  const count = slides.length;
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
          {slides.map((slide, i) => (
            <div
              key={slide.src}
              className="relative h-full shrink-0"
              style={{ width: `${100 / count}%` }}
              aria-hidden={i !== index}
            >
              {slide.type === "video" ? (
                <VideoSlide src={slide.src} poster={images[0]} />
              ) : (
                <ProductImage src={slide.src} alt={`${alt}, photo ${i + 1} of ${count}`} emoji={emoji} />
              )}
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
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous"
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-lg text-brand-navy shadow transition-opacity hover:bg-surface disabled:opacity-0"
            >
              ‹
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => goTo(index + 1)}
              disabled={index === count - 1}
              aria-label="Next"
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-surface/90 text-lg text-brand-navy shadow transition-opacity hover:bg-surface disabled:opacity-0"
            >
              ›
            </button>
          </>
        )}
      </div>

      {canSwipe && (
        <div className="flex items-center justify-center gap-2">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => goTo(i)}
              aria-label={slide.type === "video" ? "Go to video" : `Go to photo ${i + 1}`}
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
