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
    intro:
      "At XTRONIC KIDZ, we're committed to protecting the privacy and security of our customers' personal information. This Privacy Policy explains how we collect, use and safeguard your information when you visit or make a purchase on our website. By using our website, you agree to the practices described in this policy.",
    sections: [
      {
        h: "Information we collect",
        list: true,
        items: [
          "Personal identification information — such as your name, shipping address, email address and phone number — provided voluntarily during checkout.",
          "Payment and billing information needed to process your order. Card and payment details are handled securely by our payment processors, PayPal and PayHere — we never see or store your full card details.",
          "Browsing information, such as your IP address, browser type and device information, collected automatically using cookies and similar technologies.",
        ],
      },
      {
        h: "How we use your information",
        list: true,
        items: [
          "To process and fulfil your orders, including shipping and delivery within Australia and to Sri Lanka.",
          "To communicate with you about your purchase, provide customer support, and respond to enquiries or requests.",
          "To send order confirmations and, if you've opted in, our newsletter and welcome discount code.",
          "To improve our website, products and services based on feedback and browsing patterns.",
          "To detect and prevent fraud, unauthorised activity and abuse of our website.",
        ],
      },
      {
        h: "Information sharing",
        list: true,
        items: [
          "We do not sell, trade or otherwise transfer your personal information to third parties without your consent, except:",
          "Trusted service providers who help us operate our website, process payments (PayPal, PayHere) and deliver orders — each is contractually required to keep your data secure and confidential.",
          "Where required by law, or in response to a valid legal request.",
        ],
      },
      {
        h: "Data security",
        items: [
          "We use industry-standard security measures to protect your personal information from unauthorised access, alteration, disclosure or destruction. No method of transmission over the internet is 100% secure, so we can't guarantee absolute security.",
        ],
      },
      {
        h: "Cookies and tracking",
        items: [
          "We use cookies and similar technologies to remember your cart, keep you signed in, and understand how visitors use our website. You can disable cookies in your browser settings, though some features — like the cart — may not work properly without them.",
        ],
      },
      {
        h: "Children's privacy",
        items: [
          "Our kits are designed for children, but our website and checkout are intended to be used by parents, guardians and teachers. We do not knowingly collect personal information directly from children — every account, order and the data behind it belongs to the adult placing the order.",
        ],
      },
      {
        h: "Changes to this policy",
        items: [
          "We may update this Privacy Policy from time to time. Any changes will be posted on this page with a revised date, so check back occasionally to stay informed.",
        ],
      },
      {
        h: "Contact us",
        items: [
          "If you have any questions, concerns or requests regarding this Privacy Policy or how we handle your personal information, please get in touch via our FAQ page or customer support.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro:
      "Welcome to XTRONIC KIDZ. These Terms & Conditions govern your use of our website and the purchase of products from our store. By accessing and using our website, you agree to comply with these terms — please read them carefully before placing an order.",
    sections: [
      {
        h: "Use of the website",
        list: true,
        items: [
          "Our products are designed for children, but purchases must be made by an adult — a parent, guardian or teacher — who is responsible for the accuracy of the order and account details.",
          "You're responsible for keeping any account details, including login information, confidential.",
          "You agree to provide accurate and current information during checkout.",
          "You may not use our website for any unlawful or unauthorised purpose.",
        ],
      },
      {
        h: "Product information and pricing",
        list: true,
        items: [
          "We strive to provide accurate product descriptions, images and pricing, but don't guarantee that every detail is complete or error-free.",
          "Prices are shown in AUD and include GST for Australian orders. Prices are subject to change without notice, and promotions or discounts may carry their own additional terms and time limits.",
        ],
      },
      {
        h: "Orders and payments",
        list: true,
        items: [
          "Placing an order on our website is an offer to purchase the selected products, which we may accept or decline.",
          "We reserve the right to refuse or cancel any order — for example due to stock availability, a pricing or listing error, or suspected fraudulent activity.",
          "You authorise us to charge your chosen payment method for the full order total, including applicable taxes and shipping.",
          "Payments are handled by trusted third-party processors, PayPal and PayHere. We never store or have access to your full card details.",
        ],
      },
      {
        h: "Shipping and delivery",
        list: true,
        items: [
          "We make reasonable efforts to ship and deliver orders promptly within Australia and to Sri Lanka.",
          "Shipping and delivery times shown at checkout are estimates and may vary depending on your location and other factors outside our control.",
        ],
      },
      {
        h: "Returns and refunds",
        items: [
          "Returns, refunds and our Lifetime Replacement Guarantee for missing or damaged parts are covered on our Shipping & Returns page — please refer to it for the full process and conditions.",
        ],
      },
      {
        h: "Intellectual property",
        list: true,
        items: [
          "All content on our website — including text, images, logos and graphics — is protected by intellectual property rights and belongs to XTRONIC KIDZ or its licensors.",
          "You may not use, reproduce, distribute or modify any content from our website without our prior written consent.",
        ],
      },
      {
        h: "Limitation of liability",
        list: true,
        items: [
          "XTRONIC KIDZ and its team are not liable for any indirect, incidental or consequential damages arising from your use of our website or our products.",
          "We make no warranties, express or implied, beyond those required by Australian Consumer Law, regarding the products offered on our website.",
        ],
      },
      {
        h: "Changes to these terms",
        items: [
          "We may update these Terms & Conditions at any time. Changes take effect once posted on this page, so please review it occasionally — continued use of our website means you accept the current terms.",
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

  const intro = "intro" in entry ? entry.intro : undefined;

  return (
    <section className="mx-auto max-w-[800px] px-4 py-16 md:px-6">
      <h1 className="font-heading text-3xl font-extrabold text-brand-navy md:text-4xl">
        {entry.title}
      </h1>
      {intro && <p className="mt-4 text-brand-navy-700">{intro}</p>}

      <div className="mt-8 flex flex-col gap-10">
        {entry.sections.map((section) => {
          const isProse = typeof section.items[0] === "string";
          const isList = "list" in section && section.list;

          return (
            <div key={section.h}>
              <h2 className="font-heading text-xl font-bold text-brand-navy">
                {section.h}
              </h2>

              {isProse ? (
                isList ? (
                  <ul className="mt-4 flex flex-col gap-2.5 list-disc pl-5 text-sm text-brand-navy-700">
                    {(section.items as readonly string[]).map((text) => (
                      <li key={text}>{text}</li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-4 flex flex-col gap-3 text-sm text-brand-navy-700">
                    {(section.items as readonly string[]).map((text) => (
                      <p key={text}>{text}</p>
                    ))}
                  </div>
                )
              ) : (
                <div className="mt-4 flex flex-col gap-3">
                  {(section.items as readonly { q: string; a: string }[]).map((item) => (
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
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
