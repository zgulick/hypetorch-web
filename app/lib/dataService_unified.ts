// Unified Data Service - Single source for all API v2 calls
// Consolidates dataService.ts and dataService_v2.ts with new endpoints

import apiV2 from './api_v2';

// ==================== INTERFACES ====================

export interface EntityData {
  id?: number;
  name: string;
  type?: string;
  category?: string;
  subcategory?: string;
  metadata?: Record<string, unknown>;
  metrics?: {
    hype_score?: number;
    rodmn_score?: number;
    mentions?: number;
    talk_time?: number;
    wikipedia_views?: number;
    reddit_mentions?: number;
    google_trends?: number;
    google_news_mentions?: number;
  };
  history?: {
    [metric: string]: Array<{
      timestamp: string;
      value: number;
      time_period?: string;
    }>;
  };
  last_updated?: string;
  time_period?: string;
}

export interface TrendingEntity {
  name: string;
  current_value: number;
  previous_value: number;
  percent_change: number;
  trend_direction: 'up' | 'down';
  current_timestamp?: string;
  previous_timestamp?: string;
}

export interface DashboardWidgets {
  top_movers: Array<{
    name: string;
    current_score: number;
    change: number;
    trend: 'up' | 'down';
  }>;
  narrative_alerts: Array<{
    name: string;
    rodmn_score: number;
    alert_level: 'high' | 'medium' | 'low';
    context: string;
  }>;
  story_opportunities: Array<{
    name: string;
    hype_score: number;
    mentions: number;
    talk_time: number;
    angle: string;
  }>;
}

