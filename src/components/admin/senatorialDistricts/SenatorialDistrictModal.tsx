import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SenatorialDistrict } from '../../../types/admin';
import { mockApi } from '../../../lib/mockApi';

interface SenatorialDistrictModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (district: Omit<SenatorialDistrict, 'id' | 'created_at' | 'updated_at'>) => void;
  editingDistrict: SenatorialDistrict | null;
}

export const SenatorialDistrictModal = ({
  isOpen,
  onClose,
  onSave,
  editingDistrict
}: SenatorialDistrictModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    state_id: '',
    lga_ids: [] as string[]
  });
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [lgas, setLGAs] = useState<{ id: string; name: string; state_id: string }[]>([]);

  useEffect(() => {
    if (editingDistrict) {
      setFormData({
        name: editingDistrict.name,
        code: editingDistrict.code,
        state_id: editingDistrict.state_id,
        lga_ids: editingDistrict.lga_ids
      });
    } else {
      setFormData({
        name: '',
        code: '',
        state_id: '',
        lga_ids: []
      });
    }
  }, [editingDistrict]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statesResponse, lgasResponse] = await Promise.all([
          mockApi.states.list(),
          mockApi.lgas.list()
        ]);
        setStates(statesResponse.data || []);
        setLGAs(lgasResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const filteredLGAs = lgas.filter(lga => lga.state_id === formData.state_id);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingDistrict ? 'Edit Senatorial District' : 'Add New Senatorial District'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District Name
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
                District Code
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                maxLength={3}
                placeholder="e.g., LCD"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                value={formData.state_id}
                onChange={(e) => {
                  setFormData({ ...formData, state_id: e.target.value, lga_ids: [] });
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Local Government Areas
              </label>
              <select
                multiple
                value={formData.lga_ids}
                onChange={(e) => {
                  const selectedLGAs = Array.from(e.target.selectedOptions, option => option.value);
                  setFormData({ ...formData, lga_ids: selectedLGAs });
                }}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                size={5}
                required
              >
                {filteredLGAs.map((lga) => (
                  <option key={lga.id} value={lga.id}>
                    {lga.name}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-gray-500">Hold Ctrl/Cmd to select multiple LGAs</p>
            </div>
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
              {editingDistrict ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};