import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import Doodled from "@/components/Doodled";
import HeroScene from "@/components/HeroScene";
import LineIcon, { type LineIconName } from "@/components/LineIcon";
import { LOGO } from "@/lib/brandColors";

export const metadata: Metadata = {
  title: "Contact Us | XTRONIC KIDS",
  description: "Questions about an order, a STEM kit, or a school project? Get in touch with the XTRONIC KIDS team.",
  alternates: { canonical: "/contact" },
};

const CONTACT_OPTIONS: { title: string; detail: string; href: string; label: string; icon: LineIconName; color: string }[] = [
  { title: "Order help", detail: "Delivery, changes and returns", href: "/help/shipping-returns", label: "Order support", icon: "package", color: LOGO.blue },
  { title: "Kit questions", detail: "Find the right build for your maker", href: "/help/faq", label: "Browse FAQs", icon: "bulb", color: LOGO.orange },
  { title: "Schools & clubs", detail: "Classroom bundles and quotes", href: "/schools", label: "Explore school kits", icon: "family", color: LOGO.green },
  { title: "Parts & safety", detail: "Help with a kit or replacement parts", href: "/help/safety", label: "Safety information", icon: "shield", color: LOGO.red },
  { title: "Quick answers", detail: "The most asked questions", href: "/help/faq", label: "Visit the FAQ", icon: "sparkles", color: LOGO.yellow },
];

