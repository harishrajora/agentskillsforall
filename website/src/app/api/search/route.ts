import { NextRequest } from "next/server";
import { searchSkills } from "@/lib/store";

export async function GET(request: NextRequest) {
  const url = request.nextUrl ?? new URL(request.url);
  const q = url.searchParams.get("q") ?? "";
  const limit = Math.min(
    1000,
    Math.max(1, parseInt(url.searchParams.get("limit") ?? "10", 10) || 10)
  );
  const offset = Math.max(0, parseInt(url.searchParams.get("offset") ?? "0", 10) || 0);
  const skills = await searchSkills(q, limit, offset);
  return Response.json({
    skills: skills.map((s) => ({
      id: s.id,
      name: s.name,
      installs: s.installCount,
      source: s.source,
      category: s.category,
    })),
  });
}
