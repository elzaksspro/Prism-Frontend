import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Staff } from '@/types/staff';
import { mockApi } from '@/lib/mockApi';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (staff: Omit<Staff, 'id' | 'created_at' | 'updated_at'>) => void;
  editingStaff: Staff | null;
}

export const StaffModal = ({ isOpen, onClose, onSave, editingStaff }: StaffModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    role: 'teacher' as Staff['role'],
    qualification: '',
    experience_level: '',
    subjects: [] as string[],
    school: '',
    certifications: [] as string[],
    specializations: [] as string[]
  });

  const [schools, setSchools] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    if (editingStaff) {
      setFormData({
        name: editingStaff.name,
        role: editingStaff.role,
        qualification: editingStaff.qualification,
        experience_level: editingStaff.experience_level,
        subjects: editingStaff.subjects,
        school: editingStaff.school,
        certifications: editingStaff.certifications,
        specializations: editingStaff.specializations
      });
    } else {
      setFormData({
        name: '',
        role: 'teacher',
        qualification: '',
        experience_level: '',
        subjects: [],
        school: '',
        certifications: [],
        specializations: []
      });
    }
  }, [editingStaff]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const { data } = await mockApi.schools.list();
        setSchools(data || []);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };
    fetchSchools();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const subjects = [
    'Mathematics',
    'English',
    'Science',
    'History',
    'Geography',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Physical Education'
  ];

  const certifications = [
    'Teaching License',
    'Special Education',
    'ESL Certification',
    'Advanced Teaching Certificate',
    'Subject Matter Expert',
    'Department Head Certification'
  ];

  const specializations = [
    'Early Childhood Education',
    'Special Education',
    'STEM Education',
    'Language Arts',
    'Educational Technology',
    'Curriculum Development'
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as Staff['role'] })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="teacher">Teacher</option>
                  <option value="administrator">Administrator</option>
                  <option value="support">Support Staff</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  School
                </label>
                <select
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select School</option>
                  {schools.map((school) => (
                    <option key={school.id} value={school.name}>
                      {school.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Qualifications */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Qualifications</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Highest Qualification
                </label>
                <select
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Qualification</option>
                  <option value="bachelors">Bachelor's Degree</option>
                  <option value="masters">Master's Degree</option>
                  <option value="doctorate">Doctorate</option>
                  <option value="teaching_cert">Teaching Certificate</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select
                  value={formData.experience_level}
                  onChange={(e) => setFormData({ ...formData, experience_level: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select Experience Level</option>
                  <option value="entry">Entry Level (0-2 years)</option>
                  <option value="intermediate">Intermediate (3-5 years)</option>
                  <option value="senior">Senior (6-10 years)</option>
                  <option value="expert">Expert (10+ years)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subjects and Specializations */}
          <div className="grid grid-cols-2 gap-6 pt-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Teaching Subjects</h3>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                {subjects.map((subject) => (
                  <label key={subject} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.subjects.includes(subject)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({
                            ...formData,
                            subjects: [...formData.subjects, subject]
                          });
                        } else {
                          setFormData({
                            ...formData,
                            subjects: formData.subjects.filter(s => s !== subject)
                          });
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm">{subject}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Certifications & Specializations</h3>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Certifications</p>
                  {certifications.map((cert) => (
                    <label key={cert} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.certifications.includes(cert)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              certifications: [...formData.certifications, cert]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              certifications: formData.certifications.filter(c => c !== cert)
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm">{cert}</span>
                    </label>
                  ))}
                </div>

                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Specializations</p>
                  {specializations.map((spec) => (
                    <label key={spec} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.specializations.includes(spec)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              specializations: [...formData.specializations, spec]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              specializations: formData.specializations.filter(s => s !== spec)
                            });
                          }
                        }}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm">{spec}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-6">
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
              {editingStaff ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};