import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { StatusType } from '../../../types/admin';
import { mockApi } from '../../../lib/mockApi';
import { StatusTypeModal } from './StatusTypeModal';

export const StatusTypeList = () => {
  const [statusTypes, setStatusTypes] = useState<StatusType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingType, setEditingType] = useState<StatusType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStatusTypes = async () => {
    setLoading(true);
    try {
      const { data } = await mockApi.statusTypes.list();
      setStatusTypes(data || []);
    } catch (error) {
      console.error('Error fetching status types:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusTypes();
  }, []);

  const handleAdd = () => {
    setEditingType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (type: StatusType) => {
    setEditingType(type);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this status type?')) {
      try {
        const { error } = await mockApi.statusTypes.delete(id);
        if (error) {
          alert(error.message);
          return;
        }
        await fetchStatusTypes();
      } catch (error) {
        console.error('Error deleting status type:', error);
      }
    }
  };

  const handleSave = async (formData: Omit<StatusType, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingType) {
        await mockApi.statusTypes.update(editingType.id, formData);
      } else {
        await mockApi.statusTypes.create(formData);
      }
      await fetchStatusTypes();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving status type:', error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Status Types</h2>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Status Type
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
                {statusTypes.map((type) => (
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

      <StatusTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingType={editingType}
      />
    </div>
  );
};