import { test, expect } from '@playwright/test';

const base = process.env.E2E_BASE_URL || 'http://localhost:3000';
const langs = ['es', 'en'];
const mobileViewport = { width: 390, height: 844 };

test.describe('Language Routing and Page Load', () => {
  test.use({ viewport: mobileViewport });

  test('root redirects to /es', async ({ page }) => {
    const res = await page.goto(`${base}/`);
    await expect(page).toHaveURL(`${base}/es`);
  });

  test('/jobs redirects to /es/jobs', async ({ page }) => {
    const res = await page.goto(`${base}/jobs`);
    await expect(page).toHaveURL(`${base}/es/jobs`);
  });

  test('/it-job-guide redirects to /es/it-job-guide', async ({ page }) => {
    const res = await page.goto(`${base}/it-job-guide`);
    await expect(page).toHaveURL(`${base}/es/it-job-guide`);
  });

  for (const lang of langs) {
    test(`/${lang} loads`, async ({ page }) => {
      await page.goto(`${base}/${lang}`);
      // Check for a section from the home page (e.g., AboutSection or a unique element)
      await expect(page.locator('main')).toBeVisible();
    });

    test(`/${lang}/jobs loads and has heading`, async ({ page }) => {
      await page.goto(`${base}/${lang}/jobs`);
      await expect(page.getByRole('heading', { name: 'Open Job Positions' })).toBeVisible();
    });

    test(`/${lang}/it-job-guide loads and has heading`, async ({ page }) => {
      await page.goto(`${base}/${lang}/it-job-guide`);
      // Spanish heading is always present, English may be translated in the future
      await expect(
        page.locator('h1, h2').filter({ hasText: 'Guía para conseguir trabajo IT en Nueva Zelanda' })
      ).toBeVisible();
    });
  }
}); 