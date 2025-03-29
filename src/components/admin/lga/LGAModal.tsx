import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { LGA } from '../../../types/admin';
import { mockApi } from '../../../lib/mockApi';

interface LGAModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (lga: Omit<LGA, 'id' | 'created_at' | 'updated_at'>) => void;
  editingLGA: LGA | null;
}

export const LGAModal = ({ isOpen, onClose, onSave, editingLGA }: LGAModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    state_id: ''
  });
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (editingLGA) {
      setFormData({
        name: editingLGA.name,
        state_id: editingLGA.state_id
      });
    } else {
      setFormData({
        name: '',
        state_id: ''
      });
    }
  }, [editingLGA]);

  useEffect(() => {
    const fetchStates = async () => {
      const { data } = await mockApi.states.list();
      setStates(data || []);
    };
    fetchStates();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingLGA ? 'Edit LGA' : 'Add New LGA'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              LGA Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <select
              value={formData.state_id}
              onChange={(e) => setFormData({ ...formData, state_id: e.target.value })}
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700"
            >
              {editingLGA ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};