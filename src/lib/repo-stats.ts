/**
 * Public activity figures for the Helios repository, read from the GitHub API
 * at build time.
 *
 * These describe the repository, not any one person's output: the counts
 * include five years of work by the whole team. They are here because a system
 * that is still cutting releases is better evidence than any adjective.
 *
 * The network is not allowed to break a build. Every request has a short
 * timeout and falls back to the figures below, which were accurate on
 * 19 October 2026 — so the page always renders something true, just possibly
 * a little behind.
 */

const REPOSITORY = 'hashicorp/design-system';
const TIMEOUT_MS = 4000;

export type RepoStats = {
  releases: number;
  mergedPullRequests: number;
  latestRelease: string | null;
  /** False when any figure came from the fallback rather than the API. */
  live: boolean;
};

const FALLBACK: RepoStats = {
  releases: 284,
  mergedPullRequests: 3484,
  latestRelease: '2026-10-16',
  live: false,
};

async function get(path: string, init?: RequestInit): Promise<Response | null> {
  try {
    return await fetch(`https://api.github.com/${path}`, {
      ...init,
      headers: { accept: 'application/vnd.github+json' },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    return null;
  }
}

/**
 * The total count lives in the `last` page number of the Link header, which is
 * one request rather than paging through 284 releases.
 */
async function countViaLinkHeader(path: string): Promise<number | null> {
  const response = await get(`${path}?per_page=1`, { method: 'HEAD' });
  if (!response?.ok) return null;
  const last = response.headers
    .get('link')
    ?.match(/[?&]page=(\d+)>;\s*rel="last"/);
  return last ? Number(last[1]) : null;
}

async function countMergedPullRequests(): Promise<number | null> {
  const response = await get(
    `search/issues?q=repo:${REPOSITORY}+is:pr+is:merged&per_page=1`,
  );
  if (!response?.ok) return null;
  const body = (await response.json()) as { total_count?: number };
  return typeof body.total_count === 'number' ? body.total_count : null;
}

async function latestReleaseDate(): Promise<string | null> {
  const response = await get(`repos/${REPOSITORY}/releases/latest`);
  if (!response?.ok) return null;
  const body = (await response.json()) as { published_at?: string };
  return body.published_at?.slice(0, 10) ?? null;
}

export async function repoStats(): Promise<RepoStats> {
  const [releases, mergedPullRequests, latestRelease] = await Promise.all([
    countViaLinkHeader(`repos/${REPOSITORY}/releases`),
    countMergedPullRequests(),
    latestReleaseDate(),
  ]);

  return {
    releases: releases ?? FALLBACK.releases,
    mergedPullRequests: mergedPullRequests ?? FALLBACK.mergedPullRequests,
    latestRelease: latestRelease ?? FALLBACK.latestRelease,
    live: releases !== null && mergedPullRequests !== null,
  };
}

/** "October 2026", or null when there is no date to show. */
export function formatReleaseMonth(date: string | null): string | null {
  if (!date) return null;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
