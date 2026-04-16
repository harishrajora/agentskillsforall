"use client";

import { useEffect, useState, useRef } from "react";

/**
 * Wraps the hero title and triggers a "colors loaded" state after a short delay,
 * so accent colors can animate in (Stripe.dev-style delayed color load).
 * Applies gentle parallax (translateY) based on scroll in the hero area.
 */
export function HeroTitle({ children }: { children: React.ReactNode }) {
  const [colorsLoaded, setColorsLoaded] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setColorsLoaded(true), 1400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const viewportHeight = typeof window !== "undefined" ? window.innerHeight : 800;
      const center = rect.top + rect.height / 2 - viewportHeight / 2;
      const factor = Math.max(-1, Math.min(1, center / viewportHeight));
      const translateY = factor * 18;
      wrap.style.transform = `translate3d(0, ${translateY}px, 0)`;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={wrapRef}
      className="hero-title-root transition-transform duration-150 ease-out will-change-transform"
      data-colors-loaded={colorsLoaded ? true : undefined}
    >
      {children}
    </div>
  );
}
