import { cookies } from 'next/headers';

import { getGitHubRepoPickerState } from '../../../../lib/github';

export async function GET() {
  const repoPickerState = await getGitHubRepoPickerState(await cookies());

  if (repoPickerState.kind === 'signed-out') {
    return Response.json(repoPickerState, { status: 401 });
  }

  if (repoPickerState.kind === 'reauth-required' || repoPickerState.kind === 'error') {
    return Response.json(repoPickerState, { status: 503 });
  }

  return Response.json(repoPickerState);
}