export interface TimePeriod {
  time_period: string;
  display_label: string;
  entity_count: number;
  metric_count: number;
  date_range: {
    start?: string;
    end?: string;
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

// ==================== CORE ENTITY FUNCTIONS ====================

/**
 * Get all entities with optional filtering
 */
export async function getEntities(
  includeMetrics: boolean = false,
  category?: string,
  subcategory?: string
) {
  try {
    const params: Record<string, string | boolean> = { include_metrics: includeMetrics };
    if (category) params.category = category;
    if (subcategory) params.subcategory = subcategory;
    
    const response = await apiV2.get('/entities', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching entities:', error);
    throw error;
  }
}

/**
 * Get a single entity by name or ID
 */
export async function getEntity(
  entityId: string,
  includeMetrics: boolean = true,
  includeHistory: boolean = false,
  metrics?: string[]
) {
  try {
    const params: Record<string, string | boolean | number> = { 
      include_metrics: includeMetrics,
      include_history: includeHistory
    };
    if (metrics) params.metrics = metrics.join(',');
    
    const response = await apiV2.get(`/entities/${encodeURIComponent(entityId)}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching entity ${entityId}:`, error);
    throw error;
  }
}

/**
 * Search for entities by name
 */
export async function searchEntities(
  query: string,
  category?: string,
  limit: number = 20
) {
  try {
    const params: Record<string, string | number> = { q: query, limit };
    if (category) params.category = category;
    
    const response = await apiV2.get('/entities/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching entities:', error);
    throw error;
  }
}

/**
 * Get bulk entity data
 */
export async function getEntityBulk(
  entityNames: string[],
  metrics?: string[],
  includeHistory: boolean = false
) {
  try {
    const response = await apiV2.post("/entities/bulk", {
      entity_names: entityNames,
      metrics: metrics || ["hype_score", "rodmn_score", "mentions", "talk_time", "wikipedia_views", "reddit_mentions", "google_trends", "google_news_mentions"],
      include_history: includeHistory
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching bulk entity data:", error);
    throw error;
  }
}

// ==================== TRENDING & ANALYTICS ====================

/**
 * Get trending entities based on metric changes
 */
export async function getTrendingEntities(
  metric: string = 'hype_score',
  limit: number = 10,
  category?: string,
  subcategory?: string,
  timePeriod?: string
): Promise<TrendingEntity[]> {
  try {
    const params: Record<string, string | number> = { metric, limit };
    if (category) params.category = category;
    if (subcategory) params.subcategory = subcategory;
    if (timePeriod) params.time_period = timePeriod;
    
    const response = await apiV2.get('/trending', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching trending entities:', error);
    throw error;
  }
}

/**
 * Get recent metrics data for dashboard
 */
export async function getRecentMetrics(
  period: string = 'current',
  entities?: string[],
  metrics?: string[],
  limit: number = 20
): Promise<EntityData[]> {
  try {
    const params: Record<string, string | number> = { period, limit };
    if (entities) params.entities = entities.join(',');
    if (metrics) params.metrics = metrics.join(',');
    
    const response = await apiV2.get('/metrics/recent', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching recent metrics:', error);
    throw error;
  }
}

/**
 * Get dashboard widgets data
 */
export async function getDashboardWidgets(): Promise<DashboardWidgets> {
  try {
    const response = await apiV2.get('/dashboard/widgets');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard widgets:', error);
    throw error;
  }
}

/**
 * Get available time periods
 */
export async function getTimePeriods(): Promise<TimePeriod[]> {
  try {
    const response = await apiV2.get('/time-periods');
    return response.data;
  } catch (error) {
    console.error('Error fetching time periods:', error);
    throw error;
  }
}

// ==================== COMPARISON & ANALYTICS ====================

/**
 * Compare multiple entities across metrics
 */
export async function compareEntities(
  entityNames: string[],
  includeHistory: boolean = false,
  timePeriod: string = 'current',
  metrics?: string[]
): Promise<ComparisonResult> {
  try {
    const response = await apiV2.post('/metrics/compare', {
      entity_names: entityNames,
      include_history: includeHistory,
      time_period: timePeriod,
      metrics: metrics || ["hype_score", "rodmn_score", "mentions", "talk_time", "wikipedia_views", "reddit_mentions", "google_trends", "google_news_mentions"]
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
    
    // Transform API v2 response format to expected format
    const apiData = response.data.data || response.data;
    
    if (apiData?.metrics) {
      result.metadata.metrics_included = Object.keys(apiData.metrics);
      
      for (const entityName of entityNames) {
        result.entities[entityName] = {
          name: entityName,
          metrics: {}
        };
        
        // Extract metrics for each entity
        for (const [metricName, metricData] of Object.entries(apiData.metrics)) {
          if (typeof metricData === 'object' && metricData !== null) {
            const entityValue = (metricData as Record<string, number>)[entityName] || 0;
            if (result.entities[entityName].metrics) {
              (result.entities[entityName].metrics as Record<string, number>)[metricName] = entityValue;
            }
          }
        }
      }
    }
    
    return result;
  } catch (error) {
    console.error('Error comparing entities:', error);
    throw error;
  }
}

// ==================== CONVENIENCE FUNCTIONS ====================

/**
 * Get featured players for homepage
 */
export async function getFeaturedPlayers(): Promise<EntityData[]> {
  const featuredNames = ['Caitlin Clark', 'Angel Reese', 'Alyssa Thomas', 'Allisha Gray', 'Jackie Young'];
  
  try {
    const metrics = ['hype_score', 'rodmn_score', 'mentions', 'talk_time'];
    const data = await getRecentMetrics('current', featuredNames, metrics);
    return data;
  } catch (error) {
    console.error('Error fetching featured players:', error);
    throw error;
  }
}

/**
 * Get weekly evolution data for chart
 */
export async function getWeeklyEvolutionData(
  playerNames: string[],
  periods: number = 5,
  metric: string = 'hype_score'
) {
  try {
    // First get available time periods
    const timePeriods = await getTimePeriods();
    const recentPeriods = timePeriods.slice(0, periods);
    
    // Get data for each period
    const evolutionData: Array<{ time_period: string; display_label: string; [key: string]: string | number }> = [];
    
    for (const period of recentPeriods) {
      const periodData = await getRecentMetrics(
        period.time_period,
        playerNames,
        [metric]
      );
      
      const periodEntry: { time_period: string; display_label: string; [key: string]: string | number } = {
        time_period: period.time_period,
        display_label: period.display_label
      };
      
      // Add each player's score for this period
      for (const player of playerNames) {
        const playerData = periodData.find(p => p.name === player);
        periodEntry[player] = playerData?.metrics?.[metric as keyof typeof playerData.metrics] || 0;
      }
      
      evolutionData.push(periodEntry);
    }
    
    return evolutionData.reverse(); // Show oldest to newest
  } catch (error) {
    console.error('Error fetching weekly evolution data:', error);
    throw error;
  }
}

/**
 * Get current analysis period info
 */
export async function getCurrentAnalysisPeriod() {
  try {
    const periods = await getTimePeriods();
    if (periods.length > 0) {
      return periods[0]; // Most recent period
    }
    return null;
  } catch (error) {
    console.error('Error fetching current analysis period:', error);
    return null;
  }
}

// ==================== BACKWARD COMPATIBILITY ====================

/**
 * Legacy function for existing components
 * @deprecated Use getRecentMetrics instead
 */
export async function getHypeMetrics(period: string = 'current') {
  return getRecentMetrics(period, undefined, ['hype_score']);
}

/**
 * Legacy function for existing components  
 * @deprecated Use getEntity instead
 */
export async function getEntityHistory(
  entityName: string
  // Legacy parameters - deprecated
  // limit: number = 30,
  // startDate?: string,
  // endDate?: string
) {
  try {
    return await getEntity(entityName, true, true);
  } catch (error) {
    console.error(`Error fetching history for ${entityName}:`, error);
    throw error;
  }
}

// Export default object for easy importing
const dataServiceUnified = {
  getEntities,
  getEntity,
  searchEntities,
  getEntityBulk,
  getTrendingEntities,
  getRecentMetrics,
  getDashboardWidgets,
  getTimePeriods,
  compareEntities,
  getFeaturedPlayers,
  getWeeklyEvolutionData,
  getCurrentAnalysisPeriod,
  // Legacy functions
  getHypeMetrics,
  getEntityHistory
};

export default dataServiceUnified;