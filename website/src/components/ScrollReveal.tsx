"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Observes elements with .animate-on-scroll and adds .is-visible when they enter view,
 * triggering the fade-up animation. No content structure change.
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const els = document.querySelectorAll(".animate-on-scroll");
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => els.forEach((el) => observer.unobserve(el));
  }, [pathname]);

  return null;
}
