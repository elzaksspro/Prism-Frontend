import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, GraduationCap, Users, Clock, Award } from 'lucide-react';
import { FilterPanel } from '@/components/common/FilterPanel';
import { StaffModal } from './StaffModal';
import { mockApi } from '@/lib/mockApi';
import { Staff } from '@/types/staff';

export const StaffManagement = () => {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    name: '',
    role: '',
    qualification: '',
    experience_level: '',
    subject: '',
    school: ''
  });

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const { data } = await mockApi.staff.list();
      let filteredStaff = data || [];

      // Apply filters
      if (filters.name) {
        filteredStaff = filteredStaff.filter(s => 
          s.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
      if (filters.role) {
        filteredStaff = filteredStaff.filter(s => s.role === filters.role);
      }
      if (filters.qualification) {
        filteredStaff = filteredStaff.filter(s => s.qualification === filters.qualification);
      }
      if (filters.experience_level) {
        filteredStaff = filteredStaff.filter(s => s.experience_level === filters.experience_level);
      }
      if (filters.subject) {
        filteredStaff = filteredStaff.filter(s => s.subjects.includes(filters.subject));
      }
      if (filters.school) {
        filteredStaff = filteredStaff.filter(s => s.school.toLowerCase().includes(filters.school.toLowerCase()));
      }

      setStaff(filteredStaff);
    } catch (error) {
      console.error('Error fetching staff:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [filters]);

  const handleAdd = () => {
    setEditingStaff(null);
    setIsModalOpen(true);
  };

  const handleEdit = (staff: Staff) => {
    setEditingStaff(staff);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await mockApi.staff.delete(id);
        await fetchStaff();
      } catch (error) {
        console.error('Error deleting staff:', error);
      }
    }
  };

  const handleSave = async (formData: Omit<Staff, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingStaff) {
        await mockApi.staff.update(editingStaff.id, formData);
      } else {
        await mockApi.staff.create(formData);
      }
      await fetchStaff();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving staff:', error);
    }
  };

  const filterOptions = [
    {
      key: 'name',
      label: 'Staff Name',
      type: 'text' as const,
      icon: Search
    },
    {
      key: 'role',
      label: 'Role',
      type: 'select' as const,
      options: [
        { value: 'teacher', label: 'Teacher' },
        { value: 'administrator', label: 'Administrator' },
        { value: 'support', label: 'Support Staff' }
      ],
      icon: Users
    },
    {
      key: 'qualification',
      label: 'Qualification',
      type: 'select' as const,
      options: [
        { value: 'bachelors', label: "Bachelor's Degree" },
        { value: 'masters', label: "Master's Degree" },
        { value: 'doctorate', label: 'Doctorate' },
        { value: 'teaching_cert', label: 'Teaching Certificate' }
      ],
      icon: GraduationCap
    },
    {
      key: 'experience_level',
      label: 'Experience Level',
      type: 'select' as const,
      options: [
        { value: 'entry', label: 'Entry Level (0-2 years)' },
        { value: 'intermediate', label: 'Intermediate (3-5 years)' },
        { value: 'senior', label: 'Senior (6-10 years)' },
        { value: 'expert', label: 'Expert (10+ years)' }
      ],
      icon: Clock
    },
    {
      key: 'subject',
      label: 'Subject',
      type: 'select' as const,
      options: [
        { value: 'mathematics', label: 'Mathematics' },
        { value: 'english', label: 'English' },
        { value: 'science', label: 'Science' },
        { value: 'history', label: 'History' }
      ],
      icon: Award
    }
  ];

  return (
    <div className="space-y-6">
      <FilterPanel
        title="Staff Filters"
        filters={filters}
        filterOptions={filterOptions}
        onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
        onReset={() => setFilters({
          name: '',
          role: '',
          qualification: '',
          experience_level: '',
          subject: '',
          school: ''
        })}
      />

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Staff & Personnel</h2>
            <button
              onClick={handleAdd}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
            >
              <Plus size={16} />
              Add Staff Member
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
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qualification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subjects
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      School
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staff.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {member.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.qualification}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.experience_level}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.subjects.join(', ')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {member.school}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-indigo-600 hover:text-indigo-900 mr-4"
                        >
                          <Pencil size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(member.id)}
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

      <StaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingStaff={editingStaff}
      />
    </div>
  );
};