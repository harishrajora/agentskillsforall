"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_TYPE_LABELS, type DocType } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SkillDocNavProps {
  slug: string;
  docTypes: DocType[];
}

export function SkillDocNav({ slug, docTypes }: SkillDocNavProps) {
  const pathname = usePathname();
  const base = `/skills/${slug}`;

  const activeTab = docTypes.find((t) => {
    const href = t === "skill" ? base : `${base}/${t}`;
    return (
      href === pathname ||
      (t !== "skill" && pathname === href) ||
      (t !== "skill" && pathname.startsWith(href + "/"))
    );
  });

  const tabValue = activeTab ?? docTypes[0] ?? "skill";

  if (docTypes.length === 0) return null;

  return (
    <Tabs value={tabValue} className="w-full">
      <TabsList variant="pills" className="w-full flex-wrap justify-start gap-2 bg-transparent">
        {docTypes.map((t) => {
          const href = t === "skill" ? base : `${base}/${t}`;
          return (
            <TabsTrigger key={t} value={t} asChild>
              <Link href={href}>{DOC_TYPE_LABELS[t]}</Link>
            </TabsTrigger>
          );
        })}
      </TabsList>
    </Tabs>
  );
}
