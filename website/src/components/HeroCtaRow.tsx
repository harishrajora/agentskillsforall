"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Grid3X3 } from "lucide-react";

export function HeroCtaRow() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
      <Button
        size="lg"
        className="gap-2"
        onClick={() => scrollTo("hero-install")}
        aria-label="Scroll to install command"
      >
        Get started
        <ArrowRight className="size-4" />
      </Button>
      <Button
        variant="secondary"
        size="lg"
        className="gap-2"
        onClick={() => scrollTo("skills")}
        aria-label="Scroll to skills list"
      >
        <Grid3X3 className="size-4" />
        Browse skills
      </Button>
    </div>
  );
}
