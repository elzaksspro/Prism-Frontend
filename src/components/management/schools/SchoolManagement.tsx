import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, School as SchoolIcon, Users, Building } from 'lucide-react';
import type { School, SchoolType, SchoolOwnership } from '@/types/school';
import { mockApi } from '@/lib/mockApi';
import { SchoolModal } from './SchoolModal';
import { FilterPanel } from '@/components/common/FilterPanel';

export const SchoolManagement = () => {
  const [schools, setSchools] = useState<School[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    type: '',
    ownership: '',
    state: '',
    lga: '',
    senatorial_district: '',
    federal_constituency: '',
    status: ''
  });

  const fetchSchools = async () => {
    setLoading(true);
    try {
      const { data } = await mockApi.schools.list();
      let filteredSchools = data || [];

      // Apply filters
      if (filters.name) {
        filteredSchools = filteredSchools.filter(school => 
          school.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
      if (filters.type) {
        filteredSchools = filteredSchools.filter(school => school.type === filters.type);
      }
      if (filters.ownership) {
        filteredSchools = filteredSchools.filter(school => school.ownership === filters.ownership);
      }
      if (filters.state) {
        filteredSchools = filteredSchools.filter(school => 
          school.state.toLowerCase().includes(filters.state.toLowerCase())
        );
      }
      if (filters.lga) {
        filteredSchools = filteredSchools.filter(school => 
          school.lga.toLowerCase().includes(filters.lga.toLowerCase())
        );
      }
      if (filters.senatorial_district) {
        filteredSchools = filteredSchools.filter(school => 
          school.senatorial_district.toLowerCase().includes(filters.senatorial_district.toLowerCase())
        );
      }
      if (filters.federal_constituency) {
        filteredSchools = filteredSchools.filter(school => 
          school.federal_constituency.toLowerCase().includes(filters.federal_constituency.toLowerCase())
        );
      }
      if (filters.status) {
        filteredSchools = filteredSchools.filter(school => school.status === filters.status);
      }

      setSchools(filteredSchools);
    } catch (error) {
      console.error('Error fetching schools:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, [filters]);

  const handleAdd = () => {
    setEditingSchool(null);
    setIsModalOpen(true);
  };

  const handleEdit = (school: School) => {
    setEditingSchool(school);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this school?')) {
      try {
        await mockApi.schools.delete(id);
        await fetchSchools();
      } catch (error) {
        console.error('Error deleting school:', error);
      }
    }
  };

  const handleSave = async (formData: Omit<School, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingSchool) {
        await mockApi.schools.update(editingSchool.id, formData);
      } else {
        await mockApi.schools.create(formData);
      }
      await fetchSchools();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving school:', error);
    }
  };

  const filterOptions = [
    {
      key: 'name',
      label: 'School Name',
      type: 'text' as const,
      icon: Search
    },
    {
      key: 'type',
      label: 'School Type',
      type: 'select' as const,
      options: [
        { value: 'primary', label: 'Primary' },
        { value: 'secondary', label: 'Secondary' },
        { value: 'tertiary', label: 'Tertiary' }
      ],
      icon: SchoolIcon
    },
    {
      key: 'ownership',
      label: 'Ownership',
      type: 'select' as const,
      options: [
        { value: 'federal', label: 'Federal' },
        { value: 'state', label: 'State' },
        { value: 'private', label: 'Private' }
      ],
      icon: Users
    },
    {
      key: 'state',
      label: 'State',
      type: 'text' as const,
      icon: Building
    },
    {
      key: 'lga',
      label: 'LGA',
      type: 'text' as const,
      icon: Search
    },
    {
      key: 'senatorial_district',
      label: 'Senatorial District',
      type: 'text' as const,
      icon: Search
    },
    {
      key: 'federal_constituency',
      label: 'Federal Constituency',
      type: 'text' as const,
      icon: Search
    },
    {
      key: 'status',
      label: 'Status',
      type: 'select' as const,
      options: [
        { value: 'pending', label: 'Pending' },
        { value: 'approved', label: 'Approved' },
        { value: 'rejected', label: 'Rejected' }
      ],
      icon: Plus
    }
  ];

  return (
    <div className="space-y-6">
      <FilterPanel
        title="School Filters"
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
        onReset={() => setFilters({
          name: '',
          type: '',
          ownership: '',
          state: '',
          lga: '',
          senatorial_district: '',
          federal_constituency: '',
          status: ''
        })}
      />

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Manage Schools</h2>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add School
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
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ownership
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      LGA
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      State
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schools.map((school) => (
                    <tr key={school.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {school.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {school.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {school.ownership}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {school.lga}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {school.state}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          school.status === 'approved' 
                            ? 'bg-green-100 text-green-800'
                            : school.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {school.status.charAt(0).toUpperCase() + school.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(school)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(school.id)}
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
      </div>

      <SchoolModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingSchool={editingSchool}
      />
    </div>
  );
};