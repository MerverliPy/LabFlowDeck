import { listDeployStatuses } from '../../../deploy/data';

export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json(await listDeployStatuses());
}
