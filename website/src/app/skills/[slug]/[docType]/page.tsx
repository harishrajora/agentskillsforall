import { notFound } from "next/navigation";
import {
  getSkillBySlug,
  getSkillMarkdown,
  getAvailableDocTypes,
  getSkills,
  toSkillSlug,
} from "@/lib/skills";
import { SkillDocView } from "@/components/SkillDocView";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DOC_TYPE_LABELS, type DocType } from "@/lib/types";

const SHORT_CONTENT_THRESHOLD = 500;

/** Doc types served by this dynamic route (documentation has its own page). */
type MarkdownDocType = "playbook" | "advanced-patterns" | "cloud-integration";

const VALID_DOC_TYPES: MarkdownDocType[] = [
  "playbook",
  "advanced-patterns",
  "cloud-integration",
];

const DOC_DESCRIPTIONS: Record<MarkdownDocType, string> = {
  playbook: "Complete implementation guide with code samples, patterns, and best practices.",
  "advanced-patterns": "Advanced topics and patterns for experienced users.",
  "cloud-integration": "Cloud execution and TestMu AI integration.",
};

function isMarkdownDocType(t: DocType): t is MarkdownDocType {
  return (VALID_DOC_TYPES as readonly string[]).includes(t);
}

export async function generateStaticParams() {
  const skills = await getSkills();
  const params: { slug: string; docType: string }[] = [];
  for (const skill of skills) {
    const slug = toSkillSlug(skill.path);
    const types = await getAvailableDocTypes(skill);
    for (const docType of types) {
      if (isMarkdownDocType(docType)) {
        params.push({ slug, docType });
      }
    }
  }
  return params;
}

export default async function SkillDocPage({
  params,
}: {
  params: Promise<{ slug: string; docType: string }>;
}) {
  const { slug, docType } = await params;
  const typedDoc = docType as MarkdownDocType;
  if (!VALID_DOC_TYPES.includes(typedDoc)) notFound();

  const skill = await getSkillBySlug(slug);
  if (!skill) notFound();

  const availableTypes = await getAvailableDocTypes(skill);
  if (!availableTypes.includes(typedDoc)) notFound();

  const markdown = await getSkillMarkdown(slug, typedDoc);
  if (markdown === null) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">
            This document could not be loaded.
          </p>
        </CardContent>
      </Card>
    );
  }

  const title = DOC_TYPE_LABELS[typedDoc];
  const description = DOC_DESCRIPTIONS[typedDoc];
  const isShort = markdown.trim().length < SHORT_CONTENT_THRESHOLD;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold border-b border-border pb-2">
            {title}
          </h2>
          {description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <SkillDocView markdown={markdown} />
          {isShort && (
            <p className="mt-6 text-sm text-muted-foreground border-t border-border pt-4">
              This section is being expanded. For more patterns and examples, see the Playbook and Documentation tabs.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
