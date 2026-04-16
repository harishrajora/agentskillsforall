import Link from "next/link";
import type { Skill } from "@/lib/types";
import { categoryToSentenceCase, getSkillDisplayName, isHotSkill, toSkillSlug } from "@/lib/skillsHelpers";
import { SkillLogo } from "./SkillLogo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SkillCardProps {
  skill: Skill;
}

export function SkillCard({ skill }: SkillCardProps) {
  return (
    <Link href={`/skills/${toSkillSlug(skill.path)}`} className="block h-full w-full">
      <Card className="w-full bg-transparent shadow-none transition-all duration-300 ease-out hover:border-primary/20 hover:shadow-none">
        <CardContent className="flex w-full items-start gap-3 px-3 py-[2px]">
          <SkillLogo skillPath={skill.path} className="mt-0.5 shrink-0" />
          <div className="min-w-0 flex-1 flex flex-col min-h-0 space-y-2 overflow-hidden">
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <h3 className="font-semibold leading-none">
                {getSkillDisplayName(skill.path)}
              </h3>
              {isHotSkill(skill.path) && (
                <Badge variant="secondary" className="bg-primary/15 text-primary ring-1 ring-primary/30">
                  Hot
                </Badge>
              )}
            </div>
            <div className="flex w-full flex-wrap gap-2 mt-1">
              <Badge variant="tag">{categoryToSentenceCase(skill.category)}</Badge>
              {skill.languages?.slice(0, 4).map((lang) => (
                <Badge key={lang} variant="tag">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
