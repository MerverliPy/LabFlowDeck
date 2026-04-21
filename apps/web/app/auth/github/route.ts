import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import {
  buildGitHubAuthorizeUrl,
  buildLoginRedirectUrl,
  createGitHubOAuthState,
  GITHUB_OAUTH_STATE_COOKIE_NAME,
  getGitHubStateCookieOptions,
} from '../../../lib/github-auth';

export async function GET(request: NextRequest) {
  const state = createGitHubOAuthState();
  const authorizeUrl = buildGitHubAuthorizeUrl(request, state);

  if (!authorizeUrl) {
    return NextResponse.redirect(buildLoginRedirectUrl(request, 'unavailable'));
  }

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set(GITHUB_OAUTH_STATE_COOKIE_NAME, state, getGitHubStateCookieOptions(request));

  return response;
}
