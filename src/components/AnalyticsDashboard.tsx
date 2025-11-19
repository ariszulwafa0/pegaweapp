'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  Briefcase, 
  Eye, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Download
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/hooks/use-admin-auth';

interface Analytics {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  pendingApplications: number;
  totalUsers: number;
  recentApplications: any[];
  jobViews: any[];
  popularCategories: any[];
}

export default function AnalyticsDashboard() {
  const { isAuthenticated } = useAdminAuth();
  const [analytics, setAnalytics] = useState<Analytics>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    pendingApplications: 0,
    totalUsers: 0,
    recentApplications: [],
    jobViews: [],
    popularCategories: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      fetchAnalytics();
    }
  }, [isAuthenticated]);

  const fetchAnalytics = async () => {
    try {
      // Mock analytics data - in real app, this would come from API
      const mockAnalytics: Analytics = {
        totalJobs: 45,
        activeJobs: 38,
        totalApplications: 1247,
        pendingApplications: 23,
        totalUsers: 892,
        recentApplications: [
          { id: 1, jobTitle: 'Frontend Developer', userName: 'John Doe', status: 'pending', createdAt: '2024-01-15' },
          { id: 2, jobTitle: 'UI/UX Designer', userName: 'Jane Smith', status: 'reviewed', createdAt: '2024-01-14' },
          { id: 3, jobTitle: 'Backend Developer', userName: 'Bob Johnson', status: 'accepted', createdAt: '2024-01-13' },
        ],
        jobViews: [
          { date: '2024-01-10', views: 120 },
          { date: '2024-01-11', views: 145 },
          { date: '2024-01-12', views: 167 },
          { date: '2024-01-13', views: 189 },
          { date: '2024-01-14', views: 203 },
          { date: '2024-01-15', views: 234 },
        ],
        popularCategories: [
          { category: 'Technology', count: 18, percentage: 40 },
          { category: 'Design', count: 12, percentage: 27 },
          { category: 'Marketing', count: 8, percentage: 18 },
          { category: 'Sales', count: 7, percentage: 15 },
        ],
      };
      
      setAnalytics(mockAnalytics);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  const exportData = () => {
    // Mock export functionality
    const data = {
      totalJobs: analytics.totalJobs,
      activeJobs: analytics.activeJobs,
      totalApplications: analytics.totalApplications,
      pendingApplications: analytics.pendingApplications,
      totalUsers: analytics.totalUsers,
      exportDate: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'pegawe-analytics.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Monitor platform performance and user engagement</p>
        </div>
        <Button onClick={exportData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-white rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Lowongan</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalJobs}</p>
                <p className="text-sm text-green-600 mt-2 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  +8% dari bulan lalu
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Pelamar</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalApplications}</p>
                <p className="text-sm text-blue-600 mt-2 flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {analytics.pendingApplications} pending
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total User</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.totalUsers}</p>
                <p className="text-sm text-purple-600 mt-2 flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  Active users
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg bg-white rounded-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Lowongan Aktif</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{analytics.activeJobs}</p>
                <p className="text-sm text-orange-600 mt-2 flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  {((analytics.activeJobs / analytics.totalJobs) * 100).toFixed(0)}% aktif
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <Eye className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Applications */}
        <Card className="border-0 shadow-lg bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.recentApplications.map((app) => (
                <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{app.jobTitle}</p>
                    <p className="text-sm text-gray-600">{app.userName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      app.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {app.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{app.createdAt}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Categories */}
        <Card className="border-0 shadow-lg bg-white rounded-xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Popular Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.popularCategories.map((cat, index) => (
                <div key={cat.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">{cat.category}</span>
                    <span className="text-sm text-gray-600">{cat.count} jobs ({cat.percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-gray-900 to-gray-700 h-2 rounded-full"
                      style={{ width: `${cat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Job Views Chart */}
      <Card className="border-0 shadow-lg bg-white rounded-xl">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2" />
            Job Views Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-end justify-between space-x-2">
            {analytics.jobViews.map((view, index) => (
              <div key={view.date} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-gradient-to-t from-gray-900 to-gray-700 rounded-t-lg"
                  style={{ height: `${(view.views / 250) * 100}%` }}
                ></div>
                <span className="text-xs text-gray-600 mt-2">{view.date.split('-')[2]}</span>
                <span className="text-xs text-gray-900 font-medium">{view.views}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}