import { getHostHeartbeatResponse } from '../../../../lib/host-store';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(await getHostHeartbeatResponse());
}
