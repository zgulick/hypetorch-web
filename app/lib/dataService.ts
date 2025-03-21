// app/lib/dataService.ts
import api from './api';

// Fetch multiple entities with metrics for comparison
export async function getEntityComparison(
  entities: string[], 
  metrics?: string[],
  timePeriod?: string,
  includeHistory?: boolean
) {
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

// Get historical data for entities
export async function getEntityHistory(
  entity: string,
  metric: string,
  limit: number = 30,
  startDate?: string,
  endDate?: string
) {
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

// Get trending entities
export async function getTrendingEntities(
  metric: string = 'hype_scores',
  limit: number = 10,
  timePeriod?: string,
  category?: string,
  subcategory?: string
) {
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