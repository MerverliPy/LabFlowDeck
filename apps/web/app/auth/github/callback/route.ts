import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {
  buildLoginRedirectUrl,
  createSignedGitHubAccessTokenValue,
  GITHUB_ACCESS_TOKEN_COOKIE_NAME,
  createSignedGitHubSessionValue,
  GITHUB_OAUTH_STATE_COOKIE_NAME,
  GITHUB_SESSION_COOKIE_NAME,
  getGitHubCallbackUrl,
  getGitHubOAuthConfig,
  getGitHubSessionCookieOptions,
  getGitHubStateCookieOptions,
  mapGitHubUserToSession,
} from '../../../../lib/github-auth';

export async function GET(request: NextRequest) {
  const callbackError = request.nextUrl.searchParams.get('error');
  const code = request.nextUrl.searchParams.get('code');
  const returnedState = request.nextUrl.searchParams.get('state');
  const storedState = request.cookies.get(GITHUB_OAUTH_STATE_COOKIE_NAME)?.value;

  if (callbackError) {
    return redirectToLogin(request, 'denied');
  }

  if (!code) {
    return redirectToLogin(request, 'missing-code');
  }

  if (!returnedState || !storedState || returnedState !== storedState) {
    return redirectToLogin(request, 'state-mismatch');
  }

  const config = getGitHubOAuthConfig();

  if (!config) {
    return redirectToLogin(request, 'unavailable');
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'User-Agent': 'LabFlowDeck',
    },
    body: JSON.stringify({
      client_id: config.clientId,
      client_secret: config.clientSecret,
      code,
      redirect_uri: getGitHubCallbackUrl(request),
      state: returnedState,
    }),
    cache: 'no-store',
  });

  if (!tokenResponse.ok) {
    return redirectToLogin(request, 'exchange-failed');
  }

  const tokenPayload = (await tokenResponse.json()) as {
    access_token?: string;
  };
  const accessToken = tokenPayload.access_token;

  if (!accessToken) {
    return redirectToLogin(request, 'exchange-failed');
  }

  const profileResponse = await fetch('https://api.github.com/user', {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'User-Agent': 'LabFlowDeck',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    cache: 'no-store',
  });

  if (!profileResponse.ok) {
    return redirectToLogin(request, 'profile-failed');
  }

  const session = mapGitHubUserToSession(await profileResponse.json());
  const signedSession = session ? createSignedGitHubSessionValue(session) : null;
  const signedAccessToken = createSignedGitHubAccessTokenValue(accessToken);

  if (!signedSession || !signedAccessToken) {
    return redirectToLogin(request, 'profile-failed');
  }

  const response = NextResponse.redirect(buildLoginRedirectUrl(request, 'connected'));
  response.cookies.set(GITHUB_SESSION_COOKIE_NAME, signedSession, getGitHubSessionCookieOptions(request));
  response.cookies.set(GITHUB_ACCESS_TOKEN_COOKIE_NAME, signedAccessToken, getGitHubSessionCookieOptions(request));
  response.cookies.set(GITHUB_OAUTH_STATE_COOKIE_NAME, '', {
    ...getGitHubStateCookieOptions(request),
    maxAge: 0,
  });

  return response;
}

function redirectToLogin(request: NextRequest, status: string) {
  const response = NextResponse.redirect(buildLoginRedirectUrl(request, status));
  response.cookies.set(GITHUB_OAUTH_STATE_COOKIE_NAME, '', {
    ...getGitHubStateCookieOptions(request),
    maxAge: 0,
  });
  response.cookies.set(GITHUB_SESSION_COOKIE_NAME, '', {
    ...getGitHubSessionCookieOptions(request),
    maxAge: 0,
  });
  response.cookies.set(GITHUB_ACCESS_TOKEN_COOKIE_NAME, '', {
    ...getGitHubSessionCookieOptions(request),
    maxAge: 0,
  });
  return response;
}
