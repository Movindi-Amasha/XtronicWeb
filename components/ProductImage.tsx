"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImage({
  src,
  alt,
  emoji,
  className = "",
  sizes,
}: {
  src: string;
  alt: string;
  emoji: string;
  className?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  // No path yet (photo not shot) skips the request entirely instead of a 404.
  if (failed || !src) {
    return (
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-brand-blue-50 via-surface to-brand-amber-50 ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="flex h-20 w-20 items-center justify-center rounded-full border border-line bg-surface text-4xl">
          {emoji}
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-brand-navy-700/60">
          Photo coming soon
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "(min-width: 768px) 33vw, 100vw"}
      className={`object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
