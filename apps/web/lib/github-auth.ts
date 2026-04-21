import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

import type { NextRequest } from 'next/server';

export interface GitHubSession {
  login: string;
  name: string;
  avatarUrl: string;
  profileUrl: string;
}

export type CookieReader = {
  get(name: string): { value: string } | undefined;
};

type CookieOptions = {
  httpOnly: boolean;
  maxAge: number;
  path: string;
  sameSite: 'lax';
  secure: boolean;
};

interface GitHubOAuthConfig {
  clientId: string;
  clientSecret: string;
  scope: string;
}

export const GITHUB_SESSION_COOKIE_NAME = 'labflowdeck_github_session';
export const GITHUB_OAUTH_STATE_COOKIE_NAME = 'labflowdeck_github_oauth_state';
export const GITHUB_ACCESS_TOKEN_COOKIE_NAME = 'labflowdeck_github_access_token';

const STATE_COOKIE_MAX_AGE_SECONDS = 60 * 10;
const SESSION_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 12;

function getSessionSecret() {
  return process.env.LABFLOWDECK_SESSION_SECRET?.trim() || process.env.GITHUB_CLIENT_SECRET?.trim() || null;
}

function isSecureRequest(request: NextRequest) {
  return request.headers.get('x-forwarded-proto') === 'https' || request.nextUrl.protocol === 'https:';
}

export function getGitHubOAuthConfig(): GitHubOAuthConfig | null {
  const clientId = process.env.GITHUB_CLIENT_ID?.trim();
  const clientSecret = process.env.GITHUB_CLIENT_SECRET?.trim();

  if (!clientId || !clientSecret) {
    return null;
  }

  return {
    clientId,
    clientSecret,
    scope: process.env.GITHUB_OAUTH_SCOPE?.trim() || 'read:user repo',
  };
}

export function buildLoginRedirectUrl(request: NextRequest, status: string) {
  const url = new URL('/login', request.url);
  url.searchParams.set('status', status);
  return url;
}

export function buildGitHubAuthorizeUrl(request: NextRequest, state: string) {
  const config = getGitHubOAuthConfig();

  if (!config) {
    return null;
  }

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', config.clientId);
  authorizeUrl.searchParams.set('redirect_uri', getGitHubCallbackUrl(request));
  authorizeUrl.searchParams.set('scope', config.scope);
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('allow_signup', 'false');

  return authorizeUrl;
}

export function createGitHubOAuthState() {
  return randomUUID();
}

export function getGitHubStateCookieOptions(request: NextRequest): CookieOptions {
  return {
    httpOnly: true,
    maxAge: STATE_COOKIE_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax',
    secure: isSecureRequest(request),
  };
}

export function getGitHubSessionCookieOptions(request: NextRequest): CookieOptions {
  return {
    httpOnly: true,
    maxAge: SESSION_COOKIE_MAX_AGE_SECONDS,
    path: '/',
    sameSite: 'lax',
    secure: isSecureRequest(request),
  };
}

export function createSignedGitHubSessionValue(session: GitHubSession) {
  return createSignedValue(JSON.stringify(session));
}

export function createSignedGitHubAccessTokenValue(accessToken: string) {
  return createSignedValue(accessToken);
}

export function readGitHubAccessToken(cookieStore: CookieReader) {
  return readSignedValue(cookieStore.get(GITHUB_ACCESS_TOKEN_COOKIE_NAME)?.value);
}

export function readGitHubSession(cookieStore: CookieReader): GitHubSession | null {
  const payload = readSignedValue(cookieStore.get(GITHUB_SESSION_COOKIE_NAME)?.value);

  if (!payload) {
    return null;
  }

  try {
    const parsed = JSON.parse(payload) as Partial<GitHubSession>;

    if (!parsed.login || !parsed.name || !parsed.avatarUrl || !parsed.profileUrl) {
      return null;
    }

    return {
      login: parsed.login,
      name: parsed.name,
      avatarUrl: parsed.avatarUrl,
      profileUrl: parsed.profileUrl,
    };
  } catch {
    return null;
  }
}

export function mapGitHubUserToSession(profile: {
  avatar_url?: string;
  html_url?: string;
  login?: string;
  name?: string | null;
}): GitHubSession | null {
  if (!profile.login || !profile.html_url || !profile.avatar_url) {
    return null;
  }

  return {
    login: profile.login,
    name: profile.name?.trim() || profile.login,
    avatarUrl: profile.avatar_url,
    profileUrl: profile.html_url,
  };
}

export function getGitHubCallbackUrl(request: NextRequest) {
  return new URL('/auth/github/callback', request.url).toString();
}

function createSignedValue(value: string) {
  const secret = getSessionSecret();

  if (!secret) {
    return null;
  }

  const payload = Buffer.from(value).toString('base64url');
  const signature = createHmac('sha256', secret).update(payload).digest('base64url');

  return `${payload}.${signature}`;
}

function readSignedValue(signedValue: string | undefined) {
  const secret = getSessionSecret();

  if (!signedValue || !secret) {
    return null;
  }

  const separatorIndex = signedValue.lastIndexOf('.');

  if (separatorIndex <= 0) {
    return null;
  }

  const payload = signedValue.slice(0, separatorIndex);
  const signature = signedValue.slice(separatorIndex + 1);
  const expectedSignature = createHmac('sha256', secret).update(payload).digest('base64url');

  if (!signaturesMatch(signature, expectedSignature)) {
    return null;
  }

  try {
    return Buffer.from(payload, 'base64url').toString('utf8');
  } catch {
    return null;
  }
}

function signaturesMatch(received: string, expected: string) {
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);

  if (receivedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(receivedBuffer, expectedBuffer);
}
