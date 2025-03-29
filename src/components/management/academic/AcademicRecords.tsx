import React, { useState } from 'react';
import { TermEnrollmentForm } from './TermEnrollmentForm';
import { ExamResultsForm } from './ExamResultsForm';
import { BookOpen, Users } from 'lucide-react';

export const AcademicRecords = () => {
  const [activeTab, setActiveTab] = useState<'enrollment' | 'exam-results'>('enrollment');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900">Academic Records Management</h1>
        <p className="text-gray-600 mt-1">Manage term enrollments and board examination results</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('enrollment')}
              className={`py-4 px-6 inline-flex items-center gap-2 border-b-2 font-medium text-sm ${
                activeTab === 'enrollment'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users size={20} />
              Term Enrollment
            </button>
            <button
              onClick={() => setActiveTab('exam-results')}
              className={`py-4 px-6 inline-flex items-center gap-2 border-b-2 font-medium text-sm ${
                activeTab === 'exam-results'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <BookOpen size={20} />
              Board Exam Results
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'enrollment' ? (
            <TermEnrollmentForm />
          ) : (
            <ExamResultsForm />
          )}
        </div>
      </div>
    </div>
  );
};