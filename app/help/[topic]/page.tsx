import type { Metadata } from "next";
import { notFound } from "next/navigation";

const TOPICS = {
  faq: {
    title: "FAQ",
    sections: [
      {
        h: "Ordering",
        items: [
          { q: "How long does shipping take?", a: "AU Standard ships in 3–5 business days; AU Express in 1–2. Sri Lanka orders take 7–14 business days." },
          { q: "Can I change or cancel my order?", a: "Contact us within 2 hours of ordering and we'll do our best to change or cancel before it ships." },
        ],
      },
      {
        h: "Kits",
        items: [
          { q: "What age are the kits for?", a: "6+ for most kits, 7+ for the Smart Voice-Controlled Robot Kit. See the Parents' Guide for detail." },
          { q: "Do I need extra tools?", a: "No, everything needed is included in the box." },
        ],
      },
    ],
  },
  "shipping-returns": {
    title: "Shipping & Returns",
    sections: [
      {
        h: "Shipping",
        items: [
          { q: "AU Standard", a: "Free over A$75, otherwise a flat rate at checkout. 3–5 business days." },
          { q: "AU Express", a: "1–2 business days, calculated at checkout." },
          { q: "Sri Lanka", a: "Standard delivery, 7–14 business days, available at checkout." },
        ],
      },
      {
        h: "Returns",
        items: [
          { q: "Change of mind", a: "Unopened kits can be returned within 30 days for a full refund." },
          { q: "Missing or damaged parts", a: "Covered by our Lifetime Replacement Guarantee. Contact us and we'll post a free replacement." },
        ],
      },
    ],
  },
  safety: {
    title: "Safety",
    sections: [
      {
        h: "Small Parts Notice",
        items: [
          { q: "Choking hazard", a: "All kits contain small parts and are not suitable for children under 3 years, per Australian toy safety standards." },
          { q: "Supervision", a: "Adult supervision is recommended during assembly, especially for kits with batteries or moving parts." },
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    sections: [
      {
        h: "What we collect",
        items: [
          { q: "Order information", a: "Name, shipping address and email, used only to fulfil and communicate about your order." },
          { q: "Children's data", a: "We do not knowingly collect any personal data directly from children. All accounts and orders are placed by a parent or guardian." },
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    sections: [
      {
        h: "Using this site",
        items: [
          { q: "Acceptable use", a: "This site and its content are for personal, non-commercial use unless otherwise agreed with XTRONIC KIDZ." },
          { q: "Pricing", a: "All prices are shown in AUD and include GST for Australian orders. We reserve the right to correct pricing errors." },
        ],
      },
    ],
  },
} as const;

type Topic = keyof typeof TOPICS;

export function generateStaticParams() {
  return Object.keys(TOPICS).map((topic) => ({ topic }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ topic: string }>;
}): Promise<Metadata> {
  const { topic } = await params;
  const entry = TOPICS[topic as Topic];
  return entry ? { title: entry.title } : {};
}

export default async function HelpTopicPage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;
  const entry = TOPICS[topic as Topic];
  if (!entry) notFound();

  return (
    <section className="mx-auto max-w-[800px] px-4 py-16 md:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-brand-navy md:text-4xl">
        {entry.title}
      </h1>

      <div className="mt-8 flex flex-col gap-10">
        {entry.sections.map((section) => (
          <div key={section.h}>
            <h2 className="font-heading text-xl font-bold text-brand-navy">
              {section.h}
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {section.items.map((item) => (
                <details
                  key={item.q}
                  className="rounded-card border border-line bg-surface p-5"
                >
                  <summary className="cursor-pointer font-bold text-brand-navy">
                    {item.q}
                  </summary>
                  <p className="mt-2 text-sm text-brand-navy-700">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
