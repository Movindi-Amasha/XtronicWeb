const REVIEWS = [
  {
    name: "Sarah M.",
    rating: 5,
    text: "My son built the solar rover in an afternoon and now wants every kit in the range. Screen-free win.",
  },
  {
    name: "James T.",
    rating: 5,
    text: "Instructions are genuinely clear enough for a 6 year old with light supervision. Great build quality.",
  },
  {
    name: "Priya K.",
    rating: 4,
    text: "Bought the classroom pack for my STEM club, the kids loved the voice robot the most.",
  },
];

export default function ParentReviews() {
  return (
    <section
      aria-labelledby="reviews-heading"
      className="mx-auto max-w-[1260px] px-4 py-16 md:px-6"
    >
      <h2
        id="reviews-heading"
        className="text-center font-heading text-3xl font-extrabold text-brand-navy md:text-4xl"
      >
        Parent Reviews
      </h2>

      <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {REVIEWS.map((review) => (
          <figure
            key={review.name}
            className="flex flex-col gap-3 rounded-card bg-surface p-6 border border-line"
          >
            <span
              className="text-brand-amber"
              aria-label={`Rated ${review.rating} out of 5`}
            >
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </span>
            <blockquote className="text-sm text-brand-navy-700">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <figcaption className="mt-auto flex items-center gap-2 text-sm font-bold text-brand-navy">
              {review.name}
              <span className="rounded-full bg-brand-green-50 px-2 py-0.5 text-[11px] font-bold text-brand-green-700">
                Verified Buyer
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
