import { executeDeployAction } from '../../../deploy/data';
import type { DeployActionRequest } from '../../../deploy/types';

export async function POST(request: Request) {
  const body = (await request.json()) as DeployActionRequest;

  if (!body?.action || !body?.deploymentId || !body?.targetType) {
    return Response.json(
      {
        accepted: false,
        status: 'rejected',
        operationId: crypto.randomUUID(),
        message: 'Invalid deploy action payload.',
        mode: 'simulated-control-plane',
        nextPollHintMs: 0,
      },
      { status: 400 }
    );
  }

  const response = await executeDeployAction(body);
  const statusCode = response.accepted ? 202 : 404;

  return Response.json(response, { status: statusCode });
}
