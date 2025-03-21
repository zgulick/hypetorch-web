// File path: hypetorch-web/app/lib/dataService.ts

import api from './api';

// Interface for entities with metrics
interface EntityComparisonData {
  entities: {
    [key: string]: {
      name?: string;
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
    };
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

// Fetch multiple entities with metrics for comparison
export async function getEntityComparison(
  entities: string[], 
  metrics?: string[],
  timePeriod?: string,
  includeHistory?: boolean
): Promise<EntityComparisonData> {
  const entitiesParam = entities.join(',');
  const metricsParam = metrics ? metrics.join(',') : '';
  
  try {
    const response = await api.get('/compare', {
      params: {
        entities: entitiesParam,
        metrics: metricsParam,
        time_period: timePeriod || 'last_30_days',
        include_history: includeHistory
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching comparison data:", error);
    throw error;
  }
}

// Interface for history data
interface HistoryData {
  name: string;
  history: Array<{
    timestamp: string;
    value: number;
    time_period?: string;
  }>;
}

// Get historical data for entities
export async function getEntityHistory(
  entity: string,
  metric: string,
  limit: number = 30,
  startDate?: string,
  endDate?: string
): Promise<HistoryData> {
  try {
    let endpoint = `/entities/${encodeURIComponent(entity)}/history`;
    
    if (metric !== 'hype_score') {
      endpoint = `/entities/${encodeURIComponent(entity)}/metrics/${metric}/history`;
    }
    
    const response = await api.get(endpoint, {
      params: {
        limit,
        start_date: startDate,
        end_date: endDate
      }
    });
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching history for ${entity}:`, error);
    throw error;
  }
}

// Interface for trending entities
interface TrendingEntity {
  entity_name: string;
  current_value: number;
  previous_value: number;
  percent_change: number;
}

interface TrendingResponse {
  trending: TrendingEntity[];
}

// Get trending entities
export async function getTrendingEntities(
  metric: string = 'hype_scores',
  limit: number = 10,
  timePeriod?: string,
  category?: string,
  subcategory?: string
): Promise<TrendingResponse> {
  try {
    const response = await api.get('/trending', {
      params: {
        metric,
        limit,
        time_period: timePeriod,
        category,
        subcategory
      }
    });
    
    return response.data;
  } catch (error) {
    console.error("Error fetching trending entities:", error);
    throw error;
  }
}