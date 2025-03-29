import React from 'react';
import { Link } from 'react-router-dom';
import {
  School,
  Users,
  GraduationCap,
  TrendingUp,
  AlertTriangle,
  Building,
  BookOpen,
  Award,
  Bell,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { mockApi } from '@/lib/mockApi';

interface DashboardStats {
  totalSchools: number;
  totalStudents: number;
  currentTermEnrollment: {
    total: number;
    growth: number;
  };
  totalTeachers: number;
  averagePerformance: number;
  maintenanceAlerts: number;
  recentActivities: any[];
}

const initialStats: DashboardStats = {
  totalSchools: 0,
  totalStudents: 0,
  currentTermEnrollment: {
    total: 0,
    growth: 0
  },
  totalTeachers: 0,
  averagePerformance: 0,
  maintenanceAlerts: 0,
  recentActivities: []
};

export const Dashboard = () => {
  const [stats, setStats] = React.useState<DashboardStats>(initialStats);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchDashboardData = async () => {
      setError(null);
      setLoading(true);
      try {
        const { data } = await mockApi.dashboard.getStats();
        if (!data) throw new Error('Failed to fetch data');
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickLinks = [
    { name: 'Infrastructure Analytics', icon: Building, color: 'bg-blue-500', link: '/' },
    { name: 'Performance Analytics', icon: TrendingUp, color: 'bg-green-500', link: '/performance' },
    { name: 'Demographics Analytics', icon: Users, color: 'bg-purple-500', link: '/demographics' },
    { name: 'Compare & Analyze', icon: Award, color: 'bg-yellow-500', link: '/compare' }
  ];

  const keyMetrics = [
    {
      title: 'Total Schools',
      value: stats.totalSchools,
      icon: School,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Students',
      value: stats.totalStudents.toLocaleString(),
      subtext: `${stats.currentTermEnrollment.growth > 0 ? '+' : ''}${stats.currentTermEnrollment.growth.toFixed(1)}% this term`,
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Total Teachers',
      value: stats.totalTeachers.toLocaleString(),
      icon: GraduationCap,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Average Performance',
      value: `${Math.round(stats.averagePerformance)}%`,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <p className="ml-3 text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="text-center py-6 text-gray-500">Loading dashboard data...</div>
      )}

      {/* Welcome Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome to Campus Dashboard</h1>
            <p className="text-gray-600 mt-1">Here's what's happening across your educational system</p>
          </div>
          {stats.maintenanceAlerts > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-lg">
              <AlertTriangle size={20} />
              <span>{stats.maintenanceAlerts} maintenance alerts</span>
            </div>
          )}
        </div>
      </div>

      {!loading && !error && (<>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <Link
            key={link.name}
            to={link.link}
            className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center gap-4">
              <div className={`${link.color} p-3 rounded-lg text-white`}>
                <link.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{link.name}</h3>
                <div className="flex items-center text-gray-500 group-hover:text-gray-700">
                  <span className="text-sm">View details</span>
                  <ChevronRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {keyMetrics.map((metric) => (
          <div key={metric.title} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center gap-4">
              <div className={`${metric.bgColor} p-3 rounded-lg ${metric.color}`}>
                <metric.icon size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{metric.title}</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {metric.value}
                  {metric.subtext && (
                    <span className={`text-sm ml-2 ${
                      metric.subtext.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.subtext}
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activities & Map Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <Bell size={20} className="text-gray-400" />
          </div>
          <div className="space-y-4">
            {stats.recentActivities.slice(0, 5).map((activity: any) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  activity.priority === 'high' ? 'bg-red-100 text-red-600' :
                  activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-blue-100 text-blue-600'
                }`}>
                  <AlertTriangle size={16} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.category}</p>
                  <p className="text-sm text-gray-500">{activity.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(activity.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Overview */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Performance Overview</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Last 30 days</span>
              <BookOpen size={20} className="text-gray-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Mathematics</span>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">English Language</span>
                <span className="text-sm font-medium text-gray-900">88%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '88%' }} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Science</span>
                <span className="text-sm font-medium text-gray-900">79%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '79%' }} />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Top Performing Schools</h3>
                <div className="space-y-3">
                  {['Unity College', 'Kings College', 'Queens College'].map((school) => (
                    <div key={school} className="flex items-center gap-3">
                      <div className="bg-indigo-100 p-2 rounded-lg text-indigo-600">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{school}</p>
                        <p className="text-xs text-gray-500">Pass Rate: 92%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </>)}
    </div>
  );
};