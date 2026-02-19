// Week 7: E2E Testing with Playwright
import { test, expect } from '@playwright/test';

test.describe('User Registration and Lesson Flow', () => {
  test('complete user journey', async ({ page }) => {
    // Registration
    await page.goto('/');
    await page.click('text=Sign Up');
    await page.fill('[name="username"]', 'testuser');
    await page.fill('[name="password"]', 'TestPass123!');
    await page.click('button[type="submit"]');
    
    // Navigate to lessons
    await expect(page).toHaveURL('/lessons');
    
    // Start a lesson
    await page.click('.lesson-card:first-child');
    await expect(page.locator('h1')).toContainText('Lesson');
    
    // Complete lesson
    await page.click('text=Mark Complete');
    await expect(page.locator('.success-message')).toBeVisible();
  });
});
