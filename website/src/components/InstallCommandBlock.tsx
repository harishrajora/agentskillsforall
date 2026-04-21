"use client";

import { useState } from "react";
import { AGENT_PATHS, getSingleSkillCommands, getAllSkillsCommands } from "@/lib/install";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";

const HERO_COMMAND = "npx agentskillshub-cli add <github-repo-link>"

interface InstallCommandBlockProps {
  skillPath?: string;
  variant?: "single" | "all" | "hero";
}

export function InstallCommandBlock({ skillPath, variant = "single" }: InstallCommandBlockProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const commands =
    variant === "hero"
      ? null
      : variant === "single" && skillPath
        ? getSingleSkillCommands(skillPath)
        : getAllSkillsCommands();

  const copy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (variant === "hero") {
    return (
      <div className="install-command-boxes inline-flex min-w-0 max-w-full mx-auto">
        <div
          className="flex cursor-pointer items-center gap-2 px-4 py-3 font-mono text-sm transition-all duration-300 hover:-translate-y-0.5 min-w-0 overflow-hidden"
          onClick={() => copy("hero", HERO_COMMAND)}
        >
          <code className="min-w-0 overflow-x-auto overflow-y-hidden text-left text-white/90 whitespace-nowrap py-0.5">
            $ {HERO_COMMAND}
          </code>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0 text-white/80 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              copy("hero", HERO_COMMAND);
            }}
            aria-label="Copy command"
          >
            {copiedId === "hero" ? (
              <Check className="size-4" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="install-command-boxes w-full space-y-2 [&>div]:rounded-lg">
      {AGENT_PATHS.map((agent) => {
        const cmd = commands![agent.id];
        if (!cmd) return null;
        const firstLine = cmd.split("\n")[0];
        return (
          <div
            key={agent.id}
            className="min-h-[3.25rem] rounded-lg border border-border bg-card/50 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
          >
            <div className="px-3 pt-2 pb-1 text-xs font-medium text-muted-foreground">
              {agent.name}
            </div>
            <div className="flex min-h-9 cursor-pointer items-center justify-between gap-4 px-4 pb-3 pt-0">
              <code className="min-w-0 flex-1 truncate text-left font-mono text-sm text-foreground">
                {firstLine}
              </code>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  copy(agent.id, cmd);
                }}
                aria-label={`Copy command for ${agent.name}`}
              >
                {copiedId === agent.id ? (
                  <Check className="size-4" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
