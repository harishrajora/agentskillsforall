"use client";

import { getSkillIconUrl } from "@/lib/skillIcons";

const LOGO_SIZE = 28;

interface SkillLogoProps {
  skillPath: string;
  className?: string;
}

/** Fallback icon when no framework logo — beaker/test style */
function FallbackIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 0H1m18 0h-2m2 0h2M5 15H3m2 0H1m18 0h-2m2 0h2" />
      <path d="M9 5h6v14H9z" />
      <path d="M12 9v6" />
    </svg>
  );
}

/** Renders skill logo from local public/skill-icons/ only (no CDN). */
export function SkillLogo({ skillPath, className = "" }: SkillLogoProps) {
  const iconUrl = getSkillIconUrl(skillPath);
  const boxClass = `flex shrink-0 items-center justify-center rounded-none bg-white/5 text-white ${className}`.trim();

  if (iconUrl) {
    return (
      <div className={boxClass} style={{ width: LOGO_SIZE, height: LOGO_SIZE }}>
        <img
          src={iconUrl}
          alt=""
          width={LOGO_SIZE}
          height={LOGO_SIZE}
          className="size-5 object-contain [filter:brightness(0)_invert(1)]"
          style={{ display: "block" }}
        />
      </div>
    );
  }

  return (
    <div className={boxClass} style={{ width: LOGO_SIZE, height: LOGO_SIZE }}>
      <FallbackIcon className="h-4 w-4" />
    </div>
  );
}
