const GITHUB_REPO = "harishrajora/skills";
const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}`;

export type GitHubRepoStats = {
  stars: number;
  forks: number;
  repoUrl: string;
};

export async function getGitHubRepoStats(): Promise<GitHubRepoStats> {
  try {
    const res = await fetch(GITHUB_API_URL, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Agent-Skills-For-All",
      },
    });
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = (await res.json()) as { stargazers_count: number; forks_count: number; html_url: string };
    return {
      stars: data.stargazers_count ?? 0,
      forks: data.forks_count ?? 0,
      repoUrl: data.html_url ?? `https://github.com/${GITHUB_REPO}`,
    };
  } catch {
    return { stars: 0, forks: 0, repoUrl: `https://github.com/${GITHUB_REPO}` };
  }
}
