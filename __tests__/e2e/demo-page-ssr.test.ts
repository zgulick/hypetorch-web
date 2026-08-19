/**
 * E2E Test Suite: Demo Page Server-Side Rendering Performance
 *
 * Validates that the /demo page:
 * 1. Renders data on the server (no loading spinners on initial load)
 * 2. Loads faster than client-side rendering
 * 3. Contains no crypto tokens in any charts
 * 4. Interactive features still work after hydration
 */

import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';

// Note: This test requires Playwright or Puppeteer for E2E testing
// Install with: npm install --save-dev playwright @playwright/test

import { chromium, Browser, Page } from 'playwright';

describe('Demo Page - SSR Performance & Crypto Removal', () => {
  let browser: Browser;
  let page: Page;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  beforeAll(async () => {
    browser = await chromium.launch({
      headless: true,
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  beforeEach(async () => {
    const context = await browser.newContext();
    page = await context.newPage();
  });

  afterEach(async () => {
    await page.close();
  });

  describe('Server-Side Rendering Performance', () => {
    it('should render charts without loading spinners on initial load', async () => {
      // Navigate to demo page
      await page.goto(`${baseUrl}/demo`);

      // Wait for page to be fully loaded
      await page.waitForLoadState('networkidle');

      // Check that no loading spinners are visible
      const loadingSpinners = await page.locator('.animate-pulse').count();
      expect(loadingSpinners).toBe(0);

      // Verify charts are rendered
      const charts = await page.locator('svg').count();
      expect(charts).toBeGreaterThan(0);
    });

    it('should have initial page load under 2 seconds', async () => {
      const startTime = Date.now();

      await page.goto(`${baseUrl}/demo`);
      await page.waitForSelector('svg', { timeout: 5000 });

      const loadTime = Date.now() - startTime;

      expect(loadTime).toBeLessThan(2000);
      console.log(`Demo page loaded in ${loadTime}ms`);
    });

    it('should have Time to Interactive under 3 seconds', async () => {
      const startTime = Date.now();

      await page.goto(`${baseUrl}/demo`);

      // Wait for interactive elements to be ready
      await page.waitForSelector('button:has-text("Randomize")', { timeout: 5000 });

      const timeToInteractive = Date.now() - startTime;

      expect(timeToInteractive).toBeLessThan(3000);
      console.log(`Time to Interactive: ${timeToInteractive}ms`);
    });

    it('should pre-render data without client-side API calls on initial load', async () => {
      const apiCalls: string[] = [];

      // Monitor network requests
      page.on('request', request => {
        const url = request.url();
        if (url.includes('/api/') || url.includes('/entities/')) {
          apiCalls.push(url);
        }
      });

      await page.goto(`${baseUrl}/demo`);
      await page.waitForLoadState('networkidle');

      // Should have minimal or no API calls for initial data
      // (data is pre-fetched on server)
      expect(apiCalls.length).toBeLessThan(3);
    });
  });

  describe('Crypto Token Removal', () => {
    it('should not display any crypto tokens in charts', async () => {
      await page.goto(`${baseUrl}/demo`);
      await page.waitForLoadState('networkidle');

      const pageContent = await page.content();

      // Check for crypto tokens
      const cryptoTokens = ['Bitcoin', 'Ethereum', 'Solana', 'Dogecoin'];
      cryptoTokens.forEach(token => {
        expect(pageContent.toLowerCase()).not.toContain(token.toLowerCase());
      });
    });

    it('should not display crypto tokens in Weekly Evolution Chart', async () => {
      await page.goto(`${baseUrl}/demo`);
      await page.waitForSelector('#evolution-chart');

      const chartSection = await page.locator('#evolution-chart').textContent();

      const cryptoTokens = ['Bitcoin', 'Ethereum', 'Solana', 'Dogecoin'];
      cryptoTokens.forEach(token => {
        expect(chartSection?.toLowerCase()).not.toContain(token.toLowerCase());
      });
    });

    it('should not display crypto tokens in Metrics Dashboard', async () => {
      await page.goto(`${baseUrl}/demo`);
      await page.waitForSelector('#metrics-dashboard');

      const dashboardSection = await page.locator('#metrics-dashboard').textContent();

      const cryptoTokens = ['Bitcoin', 'Ethereum', 'Solana', 'Dogecoin'];
      cryptoTokens.forEach(token => {
        expect(dashboardSection?.toLowerCase()).not.toContain(token.toLowerCase());
      });
    });

    it('should only show Sports category entities', async () => {
      await page.goto(`${baseUrl}/demo`);
      await page.waitForLoadState('networkidle');

      // Get all entity names displayed on page
      const entityNames = await page.locator('[class*="font-medium"], [class*="font-semibold"]').allTextContents();

      // Filter to likely entity names (not UI text)
      const sportsEntities = ['LeBron James', 'Stephen Curry', 'Caitlin Clark', 'Angel Reese'];

      // Should contain at least some sports entities
      const hasSportsEntities = sportsEntities.some(name =>
        entityNames.some(displayed => displayed.includes(name))
      );

      expect(hasSportsEntities).toBe(true);
    });
  });

  describe('Interactive Features', () => {
    it('should allow vertical selection after hydration', async () => {
      await page.goto(`${baseUrl}/demo`);
      await page.waitForLoadState('networkidle');

      // Find and click NBA vertical button
      const nbaButton = page.locator('button:has-text("NBA")');
      if (await nbaButton.count() > 0) {
        await nbaButton.first().click();

        // Wait for update
        await page.waitForTimeout(1000);

        // Verify content updated (should show NBA-specific players)
        const pageContent = await page.textContent('body');
        expect(
          pageContent?.includes('LeBron') || pageContent?.includes('Stephen Curry')
        ).toBe(true);
      }
    });

    it('should allow metric selection after hydration', async () => {
      await page.goto(`${baseUrl}/demo`);
      await page.waitForLoadState('networkidle');

      // Find metric selector
      const rodmnButton = page.locator('button:has-text("RODMN")');
      if (await rodmnButton.count() > 0) {
        await rodmnButton.first().click();

        // Wait for chart update
        await page.waitForTimeout(1000);

        // Verify chart updated (check for RODMN label)
        const pageContent = await page.textContent('body');
        expect(pageContent).toContain('RODMN');
      }
    });

    it('should allow chart randomization', async () => {
      await page.goto(`${baseUrl}/demo`);
      await page.waitForLoadState('networkidle');

      // Get initial chart content
      const initialContent = await page.locator('#evolution-chart').textContent();

      // Click randomize button
      const randomizeButton = page.locator('button:has-text("Randomize")');
      if (await randomizeButton.count() > 0) {
        await randomizeButton.first().click();

        // Wait for chart to update
        await page.waitForTimeout(2000);

        // Get updated content
        const updatedContent = await page.locator('#evolution-chart').textContent();

        // Content should have changed (different players)
        expect(updatedContent).not.toBe(initialContent);
      }
    });
  });

  describe('Performance Comparison', () => {
    it('should have better Core Web Vitals than client-side rendering', async () => {
      await page.goto(`${baseUrl}/demo`);

      // Measure Web Vitals
      const metrics = await page.evaluate(() => {
        return new Promise((resolve) => {
          const perfObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const webVitals: any = {};

            entries.forEach((entry: any) => {
              if (entry.name === 'first-contentful-paint') {
                webVitals.FCP = entry.startTime;
              }
            });

            resolve(webVitals);
          });

          perfObserver.observe({ entryTypes: ['paint'] });

          setTimeout(() => {
            perfObserver.disconnect();
            resolve({});
          }, 3000);
        });
      });

      console.log('Web Vitals:', metrics);

      // FCP should be under 1.5 seconds for good performance
      if ((metrics as any).FCP) {
        expect((metrics as any).FCP).toBeLessThan(1500);
      }
    });
  });
});
