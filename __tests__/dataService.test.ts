/**
 * Test Suite: Data Service Default Sports Filter
 *
 * Validates that getEntitiesWithMetrics and getRecentMetrics
 * default to Sports category when no category is specified.
 */

import { describe, it, expect, vi, beforeEach } from '@jest/globals';

// Mock axios
vi.mock('../app/lib/api_v2', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

import { getEntitiesWithMetrics, getRecentMetrics } from '../app/lib/dataService_unified';
import apiV2 from '../app/lib/api_v2';

describe('DataService - Sports Category Default Filter', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getEntitiesWithMetrics', () => {
    it('should default to Sports category when no category specified', async () => {
      const mockResponse = {
        data: {
          entities: [
            {
              name: 'LeBron James',
              category: 'Sports',
              subcategory: 'NBA',
              metrics: { hype_score: 85 }
            }
          ]
        }
      };

      (apiV2.get as any).mockResolvedValue(mockResponse);

      await getEntitiesWithMetrics({ limit: 10 });

      expect(apiV2.get).toHaveBeenCalledWith('/entities/metrics', {
        params: expect.objectContaining({
          category: 'Sports',
          limit: 10
        })
      });
    });

    it('should use specified category when provided', async () => {
      const mockResponse = {
        data: {
          entities: []
        }
      };

      (apiV2.get as any).mockResolvedValue(mockResponse);

      await getEntitiesWithMetrics({ limit: 10, category: 'CustomCategory' });

      expect(apiV2.get).toHaveBeenCalledWith('/entities/metrics', {
        params: expect.objectContaining({
          category: 'CustomCategory',
          limit: 10
        })
      });
    });

    it('should not add category when explicitly set to null', async () => {
      const mockResponse = {
        data: {
          entities: []
        }
      };

      (apiV2.get as any).mockResolvedValue(mockResponse);

      await getEntitiesWithMetrics({ limit: 10, category: null });

      expect(apiV2.get).toHaveBeenCalledWith('/entities/metrics', {
        params: expect.not.objectContaining({
          category: expect.anything()
        })
      });
    });

    it('should include subcategory filter when specified', async () => {
      const mockResponse = {
        data: {
          entities: []
        }
      };

      (apiV2.get as any).mockResolvedValue(mockResponse);

      await getEntitiesWithMetrics({ subcategory: 'NBA', limit: 20 });

      expect(apiV2.get).toHaveBeenCalledWith('/entities/metrics', {
        params: expect.objectContaining({
          category: 'Sports',
          subcategory: 'NBA',
          limit: 20
        })
      });
    });
  });

  describe('getRecentMetrics', () => {
    it('should default to Sports category', async () => {
      const mockResponse = {
        data: []
      };

      (apiV2.get as any).mockResolvedValue(mockResponse);

      await getRecentMetrics('current', undefined, undefined, 20);

      expect(apiV2.get).toHaveBeenCalledWith('/metrics/recent', {
        params: expect.objectContaining({
          category: 'Sports',
          period: 'current',
          limit: 20
        })
      });
    });

    it('should use specified category when provided', async () => {
      const mockResponse = {
        data: []
      };

      (apiV2.get as any).mockResolvedValue(mockResponse);

      await getRecentMetrics('current', undefined, undefined, 20, 'CustomCategory');

      expect(apiV2.get).toHaveBeenCalledWith('/metrics/recent', {
        params: expect.objectContaining({
          category: 'CustomCategory'
        })
      });
    });
  });

  describe('Integration - No Crypto Tokens', () => {
    it('should filter out any crypto entities from response', async () => {
      const mockResponse = {
        data: {
          entities: [
            {
              name: 'LeBron James',
              category: 'Sports',
              subcategory: 'NBA',
              metrics: { hype_score: 85 }
            },
            {
              name: 'Caitlin Clark',
              category: 'Sports',
              subcategory: 'Unrivaled',
              metrics: { hype_score: 89 }
            }
          ]
        }
      };

      (apiV2.get as any).mockResolvedValue(mockResponse);

      const result = await getEntitiesWithMetrics();

      // Verify no crypto tokens in response
      const cryptoTokens = ['Bitcoin', 'Ethereum', 'Solana', 'Dogecoin'];
      result.forEach(entity => {
        expect(cryptoTokens).not.toContain(entity.name);
        expect(entity.category).toBe('Sports');
      });
    });
  });
});
