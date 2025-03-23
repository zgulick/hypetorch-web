"use client";

import { useState, useEffect } from "react";
import api from '@/lib/api';  // Import your configured API instance
import { Search } from "lucide-react";

// Define the entity interface based on your API response
interface Entity {
  id: number;
  name: string;
  type: string;
  category: string;
  subcategory: string;
}

interface EntitySelectorProps {
  selectedEntity: string | null;
  onSelectEntity: (entity: string) => void;
}

export default function EntitySelector({ selectedEntity, onSelectEntity }: EntitySelectorProps) {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    async function fetchEntities() {
      try {
        setIsLoading(true);
        setError(null);
        console.log('🔍 EntitySelector: Fetching entities...');
        
        const response = await api.get("/v1/entities");
        console.log('🔍 EntitySelector: Raw API response:', response);
        
        // Extract entities from the response
        let entitiesList: Entity[] = [];
        
        if (response.data && Array.isArray(response.data)) {
          // If response.data is an array of entities
          entitiesList = response.data;
        } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
          // If entities are in a nested data property
          entitiesList = response.data.data;
        } else {
          console.error("Unexpected API response format:", response.data);
          throw new Error("Unexpected API response format");
        }
        
        console.log('✅ EntitySelector: Entities extracted:', entitiesList.length);
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