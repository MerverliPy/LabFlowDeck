import { unstable_noStore as noStore } from 'next/cache';

import { getDeployControlAdapter } from '../../lib/deploy-adapter';
import type { DeployActionRequest } from './types';

const deployControlAdapter = getDeployControlAdapter();

export async function listDeployStatuses() {
  noStore();
  return deployControlAdapter.listStatuses();
}

export async function executeDeployAction(input: DeployActionRequest) {
  return deployControlAdapter.executeAction(input);
}
