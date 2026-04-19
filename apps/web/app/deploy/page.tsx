import { Suspense } from 'react';

import DeployPageClient from './DeployPageClient';
import { listDeployStatuses } from './data';

export default async function DeployPage() {
  const initialData = await listDeployStatuses();

  return (
    <Suspense fallback={null}>
      <DeployPageClient initialData={initialData} />
    </Suspense>
  );
}
