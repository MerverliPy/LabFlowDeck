import packageJson from '../../../package.json';

function getBuildCommit() {
  const commitSha = process.env.VERCEL_GIT_COMMIT_SHA ?? process.env.GITHUB_SHA ?? process.env.SOURCE_COMMIT;

  return commitSha ? commitSha.slice(0, 7) : 'local';
}

export async function GET() {
  return Response.json({
    ok: true,
    app: 'labflowdeck-web',
    surface: 'control-plane-shell',
    build: {
      version: packageJson.version,
      commit: getBuildCommit(),
      environment: process.env.NODE_ENV ?? 'development',
    },
  });
}
