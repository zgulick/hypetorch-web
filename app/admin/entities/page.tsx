"use client";

import { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Save, X, AlertCircle, Loader2 } from 'lucide-react';
import apiV2 from '@/lib/api_v2';

export default function EntitiesPage() {
  interface Entity {
    id: string;
    name: string;
    category: string;
    subcategory: string;
    type: string;
  }
  const [entities, setEntities] = useState<Entity[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingEntity, setEditingEntity] = useState<null | string>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Sports',
    subcategory: 'Unrivaled',
    type: 'person'
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const filteredEntities = entities.filter(entity => 
    entity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entity.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entity.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchEntities = async () => {
      setLoading(true);
      try {
        const response = await apiV2.get('/entities');
        console.log("🔍 Fetched Entities from v2 API:", response.data);
        
        // The api_v2.ts interceptor automatically unwraps the data, so response.data should be the entities array
        if (Array.isArray(response.data)) {
          const entitiesData = response.data.map((entity: any) => ({
            id: entity.name,
            name: entity.name,
            category: entity.category || 'Sports',
            subcategory: entity.subcategory || 'Unrivaled',
            type: entity.type || 'person'
          }));
          
          setEntities(entitiesData);
        } else {
          console.error("Unexpected v2 API response format:", response.data);
          setEntities([]);
        }
        setError(null);
      } catch (err) {
        console.error("❌ Error fetching entities:", err);
        setError("Failed to load entities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, []);

  const handleEdit = (id: string) => {
    const entityToEdit = entities.find(e => e.id === id);
    if (entityToEdit) {
      setFormData({
        name: entityToEdit.name,
        category: entityToEdit.category,
        subcategory: entityToEdit.subcategory,
        type: entityToEdit.type
      });
      setEditingEntity(id);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this entity?')) {
      try {
        // Note: v2 API might not have delete endpoint yet
        // Using v1 for now - update when v2 delete endpoint is available
        await apiV2.delete(`/entities/${encodeURIComponent(id)}`);
        
        setEntities(entities.filter(e => e.id !== id));
        
      } catch (error) {
        console.error("Error deleting entity:", error);
        let errorMessage = "Failed to delete entity. Please try again.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        alert(errorMessage);
      }
    }
  };

  const handleSave = async (id: string) => {
  setSaving(true);
  try {
    const entityData = {
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      type: formData.type
    };
    
    // Note: v2 API might not have put endpoint yet
    // Using v2 for now - will need backend implementation
    await apiV2.put(`/entities/${encodeURIComponent(id)}`, entityData);
    
    setEntities(entities.map(e => 
      e.id === id ? { ...e, ...formData } : e
    ));
    setEditingEntity(null);
  } catch (err) {
    console.error("Error saving entity:", err);
    alert("Failed to save changes. Please try again.");
  } finally {
    setSaving(false);
  }
};

const handleAdd = async () => {
  setSaving(true);
  try {
    const entityData = {
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      type: formData.type
    };
    
    // Note: v2 API might not have post endpoint yet
    // Using v2 for now - will need backend implementation
    await apiV2.post("/entities", entityData);
    
    const newEntity = {
      id: formData.name,
      ...formData
    };
    setEntities([...entities, newEntity]);
    setShowAddForm(false);
    
    setFormData({
      name: '',
      category: 'Sports',
      subcategory: 'Unrivaled',
      type: 'person'
    });
  } catch (error) {
    console.error("Error adding entity:", error);
    let errorMessage = "Failed to add entity. Please try again.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    alert(errorMessage);
  } finally {
    setSaving(false);
  }
};

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Entities</h1>
        <button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-md flex items-center"
          disabled={loading}
        >
          <Plus size={18} className="mr-2" />
          Add Entity
        </button>
      </div>

      {/* Search bar */}
      <div className="mb-6 relative">
        <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search entities..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-gray-800 border border-gray-700 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500"
          disabled={loading}
        />
      </div>

      {/* Loading and Error States */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 size={36} className="text-orange-500 animate-spin mr-2" />
          <span className="text-gray-300">Loading entities...</span>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-900/30 border border-red-800 p-4 rounded-md text-red-200 mb-6">
          <p className="flex items-center">
            <AlertCircle size={18} className="mr-2" />
            {error}
          </p>
        </div>
      )}

      {/* Add Entity Form */}
      {showAddForm && (
        <div className="bg-gray-800 p-4 rounded-md mb-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Add New Entity</h3>
            <button onClick={() => setShowAddForm(false)} className="text-gray-400 hover:text-white">
              <X size={18} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleFormChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Subcategory</label>
              <input
                type="text"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleFormChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleFormChange}
                className="w-full bg-gray-700 border border-gray-600 rounded p-2"
              >
                <option value="person">Person</option>
                <option value="non-person">Non-Person</option>
              </select>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-md flex items-center"
            disabled={saving || !formData.name}
          >
            {saving ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Plus size={18} className="mr-2" />
                Add Entity
              </>
            )}
          </button>
        </div>
      )}

      {/* Entities Table - only show if not loading and we have entities */}
      {!loading && entities.length > 0 && (
        <div className="bg-gray-800 rounded-md border border-gray-700 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Subcategory</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {filteredEntities.map((entity) => (
                <tr key={entity.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingEntity === entity.id ? (
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded p-1"
                      />
                    ) : (
                      entity.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingEntity === entity.id ? (
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleFormChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded p-1"
                      />
                    ) : (
                      entity.category
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingEntity === entity.id ? (
                      <input
                        type="text"
                        name="subcategory"
                        value={formData.subcategory}
                        onChange={handleFormChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded p-1"
                      />
                    ) : (
                      entity.subcategory
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingEntity === entity.id ? (
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleFormChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded p-1"
                      >
                        <option value="person">Person</option>
                        <option value="non-person">Non-Person</option>
                      </select>
                    ) : (
                      entity.type
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {editingEntity === entity.id ? (
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleSave(entity.id)}
                          className="text-green-500 hover:text-green-400"
                          disabled={saving}
                        >
                          {saving ? (
                            <Loader2 size={18} className="animate-spin" />
                          ) : (
                            <Save size={18} />
                          )}
                        </button>
                        <button 
                          onClick={() => setEditingEntity(null)}
                          className="text-gray-400 hover:text-white"
                          disabled={saving}
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(entity.id)}
                          className="text-blue-500 hover:text-blue-400"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(entity.id)}
                          className="text-red-500 hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* No entities message */}
      {!loading && entities.length === 0 && (
        <div className="text-center py-12 bg-gray-800 border border-gray-700 rounded-lg">
          <p className="text-gray-400">No entities found. Add some using the button above.</p>
        </div>
      )}
    </div>
  );
}