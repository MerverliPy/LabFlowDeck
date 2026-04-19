import { listDeployStatuses } from '../../../deploy/data';

export async function GET() {
  return Response.json(await listDeployStatuses());
}
