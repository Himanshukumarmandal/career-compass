import React, { useState, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  CartesianGrid 
} from 'recharts';
import { TrendingUp, Users, CheckCircle, Percent, GraduationCap, Calendar } from 'lucide-react';
import api from '../hooks/useApi';
import LoadingSkeleton from '../components/LoadingSkeleton';

const COLORS = ['#072B63', '#F5B21A', '#10B981', '#8B5CF6', '#EC4899', '#F97316', '#EF4444'];

const AnalyticsPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await api.get('/analytics/dashboard');
        setData(res.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading || !data) {
    return <LoadingSkeleton type="card" count={3} />;
  }

  const { stats, monthlyLeads, courseDistribution, statusDistribution, conversion } = data;

  // Formatting status data for conversion pipeline
  const pipelineFunnel = [
    { name: 'Total Leads', value: conversion.totalLeads },
    { name: 'Admissions Done', value: conversion.admissionConfirmed },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold admin-text">Admission Analytics</h1>
        <p className="text-xs admin-text-muted">
          Review recruitment trends, course-wise performance, and conversion pipelines.
        </p>
      </div>

      {/* Analytics KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="p-4 rounded-xl border admin-card admin-glass shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-brandNavy/10 text-brandNavy dark:bg-yellow-400/10 dark:text-yellow-400 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs admin-text-muted font-bold uppercase tracking-wider">Total Inquiries</p>
            <p className="text-xl font-bold admin-text">{stats.totalLeads}</p>
          </div>
        </div>

        {/* KPI 2 */}
        <div className="p-4 rounded-xl border admin-card admin-glass shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-600 dark:bg-yellow-400/10 dark:text-yellow-400 flex items-center justify-center shrink-0">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-xs admin-text-muted font-bold uppercase tracking-wider">Today's Leads</p>
            <p className="text-xl font-bold admin-text">{stats.todayLeads}</p>
          </div>
        </div>

        {/* KPI 3 */}
        <div className="p-4 rounded-xl border admin-card admin-glass shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-xs admin-text-muted font-bold uppercase tracking-wider">Admissions Done</p>
            <p className="text-xl font-bold admin-text">{conversion.admissionConfirmed}</p>
          </div>
        </div>

        {/* KPI 4 */}
        <div className="p-4 rounded-xl border admin-card admin-glass shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Percent size={20} />
          </div>
          <div>
            <p className="text-xs admin-text-muted font-bold uppercase tracking-wider">Conversion Ratio</p>
            <p className="text-xl font-bold admin-text">{conversion.rate}%</p>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Course Inquiries */}
        <div className="p-5 rounded-2xl border admin-card admin-glass shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider admin-text-muted mb-4 flex items-center gap-1.5">
            <GraduationCap size={16} />
            <span>Course-wise Registration Distribution</span>
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={courseDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="value" fill="#072B63" radius={[8, 8, 0, 0]}>
                  {courseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Monthly trend */}
        <div className="p-5 rounded-2xl border admin-card admin-glass shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider admin-text-muted mb-4 flex items-center gap-1.5">
            <TrendingUp size={16} />
            <span>Monthly Growth Inquiries Trend</span>
          </h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyLeads}>
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" opacity={0.15} />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                />
                <Line type="monotone" dataKey="count" stroke="#F5B21A" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Pipeline Status Pie Chart */}
        <div className="p-5 rounded-2xl border admin-card admin-glass shadow-sm flex flex-col justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider admin-text-muted mb-4">
            Counseling Status Distributions
          </h3>
          <div className="h-64 relative flex items-center justify-center">
            {statusDistribution.length === 0 ? (
              <p className="text-xs admin-text-muted">No data available</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px'
                    }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconSize={10} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 4: Funnel Analysis */}
        <div className="p-5 rounded-2xl border admin-card admin-glass shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider admin-text-muted mb-4">
            Conversion Funnel Analysis
          </h3>
          <div className="h-64 flex flex-col justify-center space-y-6">
            {/* Lead stage */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-1.5">
                <span className="admin-text">Total Inquiry Pipeline</span>
                <span className="admin-text-muted">{conversion.totalLeads} Student(s)</span>
              </div>
              <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative">
                <div 
                  className="h-full bg-brandNavy dark:bg-yellow-500/20 text-white flex items-center px-3 font-semibold text-xs transition-all duration-1000"
                  style={{ width: '100%' }}
                >
                  Top Funnel (100%)
                </div>
              </div>
            </div>

            {/* Admission stage */}
            <div>
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider mb-1.5">
                <span className="text-emerald-600 dark:text-emerald-400">Admission Confirmed</span>
                <span className="admin-text-muted">{conversion.admissionConfirmed} Student(s)</span>
              </div>
              <div className="w-full h-8 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden relative">
                <div 
                  className="h-full bg-emerald-600 text-white flex items-center px-3 font-semibold text-xs transition-all duration-1000"
                  style={{ width: `${conversion.rate}%` }}
                >
                  {conversion.rate > 0 ? `Converted (${conversion.rate}%)` : 'No Conversions yet'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
