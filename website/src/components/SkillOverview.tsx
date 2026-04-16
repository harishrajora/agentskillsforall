import { parseSkillDescription } from "@/lib/parseDescription";
import { getSkillDisplayName } from "@/lib/skillsHelpers";
import type { Skill } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

interface SkillOverviewProps {
  skill: Skill;
}

export function SkillOverview({ skill }: SkillOverviewProps) {
  const { whatItDoes, whenToUse, triggers } = parseSkillDescription(skill.description);
  const title = getSkillDisplayName(skill.path);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mt-2 leading-relaxed text-muted-foreground">{whatItDoes}</p>
      </section>

      {whenToUse.length > 0 && (
        <section>
          <h3 className="text-base font-semibold">When to use this skill</h3>
          <p className="mt-1 mb-2 text-sm text-muted-foreground">
            Use this skill when the user:
          </p>
          <ul className="list-disc list-inside space-y-1.5 text-sm text-muted-foreground">
            {whenToUse.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {triggers.length > 0 && (
        <section>
          <h3 className="text-base font-semibold">Triggers on</h3>
          <p className="mt-1 mb-2 text-sm text-muted-foreground">
            The skill activates when the user mentions:
          </p>
          <div className="flex flex-wrap gap-2">
            {triggers.map((t, i) => (
              <Badge key={`${t}-${i}`} variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
