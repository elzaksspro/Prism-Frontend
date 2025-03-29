import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';

interface GradeRange {
  min: number;
  max: number;
  grade: string;
  description: string;
}

interface GradingScheme {
  id: string;
  name: string;
  exam_type: string;
  passing_score: number;
  grade_ranges: GradeRange[];
  is_active: boolean;
  created_at: string;
}

interface GradingSchemeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (scheme: Omit<GradingScheme, 'id' | 'created_at'>) => void;
  editingScheme: GradingScheme | null;
}

export const GradingSchemeModal = ({
  isOpen,
  onClose,
  onSave,
  editingScheme
}: GradingSchemeModalProps) => {
  const [formData, setFormData] = useState<Omit<GradingScheme, 'id' | 'created_at'>>({
    name: '',
    exam_type: '',
    passing_score: 40,
    grade_ranges: [],
    is_active: true
  });

  useEffect(() => {
    if (editingScheme) {
      setFormData({
        name: editingScheme.name,
        exam_type: editingScheme.exam_type,
        passing_score: editingScheme.passing_score,
        grade_ranges: [...editingScheme.grade_ranges],
        is_active: editingScheme.is_active
      });
    } else {
      setFormData({
        name: '',
        exam_type: '',
        passing_score: 40,
        grade_ranges: [],
        is_active: true
      });
    }
  }, [editingScheme]);

  const handleAddGradeRange = () => {
    setFormData(prev => ({
      ...prev,
      grade_ranges: [
        ...prev.grade_ranges,
        { min: 0, max: 0, grade: '', description: '' }
      ]
    }));
  };

  const handleRemoveGradeRange = (index: number) => {
    setFormData(prev => ({
      ...prev,
      grade_ranges: prev.grade_ranges.filter((_, i) => i !== index)
    }));
  };

  const handleGradeRangeChange = (index: number, field: keyof GradeRange, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      grade_ranges: prev.grade_ranges.map((range, i) => 
        i === index ? { ...range, [field]: value } : range
      )
    }));
  };

  const validateGradeRanges = () => {
    const ranges = formData.grade_ranges;
    if (ranges.length === 0) return false;

    // Sort ranges by max score descending
    const sortedRanges = [...ranges].sort((a, b) => b.max - a.max);
    
    // Check for gaps and overlaps
    for (let i = 0; i < sortedRanges.length - 1; i++) {
      if (sortedRanges[i].min !== sortedRanges[i + 1].max + 1) {
        return false;
      }
    }
    
    // Check if ranges cover 0-100
    return sortedRanges[0].max === 100 && sortedRanges[sortedRanges.length - 1].min === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGradeRanges()) {
      alert('Please ensure grade ranges cover all scores from 0 to 100 without gaps or overlaps.');
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            {editingScheme ? 'Edit Grading Scheme' : 'Add New Grading Scheme'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Scheme Name
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
                Exam Type
              </label>
              <select
                value={formData.exam_type}
                onChange={(e) => setFormData({ ...formData, exam_type: e.target.value })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select Exam Type</option>
                <option value="WAEC">WAEC</option>
                <option value="NECO">NECO</option>
                <option value="JAMB">JAMB</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Passing Score (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.passing_score}
                onChange={(e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={formData.is_active.toString()}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'true' })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="true">Active</option>
                <option value="false">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Grade Ranges</h3>
              <button
                type="button"
                onClick={handleAddGradeRange}
                className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-1"
              >
                <Plus size={16} />
                Add Range
              </button>
            </div>

            <div className="space-y-4">
              {formData.grade_ranges.map((range, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="grid grid-cols-5 gap-4 flex-1">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Min Score
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={range.min}
                        onChange={(e) => handleGradeRangeChange(index, 'min', parseInt(e.target.value))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Max Score
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={range.max}
                        onChange={(e) => handleGradeRangeChange(index, 'max', parseInt(e.target.value))}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Grade
                      </label>
                      <input
                        type="text"
                        value={range.grade}
                        onChange={(e) => handleGradeRangeChange(index, 'grade', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <input
                        type="text"
                        value={range.description}
                        onChange={(e) => handleGradeRangeChange(index, 'description', e.target.value)}
                        className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveGradeRange(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
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
              {editingScheme ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};