import { cn } from "@/lib/utils";

interface SectionLabelProps {
  label: string;
  className?: string;
}

/** Stripe.dev-style section divider: "/ LABEL" in uppercase, muted, above content. */
export function SectionLabel({ label, className }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "border-t border-border pt-4 mt-8 mb-4 first:mt-0 first:pt-0 first:border-t-0",
        className
      )}
    >
      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
        / {label}
      </span>
    </div>
  );
}
