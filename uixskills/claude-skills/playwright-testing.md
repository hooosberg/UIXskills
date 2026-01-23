# Playwright Browser Automation

General-purpose browser automation skill using Playwright. For testing, scraping, and UI automation.

## Overview

| Field | Value |
|-------|-------|
| Category | claude-skills |
| Tech Base | Claude Code + Playwright |
| Source | [Community](https://github.com/lackeyjb/playwright-skill) |
| License | MIT |
| Dependencies | playwright |

## Purpose

Automate browser interactions for testing and scraping. This skill provides patterns for common automation tasks.

## Installation

```bash
npm install playwright
git clone https://github.com/lackeyjb/playwright-skill.git ~/.claude/skills/playwright
```

## Basic Example

```typescript
import { chromium } from 'playwright';

async function main() {
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate
  await page.goto('https://example.com');

  // Fill form
  await page.fill('input[name="email"]', 'test@example.com');
  await page.fill('input[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  // Wait for navigation
  await page.waitForURL('**/dashboard');

  // Take screenshot
  await page.screenshot({ path: 'dashboard.png', fullPage: true });

  // Assert content
  const heading = await page.textContent('h1');
  console.log('Page heading:', heading);

  await browser.close();
}

main();
```

## Testing Example

```typescript
import { test, expect } from '@playwright/test';

test('homepage has correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/My App/);
});

test('can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[data-testid="email"]', 'user@example.com');
  await page.fill('[data-testid="password"]', 'password');
  await page.click('[data-testid="submit"]');
  await expect(page).toHaveURL('/dashboard');
});

test('can add item to cart', async ({ page }) => {
  await page.goto('/products');
  await page.click('[data-testid="product-1"]');
  await page.click('[data-testid="add-to-cart"]');
  await expect(page.locator('[data-testid="cart-count"]')).toHaveText('1');
});
```

## Selectors

```typescript
// By CSS
await page.click('button.primary');

// By text
await page.click('text=Submit');

// By test ID
await page.click('[data-testid="submit-button"]');

// By role
await page.click('role=button[name="Submit"]');

// By XPath
await page.click('//button[@type="submit"]');

// Chained
await page.locator('form').locator('button').click();
```

## Waiting

```typescript
// Wait for element
await page.waitForSelector('.loaded');

// Wait for network
await page.waitForResponse('**/api/data');

// Wait for navigation
await page.waitForURL('**/success');

// Wait for load state
await page.waitForLoadState('networkidle');

// Custom wait
await page.waitForFunction(() => document.querySelector('.count')?.textContent === '5');
```

## Screenshots & Recording

```typescript
// Screenshot
await page.screenshot({ path: 'page.png' });
await page.screenshot({ path: 'full.png', fullPage: true });
await page.locator('.card').screenshot({ path: 'card.png' });

// PDF
await page.pdf({ path: 'page.pdf', format: 'A4' });

// Video recording (via context)
const context = await browser.newContext({
  recordVideo: { dir: 'videos/' }
});
```

## Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: 'http://localhost:3000',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } },
  ],
});
```

## AI Prompt

> Create a Claude Code skill for Playwright automation with:
> - Browser launching and navigation
> - Form filling and clicking
> - Waiting strategies
> - Screenshot and video capture
> - Test assertion patterns
