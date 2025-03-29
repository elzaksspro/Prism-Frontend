import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { mockApi } from '@/lib/mockApi';
import { SchoolSelect } from '@/components/common/SchoolSelect';
import type { BoardExamResult, SubjectResult } from '@/types/examResults';

export const ExamResultsForm = () => {
  const [boardExams, setBoardExams] = useState<{ id: string; name: string; code: string }[]>([]);
  const [formData, setFormData] = useState({
    school_id: '',
    exam_id: '',
    academic_year: '',
    total_students: 0,
    passed_students: 0,
    pass_rate: 0,
    average_score: 0,
    subjects: [] as {
      name: string;
      total_students: number;
      passed_students: number;
      pass_rate: number;
      average_score: number;
      highest_score: number;
      lowest_score: number;
      grade_a_count: number;
      grade_b_count: number;
      grade_c_count: number;
      grade_d_count: number;
      grade_f_count: number;
    }[]
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const examsData = await mockApi.boardExams.list();
      setBoardExams(examsData.data || []);
    };
    fetchData();
  }, []);

  const handleAddSubject = () => {
    setFormData({
      ...formData,
      subjects: [
        ...formData.subjects,
        {
          name: '',
          total_students: 0,
          passed_students: 0,
          pass_rate: 0,
          average_score: 0,
          highest_score: 0,
          lowest_score: 0,
          grade_a_count: 0,
          grade_b_count: 0,
          grade_c_count: 0,
          grade_d_count: 0,
          grade_f_count: 0
        }
      ]
    });
  };

  const handleRemoveSubject = (index: number) => {
    setFormData({
      ...formData,
      subjects: formData.subjects.filter((_, i) => i !== index)
    });
  };

  const handleSubjectChange = (index: number, field: string, value: string | number) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = {
      ...newSubjects[index],
      [field]: value
    };

    // Recalculate pass rate
    if (field === 'total_students' || field === 'passed_students') {
      const total = field === 'total_students' ? value : newSubjects[index].total_students;
      const passed = field === 'passed_students' ? value : newSubjects[index].passed_students;
      newSubjects[index].pass_rate = total ? (Number(passed) / Number(total)) * 100 : 0;
    }

    // Validate grade counts
    if (field.startsWith('grade_')) {
      const total = Object.entries(newSubjects[index])
        .filter(([key]) => key.startsWith('grade_'))
        .reduce((sum, [, count]) => sum + Number(count), 0);
      
      if (total > newSubjects[index].total_students) {
        return; // Don't update if total grades exceed total students
      }
    }

    setFormData({ ...formData, subjects: newSubjects });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      // First save the main exam result
      const examResult = await mockApi.boardExams.create({
        school_id: formData.school_id,
        exam_id: formData.exam_id,
        academic_year: formData.academic_year,
        total_students: formData.total_students,
        passed_students: formData.passed_students,
        pass_rate: formData.pass_rate,
        average_score: formData.average_score
      });

      // Then save each subject result
      await Promise.all(
        formData.subjects.map(subject =>
          mockApi.boardExams.create({
            result_id: examResult.data.id,
            ...subject
          })
        )
      );

      setMessage({ type: 'success', text: 'Exam results saved successfully!' });
      // Reset form
      setFormData({
        ...formData,
        total_students: 0,
        passed_students: 0,
        pass_rate: 0,
        average_score: 0,
        subjects: []
      });
    } catch (error) {
      setMessage({ type: 'error', text: 'Error saving exam results. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const academicYears = [
    `${currentYear-1}/${currentYear}`,
    `${currentYear}/${currentYear+1}`
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900">Board Exam Results</h1>
        <p className="text-gray-600 mt-1">Record and manage board examination results</p>
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
          <label className="block text-sm font-medium text-gray-700">Board Exam</label>
          <select
            value={formData.exam_id}
            onChange={(e) => setFormData({ ...formData, exam_id: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Select Board Exam</option>
            {boardExams.map((exam) => (
              <option key={exam.id} value={exam.id}>
                {exam.name} ({exam.code})
              </option>
            ))}
          </select>
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
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <h3 className="text-lg font-medium text-gray-900">Overall Results</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Total Students</label>
            <input
              type="number"
              min="0"
              value={formData.total_students}
              onChange={(e) => {
                const total = parseInt(e.target.value);
                setFormData({
                  ...formData,
                  total_students: total,
                  pass_rate: total ? (formData.passed_students / total) * 100 : 0
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Passed Students</label>
            <input
              type="number"
              min="0"
              value={formData.passed_students}
              onChange={(e) => {
                const passed = parseInt(e.target.value);
                setFormData({
                  ...formData,
                  passed_students: passed,
                  pass_rate: formData.total_students ? (passed / formData.total_students) * 100 : 0
                });
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Pass Rate (%)</label>
            <input
              type="number"
              value={formData.pass_rate.toFixed(2)}
              className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-500"
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Average Score</label>
            <input
              type="number"
              min="0"
              max="100"
              step="0.01"
              value={formData.average_score}
              onChange={(e) => setFormData({ ...formData, average_score: parseFloat(e.target.value) })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Subject Results</h3>
          <button
            type="button"
            onClick={handleAddSubject}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus size={16} className="mr-2" />
            Add Subject
          </button>
        </div>

        {formData.subjects.map((subject, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="flex justify-between items-start">
              <h4 className="text-md font-medium text-gray-900">Subject {index + 1}</h4>
              <button
                type="button"
                onClick={() => handleRemoveSubject(index)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Subject Name</label>
                <input
                  type="text"
                  value={subject.name}
                  onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Total Students</label>
                <input
                  type="number"
                  min="0"
                  value={subject.total_students}
                  onChange={(e) => handleSubjectChange(index, 'total_students', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Passed Students</label>
                <input
                  type="number"
                  min="0"
                  value={subject.passed_students}
                  onChange={(e) => handleSubjectChange(index, 'passed_students', parseInt(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Pass Rate (%)</label>
                <input
                  type="number"
                  value={subject.pass_rate.toFixed(2)}
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 text-gray-500"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Average Score</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={subject.average_score}
                  onChange={(e) => handleSubjectChange(index, 'average_score', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Highest Score</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={subject.highest_score}
                  onChange={(e) => handleSubjectChange(index, 'highest_score', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Lowest Score</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={subject.lowest_score}
                  onChange={(e) => handleSubjectChange(index, 'lowest_score', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h5 className="text-sm font-medium text-gray-700 mb-3">Grade Distribution</h5>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {['A', 'B', 'C', 'D', 'F'].map((grade) => (
                  <div key={grade}>
                    <label className="block text-sm font-medium text-gray-700">Grade {grade}</label>
                    <input
                      type="number"
                      min="0"
                      value={subject[`grade_${grade.toLowerCase()}_count` as keyof typeof subject]}
                      onChange={(e) => handleSubjectChange(index, `grade_${grade.toLowerCase()}_count`, parseInt(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
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
          {loading ? 'Saving...' : 'Save Exam Results'}
        </button>
      </div>
      </form>
    </div>
  );
};