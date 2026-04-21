import { readGitHubAccessToken, readGitHubSession, type CookieReader } from './github-auth';

export interface GitHubRepositoryOption {
  defaultBranch: string;
  fullName: string;
  htmlUrl: string;
  id: number;
  name: string;
  updatedLabel: string;
  visibilityLabel: string;
}

type GitHubRepoPickerState =
  | { kind: 'signed-out'; message: string; repos: [] }
  | { kind: 'reauth-required'; message: string; repos: [] }
  | { kind: 'error'; message: string; repos: [] }
  | { kind: 'empty'; message: string; repos: [] }
  | { kind: 'ready'; message: string; repos: GitHubRepositoryOption[] };

interface GitHubRepositoryResponseItem {
  archived?: boolean;
  default_branch?: string;
  fork?: boolean;
  full_name?: string;
  html_url?: string;
  id?: number;
  name?: string;
  private?: boolean;
  updated_at?: string;
}

const DEFAULT_REPO_LIMIT = 8;

export async function getGitHubRepoPickerState(cookieStore: CookieReader): Promise<GitHubRepoPickerState> {
  const session = readGitHubSession(cookieStore);

  if (!session) {
    return {
      kind: 'signed-out',
      message: 'Connect GitHub on /login to load a bounded live repository list during project setup.',
      repos: [],
    };
  }

  const accessToken = readGitHubAccessToken(cookieStore);

  if (!accessToken) {
    return {
      kind: 'reauth-required',
      message: 'Reconnect GitHub on /login to refresh the bounded repository session before picking a repo.',
      repos: [],
    };
  }

  try {
    const repos = await listGitHubRepositories(accessToken);

    if (repos.length === 0) {
      return {
        kind: 'empty',
        message: 'No repositories were returned for this GitHub session, so the shell falls back to manual entry.',
        repos: [],
      };
    }

    return {
      kind: 'ready',
      message: `Showing ${repos.length} recently updated repositories from the connected GitHub session.`,
      repos,
    };
  } catch {
    return {
      kind: 'error',
      message: 'GitHub repository lookup failed, so the shell falls back to manual repository entry.',
      repos: [],
    };
  }
}

export async function listGitHubRepositories(accessToken: string, limit = DEFAULT_REPO_LIMIT) {
  const response = await fetch(
    `https://api.github.com/user/repos?sort=updated&per_page=${limit}&affiliation=owner,collaborator&visibility=all`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${accessToken}`,
        'User-Agent': 'LabFlowDeck',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(`GitHub repo request failed with ${response.status}`);
  }

  const payload = (await response.json()) as GitHubRepositoryResponseItem[];

  return payload
    .filter((repo) => repo.id && repo.full_name && repo.name && repo.html_url && !repo.archived && !repo.fork)
    .slice(0, limit)
    .map((repo) => ({
      defaultBranch: repo.default_branch || 'main',
      fullName: repo.full_name!,
      htmlUrl: repo.html_url!,
      id: repo.id!,
      name: repo.name!,
      updatedLabel: formatUpdatedLabel(repo.updated_at),
      visibilityLabel: repo.private ? 'Private' : 'Public',
    }));
}

function formatUpdatedLabel(updatedAt?: string) {
  if (!updatedAt) {
    return 'Updated recently';
  }

  const timestamp = Date.parse(updatedAt);

  if (Number.isNaN(timestamp)) {
    return 'Updated recently';
  }

  const diffHours = Math.max(1, Math.round((Date.now() - timestamp) / (1000 * 60 * 60)));

  if (diffHours < 24) {
    return `Updated ${diffHours}h ago`;
  }

  const diffDays = Math.round(diffHours / 24);
  return `Updated ${diffDays}d ago`;
}
