// File path: /app/lib/dataService.ts

import apiV2 from './api_v2';

// Define common interfaces
export interface EntityData {
  name: string;
  hype_score?: number;
  rodmn_score?: number;
  mentions?: number;
  talk_time?: number;
  sentiment?: number[];
  wikipedia_views?: number;
  reddit_mentions?: number;
  google_trends?: number;
  history?: {
    [metric: string]: Array<{
      timestamp: string;
      value: number;
      time_period?: string;
    }>;
  };
}

export interface ComparisonResult {
  entities: {
    [key: string]: EntityData;
  };
  metadata: {
    timestamp: string;
    metrics_included: string[];
    filters: {
      start_date?: string;
      end_date?: string;
      time_period?: string;
    };
  };
}

// Function to get all entities
export async function getEntities(
  page: number = 1,
  pageSize: number = 20,
  category?: string,
  subcategory?: string
) {
  try {
    const params: Record<string, string | number> = { page, page_size: pageSize };
    if (category) params.category = category;
    if (subcategory) params.subcategory = subcategory;
    
    const response = await apiV2.get('/entities', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching entities:', error);
    throw error;
  }
}

// Function to get a single entity
export async function getEntity(entityName: string) {
  try {
    const response = await apiV2.get(`/entities/${encodeURIComponent(entityName)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching entity ${entityName}:`, error);
    throw error;
  }
}

// Function to compare entities
export async function compareEntities(
  entityNames: string[],
  includeHistory: boolean = false,
  timePeriod: string = 'last_30_days',
  metrics?: string[]
) {
  try {
    const response = await apiV2.post('/metrics/compare', {
      entity_names: entityNames,
      include_history: includeHistory,
      time_period: timePeriod,
      metrics: metrics || ["hype_score", "rodmn_score", "mentions", "talk_time", "sentiment", "wikipedia_views", "reddit_mentions", "google_trends"]
    });
    
    // Transform the response to match expected format
    const result: ComparisonResult = {
      entities: {},
      metadata: {
        timestamp: new Date().toISOString(),
        metrics_included: response.data.data?.metrics ? Object.keys(response.data.data.metrics) : [],
        filters: {
          time_period: timePeriod
        }
      }
    };
    
    // Debug the actual response structure
    console.log('🔍 Raw API Response:', response.data);
    
    // Transform API v2 response format to expected format
    const apiData = response.data.data || response.data;
    
    if (apiData?.metrics) {
      result.metadata.metrics_included = Object.keys(apiData.metrics);
      
      for (const entityName of entityNames) {
        result.entities[entityName] = {
          name: entityName,
        };
        
        // Extract metrics for each entity
        for (const [metricName, metricData] of Object.entries(apiData.metrics)) {
          if (typeof metricData === 'object' && metricData !== null) {
            const entityValue = (metricData as Record<string, number>)[entityName] || 0;
            // Type-safe assignment based on metric name
            if (metricName === 'hype_score') {
              result.entities[entityName].hype_score = entityValue;
            } else if (metricName === 'rodmn_score') {
              result.entities[entityName].rodmn_score = entityValue;
            } else if (metricName === 'mentions') {
              result.entities[entityName].mentions = entityValue;
            } else if (metricName === 'talk_time') {
              result.entities[entityName].talk_time = entityValue;
            } else if (metricName === 'wikipedia_views') {
              result.entities[entityName].wikipedia_views = entityValue;
            } else if (metricName === 'reddit_mentions') {
              result.entities[entityName].reddit_mentions = entityValue;
            } else if (metricName === 'google_trends') {
              result.entities[entityName].google_trends = entityValue;
            } else if (metricName === 'sentiment') {
              result.entities[entityName].sentiment = [entityValue];
            }
          }
        }
      }
    } else {
      console.error('❌ No metrics found in API response');
      console.error('📋 Available keys:', Object.keys(apiData || {}));
    }
    
    return result;
  } catch (error) {
    console.error('Error comparing entities:', error);
    throw error;
  }
}

// Function to get bulk entity data
export async function getEntityBulk(
  entityNames: string[],
  metrics: string[],
  includeHistory: boolean = false
) {
  try {
    const response = await apiV2.post("/entities/bulk", {
      entity_names: entityNames,
      metrics: metrics,
      include_history: includeHistory
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bulk entity data:", error);
    throw error;
  }
}

// Function to get trending entities
export async function getTrendingEntities(
  metric: string = 'hype_score',
  limit: number = 10,
  timePeriod?: string,
  category?: string,
  subcategory?: string
) {
  try {
    const params: Record<string, string | number> = { metric, limit };
    if (timePeriod) params.time_period = timePeriod;
    if (category) params.category = category;
    if (subcategory) params.subcategory = subcategory;
    
    const response = await apiV2.get('/trending', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending entities:', error);
    throw error;
  }
}

// Function to get hype metrics
export async function getHypeMetrics(period: string = 'last_30_days') {
  try {
    const response = await apiV2.get('/metrics/hype/recent', {
      params: { period }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching hype metrics:', error);
    throw error;
  }
}

// Function to get entity history
export async function getEntityHistory(
  entityName: string,
  limit: number = 30,
  startDate?: string,
  endDate?: string
) {
  try {
    const params: Record<string, string | number> = { limit };
    if (startDate) params.start_date = startDate;
    if (endDate) params.end_date = endDate;
    
    const response = await apiV2.get(`/entities/${encodeURIComponent(entityName)}/history`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching history for ${entityName}:`, error);
    throw error;
  }
}

// Function to get entity trending data
export async function getEntityTrending(entityName: string) {
  try {
    const response = await apiV2.get(`/entities/${encodeURIComponent(entityName)}/trending`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching trending data for ${entityName}:`, error);
    throw error;
  }
}