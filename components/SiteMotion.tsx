"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useCartStore, cartItemCount } from "@/lib/cartStore";

// Site-wide finishing touches, kept out of individual components:
//  - sections fade/rise in as they scroll into view
//  - adding to cart flies a little ball from the button into the cart icon
// Styles live in globals.css; reduced-motion users get none of the movement.

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function visibleCartTarget(): HTMLElement | null {
  const targets = [...document.querySelectorAll<HTMLElement>("[data-cart-target]")];
  return targets.find((t) => { const r = t.getBoundingClientRect(); return r.width > 0 && r.height > 0; }) ?? null;
}

const BALL_COLORS = ["#FF7A1F", "#0177DE", "#FDAB05", "#47A723", "#F52C2B"];

export default function SiteMotion() {
  const pathname = usePathname();
  const count = useCartStore((s) => cartItemCount(s.items));
  const lastCount = useRef(count);
  const lastClick = useRef<{ rect: DOMRect; at: number } | null>(null);

  // Remember which add-to-cart button was pressed, and squish it.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-add-to-cart]");
      if (!btn) return;
      lastClick.current = { rect: btn.getBoundingClientRect(), at: Date.now() };
      btn.classList.remove("added-pop");
      void btn.offsetWidth;
      btn.classList.add("added-pop");
    }
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // When the cart count goes up, fly a ball into the cart and bump it.
  useEffect(() => {
    const grew = count > lastCount.current;
    lastCount.current = count;
    if (!grew || reducedMotion()) return;
    const target = visibleCartTarget();
    if (!target) return;

    const bump = () => {
      target.classList.remove("cart-bump");
      void target.offsetWidth;
      target.classList.add("cart-bump");
    };

    const from = lastClick.current;
    if (!from || Date.now() - from.at > 1500) return bump();

    const to = target.getBoundingClientRect();
    const ball = document.createElement("div");
    const size = 18;
    Object.assign(ball.style, {
      position: "fixed", left: "0", top: "0", width: `${size}px`, height: `${size}px`, borderRadius: "999px",
      background: BALL_COLORS[Math.floor(Math.random() * BALL_COLORS.length)], border: "3px solid #fff",
      boxShadow: "0 4px 10px rgba(13,31,53,0.3)", zIndex: "10000", pointerEvents: "none",
    });
    document.body.appendChild(ball);
    const x0 = from.rect.left + from.rect.width / 2 - size / 2, y0 = from.rect.top + from.rect.height / 2 - size / 2;
    const x1 = to.left + to.width / 2 - size / 2, y1 = to.top + to.height / 2 - size / 2;
    const peak = Math.min(y0, y1) - 80;
    ball
      .animate(
        [
          { transform: `translate(${x0}px, ${y0}px) scale(1)` },
          { transform: `translate(${(x0 + x1) / 2}px, ${peak}px) scale(1.15)`, offset: 0.45 },
          { transform: `translate(${x1}px, ${y1}px) scale(0.5)`, opacity: 0.9 },
        ],
        { duration: 700, easing: "cubic-bezier(0.4, 0, 0.6, 1)" }
      )
      .finished.then(() => { ball.remove(); bump(); });
  }, [count]);

  // Scroll reveal for page sections below the fold (re-run on navigation).
  useEffect(() => {
    if (reducedMotion() || !("IntersectionObserver" in window)) return;
    const sections = [...document.querySelectorAll<HTMLElement>("main > section")].filter(
      (s) => s.getBoundingClientRect().top > window.innerHeight * 0.9
    );
    const io = new IntersectionObserver(
      (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("revealed"); io.unobserve(en.target); } }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    sections.forEach((s) => { s.classList.add("reveal"); io.observe(s); });
    return () => { io.disconnect(); sections.forEach((s) => s.classList.remove("reveal", "revealed")); };
  }, [pathname]);

  // Stat numbers ([data-count-up], e.g. "4.9/5", "6+") count up from 0 once visible.
  useEffect(() => {
    if (reducedMotion() || !("IntersectionObserver" in window)) return;
    const els = [...document.querySelectorAll<HTMLElement>("[data-count-up]")];
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        io.unobserve(en.target);
        const el = en.target as HTMLElement;
        const text = el.textContent ?? "";
        const m = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
        if (!m) return;
        const end = parseFloat(m[1]), decimals = m[1].split(".")[1]?.length ?? 0, rest = m[2];
        const start = performance.now(), dur = 1100;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / dur), eased = 1 - Math.pow(1 - t, 3);
          el.textContent = (end * eased).toFixed(decimals) + rest;
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
