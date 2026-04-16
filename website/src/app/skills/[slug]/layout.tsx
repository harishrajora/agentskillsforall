import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getSkillBySlug,
  getAvailableDocTypes,
  getGitHubSkillUrl,
  getSkillDisplayName,
  getSkillInstallCommand,
  isHotSkill,
} from "@/lib/skills";
import { categoryToSentenceCase } from "@/lib/skillsHelpers";
import { SkillLogo } from "@/components/SkillLogo";
import { SkillDocNav } from "@/components/SkillDocNav";
import { CopyableUrlBlock } from "@/components/CopyableUrlBlock";
import { GitHubStatsInline } from "@/components/GitHubStatsInline";
import { type DocType } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) return {};
  const title = getSkillDisplayName(skill.path);
  const description =
    skill.description?.slice(0, 160) ||
    `${title} — Install and use this agent skill for test automation. By TestMu AI.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SkillLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const baseDocTypes = await getAvailableDocTypes(skill);
  const docTypes: DocType[] = [
    "skill",
    "documentation",
    ...baseDocTypes.filter((t) => t !== "skill"),
  ];
  const githubUrl = getGitHubSkillUrl(skill.path, skill.sourceRepo);
  const installCommand = getSkillInstallCommand(skill.path, skill.sourceRepo);
  const title = getSkillDisplayName(skill.path);

  return (
    <div className="space-y-6">
      <div className="border-b border-border pb-6">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-2">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-foreground font-medium truncate" aria-current="page">
              {title}
            </li>
          </ol>
        </nav>
        <Button variant="link" size="sm" className="text-muted-foreground p-0 h-auto" asChild>
          <Link href="/">← All skills</Link>
        </Button>
        <div className="mt-2 flex flex-wrap items-center gap-3">
          <SkillLogo skillPath={skill.path} />
          <div className="min-w-0 flex-1 flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            {isHotSkill(skill.path) && (
              <Badge variant="secondary" className="bg-primary/15 text-primary ring-1 ring-primary/30">
                Hot
              </Badge>
            )}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Badge variant="tag">{categoryToSentenceCase(skill.category)}</Badge>
          {skill.languages?.map((lang) => (
            <Badge key={lang} variant="tag">
              {lang}
            </Badge>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Button variant="link" size="sm" className="text-muted-foreground p-0 h-auto" asChild>
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub →
            </a>
          </Button>
          <GitHubStatsInline repo={skill.sourceRepo || "harishrajora/skills"} />
        </div>
      </div>
      <div className="pb-4">
        <CopyableUrlBlock
          url={installCommand}
          label="Copy and Paste in your Terminal"
        />
      </div>
      <SkillDocNav slug={slug} docTypes={docTypes} />
      {children}
    </div>
  );
}
