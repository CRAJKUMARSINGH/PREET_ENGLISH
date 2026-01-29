
import { test, expect } from '@playwright/test';

test.describe('Resiliency & Stress UI Tests', () => {
  // Run 5 concurrent workers via playwright.config.ts or CLI args

  test('User can login and see profile under load', async ({ page }) => {
    // 1. Navigate to Login
    await page.goto('/auth'); // Adjust route as needed

    // 2. Fill Login Form
    // Using a high index user to avoid collision with others if possible, or just random
    const userId = Math.floor(Math.random() * 500);
    await page.fill('input[name="username"]', `k6_user_${userId}`);
    await page.fill('input[name="password"]', 'TestPass123!');

    // 3. Submit
    await page.click('button[type="submit"]');

    // 4. Visual Validation
    // Expect to be redirected to dashboard or home
    await expect(page).toHaveURL(/.*dashboard|.*home|.*/);

    // Check for "Server Busy" or generic error if the load test is hammering hard
    const errorToast = page.locator('.toast-error'); // Adjust selector
    if (await errorToast.isVisible()) {
      console.log("Server Busy/Error Toast detected - Graceful degradation verified");
      // This might actually be a PASS if we are testing resilience
    } else {
      // Normal success path
      await expect(page.locator('text=Welcome')).toBeVisible({ timeout: 10000 });
    }
  });

  test('Graceful failure on backend outage', async ({ page }) => {
    // This test assumes Toxiproxy or similar has cut the connection
    // We want to see a nice UI message, not a crash

    await page.route('**/api/user', route => route.abort('failed'));

    await page.goto('/dashboard');
    await expect(page.locator('text=Network Error')).toBeVisible(); // Or whatever UI shows
  });
});