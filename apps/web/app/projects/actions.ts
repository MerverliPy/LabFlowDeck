'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { getProjectStore } from '../../lib/project-store';

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

export async function createPlaceholderProjectAction(formData: FormData) {
  const name = readField(formData, 'name');
  const repo = readField(formData, 'repo');
  const repoSourceValue = readField(formData, 'repoSource');
  const hostValue = readField(formData, 'host');
  const hostPreset = hostValue === 'edge-host' ? 'edge-host' : 'home-server';
  const repoSource = repoSourceValue === 'github-picker' ? 'github-picker' : 'manual';

  if (!name || !repo) {
    const params = new URLSearchParams();

    if (name) {
      params.set('name', name);
    }

    if (repo) {
      params.set('repo', repo);
    }

    params.set('host', hostPreset);
    params.set('error', 'missing-fields');
    redirect(`/projects/new?${params.toString()}`);
  }

  const project = await getProjectStore().createPlaceholderProject({ name, repo, hostPreset, repoSource });

  revalidatePath('/projects');
  revalidatePath(`/projects/${project.slug}`);

  redirect(`/projects/${project.slug}`);
}
