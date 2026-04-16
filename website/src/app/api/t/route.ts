import { NextRequest } from "next/server";
import { addEvent } from "@/lib/store";

export async function GET(request: NextRequest) {
  const url = request.nextUrl ?? new URL(request.url);
  const params: Record<string, string | undefined> = {};
  url.searchParams.forEach((value, key) => {
    params[key] = value;
  });
  if (params.event) {
    addEvent(params);
  }
  return new Response(null, { status: 204 });
}
