import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SkillNotFound() {
  return (
    <div className="py-12 text-center">
      <h2 className="text-xl font-semibold">Skill not found</h2>
      <p className="mt-2 text-muted-foreground">
        The skill you&apos;re looking for doesn&apos;t exist or was removed.
      </p>
      <Button variant="link" className="mt-4" asChild>
        <Link href="/">← Back to all skills</Link>
      </Button>
    </div>
  );
}
