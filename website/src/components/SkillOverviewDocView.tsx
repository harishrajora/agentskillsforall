"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import { Badge } from "@/components/ui/badge";
import { PROSE_CONTENT_CLASSES } from "@/lib/proseClasses";
import { cn } from "@/lib/utils";

interface SkillOverviewDocViewProps {
  markdown: string;
}

function flattenToText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children))
    return children.map(flattenToText).join("");
  if (React.isValidElement(children)) {
    const props = children.props as { children?: React.ReactNode };
    if (props?.children != null) return flattenToText(props.children);
  }
  return String(children ?? "");
}

function impactBadgeVariant(
  impact: string
): "destructive" | "default" | "secondary" | "outline" {
  const u = impact.toUpperCase();
  if (u === "CRITICAL") return "destructive";
  if (u === "HIGH") return "default";
  if (u === "MEDIUM-HIGH" || u === "MEDIUM") return "secondary";
  return "outline";
}

export function SkillOverviewDocView({ markdown }: SkillOverviewDocViewProps) {
  return (
    <article className={cn("overview-content", PROSE_CONTENT_CLASSES)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={{
          p: ({ children, ...props }) => (
            <p className="my-3 first:mt-0 last:mb-0" {...props}>
              {children}
            </p>
          ),
          // Wrap first block (one-liner + URL + When to Apply) in a lead section
          a: ({ href, children, ...props }) => {
            // URLs are shown only in the top-fold copy block; hide from Overview section
            if (href?.startsWith("http")) return null;
            return (
              <a
                href={href}
                className="text-primary underline-offset-4 hover:underline"
                {...props}
              >
                {children}
              </a>
            );
          },
          strong: ({ children, ...props }) => (
            <strong
              {...props}
              className="font-semibold text-foreground"
            >
              {children}
            </strong>
          ),
          table: ({ children, ...props }) => (
            <div className="my-6 overflow-x-auto rounded-md border border-border">
              <table
                className="w-full min-w-[420px] text-sm"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="border-b border-border bg-muted/40" {...props}>
              {children}
            </thead>
          ),
          th: ({ children, ...props }) => (
            <th
              className="px-4 py-3 text-left font-semibold text-foreground"
              {...props}
            >
              {children}
            </th>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="divide-y divide-border" {...props}>
              {children}
            </tbody>
          ),
          td: ({ children, ...props }) => {
            const text = flattenToText(children).trim();
            const isImpact =
              /^(CRITICAL|HIGH|MEDIUM|LOW-MEDIUM|LOW)$/i.test(text) &&
              text.length < 20;
            if (isImpact) {
              return (
                <td className="px-4 py-2.5 align-middle" {...props}>
                  <Badge
                    variant={impactBadgeVariant(text)}
                    className="text-xs font-medium"
                  >
                    {children}
                  </Badge>
                </td>
              );
            }
            return (
              <td className="px-4 py-2.5 text-muted-foreground" {...props}>
                {children}
              </td>
            );
          },
          ol: ({ children, ...props }) => (
            <ol
              className="list-decimal list-inside space-y-2 pl-0 text-muted-foreground"
              {...props}
            >
              {children}
            </ol>
          ),
          ul: ({ children, ...props }) => (
            <ul
              className="my-2 list-disc space-y-1.5 pl-5 text-muted-foreground"
              {...props}
            >
              {children}
            </ul>
          ),
          li: ({ children, ...props }) => {
            const text = flattenToText(children);
            const dashMatch = text.match(/\s+[—–-]\s+/);
            if (dashMatch && dashMatch.index != null && dashMatch.index > 0) {
              const ruleId = text.slice(0, dashMatch.index).trim();
              const desc = text.slice(dashMatch.index + dashMatch[0].length).trim();
              if (ruleId.length > 0 && ruleId.length < 80) {
                return (
                  <li className="leading-relaxed" {...props}>
                    <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-medium text-foreground">
                      {ruleId}
                    </code>
                    <span className="ml-2">{desc}</span>
                  </li>
                );
              }
            }
            return (
              <li className="leading-relaxed" {...props}>
                {children}
              </li>
            );
          },
          h2: ({ children, ...props }) => (
            <h2
              className="mt-8 border-b border-border pb-2 text-base font-semibold first:mt-4"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              className="mt-4 text-sm font-semibold text-foreground"
              {...props}
            >
              {children}
            </h3>
          ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </article>
  );
}
