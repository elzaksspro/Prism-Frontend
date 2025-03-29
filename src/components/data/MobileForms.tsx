import React from 'react';
import { Smartphone, QrCode, Download } from 'lucide-react';

export const MobileForms = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900">Mobile Data Collection</h1>
        <p className="text-gray-600 mt-1">Access and manage mobile-friendly data collection forms</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Mobile App</h2>
              <p className="mt-1 text-sm text-gray-500">
                Download our mobile app for easy data collection on the go
              </p>
            </div>
            <Smartphone className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="mt-6 space-y-4">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <Download className="mr-2 h-5 w-5" />
              Download for Android
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <Download className="mr-2 h-5 w-5" />
              Download for iOS
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Quick Access</h2>
              <p className="mt-1 text-sm text-gray-500">
                Scan QR code to access mobile forms directly
              </p>
            </div>
            <QrCode className="h-8 w-8 text-indigo-600" />
          </div>
          <div className="mt-6">
            <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-center">
              {/* Placeholder for QR code */}
              <div className="w-48 h-48 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                <span className="text-gray-500">QR Code</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Available Forms</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'School Census', description: 'Basic school information and statistics' },
            { name: 'Infrastructure Survey', description: 'Facility conditions and requirements' },
            { name: 'Staff Records', description: 'Teaching and non-teaching staff details' },
            { name: 'Student Enrollment', description: 'Term-wise student enrollment data' },
            { name: 'Examination Results', description: 'Student performance and results' },
            { name: 'Resource Inventory', description: 'Educational resources and materials' }
          ].map((form) => (
            <div key={form.name} className="border rounded-lg p-4 hover:border-indigo-500 cursor-pointer">
              <h3 className="font-medium text-gray-900">{form.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{form.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};