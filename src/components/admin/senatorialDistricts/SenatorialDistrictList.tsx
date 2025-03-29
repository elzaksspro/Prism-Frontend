import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { SenatorialDistrict } from '../../../types/admin';
import { mockApi } from '../../../lib/mockApi';
import { SenatorialDistrictModal } from './SenatorialDistrictModal';

export const SenatorialDistrictList = () => {
  const [districts, setDistricts] = useState<SenatorialDistrict[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDistrict, setEditingDistrict] = useState<SenatorialDistrict | null>(null);
  const [loading, setLoading] = useState(true);
  const [states, setStates] = useState<{ [key: string]: string }>({});

  const fetchDistricts = async () => {
    setLoading(true);
    try {
      const { data } = await mockApi.senatorialDistricts.list();
      setDistricts(data || []);
    } catch (error) {
      console.error('Error fetching senatorial districts:', error);
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
    fetchDistricts();
    fetchStates();
  }, []);

  const handleAdd = () => {
    setEditingDistrict(null);
    setIsModalOpen(true);
  };

  const handleEdit = (district: SenatorialDistrict) => {
    setEditingDistrict(district);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this senatorial district?')) {
      try {
        await mockApi.senatorialDistricts.delete(id);
        await fetchDistricts();
      } catch (error) {
        console.error('Error deleting senatorial district:', error);
      }
    }
  };

  const handleSave = async (formData: Omit<SenatorialDistrict, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingDistrict) {
        await mockApi.senatorialDistricts.update(editingDistrict.id, formData);
      } else {
        await mockApi.senatorialDistricts.create(formData);
      }
      await fetchDistricts();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving senatorial district:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Senatorial Districts</h2>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Senatorial District
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
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Number of LGAs
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {districts.map((district) => (
                  <tr key={district.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {district.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {district.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {states[district.state_id]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {district.lga_ids.length}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(district)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(district.id)}
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

      <SenatorialDistrictModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingDistrict={editingDistrict}
      />
    </div>
  );
};