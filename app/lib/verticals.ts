/**
 * Verticals Library
 *
 * Handles fetching and managing available verticals (subcategories) from the API.
 * Verticals represent different leagues/categories like WNBA, NBA, Crypto, etc.
 *
 * This library eliminates the need to hardcode entity lists in the frontend by
 * dynamically discovering available verticals from the database.
 */

// Import existing API v2 instance
import apiV2 from './api_v2';

/**
 * Vertical Interface
 * Represents a vertical/subcategory (e.g., NBA, Unrivaled, Bitcoin)
 */
export interface Vertical {
  key: string;                    // Unique identifier (e.g., "NBA", "Unrivaled")
  label: string;                  // Display label (e.g., "NBA", "WNBA/Unrivaled")
  category: string;               // Parent category (e.g., "Sports", "Crypto")
  entity_count: number;           // Number of entities in this vertical
  has_recent_data: boolean;       // Whether vertical has data in last 30 days
  last_updated: string | null;    // Last metric timestamp (ISO format)
  has_person_entities: boolean;   // Whether vertical contains person-type entities
}

// Cache for verticals data
let _verticalsCache: { data: Vertical[], timestamp: number } | null = null;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

/**
 * Fetch available verticals from the API
 *
 * Makes a call to /v2/verticals endpoint to get all available subcategories
 * with their entity counts. Results are cached for 5 minutes to reduce API calls.
 *
 * @returns Promise<Vertical[]> - Array of available verticals
 *
 * @example
 * const verticals = await getAvailableVerticals();
 * // Returns: [
 * //   { key: "NBA", label: "NBA", category: "Sports", entity_count: 16, has_recent_data: true, ... },
 * //   { key: "Unrivaled", label: "Unrivaled", category: "Sports", entity_count: 37, has_recent_data: true, ... }
 * // ]
 */
export async function getAvailableVerticals(): Promise<Vertical[]> {
  // Check cache first
  if (_verticalsCache && Date.now() - _verticalsCache.timestamp < CACHE_TTL) {
    return _verticalsCache.data;
  }

  try {
    const response = await apiV2.get('/verticals');

    // Validate response structure
    if (!response.data?.verticals) {
      console.error('Invalid verticals response:', response.data);
      return [];
    }

    // Update cache
    _verticalsCache = {
      data: response.data.verticals,
      timestamp: Date.now()
    };

    return response.data.verticals;
  } catch (error) {
    console.error('Error fetching verticals:', error);
    // Return cached data if available, even if expired
    return _verticalsCache?.data || [];
  }
}

/**
 * Get display label for a vertical
 *
 * Allows customizing how vertical names appear in the UI.
 * Currently returns the label as-is, but can be extended to map
 * internal names to user-friendly labels.
 *
 * @param vertical - The vertical object
 * @returns string - Formatted display label
 *
 * @example
 * const vertical = { key: "Unrivaled", label: "Unrivaled", ... };
 * getVerticalDisplayLabel(vertical); // Returns: "Unrivaled"
 */
export function getVerticalDisplayLabel(vertical: Vertical): string {
  // Future: Add custom label mappings here if needed
  // Example: { 'Unrivaled': 'WNBA / Unrivaled' }
  return vertical.label;
}

/**
 * Get icon/emoji for a vertical (optional, for UI enhancement)
 *
 * Returns an emoji or icon character for each vertical to make the UI
 * more visually appealing. Can be used in buttons, headers, etc.
 *
 * @param verticalKey - The vertical key (e.g., "NBA", "Unrivaled")
 * @returns string - Icon/emoji or empty string if none defined
 *
 * @example
 * getVerticalIcon("NBA"); // Returns: "🏀"
 * getVerticalIcon("Bitcoin"); // Returns: "₿"
 */
export function getVerticalIcon(verticalKey: string): string {
  const iconMap: Record<string, string> = {
    'NBA': '🏀',
    'Unrivaled': '🏀',
    'Bitcoin': '₿',
    'Altcoins': '💰',
  };

  return iconMap[verticalKey] || '';
}

/**
 * Check if a vertical key is valid
 *
 * @param verticalKey - The vertical key to check
 * @param verticals - Array of available verticals
 * @returns boolean - True if the vertical exists
 *
 * @example
 * const verticals = await getAvailableVerticals();
 * isValidVertical("NBA", verticals); // Returns: true or false
 */
export function isValidVertical(
  verticalKey: string | null,
  verticals: Vertical[]
): boolean {
  if (verticalKey === null) return true; // null means "ALL"
  return verticals.some(v => v.key === verticalKey);
}