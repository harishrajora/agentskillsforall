"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinksProps {
  className?: string;
  linkClassName?: string;
  /** Hide the Home link (e.g. on main page where you're already home) */
  hideHome?: boolean;
}

export function NavLinks({ className, linkClassName, hideHome = false }: NavLinksProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <div className={cn("flex items-center gap-1 sm:gap-2", className)}>
      {!hideHome && (
        <Link
          href="/"
          className={cn(
            "rounded-md px-3 py-2 text-xs font-medium uppercase tracking-wider text-foreground transition-colors duration-200 hover:opacity-80",
            linkClassName
          )}
          aria-current={isHome ? "page" : undefined}
        >
          Home
        </Link>
      )}
    </div>
  );
}
