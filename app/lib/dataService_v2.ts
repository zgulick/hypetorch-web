import apiV2 from './api_v2';

// Interface for entity data
interface EntityData {
  id: number;
  name: string;
  type: string;
  category: string;
  subcategory: string;
  metrics?: {
    hype_score?: number;
    rodmn_score?: number;
    mentions?: number;
    talk_time?: number;
    sentiment?: number[];
    wikipedia_views?: number;
    reddit_mentions?: number;
    google_trends?: number;
  };
  related_entities?: {
    rivals?: Array<{
      entity_id: number;
      entity_name: string;
      strength: number;
    }>;
    teammates?: Array<{
      entity_id: number;
      entity_name: string;
      strength: number;
    }>;
  };
}

// Interface for trending data
interface TrendingEntity {
  entity_id: number;
  entity_name: string;
  current_value: number;
  previous_value: number;
  percent_change: number;
}

// Get all entities
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

// Get single entity details
export async function getEntity(entityName: string) {
  try {
    const response = await apiV2.get(`/entities/${encodeURIComponent(entityName)}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching entity ${entityName}:`, error);
    throw error;
  }
}

// Get trending entities
export async function getTrendingEntities(
  metric: string = 'hype_score',
  limit: number = 10,
  category?: string
) {
  try {
    const params: any = { metric, limit };
    if (category) params.category = category;
    
    const response = await apiV2.get('/entities/trending', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending entities:', error);
    throw error;
  }
}

// Compare multiple entities
export async function compareEntities(
  entityNames: string[],
  includeHistory: boolean = false
) {
  try {
    const response = await apiV2.post('/compare', {
      entities: entityNames,
      include_history: includeHistory
    });
    return response.data;
  } catch (error) {
    console.error('Error comparing entities:', error);
    throw error;
  }
}

// Get entity's rivals
export async function getEntityRivals(entityName: string) {
  try {
    const response = await apiV2.get(`/entities/${encodeURIComponent(entityName)}/rivals`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching rivals for ${entityName}:`, error);
    throw error;
  }
}

// Get entity's network (all relationships)
export async function getEntityNetwork(entityName: string, depth: number = 1) {
  try {
    const response = await apiV2.get(`/entities/${encodeURIComponent(entityName)}/network`, {
      params: { depth }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching network for ${entityName}:`, error);
    throw error;
  }
}

// Get hype metrics for a specific date range
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

// Search entities
export async function searchEntities(query: string, limit: number = 10) {
  try {
    const response = await apiV2.get('/search', {
      params: { query, limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching entities:', error);
    throw error;
  }
}