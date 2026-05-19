import { Octokit } from "@octokit/rest";

export interface GitHubStats {
  username: string;
  publicRepos: number;
  followers: number;
  totalStars: number;
  topLanguage: string | null;
  topLanguagePct: number;
  avatarUrl: string;
  htmlUrl: string;
  bio: string | null;
  fetchedAt: string;
}

const FALLBACK: GitHubStats = {
  username: "yocopk",
  publicRepos: 0,
  followers: 0,
  totalStars: 0,
  topLanguage: null,
  topLanguagePct: 0,
  avatarUrl: "",
  htmlUrl: "https://github.com/yocopk",
  bio: null,
  fetchedAt: new Date().toISOString(),
};

export async function getGitHubStats(username: string): Promise<GitHubStats> {
  try {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
      request: { fetch: globalThis.fetch },
    });

    const [{ data: user }, { data: repos }] = await Promise.all([
      octokit.users.getByUsername({ username }),
      octokit.repos.listForUser({
        username,
        per_page: 100,
        type: "owner",
        sort: "updated",
      }),
    ]);

    const totalStars = repos.reduce(
      (sum, r) => sum + (r.stargazers_count ?? 0),
      0,
    );

    const langCount = repos.reduce<Record<string, number>>((acc, r) => {
      if (r.language && !r.fork) {
        acc[r.language] = (acc[r.language] ?? 0) + 1;
      }
      return acc;
    }, {});

    const langEntries = Object.entries(langCount).sort((a, b) => b[1] - a[1]);
    const topLanguage = langEntries[0]?.[0] ?? null;
    const totalLangCount = langEntries.reduce((s, [, c]) => s + c, 0) || 1;
    const topLanguagePct = topLanguage
      ? Math.round((langEntries[0]![1] / totalLangCount) * 100)
      : 0;

    return {
      username: user.login,
      publicRepos: user.public_repos,
      followers: user.followers,
      totalStars,
      topLanguage,
      topLanguagePct,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url,
      bio: user.bio,
      fetchedAt: new Date().toISOString(),
    };
  } catch (err) {
    console.warn("[github] stats fetch failed:", err);
    return { ...FALLBACK, username };
  }
}
