import { describe, expect, it, vi } from 'vitest';

import { getGitHubRepoPickerState } from './github';

describe('getGitHubRepoPickerState', () => {
  it('returns signed-out state when no GitHub session exists', async () => {
    const result = await getGitHubRepoPickerState({
      get() {
        return undefined;
      },
    });

    expect(result).toEqual({
      kind: 'signed-out',
      message: 'Connect GitHub on /login to load a bounded live repository list during project setup.',
      repos: [],
    });
  });

  it('returns reauth-required when session exists but access token does not', async () => {
    vi.stubEnv('GITHUB_CLIENT_SECRET', 'top-secret');

    const { createSignedGitHubSessionValue } = await import('./github-auth');
    const signedSession = createSignedGitHubSessionValue({
      login: 'calvin',
      name: 'Calvin',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1',
      profileUrl: 'https://github.com/calvin',
    });

    const result = await getGitHubRepoPickerState({
      get(name: string) {
        return name === 'labflowdeck_github_session' && signedSession ? { value: signedSession } : undefined;
      },
    });

    expect(result).toEqual({
      kind: 'reauth-required',
      message: 'Reconnect GitHub on /login to refresh the bounded repository session before picking a repo.',
      repos: [],
    });

    vi.unstubAllEnvs();
  });
});
