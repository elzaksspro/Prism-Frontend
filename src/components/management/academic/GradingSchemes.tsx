import React, { useState } from 'react';
import { Plus, Pencil, Trash2, AlertTriangle } from 'lucide-react';
import { GradingSchemeModal } from './GradingSchemeModal';

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

export const GradingSchemes = () => {
  const [schemes, setSchemes] = useState<GradingScheme[]>([
    {
      id: '1',
      name: 'WAEC Standard',
      exam_type: 'WAEC',
      passing_score: 40,
      grade_ranges: [
        { min: 75, max: 100, grade: 'A1', description: 'Excellent' },
        { min: 70, max: 74, grade: 'B2', description: 'Very Good' },
        { min: 65, max: 69, grade: 'B3', description: 'Good' },
        { min: 60, max: 64, grade: 'C4', description: 'Credit' },
        { min: 55, max: 59, grade: 'C5', description: 'Credit' },
        { min: 50, max: 54, grade: 'C6', description: 'Credit' },
        { min: 45, max: 49, grade: 'D7', description: 'Pass' },
        { min: 40, max: 44, grade: 'E8', description: 'Pass' },
        { min: 0, max: 39, grade: 'F9', description: 'Fail' }
      ],
      is_active: true,
      created_at: new Date().toISOString()
    },
    {
      id: '2',
      name: 'NECO Standard',
      exam_type: 'NECO',
      passing_score: 40,
      grade_ranges: [
        { min: 75, max: 100, grade: 'A', description: 'Distinction' },
        { min: 65, max: 74, grade: 'B', description: 'Very Good' },
        { min: 50, max: 64, grade: 'C', description: 'Credit' },
        { min: 40, max: 49, grade: 'D', description: 'Pass' },
        { min: 0, max: 39, grade: 'F', description: 'Fail' }
      ],
      is_active: true,
      created_at: new Date().toISOString()
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScheme, setEditingScheme] = useState<GradingScheme | null>(null);

  const handleAdd = () => {
    setEditingScheme(null);
    setIsModalOpen(true);
  };

  const handleEdit = (scheme: GradingScheme) => {
    setEditingScheme(scheme);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this grading scheme?')) {
      setSchemes(prev => prev.filter(scheme => scheme.id !== id));
    }
  };

  const handleSave = (formData: Omit<GradingScheme, 'id' | 'created_at'>) => {
    if (editingScheme) {
      // Update existing scheme
      setSchemes(prev => prev.map(scheme => 
        scheme.id === editingScheme.id
          ? { ...scheme, ...formData }
          : scheme
      ));
    } else {
      // Add new scheme
      const newScheme: GradingScheme = {
        ...formData,
        id: String(schemes.length + 1),
        created_at: new Date().toISOString()
      };
      setSchemes(prev => [...prev, newScheme]);
    }
    setIsModalOpen(false);
  };

  const validateGradeRanges = (ranges: GradeRange[]) => {
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

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Grading Schemes</h1>
            <p className="text-gray-600 mt-1">Manage grading schemes for different board examinations</p>
          </div>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Scheme
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Passing Score
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Grade Ranges
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
                {schemes.map((scheme) => (
                  <tr key={scheme.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {scheme.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {scheme.exam_type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {scheme.passing_score}%
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-1">
                        {scheme.grade_ranges.map((range) => (
                          <span
                            key={range.grade}
                            className="px-2 py-1 bg-gray-100 rounded text-xs"
                            title={`${range.min}-${range.max}%: ${range.description}`}
                          >
                            {range.grade}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        scheme.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {scheme.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(scheme)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(scheme.id)}
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
        </div>
      </div>

      {/* Warning for overlapping schemes */}
      {schemes.some(s => !validateGradeRanges(s.grade_ranges)) && (
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Invalid Grade Ranges Detected
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Some grading schemes have gaps or overlaps in their grade ranges. Please review and update them.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <GradingSchemeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingScheme={editingScheme}
      />
    </div>
  );
};