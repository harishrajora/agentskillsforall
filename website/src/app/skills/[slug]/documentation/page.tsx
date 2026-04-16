import { notFound } from "next/navigation";
import { getSkillBySlug, getSkillMarkdown, getSkills, toSkillSlug } from "@/lib/skills";
import { SkillDocView } from "@/components/SkillDocView";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export async function generateStaticParams() {
  const skills = await getSkills();
  return skills.map((s) => ({ slug: toSkillSlug(s.path) }));
}

export default async function SkillDocumentationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const markdown = await getSkillMarkdown(slug, "skill");
  if (markdown === null) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            Documentation could not be loaded.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold border-b border-border pb-2">
            Documentation
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Full skill reference (SKILL.md). For more implementation detail, see the Playbook and Advanced patterns tabs.
          </p>
        </CardHeader>
        <CardContent>
          <SkillDocView markdown={markdown} />
        </CardContent>
      </Card>
    </div>
  );
}