const FAQS = [
  { question: "How quickly will my order arrive?", answer: "Australian standard delivery usually takes 3–5 business days, and express delivery 1–2 business days. Sri Lanka orders usually take 7–14 business days." },
  { question: "Are the kits suitable for beginners?", answer: "Yes. The kits are designed for hands-on discovery, and everything needed to build is included in the box. Check the product page for the recommended age." },
  { question: "What if a part is missing or damaged?", answer: "Our kits are covered by a lifetime replacement guarantee. Send us a message above and tell us which kit and part you need help with." },
];

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#e8f4ff] via-[#f4f9ff] to-white pt-10 pb-12 md:pt-16 md:pb-16">
        <HeroScene />
        <div className="relative mx-auto grid max-w-[1200px] items-center gap-8 px-4 md:grid-cols-[1.05fr_0.95fr] md:px-6">
          <div className="relative z-10">
            <p className="mb-4 flex w-fit items-center gap-2 rounded-full border border-brand-blue/15 bg-white/85 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-brand-blue shadow-sm">
              <LineIcon name="send" size={15} /> We&apos;re happy to help
            </p>
            <Doodled preset="left">
              <h1 className="font-heading text-[clamp(46px,7vw,78px)] font-bold leading-[0.95] tracking-tight">
                <span className="text-comic block" style={{ color: LOGO.blue, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.18)" } as React.CSSProperties}>Contact</span>
                <span className="text-comic block" style={{ color: LOGO.orange, "--comic-stroke": "#fff", "--comic-shadow": "rgba(13,31,53,0.18)" } as React.CSSProperties}>Us!</span>
              </h1>
            </Doodled>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-brand-navy-700 sm:text-xl">
              Have a question about a kit or an order? Send our friendly team a message. We&apos;d love to hear from you!
            </p>
            <a href="#send-message" className="btn-brick mt-7 inline-flex items-center gap-2 rounded-btn bg-brand-amber px-6 py-3.5 font-heading font-bold text-white" style={{ "--btn-brick-shadow": "var(--color-brand-amber-600)" } as React.CSSProperties}>
              Send us a message <span aria-hidden>↓</span>
            </a>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-brand-yellow/25 blur-2xl" />
            <div aria-hidden className="absolute bottom-[9%] left-[5%] h-20 w-20 rotate-[-12deg] rounded-[24px] bg-brand-yellow shadow-[0_8px_0_var(--color-brand-yellow-600)]" />
            <div className="relative mx-auto aspect-[1.18/1] w-full">
              <Image src="/kids/boy-goggles-building.png" alt="Young maker building a colorful robotics kit" fill priority sizes="(min-width: 768px) 520px, 92vw" className="object-contain drop-shadow-[0_20px_22px_rgba(13,31,53,0.2)]" />
            </div>
            <div className="absolute right-0 top-3 rotate-[5deg] rounded-[22px] border-[3px] border-brand-navy bg-white px-4 py-3 text-center font-heading text-sm font-bold leading-tight shadow-[4px_5px_0_rgba(13,31,53,0.14)] sm:right-2 sm:top-5 sm:text-base">
              <span style={{ color: LOGO.blue }}>Small questions?</span><br /><span style={{ color: LOGO.red }}>Big ideas!</span>
            </div>
            <span aria-hidden className="scatter-spin absolute left-3 top-10 text-4xl text-brand-amber">✦</span>
            <span aria-hidden className="scatter-float absolute bottom-8 right-4 text-4xl text-brand-blue">✧</span>
          </div>
        </div>
      </section>

      <section aria-label="Contact options" className="relative z-10 mx-auto -mt-2 max-w-[1200px] px-4 md:px-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {CONTACT_OPTIONS.map((option) => (
            <Link key={option.title} href={option.href} className="group rounded-[20px] border border-white bg-white/90 p-4 shadow-[0_10px_28px_-20px_rgba(13,31,53,0.35)] transition-[translate,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_32px_-20px_rgba(13,31,53,0.4)]">
              <span className="grid h-11 w-11 place-items-center rounded-full text-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:rotate-[-7deg] group-hover:scale-110" style={{ background: option.color }}>
                <LineIcon name={option.icon} size={21} strokeWidth={2.2} />
              </span>
              <h2 className="mt-3 font-heading text-base font-bold text-brand-navy">{option.title}</h2>
              <p className="mt-1 text-xs font-semibold leading-relaxed text-muted">{option.detail}</p>
              <span className="mt-3 inline-block text-xs font-extrabold" style={{ color: option.color }}>{option.label} <span aria-hidden>→</span></span>
            </Link>
          ))}
        </div>
      </section>

      <section id="send-message" aria-labelledby="message-heading" className="mx-auto max-w-[1200px] scroll-mt-28 px-4 pt-16 md:px-6 md:pt-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] border border-white bg-white p-5 shadow-[0_18px_45px_-32px_rgba(13,31,53,0.32)] sm:p-8">
            <Doodled preset="left">
              <h2 id="message-heading" className="font-heading text-[clamp(28px,4vw,40px)] font-bold leading-tight">
                <span style={{ color: LOGO.blue }}>Send us</span> <span style={{ color: LOGO.orange }}>a message</span>
              </h2>
            </Doodled>
            <p className="mb-6 mt-2 font-semibold text-muted">Fill in the form and tell us how we can help.</p>
            <ContactForm />
          </div>

          <aside className="flex flex-col gap-5">
            <div className="relative isolate flex-1 overflow-hidden rounded-[28px] border-2 border-white p-6 shadow-[0_15px_38px_-28px_rgba(13,31,53,0.35)] sm:p-8" style={{ background: "linear-gradient(135deg, #eaf5ff 0%, #f5faff 54%, #fff3db 100%)" }}>
              <span aria-hidden className="scatter-float absolute right-7 top-5 text-3xl text-brand-blue">✦</span>
              <p className="font-heading text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">Here for your next big idea</p>
              <h2 className="mt-2 max-w-sm font-heading text-3xl font-bold leading-tight text-brand-navy">A real person, ready to help.</h2>
              <p className="mt-3 max-w-md text-sm font-semibold leading-relaxed text-brand-navy-700">Whether you&apos;re choosing your first kit, need help with an order, or planning a classroom build, we&apos;ll point you in the right direction.</p>
              <div className="mt-6 flex items-start gap-3 rounded-2xl border border-white/90 bg-white/75 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-blue text-white"><LineIcon name="globe" size={20} /></span>
                <span><strong className="block font-heading text-sm text-brand-navy">Shipping to Australia &amp; Sri Lanka</strong><span className="mt-1 block text-xs font-semibold text-muted">Check delivery details and timing in our shipping guide.</span><Link href="/help/shipping-returns" className="mt-2 inline-block text-xs font-extrabold text-brand-blue hover:underline">Shipping &amp; returns →</Link></span>
              </div>
              <div className="mt-3 flex items-start gap-3 rounded-2xl border border-white/90 bg-white/75 p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-amber text-white"><LineIcon name="clock" size={20} /></span>
                <span><strong className="block font-heading text-sm text-brand-navy">Need an answer now?</strong><span className="mt-1 block text-xs font-semibold text-muted">Our help centre has quick answers to common questions.</span><Link href="/help/faq" className="mt-2 inline-block text-xs font-extrabold text-brand-amber hover:underline">Visit the help centre →</Link></span>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[26px] border border-white bg-gradient-to-r from-brand-blue to-[#1496ec] px-6 py-5 text-white shadow-[0_10px_0_var(--color-brand-blue-600)]">
              <span aria-hidden className="absolute -right-3 -top-5 text-7xl text-white/10">✦</span>
              <p className="font-heading text-lg font-bold">Let&apos;s make something brilliant!</p>
              <p className="mt-1 text-sm font-semibold text-white/85">Explore the projects made by our young makers.</p>
              <Link href="/gallery" className="mt-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-extrabold text-brand-blue transition-transform hover:-translate-y-0.5">See Our Works <span aria-hidden>→</span></Link>
            </div>
          </aside>
        </div>
      </section>

      <section aria-labelledby="contact-faq-heading" className="band mx-auto mt-16 max-w-[1200px] rounded-[30px] px-4 py-14 md:px-8" style={{ background: "linear-gradient(135deg, #eef7ff 0%, #fff 55%, #fff6df 100%)" }}>
        <div className="mx-auto max-w-3xl">
          <Doodled preset="center">
            <h2 id="contact-faq-heading" className="text-center font-heading text-[clamp(28px,4vw,40px)] font-bold text-brand-navy">Frequently asked <span style={{ color: LOGO.blue }}>questions</span></h2>
          </Doodled>
          <p className="mb-7 mt-2 text-center font-semibold text-muted">A few quick answers while you&apos;re here.</p>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details key={faq.question} className="group rounded-[18px] border border-white bg-white/90 p-4 shadow-sm transition-shadow open:shadow-md sm:p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-bold text-brand-navy marker:content-none sm:text-lg">
                  {faq.question}<span aria-hidden className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-blue-50 text-brand-blue transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-2xl text-sm font-semibold leading-relaxed text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="mt-5 text-center text-sm font-bold text-muted">Still curious? <Link href="/help/faq" className="text-brand-blue hover:underline">See all FAQs →</Link></p>
        </div>
      </section>
    </>
  );
}
