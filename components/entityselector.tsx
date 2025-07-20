// components/entityselector.tsx

"use client";

import { useState, useEffect } from "react";
// API import removed - using getEntities from dataService_v2 instead
import { getEntities } from '@/lib/dataService_v2'; // Add the V2 import
import { Search } from "lucide-react";

// Define the entity interface based on your API response
interface EntityItem {
  id: number | string;
  name: string;
  type?: string;
  category?: string;
  subcategory?: string;
}

interface EntitySelectorProps {
  selectedEntity: string | null;
  onSelectEntity: (entity: string) => void;
}

export default function EntitySelector({ selectedEntity, onSelectEntity }: EntitySelectorProps) {
  const [entities, setEntities] = useState<EntityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  // Use this useEffect hook for fetching entities
  useEffect(() => {
    async function fetchEntities() {
      try {
        setIsLoading(true);
        setError(null);
        console.log('🔍 EntitySelector: Fetching entities with V2 API...');
        
        // Use V2 API service
        const entitiesResponse = await getEntities(1, 100);
        
        // Log the full response to see its structure
        console.log('🔍 EntitySelector: Full response structure:', entitiesResponse);
        
        // Extract entities based on the response structure
        let entitiesList: EntityItem[] = [];
        
        // Check various possible data structures
        if (entitiesResponse && entitiesResponse.data && Array.isArray(entitiesResponse.data)) {
          console.log('📊 Found data array of length:', entitiesResponse.data.length);
          entitiesList = entitiesResponse.data;
        } else if (entitiesResponse && Array.isArray(entitiesResponse)) {
          console.log('📊 Response itself is an array of length:', entitiesResponse.length);
          entitiesList = entitiesResponse;
        } else if (entitiesResponse && entitiesResponse.items && Array.isArray(entitiesResponse.items)) {
          console.log('📊 Found items array of length:', entitiesResponse.items.length);
          entitiesList = entitiesResponse.items;
        } else if (entitiesResponse && entitiesResponse.results && Array.isArray(entitiesResponse.results)) {
          console.log('📊 Found results array of length:', entitiesResponse.results.length);
          entitiesList = entitiesResponse.results;
        } else {
          console.log('⚠️ Could not find entities array in response, full response:', entitiesResponse);
        }
        
        console.log('✅ EntitySelector: Entities loaded:', entitiesList.length);
        setEntities(entitiesList);
      } catch (error) {
        console.error("❌ EntitySelector: Error fetching entities:", error);
        setError("Failed to load entities. Please try again.");
        setEntities([]); // Reset to empty array on error
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchEntities();
  }, []);
  
  // Filter entities by name
  const filteredEntities = entities.filter(entity => 
    entity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <div 
        className="bg-gray-800 border border-gray-700 rounded-lg p-3 flex items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedEntity ? (
          <span>{selectedEntity}</span>
        ) : (
          <span className="text-gray-400">Select an entity...</span>
        )}
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg z-30 shadow-xl max-h-80 overflow-y-auto">
          <div className="p-2 sticky top-0 bg-gray-800 border-b border-gray-700">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search entities..."
                className="w-full bg-gray-900 border border-gray-700 rounded p-2 pl-8 text-sm"
              />
              <Search size={16} className="absolute left-2.5 top-2.5 text-gray-400" />
            </div>
          </div>
          
          {isLoading ? (
            <div className="p-4 text-center text-gray-400">Loading entities...</div>
          ) : error ? (
            <div className="p-4 text-center text-red-400">{error}</div>
          ) : filteredEntities.length === 0 ? (
            <div className="p-4 text-center text-gray-400">No entities found</div>
          ) : (
            <div>
              {filteredEntities.map((entity) => (
                <div
                  key={entity.id}
                  className={`p-2 hover:bg-gray-700 cursor-pointer ${
                    selectedEntity === entity.name ? "bg-orange-500/20 text-orange-400" : ""
                  }`}
                  onClick={() => {
                    onSelectEntity(entity.name);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {entity.name}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}