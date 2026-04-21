import { describe, expect, it, vi } from 'vitest';

describe('github auth helpers', () => {
  it('round-trips signed session and access token values', async () => {
    vi.stubEnv('LABFLOWDECK_SESSION_SECRET', 'top-secret');

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
    vi.stubEnv('LABFLOWDECK_SESSION_SECRET', 'top-secret');

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

  it('requires LABFLOWDECK_SESSION_SECRET for signing', async () => {
    vi.stubEnv('GITHUB_CLIENT_SECRET', 'oauth-secret');
    delete process.env.LABFLOWDECK_SESSION_SECRET;

    const { createSignedGitHubAccessTokenValue, createSignedGitHubSessionValue } = await import('./github-auth');

    expect(
      createSignedGitHubSessionValue({
        login: 'calvin',
        name: 'Calvin',
        avatarUrl: 'https://avatars.githubusercontent.com/u/1',
        profileUrl: 'https://github.com/calvin',
      }),
    ).toBeNull();

    expect(createSignedGitHubAccessTokenValue('gho_test_token')).toBeNull();

    vi.unstubAllEnvs();
  });

  it('keeps OAuth config separate from the session secret', async () => {
    vi.stubEnv('GITHUB_CLIENT_ID', 'client-id');
    vi.stubEnv('GITHUB_CLIENT_SECRET', 'oauth-secret');
    delete process.env.LABFLOWDECK_SESSION_SECRET;

    const { getGitHubOAuthConfig } = await import('./github-auth');

    expect(getGitHubOAuthConfig()).toEqual({
      clientId: 'client-id',
      clientSecret: 'oauth-secret',
      scope: 'read:user repo',
    });

    vi.unstubAllEnvs();
  });

});
