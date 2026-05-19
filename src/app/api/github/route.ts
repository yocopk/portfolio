import { NextResponse } from "next/server";
import { getGitHubStats } from "@/lib/github";

export const revalidate = 3600;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username =
    searchParams.get("u") ||
    process.env.NEXT_PUBLIC_GITHUB_USERNAME ||
    "yocopk";

  const stats = await getGitHubStats(username);

  return NextResponse.json(stats, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
