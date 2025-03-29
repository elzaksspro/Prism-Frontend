import React, { useState } from 'react';
import { CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

export const DataValidation = () => {
  const [validationRules] = useState([
    {
      id: '1',
      name: 'Enrollment Numbers',
      description: 'Total students should match sum of male and female students',
      status: 'active',
      type: 'numeric',
      severity: 'error'
    },
    {
      id: '2',
      name: 'Age Range',
      description: 'Student age should be between 5 and 20 years',
      status: 'active',
      type: 'range',
      severity: 'warning'
    },
    {
      id: '3',
      name: 'Required Fields',
      description: 'Essential school information must be provided',
      status: 'active',
      type: 'completeness',
      severity: 'error'
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900">Data Validation Rules</h1>
        <p className="text-gray-600 mt-1">Manage and monitor data quality checks</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rule Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Severity
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
                {validationRules.map((rule) => (
                  <tr key={rule.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {rule.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {rule.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {rule.type.charAt(0).toUpperCase() + rule.type.slice(1)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        rule.severity === 'error'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {rule.severity.charAt(0).toUpperCase() + rule.severity.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => {}}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 justify-end"
                      >
                        <RefreshCw size={16} />
                        Run Check
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Validation Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
              <span className="text-green-700 font-medium">Passed Checks</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-green-900">1,234</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-yellow-700 font-medium">Warnings</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-yellow-900">45</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
              <span className="text-red-700 font-medium">Errors</span>
            </div>
            <p className="mt-2 text-2xl font-bold text-red-900">12</p>
          </div>
        </div>
      </div>
    </div>
  );
};