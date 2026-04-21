import Link from 'next/link';
import { cookies } from 'next/headers';
import type { Metadata, Viewport } from 'next';

import { readGitHubSession } from '../lib/github-auth';
import './globals.css';

export const metadata: Metadata = {
  title: 'LabFlowDeck',
  description: 'Mobile-first command center for AI-assisted software delivery.',
  applicationName: 'LabFlowDeck',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0B1020',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = readGitHubSession(await cookies());

  return (
    <html lang="en">
      <body>
        <div style={{ margin: '0 auto', maxWidth: '460px', padding: '16px 16px 0' }}>
          <section className="card" style={{ padding: '14px 16px' }}>
            <div className="cardTitle" style={{ marginBottom: '8px' }}>
              <div>
                <div className="eyebrow" style={{ marginBottom: '6px' }}>
                  GitHub session
                </div>
                <strong>{session ? `Connected as @${session.login}` : 'GitHub not connected yet'}</strong>
              </div>
              <Link className={`badge ${session ? 'badgeGreen' : 'badgeBlue'}`} href="/login">
                {session ? 'Manage' : 'Connect'}
              </Link>
            </div>
            <p className="subtle" style={{ margin: 0 }}>
              {session
                ? 'The shell can now detect a signed-in GitHub session, but repo discovery, sync, and live controls still land in later phases.'
                : 'The shell stays browseable without login, but unauthenticated users are guided to connect GitHub before repo-backed surfaces land.'}
            </p>
          </section>
        </div>
        {children}
      </body>
    </html>
  );
}
