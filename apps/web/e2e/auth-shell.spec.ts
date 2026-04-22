import { expect, test } from '@playwright/test';

test('renders the unauthenticated mobile login shell honestly', async ({ page }) => {
  await page.goto('/login');

  await expect(page).toHaveTitle(/LabFlowDeck/i);
  await expect(page.getByRole('heading', { level: 1, name: 'GitHub login' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: 'Session status' })).toBeVisible();
  await expect(page.getByText('Signed out')).toBeVisible();
  await expect(page.getByText('GitHub not connected yet')).toBeVisible();
  await expect(page.getByText('No implied repo sync')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Return to project setup' })).toBeVisible();
});
