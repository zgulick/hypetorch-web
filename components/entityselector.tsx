"use client";

import { useState, useEffect } from "react";
import api from '@/lib/api';  // Import your configured API instance
import { Search } from "lucide-react";

interface EntitySelectorProps {
  selectedEntity: string | null;
  onSelectEntity: (entity: string) => void;
}

export default function EntitySelector({ selectedEntity, onSelectEntity }: EntitySelectorProps) {
  const [entities, setEntities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    async function fetchEntities() {
      try {
        setIsLoading(true);
        console.log('🔍 Fetching Entities with API Key:', process.env.NEXT_PUBLIC_API_KEY);
        
        const response = await api.get("/v1/entities");  // Use api instead of axios.get
        console.log('Response structure:', response);
        setEntities(Array.isArray(response.data) ? response.data : response.data.data || []);
        console.log('✅ Entities Fetched:', response.data);
        
        setEntities(response.data);
      } catch (error) {
        console.error("Error fetching entities:", error);
      } finally{
        setIsLoading(false);
      }
    }
    
    fetchEntities();
  }, []);
  
  const filteredEntities = Array.isArray(entities)
  ? entities.filter(entity =>
      entity.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];

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
          ) : filteredEntities.length === 0 ? (
            <div className="p-4 text-center text-gray-400">No entities found</div>
          ) : (
            <div>
              {filteredEntities.map((entity) => (
                <div
                  key={entity}
                  className={`p-2 hover:bg-gray-700 cursor-pointer ${
                    selectedEntity === entity ? "bg-orange-500/20 text-orange-400" : ""
                  }`}
                  onClick={() => {
                    onSelectEntity(entity);
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                >
                  {entity}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}