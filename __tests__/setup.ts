/**
 * Jest Test Setup
 * Configures test environment for all tests
 */

// Mock Next.js environment
process.env.NEXT_PUBLIC_API_BASE_URL = 'http://localhost:8000';
process.env.NEXT_PUBLIC_API_KEY = 'test-key';

// Add custom matchers if needed
expect.extend({
  toBeValidEntity(received) {
    const pass = (
      typeof received === 'object' &&
      received !== null &&
      'name' in received &&
      'category' in received
    );

    return {
      pass,
      message: () =>
        pass
          ? `Expected ${JSON.stringify(received)} not to be a valid entity`
          : `Expected ${JSON.stringify(received)} to be a valid entity with name and category`,
    };
  },
});

// Suppress console logs during tests (optional)
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
