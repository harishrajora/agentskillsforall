import { NextRequest } from "next/server";

export async function GET(_request: NextRequest) {
  // Stub: return empty audit. CLI handles null/empty.
  return Response.json({});
}
