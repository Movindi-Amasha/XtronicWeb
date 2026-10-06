import Image from "next/image";

const REVIEWS = [
  {
    name: "Sarah M.",
    sub: "Mum of Leo, 8 · Robot Kit",
    rating: 5,
    text: "My son loved building the robot! He spent the whole weekend on it and now explains circuits to us at dinner.",
    border: "border-t-brand-blue",
    avatar: "bg-brand-blue",
  },
  {
    name: "Daniel K.",
    sub: "Dad of two · Gift Pack",
    rating: 5,
    text: "Perfect gift for curious kids. Keeps them away from screens, and the instructions are super clear.",
    border: "border-t-brand-amber",
    avatar: "bg-brand-amber",
  },
  {
    name: "Priya L.",
    sub: "Teacher · Solar Yacht",
    rating: 5,
    text: "Amazing STEM kit! High quality parts and easy to build. The solar yacht actually floats and moves.",
    border: "border-t-brand-yellow",
    avatar: "bg-brand-yellow text-brand-navy",
  },
  {
    name: "Michael T.",
    sub: "Dad of Mia, 10 · 5-in-1 Bundle",
    rating: 5,
    text: "We bought the bundle and it's worth it. Kids learn and have fun, and we build together as a family.",
    border: "border-t-brand-green",
    avatar: "bg-brand-green",
  },
];

export default function ParentReviews() {
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="mx-auto max-w-[1200px] px-4 pt-24 md:px-6">
      <div className="relative flex flex-col items-center text-center">
        <div className="relative h-24 w-24 sm:h-28 sm:w-28">
          <Image src="/mascot/thinking.png" alt="" fill sizes="112px" className="object-contain" />
        </div>
        <span className="text-xs font-extrabold uppercase tracking-[0.1em] text-brand-amber">
          Real families
        </span>
        <h2 id="reviews-heading" className="mt-2 text-[clamp(32px,4vw,48px)] font-bold tracking-tight text-brand-navy">
          What parents &amp; <span className="text-brand-amber">kids say</span>
        </h2>
        <p className="mt-2.5 text-lg font-semibold text-muted">
          <span className="text-brand-yellow-600" aria-hidden>★★★★★</span> 4.9 out of 5 from verified reviews
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((review) => (
          <figure
            key={review.name}
            className={`flex flex-col gap-3.5 rounded-card border-2 border-t-[6px] border-line bg-white p-6 transition-transform hover:-translate-y-1 hover:shadow-[0_10px_30px_-12px_rgba(14,30,63,0.18)] ${review.border}`}
          >
            <span className="text-brand-yellow-600" aria-label={`Rated ${review.rating} out of 5`}>
              {"★".repeat(review.rating)}
            </span>
            <blockquote className="flex-1 font-bold text-brand-navy">&ldquo;{review.text}&rdquo;</blockquote>
            <figcaption className="flex items-center gap-3">
              <span className={`grid h-10.5 w-10.5 shrink-0 place-items-center rounded-xl font-heading text-lg font-bold text-white ${review.avatar}`}>
                {review.name.charAt(0)}
              </span>
              <span>
                <strong className="block font-heading leading-tight text-brand-navy">{review.name}</strong>
                <small className="text-xs font-bold text-muted">{review.sub}</small>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
