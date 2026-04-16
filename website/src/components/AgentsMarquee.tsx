"use client";

/**
 * "AVAILABLE FOR THESE AGENTS" marquee - matches skills.sh reference:
 * Link-wrapped logos, grayscale with color on hover, responsive sizing.
 */
const AGENTS: { id: string; name: string; url: string }[] = [
  { id: "amp", name: "AMP", url: "https://amp.dev" },
  { id: "antigravity", name: "Antigravity", url: "https://antigravity.dev" },
  { id: "claude-code", name: "Claude Code", url: "https://claude.ai" },
  { id: "clawdbot", name: "ClawdBot", url: "https://clawd.bot/" },
  { id: "cline", name: "Cline", url: "https://cline.dev" },
  { id: "codex", name: "Codex", url: "https://openai.com" },
  { id: "copilot", name: "GitHub Copilot", url: "https://github.com/features/copilot" },
  { id: "cursor", name: "Cursor", url: "https://cursor.com" },
  { id: "droid", name: "Droid", url: "https://droid.ai" },
  { id: "gemini", name: "Gemini", url: "https://gemini.google.com" },
  { id: "goose", name: "Goose", url: "https://goose.ai" },
  { id: "vscode", name: "VS Code", url: "https://code.visualstudio.com" },
  { id: "windsurf", name: "Windsurf", url: "https://codeium.com/windsurf" },
];

function AgentLogo({ id, name, url }: { id: string; name: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex shrink-0 grayscale hover:grayscale-0 transition-all duration-300"
      title={name}
    >
      <img
        src={`/agents/${id}.svg`}
        alt={name}
        loading="eager"
        decoding="sync"
        width={100}
        height={100}
        className="h-14 w-auto object-contain mix-blend-lighten sm:h-[72px] lg:h-[88px]"
      />
    </a>
  );
}

const AGENTS_VISIBLE = AGENTS.filter((a) => a.id !== "vscode");

export function AgentsMarquee() {
  const duplicated = [...AGENTS_VISIBLE, ...AGENTS_VISIBLE];

  return (
    <section className="w-full overflow-hidden py-0">
      <p className="mb-4 text-sm font-mono font-medium uppercase tracking-normal text-muted-foreground">
        Available for these agents
      </p>
      <div className="relative w-full min-w-0 overflow-hidden">
        <div className="flex w-max min-h-[3.5rem] flex-nowrap items-center gap-3 animate-marquee sm:gap-4">
          {duplicated.map((agent, i) => (
            <AgentLogo
              key={`${agent.id}-${i}`}
              id={agent.id}
              name={agent.name}
              url={agent.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
