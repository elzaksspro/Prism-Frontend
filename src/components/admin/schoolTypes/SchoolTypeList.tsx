import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { SchoolTypeData } from '../../../types/admin';
import { mockApi } from '../../../lib/mockApi';
import { SchoolTypeModal } from './SchoolTypeModal';

export const SchoolTypeList = () => {
  const [schoolTypes, setSchoolTypes] = useState<SchoolTypeData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<SchoolTypeData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSchoolTypes = async () => {
    setLoading(true);
    try {
      const { data } = await mockApi.schoolTypes.list();
      setSchoolTypes(data || []);
    } catch (error) {
      console.error('Error fetching school types:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchoolTypes();
  }, []);

  const handleAdd = () => {
    setEditingType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (type: SchoolTypeData) => {
    setEditingType(type);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this school type?')) {
      try {
        const { error } = await mockApi.schoolTypes.delete(id);
        if (error) {
          alert(error.message);
          return;
        }
        await fetchSchoolTypes();
      } catch (error) {
        console.error('Error deleting school type:', error);
      }
    }
  };

  const handleSave = async (formData: Omit<SchoolTypeData, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingType) {
        await mockApi.schoolTypes.update(editingType.id, formData);
      } else {
        await mockApi.schoolTypes.create(formData);
      }
      await fetchSchoolTypes();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving school type:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">School Types</h2>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add School Type
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
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schoolTypes.map((type) => (
                  <tr key={type.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {type.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {type.code}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {type.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(type)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(type.id)}
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

      <SchoolTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingType={editingType}
      />
    </div>
  );
};