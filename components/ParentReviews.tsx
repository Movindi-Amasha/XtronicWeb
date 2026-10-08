"use client";

import { useRef } from "react";
import { LOGO } from "@/lib/brandColors";

const REVIEWS = [
  {
    name: "Sarah M.",
    sub: "Mum of Leo, 8 · Robot Kit",
    rating: 5,
    text: "My son loved building the robot! He spent the whole weekend on it and now explains circuits to us at dinner.",
    color: LOGO.blue,
  },
  {
    name: "Daniel K.",
    sub: "Dad of two · Gift Pack",
    rating: 5,
    text: "Perfect gift for curious kids. Keeps them away from screens, and the instructions are super clear.",
    color: LOGO.orange,
  },
  {
    name: "Priya L.",
    sub: "Teacher · Solar Yacht",
    rating: 5,
    text: "Amazing STEM kit! High quality parts and easy to build. The solar yacht actually floats and moves.",
    color: LOGO.yellow,
  },
  {
    name: "Michael T.",
    sub: "Dad of Mia, 10 · 5-in-1 Bundle",
    rating: 5,
    text: "We bought the bundle and it's worth it. Kids learn and have fun, and we build together as a family.",
    color: LOGO.green,
  },
];

function ArrowButton({ dir, onClick }: { dir: -1 | 1; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir < 0 ? "Previous reviews" : "Next reviews"}
      className={`absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border-2 border-line bg-white text-lg font-bold text-brand-navy shadow-md transition-colors hover:border-brand-blue hover:bg-brand-blue hover:text-white sm:grid lg:hidden ${
        dir < 0 ? "-left-3" : "-right-3"
      }`}
    >
      {dir < 0 ? "‹" : "›"}
    </button>
  );
}

export default function ParentReviews() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="mx-auto max-w-[1200px] px-4 pt-20 md:px-6">
      <div className="text-center">
        <h2 id="reviews-heading" className="text-[clamp(30px,4vw,44px)] font-bold tracking-tight" style={{ color: LOGO.blue }}>
          What Parents &amp; <span style={{ color: LOGO.orange }}>Kids Say</span>
        </h2>
        <p className="mt-1 text-lg font-semibold text-muted">
          <span className="text-brand-yellow-600" aria-hidden>★★★★★</span> 4.9 out of 5 from our amazing community
        </p>
      </div>

      <div className="relative mt-8">
        <ArrowButton dir={-1} onClick={() => scroll(-1)} />
        <div
          ref={trackRef}
          className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:scroll-px-0 sm:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible [&::-webkit-scrollbar]:hidden"
        >
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="flex shrink-0 basis-[82%] snap-start flex-col gap-3 rounded-card border-2 border-line bg-white p-5 transition-[translate,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_-14px_rgba(14,30,63,0.25)] sm:basis-[calc((100%-16px)/2)] lg:basis-auto"
            >
              <figcaption className="flex items-center gap-3">
                <span
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-white font-heading text-lg font-bold text-white shadow-md"
                  style={{ background: review.color }}
                >
                  {review.name.charAt(0)}
                </span>
                <span>
                  <strong className="block font-heading leading-tight text-brand-navy">{review.name}</strong>
                  <small className="text-xs font-bold text-muted">{review.sub}</small>
                </span>
              </figcaption>
              <span className="text-brand-yellow-600" aria-label={`Rated ${review.rating} out of 5`}>
                {"★".repeat(review.rating)}
              </span>
              <blockquote className="flex-1 text-[15px] font-bold text-brand-navy">&ldquo;{review.text}&rdquo;</blockquote>
            </figure>
          ))}
        </div>
        <ArrowButton dir={1} onClick={() => scroll(1)} />
      </div>
    </section>
  );
}
