import Link from 'next/link';
import { cookies } from 'next/headers';

import { getGitHubOAuthConfig, readGitHubSession } from '../../lib/github-auth';

const authBenefits = [
  {
    title: 'Single-user shell session',
    detail: 'The app can detect when the configured GitHub account has completed OAuth and surface that presence honestly in the shell.',
  },
  {
    title: 'Clear callback outcomes',
    detail: 'Success, missing configuration, denied access, and callback mismatch states all return to this page with an explicit status.',
  },
  {
    title: 'No implied repo sync',
    detail: 'This phase stops at session presence. Repository discovery, metadata ingestion, and workflow automation stay out of scope here.',
  },
];

const statusContent = {
  connected: {
    badge: 'badgeGreen',
    title: 'GitHub connected',
    message: 'The shell session is active and can now render GitHub session presence without claiming repo sync or broader control.',
  },
  unavailable: {
    badge: 'badgeAmber',
    title: 'GitHub OAuth not configured',
    message: 'Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET before starting the auth flow. The shell stays honest about auth being unavailable until then.',
  },
  'state-mismatch': {
    badge: 'badgeRed',
    title: 'Login could not be verified',
    message: 'The returned OAuth state did not match the shell session. Retry the login flow from this page.',
  },
  denied: {
    badge: 'badgeAmber',
    title: 'GitHub access was not granted',
    message: 'The auth flow returned without permission, so the shell stayed signed out.',
  },
  'missing-code': {
    badge: 'badgeRed',
    title: 'GitHub callback was incomplete',
    message: 'GitHub did not return an authorization code, so the shell could not create a session.',
  },
  'exchange-failed': {
    badge: 'badgeRed',
    title: 'GitHub token exchange failed',
    message: 'The callback reached GitHub but could not finish the token exchange. Retry the flow or review the configured OAuth app.',
  },
  'profile-failed': {
    badge: 'badgeRed',
    title: 'GitHub profile lookup failed',
    message: 'The shell could not load the authenticated GitHub profile needed to establish session presence.',
  },
} as const;

type LoginPageProps = {
  searchParams?: Promise<{
    status?: keyof typeof statusContent;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const session = readGitHubSession(await cookies());
  const authConfigured = getGitHubOAuthConfig() !== null;
  const status = params?.status;
  const notice = status ? statusContent[status] : session ? statusContent.connected : null;

  return (
    <main className="shell">
      <section className="header">
        <div>
          <div className="eyebrow">LabFlowDeck</div>
          <h1>GitHub login</h1>
          <p className="subtle">
            Connect the single-user shell to GitHub so later repo-backed steps can build on a real session without overstating what is already live.
          </p>
        </div>
        <Link className="badge badgeBlue" href="/">
          Hub
        </Link>
      </section>

      <div className="grid">
        <section className="card">
          <div className="cardTitle">
            <h2>Session status</h2>
            <span className={`badge ${session ? 'badgeGreen' : 'badgeBlue'}`}>{session ? 'Connected' : 'Signed out'}</span>
          </div>

          {session ? (
            <div className="list">
              <div className="listItem">
                <div>
                  <strong>{session.name}</strong>
                  <div className="listMeta">@{session.login}</div>
                </div>
                <span className="badge badgeGreen">Shell session</span>
              </div>
              <div className="listItem">
                <div>
                  <strong>Current boundary</strong>
                  <div className="listMeta">GitHub identity is present, but live repo sync and control-plane actions are still out of scope.</div>
                </div>
                <span className="badge badgeBlue">Bounded</span>
              </div>
            </div>
          ) : (
            <p className="subtle">
              Sign in with GitHub to give the shell a real session presence. The rest of the app remains honest about repo discovery and other GitHub-backed features still landing later.
            </p>
          )}
        </section>

        {notice ? (
          <section className="card">
            <div className="cardTitle">
              <h2>{notice.title}</h2>
              <span className={`badge ${notice.badge}`}>{status === 'connected' || (!status && session) ? 'Ready' : 'Review'}</span>
            </div>
            <p className="subtle">{notice.message}</p>
          </section>
        ) : null}

        <section className="card">
          <div className="cardTitle">
            <h2>Start the bounded auth flow</h2>
            <span className="badge badgeBlue">Single user</span>
          </div>
          <p className="subtle">
            This flow only establishes a GitHub session for the shell. It does not yet fetch repositories, sync metadata, or claim broader GitHub orchestration.
          </p>
          <div className="grid" style={{ marginTop: '14px' }}>
            {authConfigured ? (
              <Link className="primaryCta ctaLink" href="/auth/github">
                {session ? 'Reconnect GitHub session' : 'Continue with GitHub'}
              </Link>
            ) : (
              <div className="secondaryCta">GitHub OAuth becomes available after you configure the required environment variables.</div>
            )}
            <Link className="secondaryCta ctaLink" href="/projects/new">
              Return to project setup
            </Link>
          </div>
        </section>

        <section className="card">
          <div className="cardTitle">
            <h2>What this phase enables</h2>
            <span className="subtle">No overstated maturity</span>
          </div>
          <div className="list">
            {authBenefits.map((item) => (
              <div className="listItem" key={item.title}>
                <div>
                  <strong>{item.title}</strong>
                  <div className="listMeta">{item.detail}</div>
                </div>
                <span className="badge badgeBlue">Scoped</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <nav className="bottomNav" aria-label="Primary">
        <Link className="navLink" href="/">
          Hub
        </Link>
        <Link className="navLink" href="/projects">
          Projects
        </Link>
        <Link className="navLink navLinkActive" href="/login">
          Login
        </Link>
        <Link className="navLink" href="/deploy">
          Deploy
        </Link>
      </nav>
    </main>
  );
}
