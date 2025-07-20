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
    const params: any = { page, page_size: pageSize };
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
    const response = await apiV2.post('/compare', {
      entities: entityNames,
      include_history: includeHistory,
      time_period: timePeriod,
      metrics: metrics
    });
    return response.data;
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
    const params: any = { metric, limit };
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
    const params: any = { limit };
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