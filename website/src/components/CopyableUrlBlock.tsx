"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

interface CopyableUrlBlockProps {
  url: string;
  label?: string;
}

export function CopyableUrlBlock({ url, label }: CopyableUrlBlockProps) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="space-y-2">
      {label && (
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
      )}
      <div
        className="flex cursor-pointer items-center justify-between gap-4 overflow-hidden rounded-lg border border-border bg-muted/60 px-4 py-3 font-mono text-sm shadow-sm transition-all duration-200 hover:shadow-md"
        onClick={copy}
      >
        <code className="min-w-0 flex-1 overflow-x-auto overflow-y-hidden whitespace-nowrap py-0.5 text-left text-muted-foreground">
          {url}
        </code>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0"
          onClick={(e) => {
            e.stopPropagation();
            copy();
          }}
          aria-label="Copy URL"
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </Button>
      </div>
    </div>
  );
}
