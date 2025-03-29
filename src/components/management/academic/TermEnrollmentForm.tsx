import React, { useState, useEffect } from 'react';
import { mockApi } from '@/lib/mockApi';
import type { TermEnrollment } from '@/types/enrollment';
import { SchoolSelect } from '@/components/common/SchoolSelect';

export const TermEnrollmentForm = () => {
  const [formData, setFormData] = useState({
    school_id: '',
    academic_year: '',
    term: 'first' as TermEnrollment['term'],
    total_students: 0,
    male_students: 0,
    female_students: 0,
    new_admissions: 0,
    withdrawals: 0,
    special_needs_students: 0
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      const { data } = await mockApi.schools.list();
    };
    fetchSchools();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await mockApi.enrollments.create(formData);
      setMessage({ type: 'success', text: 'Enrollment data saved successfully!' });
      // Reset form
      setFormData({
        ...formData,
        total_students: 0,
        male_students: 0,
        female_students: 0,
        new_admissions: 0,
        withdrawals: 0,
        special_needs_students: 0
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving enrollment data. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const academicYears = [
    `${currentYear-1}/${currentYear}`,
    `${currentYear}/${currentYear+1}`,
    `${currentYear+1}/${currentYear+2}`
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900">Term Enrollment</h1>
        <p className="text-gray-600 mt-1">Manage student enrollment data for academic terms</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6 max-w-3xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">School</label>
          <SchoolSelect
            value={formData.school_id}
            onChange={(schoolId) => setFormData({ ...formData, school_id: schoolId })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Academic Year</label>
          <select
            value={formData.academic_year}
            onChange={(e) => setFormData({ ...formData, academic_year: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select Academic Year</option>
            {academicYears.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Term</label>
          <select
            value={formData.term}
            onChange={(e) => setFormData({ ...formData, term: e.target.value as TermEnrollment['term'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="first">First Term</option>
            <option value="second">Second Term</option>
            <option value="third">Third Term</option>
          </select>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Enrollment Numbers</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Male Students</label>
            <input
              type="number"
              min="0"
              value={formData.male_students}
              onChange={(e) => {
                const male = parseInt(e.target.value);
                setFormData({
                  ...formData,
                  male_students: male,
                  total_students: male + formData.female_students
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Female Students</label>
            <input
              type="number"
              min="0"
              value={formData.female_students}
              onChange={(e) => {
                const female = parseInt(e.target.value);
                setFormData({
                  ...formData,
                  female_students: female,
                  total_students: formData.male_students + female
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Total Students</label>
            <input
              type="number"
              value={formData.total_students}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-500"
              disabled
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">New Admissions</label>
            <input
              type="number"
              min="0"
              value={formData.new_admissions}
              onChange={(e) => setFormData({ ...formData, new_admissions: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Withdrawals</label>
            <input
              type="number"
              min="0"
              value={formData.withdrawals}
              onChange={(e) => setFormData({ ...formData, withdrawals: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Special Needs Students</label>
            <input
              type="number"
              min="0"
              value={formData.special_needs_students}
              onChange={(e) => setFormData({ ...formData, special_needs_students: parseInt(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
      </div>

      {message && (
        <div className={`p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Enrollment Data'}
        </button>
      </div>
      </form>
    </div>
  );
};