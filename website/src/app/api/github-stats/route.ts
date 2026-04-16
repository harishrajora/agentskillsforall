import { getGitHubRepoStats } from "@/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
  const stats = await getGitHubRepoStats();
  return NextResponse.json(stats);
}
