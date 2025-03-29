import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { BoardExam } from '../../../types/admin';
import { mockApi } from '../../../lib/mockApi';
import { BoardExamModal } from './BoardExamModal';

export const BoardExamList = () => {
  const [boardExams, setBoardExams] = useState<BoardExam[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<BoardExam | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBoardExams = async () => {
    setLoading(true);
    try {
      const { data } = await mockApi.boardExams.list();
      setBoardExams(data || []);
    } catch (error) {
      console.error('Error fetching board exams:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoardExams();
  }, []);

  const handleAdd = () => {
    setEditingExam(null);
    setIsModalOpen(true);
  };

  const handleEdit = (exam: BoardExam) => {
    setEditingExam(exam);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this board exam?')) {
      try {
        await mockApi.boardExams.delete(id);
        await fetchBoardExams();
      } catch (error) {
        console.error('Error deleting board exam:', error);
      }
    }
  };

  const handleSave = async (formData: Omit<BoardExam, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      if (editingExam) {
        await mockApi.boardExams.update(editingExam.id, formData);
      } else {
        await mockApi.boardExams.create(formData);
      }
      await fetchBoardExams();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving board exam:', error);
    }
  };

  const getStatusBadgeColor = (status: BoardExam['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ongoing':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">Board Examinations</h2>
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add Board Exam
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
                    Code
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Exam Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registration Deadline
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
                {boardExams.map((exam) => (
                  <tr key={exam.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {exam.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {exam.code}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(exam.exam_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(exam.registration_deadline).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(exam.status)}`}>
                        {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleEdit(exam)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(exam.id)}
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

      <BoardExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingExam={editingExam}
      />
    </div>
  );
};