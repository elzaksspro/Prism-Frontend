import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { LGA } from '../../../types/admin';
import { mockApi } from '../../../lib/mockApi';
import { LGAModal } from './LGAModal';

export const LGAList = () => {
  const [lgas, setLGAs] = useState<LGA[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLGA, setEditingLGA] = useState<LGA | null>(null);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState<{ [key: string]: string }>({});

  const fetchLGAs = async () => {
    setLoading(true);
    try {
      const { data } = await mockApi.lgas.list();
      setLGAs(data || []);
    } catch (error) {
      console.error('Error fetching LGAs:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const { data } = await mockApi.states.list();
      const stateMap = (data || []).reduce((acc, state) => ({
        ...acc,
        [state.id]: state.name
      }), {});
      setStates(stateMap);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  useEffect(() => {
    fetchLGAs();
    fetchStates();
  }, []);

  const handleAdd = () => {
    setEditingLGA(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lga: LGA) => {
    setEditingLGA(lga);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this LGA?')) {
      try {
        await mockApi.lgas.delete(id);
        await fetchLGAs();
      } catch (error) {
        console.error('Error deleting LGA:', error);
      }
    }
  };

  const handleSave = async (formData: Omit<LGA, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingLGA) {
        await mockApi.lgas.update(editingLGA.id, formData);
      } else {
        await mockApi.lgas.create(formData);
      }
      await fetchLGAs();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving LGA:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Local Government Areas</h2>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add LGA
          </button>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="text-center py-4">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lgas.map((lga) => (
                  <tr key={lga.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lga.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {states[lga.state_id]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lga.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(lga)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(lga.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <LGAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingLGA={editingLGA}
      />
    </div>
  );
};