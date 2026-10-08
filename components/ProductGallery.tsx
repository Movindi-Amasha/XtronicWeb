"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ProductImage from "./ProductImage";

const SWIPE_THRESHOLD_PX = 50;

type Slide = { type: "video"; src: string } | { type: "image"; src: string };

function VideoThumb({ poster, emoji, onPlay }: { poster?: string; emoji: string; onPlay: () => void }) {
  return (
    <div className="relative h-full w-full">
      {poster && <ProductImage src={poster} alt="" emoji={emoji} />}
      <button
        type="button"
        onPointerDown={(e) => e.stopPropagation()}
        onClick={onPlay}
        aria-label="Play video"
        className="absolute inset-0 flex items-center justify-center bg-brand-navy/10 transition-colors hover:bg-brand-navy/20"
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-brand-navy shadow-lg transition-transform hover:scale-105">
          <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="ml-1">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    </div>
  );
}

function ModalShell({
  onClose,
  children,
  label,
}: {
  onClose: () => void;
  children: React.ReactNode;
  label: string;
}) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-brand-navy/80 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
      >
        ✕
      </button>
      {children}
    </div>
  );
}

function VideoModal({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  return (
    <ModalShell onClose={onClose} label={`${alt}, video`}>
      <div
        className="relative h-[80vh] w-[90vw] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line jsx-a11y/media-has-caption -- no captions track available for these product demo clips */}
        <video
          src={src}
          controls
          autoPlay
          playsInline
          className="h-full w-full object-contain"
        />
      </div>
    </ModalShell>
  );
}

function ImageModal({
  images,
  index,
  alt,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onPrev, onNext]);

  const count = images.length;

  return (
    <ModalShell onClose={onClose} label={`${alt}, enlarged photo ${index + 1} of ${count}`}>
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            disabled={index === 0}
            aria-label="Previous"
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 disabled:opacity-0 sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            disabled={index === count - 1}
            aria-label="Next"
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 disabled:opacity-0 sm:right-6"
          >
            ›
          </button>
        </>
      )}

      <div
        className="relative h-[80vh] w-[90vw] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[index]}
          alt={`${alt}, enlarged photo ${index + 1} of ${count}`}
          fill
          sizes="90vw"
          className="object-contain"
        />
      </div>
    </ModalShell>
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
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

  const currentSlide = slides[index];
  const currentImageIndex = video ? index - 1 : index;

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
                <VideoThumb poster={images[0]} emoji={emoji} onPlay={() => setVideoModalOpen(true)} />
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

        {currentSlide?.type === "image" && (
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setLightboxIndex(currentImageIndex)}
            aria-label="View full size"
            className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-brand-navy shadow transition-opacity hover:bg-surface"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
            </svg>
          </button>
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

      {lightboxIndex !== null && (
        <ImageModal
          images={images}
          index={lightboxIndex}
          alt={alt}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => Math.max(0, (i ?? 0) - 1))}
          onNext={() => setLightboxIndex((i) => Math.min(images.length - 1, (i ?? 0) + 1))}
        />
      )}

      {videoModalOpen && video && (
        <VideoModal src={video} alt={alt} onClose={() => setVideoModalOpen(false)} />
      )}
    </div>
  );
}
