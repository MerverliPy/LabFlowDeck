import { listHostHeartbeats, summarizeHostHeartbeats } from '../../../../lib/host-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const hosts = await listHostHeartbeats();

  return Response.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    summary: summarizeHostHeartbeats(hosts),
    hosts,
  });
}
