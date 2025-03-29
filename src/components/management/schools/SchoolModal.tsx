import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { School } from '@/types/school';
import { mockApi } from '@/lib/mockApi';

interface SchoolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (school: Omit<School, 'id' | 'created_at' | 'updated_at'>) => void;
  editingSchool: School | null;
}

export const SchoolModal = ({ isOpen, onClose, onSave, editingSchool }: SchoolModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'primary' as School['type'],
    lga: '',
    state: '',
    senatorial_district: '',
    latitude: 0,
    longitude: 0,
    status: 'pending' as School['status']
  });
  const [states, setStates] = useState<{ id: string; name: string }[]>([]);
  const [lgas, setLgas] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (editingSchool) {
      setFormData({
        name: editingSchool.name,
        type: editingSchool.type,
        lga: editingSchool.lga,
        state: editingSchool.state,
        senatorial_district: editingSchool.senatorial_district,
        latitude: editingSchool.latitude,
        longitude: editingSchool.longitude,
        status: editingSchool.status
      });
    } else {
      setFormData({
        name: '',
        type: 'primary',
        lga: '',
        state: '',
        senatorial_district: '',
        latitude: 0,
        longitude: 0,
        status: 'pending'
      });
    }
  }, [editingSchool]);

  useEffect(() => {
    const fetchStatesAndLGAs = async () => {
      try {
        const { data: statesData } = await mockApi.states.list();
        setStates(statesData || []);
        
        const { data: lgasData } = await mockApi.lgas.list();
        setLgas(lgasData || []);
      } catch (error) {
        console.error('Error fetching states and LGAs:', error);
      }
    };
    
    fetchStatesAndLGAs();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingSchool ? 'Edit School' : 'Add New School'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                School Name
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
                School Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as School['type'] })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="tertiary">Tertiary</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <select
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                LGA
              </label>
              <select
                value={formData.lga}
                onChange={(e) => setFormData({ ...formData, lga: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="">Select LGA</option>
                {lgas
                  .filter(lga => states.find(s => s.name === formData.state)?.id === lga.state_id)
                  .map((lga) => (
                    <option key={lga.id} value={lga.name}>
                      {lga.name}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senatorial District
              </label>
              <input
                type="text"
                value={formData.senatorial_district}
                onChange={(e) => setFormData({ ...formData, senatorial_district: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as School['status'] })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                required
              />
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
              {editingSchool ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};