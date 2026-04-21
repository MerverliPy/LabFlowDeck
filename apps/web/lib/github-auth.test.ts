import { describe, expect, it, vi } from 'vitest';

describe('github auth helpers', () => {
  it('round-trips signed session and access token values', async () => {
    vi.stubEnv('GITHUB_CLIENT_SECRET', 'top-secret');

    const { createSignedGitHubAccessTokenValue, createSignedGitHubSessionValue, readGitHubAccessToken, readGitHubSession } = await import('./github-auth');

    const signedSession = createSignedGitHubSessionValue({
      login: 'calvin',
      name: 'Calvin',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1',
      profileUrl: 'https://github.com/calvin',
    });
    const signedAccessToken = createSignedGitHubAccessTokenValue('gho_test_token');

    expect(
      readGitHubSession({
        get(name: string) {
          return name === 'labflowdeck_github_session' && signedSession ? { value: signedSession } : undefined;
        },
      }),
    ).toEqual({
      login: 'calvin',
      name: 'Calvin',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1',
      profileUrl: 'https://github.com/calvin',
    });

    expect(
      readGitHubAccessToken({
        get(name: string) {
          return name === 'labflowdeck_github_access_token' && signedAccessToken ? { value: signedAccessToken } : undefined;
        },
      }),
    ).toBe('gho_test_token');

    vi.unstubAllEnvs();
  });

  it('rejects tampered signed values', async () => {
    vi.stubEnv('GITHUB_CLIENT_SECRET', 'top-secret');

    const { createSignedGitHubAccessTokenValue, createSignedGitHubSessionValue, readGitHubAccessToken, readGitHubSession } = await import('./github-auth');

    const signedSession = createSignedGitHubSessionValue({
      login: 'calvin',
      name: 'Calvin',
      avatarUrl: 'https://avatars.githubusercontent.com/u/1',
      profileUrl: 'https://github.com/calvin',
    });
    const signedAccessToken = createSignedGitHubAccessTokenValue('gho_test_token');

    expect(
      readGitHubSession({
        get(name: string) {
          return name === 'labflowdeck_github_session' && signedSession ? { value: `${signedSession}tampered` } : undefined;
        },
      }),
    ).toBeNull();

    expect(
      readGitHubAccessToken({
        get(name: string) {
          return name === 'labflowdeck_github_access_token' && signedAccessToken
            ? { value: `${signedAccessToken}tampered` }
            : undefined;
        },
      }),
    ).toBeNull();

    vi.unstubAllEnvs();
  });
});
