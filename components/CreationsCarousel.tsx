"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export interface Creation {
  href: string;
  image: string;
  title: string;
}

function ArrowButton({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir < 0 ? "Previous" : "Next"}
      className={`absolute top-[calc(50%-34px)] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-2 border-line bg-white text-lg font-bold text-brand-navy shadow-md transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white sm:grid ${
        dir < 0 ? "-left-3" : "-right-3"
      }`}
    >
      {dir < 0 ? "‹" : "›"}
    </button>
  );
}

export default function CreationsCarousel({ items }: { items: Creation[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Dot = the card currently at the left edge of the track.
  function onScroll() {
    const el = trackRef.current;
    if (!el) return;
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    setActive(atEnd ? items.length - 1 : Math.round(el.scrollLeft / step));
  }

  function goTo(i: number) {
    const el = trackRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (el && card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
  }

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <ArrowButton dir={-1} onClick={() => scroll(-1)} />
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group shrink-0 basis-[78%] snap-start sm:basis-[calc((100%-16px)/2)] md:basis-[calc((100%-32px)/3)] lg:basis-[calc((100%-48px)/4)]"
          >
            {/* Title sits under the photo so it never covers it. */}
            <span className="relative block aspect-[4/3] overflow-hidden rounded-card border-4 border-white bg-brand-blue-50 shadow-[0_10px_30px_-12px_rgba(14,30,63,0.25)]">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 78vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </span>
            <span className="mt-2.5 block px-1 text-center font-heading text-sm font-semibold leading-snug text-brand-navy transition-colors group-hover:text-brand-blue">
              {item.title}
            </span>
          </Link>
        ))}
      </div>
      <ArrowButton dir={1} onClick={() => scroll(1)} />
      <div className="mt-4 flex justify-center gap-2">
        {items.map((item, i) => (
          <button
            key={item.href}
            type="button"
            onClick={() => goTo(i)}
            aria-label={`Show ${item.title}`}
            className={`h-2.5 rounded-full transition-all duration-300 ${i === active ? "w-7 bg-brand-amber" : "w-2.5 bg-line hover:bg-brand-blue/40"}`}
          />
        ))}
      </div>
    </div>
  );
}
