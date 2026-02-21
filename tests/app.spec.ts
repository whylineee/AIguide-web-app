import { test, expect } from '@playwright/test';

test.describe('AI Agent Control Panel - UI Checks', () => {
    test('Login Page Renders Correctly', async ({ page }) => {
        await page.goto('http://localhost:3000/login');

        // Check if the branding text is visible (Premium UI check)
        await expect(page.locator('text=Build AI Agents. Automate Workflows.')).toBeVisible();

        // Check for login fields and OAuth buttons
        await expect(page.locator('text=Welcome Back')).toBeVisible();
        await expect(page.locator('button:has-text("Continue with Google")')).toBeVisible();
        await expect(page.locator('button:has-text("Continue with GitHub")')).toBeVisible();

        // Check for email form
        await expect(page.locator('input[name="email"]')).toBeVisible();
        await expect(page.locator('input[name="password"]')).toBeVisible();
    });

    test('Dashboard redirects to login when unauthenticated', async ({ page }) => {
        await page.goto('http://localhost:3000/dashboard');

        // It should immediately redirect to /login
        await page.waitForURL('http://localhost:3000/login');
        await expect(page).toHaveURL('http://localhost:3000/login');
    });
});
