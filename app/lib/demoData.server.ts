/**
 * Server-side data loading for the /demo page.
 *
 * Why this exists instead of reusing app/lib/api_v2.ts:
 *
 *  1. axios does not participate in the Next.js fetch cache. Calling it from a
 *     server component would re-hit the API on every request, giving us none of
 *     the caching that makes this page fast. Native `fetch` with
 *     `next: { revalidate }` is cached and shared across all visitors.
 *  2. It lets us read a server-only API key instead of shipping one to the
 *     browser via NEXT_PUBLIC_API_KEY.
 *
 * Every function here is failure-tolerant on purpose. `next build` prerenders
 * this page, and a build must not fail just because the API is asleep or
 * unreachable — that is exactly what broke the Vercel build in 4a552b1 and
 * triggered the revert of the last SSR attempt. On error we return empty data
 * and let the client components fetch it after hydration.
 */

import type { EntityData, TimePeriod } from './dataService_unified';
import type { Vertical } from './verticals';

const API_URL =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'https://hypetorch-api.onrender.com/api';

// Prefer a server-only key; fall back to the public one so existing deploys keep working.
const API_KEY = process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || '';

/** How long a rendered /demo page (and its upstream fetches) stay cached. */
export const DEMO_REVALIDATE_SECONDS = 3600;

/** Metrics the dashboard and comparison views render. */
const DASHBOARD_METRICS = [
  'hype_score',
  'rodmn_score',
  'pipn_score',
  'reach_score',
  'mentions',
  'talk_time',
  'wikipedia_views'
];

const COMPARISON_METRICS = [
  ...DASHBOARD_METRICS,
  'reddit_mentions',
  'google_trends',
  'google_news_mentions'
];

interface EvolutionDataPoint {
  time_period: string;
  display_label: string;
  [playerName: string]: string | number;
}

export interface DemoInitialData {
  currentPeriod: TimePeriod | null;
  verticals: Vertical[];
  /** Pool of entities used for the chart's player picker. */
  entities: EntityData[];
  /** Metrics powering the key-metrics dashboard. */
  dashboardMetrics: EntityData[];
  /** Metrics for the two head-to-head players. */
  comparisonMetrics: EntityData[];
  /** Pre-computed series for the weekly evolution chart. */
  evolutionData: EvolutionDataPoint[];
  /** The players `evolutionData` was built for. */
  playerNames: string[];
  /** True when the server could not reach the API; the client should fetch instead. */
  degraded: boolean;
}

export const EMPTY_DEMO_DATA: DemoInitialData = {
  currentPeriod: null,
  verticals: [],
  entities: [],
  dashboardMetrics: [],
  comparisonMetrics: [],
  evolutionData: [],
  playerNames: [],
  degraded: true
};

/**
 * GET a v2 endpoint, unwrapping the StandardResponse envelope.
 * Returns `null` rather than throwing so one bad endpoint can't fail the render.
 */
async function apiGet<T>(path: string, params: Record<string, string | number> = {}): Promise<T | null> {
  const qs = new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v)])
  ).toString();
  const url = `${API_URL}/v2${path}${qs ? `?${qs}` : ''}`;

  try {
    const res = await fetch(url, {
      headers: API_KEY ? { 'X-API-Key': API_KEY } : {},
      next: { revalidate: DEMO_REVALIDATE_SECONDS, tags: ['demo-data'] }
    });

    if (!res.ok) {
      console.error(`[demoData] ${path} responded ${res.status}`);
      return null;
    }

    const body = await res.json();
    // The API wraps success payloads as { status: 'success', data: ... }
    if (body && typeof body === 'object' && body.status === 'success' && 'data' in body) {
      return body.data as T;
    }
    return body as T;
  } catch (error) {
    console.error(`[demoData] ${path} failed:`, error);
    return null;
  }
}

/** Shape returned by /v2/entities/metrics, mirrored from dataService_unified. */
interface EntityWithMetricsRow {
  name: string;
  category: string;
  subcategory: string;
  metrics?: {
    hype_score?: number;
    rodmn_score?: number;
    pipn_score?: number | null;
    reach_score?: number | null;
    social_data_quality?: string;
    mention_count?: number;
    talk_time?: number;
    wikipedia_views?: number;
    reddit_mentions?: number;
    google_trends?: number;
    google_news_mentions?: number;
  };
}

function toEntityData(entity: EntityWithMetricsRow): EntityData {
  return {
    name: entity.name,
    category: entity.category,
    subcategory: entity.subcategory,
    metrics: {
      hype_score: entity.metrics?.hype_score || 0,
      rodmn_score: entity.metrics?.rodmn_score || 0,
      pipn_score: entity.metrics?.pipn_score ?? null,
      reach_score: entity.metrics?.reach_score ?? null,
      social_data_quality: entity.metrics?.social_data_quality,
      mentions: entity.metrics?.mention_count || 0,
      talk_time: entity.metrics?.talk_time || 0,
      wikipedia_views: entity.metrics?.wikipedia_views || 0,
      reddit_mentions: entity.metrics?.reddit_mentions || 0,
      google_trends: entity.metrics?.google_trends || 0,
      google_news_mentions: entity.metrics?.google_news_mentions || 0
    }
  };
}

