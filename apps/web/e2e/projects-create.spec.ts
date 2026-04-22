import { expect, test } from '@playwright/test';

test('creates a bounded placeholder project from the mobile setup flow', async ({ page }) => {
  const uniqueProjectName = `Mobile Smoke ${Date.now()}`;

  await page.goto('/projects/new');

  await expect(page.getByRole('heading', { level: 1, name: 'New project' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Step 1 · Name + repo' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'Project name' })).toBeVisible();
  await expect(page.getByRole('textbox', { name: 'GitHub repository' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Connect GitHub' })).toBeVisible();

  await page.getByRole('textbox', { name: 'Project name' }).fill(uniqueProjectName);
  await page.getByRole('textbox', { name: 'GitHub repository' }).fill('smoke/mobile-shell');
  await page.getByRole('button', { name: 'Create placeholder project' }).click();

  await expect(page).toHaveURL(/\/projects\//);
  await expect(page.getByRole('heading', { level: 1, name: uniqueProjectName })).toBeVisible();
  await expect(page.getByText('smoke/mobile-shell · main')).toBeVisible();
  await expect(page.getByText('GitHub · placeholder repo captured')).toBeVisible();
  await expect(page.getByText('Home server placeholder target')).toBeVisible();
});
