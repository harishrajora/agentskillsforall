"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { NavLinks } from "@/components/NavLinks";
import { NavbarGitHubStats } from "@/components/NavbarGitHubStats";

const SCROLL_EXPAND_THRESHOLD = 100;
const SCROLL_FLUSH_THRESHOLD = 1;

/**
 * Navbar animation (Billing SDK–style, see https://billingsdk.com/):
 * - At scroll 0 (home): fixed bar is hidden; in-card nav is visible inside hero.
 * - On scroll: fixed glassmorphic bar fades in + slides down (opacity 0 → 100, translateY -2 → 0).
 * - When visible: bar “shrinks” on scroll — less top padding (pt-5 → pt-3) and less bar padding
 *   (py-2.5 → py-2) for a tighter pill. All transitions use duration-300.
 */
export function Header() {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const flushed = isHome && scrollY < SCROLL_FLUSH_THRESHOLD;
  const expanded = scrollY <= SCROLL_EXPAND_THRESHOLD;
  const isSubPage = !isHome;

  return (
    <header
      className={cn(
        "w-full py-4 transition-all duration-300",
        isSubPage ? "relative border-b border-border bg-background mb-8" : "relative z-[55]"
      )}
    >
      <div className="mx-auto flex w-full max-w-[1600px] justify-center px-6 md:px-8 lg:px-12">
        <nav
          aria-label="Main"
          className={cn(
            "flex w-full items-center justify-between gap-3 transition-all duration-300 pl-4 sm:pl-6",
            isSubPage
              ? "py-2"
              : flushed
                ? "bg-transparent rounded-none border-none shadow-none backdrop-blur-none py-3 sm:py-4"
                : cn(
                    "rounded-xl shadow-lg shadow-black/20 backdrop-blur-lg sm:rounded-2xl",
                    "bg-accent/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
                    expanded ? "py-3 sm:py-4" : "py-2 sm:py-2.5"
                  )
          )}
        >
          <Link
          href="/"
          className={cn(
            "flex min-w-0 shrink items-center gap-2 text-base font-semibold transition-colors duration-200 hover:no-underline md:text-lg",
            flushed ? "text-white" : "text-foreground"
          )}
        >
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white p-1.5 sm:size-9">
            <Image
              src="/Black Logo.jpg"
              alt=""
              width={28}
              height={28}
              className="size-full object-contain"
              aria-hidden
            />
          </span>
          <span className={cn("shrink-0 text-muted-foreground/80", flushed && "text-white/70")}>
            /
          </span>
          <span className="truncate">Agent Skills for All</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {isHome && (
            <div className="hidden sm:block">
              <NavbarGitHubStats flushed={flushed} />
            </div>
          )}
          <NavLinks hideHome={isHome} linkClassName={flushed ? "text-white hover:text-white" : undefined} />
        </div>
        </nav>
      </div>
    </header>
  );
}