/**
 * Pick the players shown in the evolution chart on first paint.
 *
 * Deliberately deterministic (highest hype_score first): a random pick per
 * request would make the cached HTML differ from what the client expects and
 * defeats caching entirely. The chart's "Randomize Players" button still
 * reshuffles client-side for anyone who wants a different set.
 */
function pickFeaturedPlayers(entities: EntityData[], count: number): string[] {
  return [...entities]
    .sort((a, b) => (b.metrics?.hype_score || 0) - (a.metrics?.hype_score || 0))
    .slice(0, count)
    .map(e => e.name);
}

/**
 * Load everything /demo needs to render, in two parallel waves instead of the
 * eight sequential client-side requests this replaces.
 */
export async function getDemoInitialData(
  subcategory: string | null = null,
  metric: string = 'hype_score',
  periods: number = 5
): Promise<DemoInitialData> {
  const entityParams: Record<string, string | number> = { limit: 50, category: 'Sports' };
  if (subcategory) entityParams.subcategory = subcategory;

  const dashboardParams: Record<string, string | number> = {
    period: 'current',
    limit: 100,
    metrics: DASHBOARD_METRICS.join(','),
    category: 'Sports'
  };
  if (subcategory) dashboardParams.subcategory = subcategory;

  // Wave 1 — independent requests, all in parallel.
  const [timePeriods, verticalsResp, entitiesResp, dashboardMetrics] = await Promise.all([
    apiGet<TimePeriod[]>('/time-periods'),
    apiGet<{ verticals: Vertical[] }>('/verticals'),
    apiGet<{ entities: EntityWithMetricsRow[] }>('/entities/metrics', entityParams),
    apiGet<EntityData[]>('/metrics/recent', dashboardParams)
  ]);

  // If the API is unreachable, hand back empty data flagged as degraded so the
  // client components fall back to fetching for themselves.
  if (!timePeriods && !entitiesResp && !dashboardMetrics) {
    return EMPTY_DEMO_DATA;
  }

  const entities = (entitiesResp?.entities || []).map(toEntityData);
  const recentPeriods = (timePeriods || []).slice(0, periods);
  const playerNames = pickFeaturedPlayers(entities, 5);

  const [playerOne, playerTwo] = defaultComparisonPlayers(subcategory);

  // Wave 2 — depends on wave 1's periods and player list.
  const [multiPeriodRows, comparisonMetrics] = await Promise.all([
    recentPeriods.length && playerNames.length
      ? apiGet<EntityData[]>('/metrics/recent', {
          periods: recentPeriods.map(p => p.time_period).join(','),
          entities: playerNames.join(','),
          metrics: metric,
          limit: 100,
          category: 'Sports'
        })
      : Promise.resolve<EntityData[]>([]),
    apiGet<EntityData[]>('/metrics/recent', {
      period: 'current',
      entities: `${playerOne},${playerTwo}`,
      metrics: COMPARISON_METRICS.join(','),
      limit: 50,
      category: 'Sports'
    })
  ]);

  return {
    currentPeriod: timePeriods?.[0] || null,
    verticals: verticalsResp?.verticals || [],
    entities,
    dashboardMetrics: dashboardMetrics || [],
    comparisonMetrics: comparisonMetrics || [],
    evolutionData: buildEvolutionSeries(recentPeriods, playerNames, multiPeriodRows || [], metric),
    playerNames,
    degraded: false
  };
}

/** Default head-to-head matchup for a vertical. Mirrors DemoPageClient. */
export function defaultComparisonPlayers(subcategory: string | null): [string, string] {
  if (subcategory === 'NBA') return ['LeBron James', 'Stephen Curry'];
  return ['Caitlin Clark', 'Angel Reese'];
}

/**
 * Fold the flat (entity, period) rows from /metrics/recent into the
 * recharts-friendly shape the evolution chart expects: one object per period
 * with a key per player.
 */
function buildEvolutionSeries(
  recentPeriods: TimePeriod[],
  playerNames: string[],
  rows: EntityData[],
  metric: string
): EvolutionDataPoint[] {
  const byPeriodAndName = new Map<string, EntityData>();
  for (const row of rows) {
    if (row.time_period) {
      byPeriodAndName.set(`${row.time_period}::${row.name}`, row);
    }
  }

  return recentPeriods
    .map(period => {
      const entry: EvolutionDataPoint = {
        time_period: period.time_period,
        display_label: period.display_label
      };
      for (const player of playerNames) {
        const playerData = byPeriodAndName.get(`${period.time_period}::${player}`);
        entry[player] = playerData?.metrics?.[metric as keyof typeof playerData.metrics] as number || 0;
      }
      return entry;
    })
    .reverse(); // oldest to newest
}
