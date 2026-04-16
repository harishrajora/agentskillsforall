import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getSkillBySlug,
  getSkillReadmeSections,
  getSkills,
  stripOverviewOneLiner,
  stripOverviewUrlBlock,
  toSkillSlug,
} from "@/lib/skills";
import { SkillOverview } from "@/components/SkillOverview";
import { SkillOverviewDocView } from "@/components/SkillOverviewDocView";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export async function generateStaticParams() {
  const skills = await getSkills();
  return skills.map((s) => ({ slug: toSkillSlug(s.path) }));
}

export default async function SkillPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const readme = await getSkillReadmeSections(slug);
  if (!readme) notFound();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold border-b border-border pb-2">
            Overview
          </h2>
        </CardHeader>
        <CardContent>
          {readme.overviewMarkdown ? (
            <SkillOverviewDocView
              markdown={stripOverviewOneLiner(
                stripOverviewUrlBlock(
                  readme.overviewMarkdown,
                  readme.overviewUrl
                )
              )}
            />
          ) : (
            <SkillOverview skill={skill} />
          )}
        </CardContent>
      </Card>

      <p className="text-sm text-muted-foreground">
        For full reference, implementation samples, and cloud setup, see the{" "}
        <Link href={`/skills/${slug}/documentation`} className="text-primary underline-offset-4 hover:underline">
          Documentation
        </Link>
        {readme.hasPlaybook && (
          <>
            ,{" "}
            <Link href={`/skills/${slug}/playbook`} className="text-primary underline-offset-4 hover:underline">
              Playbook
            </Link>
          </>
        )}
        {readme.hasAdvanced && (
          <>
            ,{" "}
            <Link href={`/skills/${slug}/advanced-patterns`} className="text-primary underline-offset-4 hover:underline">
              Advanced patterns
            </Link>
          </>
        )}
        {readme.hasCloud && (
          <>
            , and{" "}
            <Link href={`/skills/${slug}/cloud-integration`} className="text-primary underline-offset-4 hover:underline">
              Cloud integration
            </Link>
          </>
        )}
        {" "}tabs.
      </p>
    </div>
  );
}
