import React, { useState } from 'react';
import { 
  TrendingUp, BarChart2, GitCompare, Brain, AlertTriangle, 
  ArrowRight, ArrowUpRight, ArrowDownRight, DollarSign,
  Users, School, BookOpen, GraduationCap, Building,
  Briefcase, AlertCircle, LineChart, PieChart
} from 'lucide-react';

export const PredictiveAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1y' | '3y' | '5y'>('1y');
  const [selectedModel, setSelectedModel] = useState<'regression' | 'ml' | 'timeseries'>('regression');
  const [selectedCategory, setSelectedCategory] = useState<'performance' | 'resources' | 'students' | 'enrollment'>('performance');

  // Enhanced categories for analysis
  const categories = [
    { id: 'performance', label: 'Performance Analytics', icon: TrendingUp },
    { id: 'resources', label: 'Resource Optimization', icon: DollarSign },
    { id: 'students', label: 'Student Success', icon: GraduationCap },
    { id: 'enrollment', label: 'Enrollment Patterns', icon: Users }
  ];

  // Category-specific predictions
  const categoryPredictions = {
    performance: [
      {
        metric: 'Average Pass Rate',
        current: 75,
        predicted: 78,
        confidence: 90,
        trend: 'increase'
      },
      {
        metric: 'Student Retention',
        current: 92,
        predicted: 94,
        confidence: 85,
        trend: 'increase'
      },
      {
        metric: 'Academic Performance',
        current: 82,
        predicted: 80,
        confidence: 88,
        trend: 'decrease'
      }
    ],
    resources: [
      {
        metric: 'Teacher Demand',
        current: 450,
        predicted: 485,
        confidence: 92,
        trend: 'increase'
      },
      {
        metric: 'Infrastructure Cost',
        current: 100,
        predicted: 115,
        confidence: 87,
        trend: 'increase'
      },
      {
        metric: 'Resource Utilization',
        current: 78,
        predicted: 85,
        confidence: 89,
        trend: 'increase'
      }
    ],
    students: [
      {
        metric: 'At-Risk Students',
        current: 15,
        predicted: 12,
        confidence: 85,
        trend: 'decrease'
      },
      {
        metric: 'College Readiness',
        current: 72,
        predicted: 78,
        confidence: 88,
        trend: 'increase'
      },
      {
        metric: 'Career Placement',
        current: 68,
        predicted: 75,
        confidence: 86,
        trend: 'increase'
      }
    ],
    enrollment: [
      {
        metric: 'Total Enrollment',
        current: 12500,
        predicted: 13200,
        confidence: 93,
        trend: 'increase'
      },
      {
        metric: 'Class Size Average',
        current: 32,
        predicted: 30,
        confidence: 87,
        trend: 'decrease'
      },
      {
        metric: 'Special Programs',
        current: 450,
        predicted: 520,
        confidence: 85,
        trend: 'increase'
      }
    ]
  };

  // Category-specific insights
  const categoryInsights = {
    performance: [
      {
        title: 'Teacher Training Impact',
        description: 'Professional development shows strong correlation with student performance',
        confidence: 92,
        impact: 'High'
      },
      {
        title: 'Resource Availability',
        description: 'Access to digital resources correlates with improved test scores',
        confidence: 88,
        impact: 'Medium'
      }
    ],
    resources: [
      {
        title: 'Staffing Optimization',
        description: 'Predicted 8% increase in STEM teacher demand by next year',
        confidence: 90,
        impact: 'High'
      },
      {
        title: 'Maintenance Planning',
        description: 'Preventive maintenance could reduce costs by 15%',
        confidence: 85,
        impact: 'Medium'
      }
    ],
    students: [
      {
        title: 'Early Intervention',
        description: 'Early warning system could improve retention by 12%',
        confidence: 87,
        impact: 'High'
      },
      {
        title: 'Career Guidance',
        description: 'Personalized guidance could improve placement rates by 15%',
        confidence: 84,
        impact: 'Medium'
      }
    ],
    enrollment: [
      {
        title: 'Demographic Shifts',
        description: 'Expected 5% growth in school-age population by 2025',
        confidence: 91,
        impact: 'High'
      },
      {
        title: 'Program Demand',
        description: 'STEM program enrollment expected to grow by 18%',
        confidence: 86,
        impact: 'High'
      }
    ]
  };

  // Risk factors by category
  const riskFactors = {
    performance: [
      { factor: 'Teacher Turnover', risk: 'medium', trend: 'stable' },
      { factor: 'Resource Gaps', risk: 'high', trend: 'increasing' }
    ],
    resources: [
      { factor: 'Budget Constraints', risk: 'high', trend: 'increasing' },
      { factor: 'Equipment Obsolescence', risk: 'medium', trend: 'stable' }
    ],
    students: [
      { factor: 'Attendance Issues', risk: 'high', trend: 'decreasing' },
      { factor: 'Learning Gaps', risk: 'medium', trend: 'stable' }
    ],
    enrollment: [
      { factor: 'Demographic Changes', risk: 'medium', trend: 'increasing' },
      { factor: 'Competition', risk: 'low', trend: 'stable' }
    ]
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h1 className="text-2xl font-bold text-gray-900">Advanced Predictive Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive analysis and forecasting across multiple domains</p>
      </div>

      {/* Category Selection */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {categories.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setSelectedCategory(id as typeof selectedCategory)}
              className={`flex items-center gap-2 p-4 rounded-lg border ${
                selectedCategory === id
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Model Controls */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Model</label>
            <div className="flex gap-2">
              {[
                { id: 'regression', label: 'Regression', icon: TrendingUp },
                { id: 'ml', label: 'Machine Learning', icon: Brain },
                { id: 'timeseries', label: 'Time Series', icon: BarChart2 }
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedModel(id as typeof selectedModel)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    selectedModel === id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Forecast Horizon</label>
            <div className="flex gap-2">
              {[
                { id: '1y', label: '1 Year' },
                { id: '3y', label: '3 Years' },
                { id: '5y', label: '5 Years' }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setSelectedTimeframe(id as typeof selectedTimeframe)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedTimeframe === id
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Predictions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categoryPredictions[selectedCategory].map((prediction) => (
          <div key={prediction.metric} className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-lg font-medium text-gray-900">{prediction.metric}</h3>
            <div className="mt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Current</span>
                <span className="text-lg font-semibold">{prediction.current}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Predicted</span>
                <span className="text-lg font-semibold text-indigo-600">{prediction.predicted}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Confidence</span>
                <span className="text-sm font-medium text-gray-900">{prediction.confidence}%</span>
              </div>
              <div className="pt-2">
                <div className="flex items-center gap-1 text-sm">
                  {prediction.trend === 'increase' ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                  <span className={prediction.trend === 'increase' ? 'text-green-600' : 'text-red-600'}>
                    {((Math.abs(prediction.predicted - prediction.current) / prediction.current) * 100).toFixed(1)}% change expected
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Key Insights */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categoryInsights[selectedCategory].map((insight) => (
            <div key={insight.title} className="border rounded-lg p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-medium text-gray-900">{insight.title}</h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  insight.impact === 'High'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {insight.impact} Impact
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500">{insight.description}</p>
              <div className="mt-3 flex items-center">
                <Brain className="h-4 w-4 text-indigo-500 mr-1" />
                <span className="text-sm text-indigo-600">
                  {insight.confidence}% confidence
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Risk Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {riskFactors[selectedCategory].map((risk) => (
            <div key={risk.factor} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center">
                <AlertCircle className={`h-5 w-5 ${
                  risk.risk === 'high' ? 'text-red-500' :
                  risk.risk === 'medium' ? 'text-yellow-500' :
                  'text-green-500'
                } mr-2`} />
                <span className="font-medium text-gray-900">{risk.factor}</span>
              </div>
              <div className="flex items-center">
                <span className={`text-sm ${
                  risk.trend === 'increasing' ? 'text-red-600' :
                  risk.trend === 'decreasing' ? 'text-green-600' :
                  'text-yellow-600'
                } mr-2`}>
                  {risk.trend.charAt(0).toUpperCase() + risk.trend.slice(1)}
                </span>
                {risk.trend === 'increasing' ? (
                  <ArrowUpRight className="h-4 w-4" />
                ) : risk.trend === 'decreasing' ? (
                  <ArrowDownRight className="h-4 w-4" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Model Accuracy Warning */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">Model Accuracy Notice</h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>Predictions are based on historical data and current trends. Actual results may vary based on external factors and policy changes.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};