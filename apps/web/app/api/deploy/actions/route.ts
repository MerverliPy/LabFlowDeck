import { revalidatePath } from 'next/cache';

import { appendAcceptedDeployActivity } from '../../../../lib/activity-store';
import { getDeployControlAdapter } from '../../../../lib/deploy-adapter';
import { executeDeployAction } from '../../../deploy/data';
import {
  DEPLOY_ACTION_TARGET_VALUES,
  DEPLOY_ACTION_VALUES,
  type DeployActionRequest,
  type DeployActionResponse,
} from '../../../deploy/types';

function resolveProjectSlug(projectId: string, projectName: string) {
  if (projectId.startsWith('project-')) {
    return projectId.slice('project-'.length);
  }

  return projectName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function isDeployActionRequest(body: unknown): body is DeployActionRequest {
  if (!body || typeof body !== 'object') {
    return false;
  }

  const candidate = body as Partial<DeployActionRequest>;

  if (
    typeof candidate.deploymentId !== 'string' ||
    !DEPLOY_ACTION_VALUES.includes(candidate.action as DeployActionRequest['action']) ||
    !DEPLOY_ACTION_TARGET_VALUES.includes(candidate.targetType as DeployActionRequest['targetType'])
  ) {
    return false;
  }

  if (candidate.targetType === 'service' && typeof candidate.serviceId !== 'string') {
    return false;
  }

  return true;
}

function buildInvalidPayloadResponse(): DeployActionResponse {
  return {
    accepted: false,
    status: 'rejected',
    operationId: crypto.randomUUID(),
    message: 'Invalid deploy action payload.',
    mode: 'adapter-control-plane',
    nextPollHintMs: 0,
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = (await request.json()) as unknown;
  } catch {
    return Response.json(buildInvalidPayloadResponse(), { status: 400 });
  }

  if (!isDeployActionRequest(body)) {
    return Response.json(buildInvalidPayloadResponse(), { status: 400 });
  }

  const response = await executeDeployAction(body);

  if (response.accepted) {
    const statusResponse = await getDeployControlAdapter().listStatuses();
    const deployment = statusResponse.deployments.find((item) => item.id === body.deploymentId);

    if (deployment) {
      await appendAcceptedDeployActivity({
        action: body.action,
        projectName: deployment.projectName,
        projectSlug: resolveProjectSlug(deployment.projectId, deployment.projectName),
        targetEnvironment: response.targetEnvironment,
      });

      revalidatePath('/');
      revalidatePath(`/projects/${resolveProjectSlug(deployment.projectId, deployment.projectName)}`);
    }
  }

  const statusCode = response.accepted ? 202 : 400;

  return Response.json(response, { status: statusCode });
}
