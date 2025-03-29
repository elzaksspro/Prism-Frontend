import React, { useState } from 'react';
import { Cloud, CloudOff, RefreshCw, Check } from 'lucide-react';

export const OfflineCollection = () => {
  const [syncStatus, setSyncStatus] = useState<'synced' | 'pending' | 'syncing'>('synced');
  const [pendingRecords] = useState([
    {
      id: '1',
      type: 'Enrollment Data',
      school: 'Central High School',
      timestamp: '2024-02-15 10:30 AM',
      status: 'pending'
    },
    {
      id: '2',
      type: 'Infrastructure Update',
      school: 'Unity College',
      timestamp: '2024-02-15 11:45 AM',
      status: 'synced'
    }
  ]);

  const handleSync = async () => {
    setSyncStatus('syncing');
    // Simulate sync
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSyncStatus('synced');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900">Offline Data Collection</h1>
        <p className="text-gray-600 mt-1">Manage and sync offline data submissions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900">Sync Status</h2>
            {syncStatus === 'synced' ? (
              <Cloud className="h-6 w-6 text-green-500" />
            ) : (
              <CloudOff className="h-6 w-6 text-yellow-500" />
            )}
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Last synced:</span>
              <span className="text-gray-900">15 minutes ago</span>
            </div>
            <button
              onClick={handleSync}
              disabled={syncStatus === 'syncing'}
              className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
              {syncStatus === 'syncing' ? (
                <>
                  <RefreshCw className="animate-spin mr-2 h-5 w-5" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Sync Now
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 md:col-span-2">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Storage Status</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>Local Storage Used</span>
                <span>45 MB of 1 GB</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '4.5%' }} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Pending Records</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Total Records</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Pending Submissions</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.school}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {record.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`flex items-center text-sm ${
                        record.status === 'synced' ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {record.status === 'synced' ? (
                          <>
                            <Check className="mr-1.5 h-4 w-4" />
                            Synced
                          </>
                        ) : (
                          <>
                            <CloudOff className="mr-1.5 h-4 w-4" />
                            Pending
                          </>
                        )}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};