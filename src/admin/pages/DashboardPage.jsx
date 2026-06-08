import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  BookOpen, 
  GraduationCap, 
  Plus, 
  MessageSquare,
  TrendingUp,
  UserCheck,
  ChevronRight,
  Phone
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import api from '../hooks/useApi';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import LoadingSkeleton from '../components/LoadingSkeleton';

const COLORS = ['#072B63', '#F5B21A', '#10B981', '#8B5CF6', '#EC4899', '#F97316', '#EF4444'];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentLeads, setRecentLeads] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch stats
        const statsRes = await api.get('/analytics/dashboard');
        setStats(statsRes.data);

        // Fetch recent leads (limit to 5)
        const leadsRes = await api.get('/leads?limit=5');
        setRecentLeads(leadsRes.data.leads);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading || !stats) {
    return <LoadingSkeleton type="card" count={3} />;
  }

  const { stats: countStats, monthlyLeads, courseDistribution, conversion } = stats;

  const handleCall = (e, phone) => {
    e.stopPropagation();
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (e, phone, name) => {
    e.stopPropagation();
    const message = encodeURIComponent(`Hello ${name}, this is Career Compass Consultancy. How can we help you?`);
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold admin-text">Dashboard Overview</h1>
          <p className="text-xs admin-text-muted">Real-time statistics and lead tracking for Career Compass Consultancy.</p>
        </div>
        <button
          onClick={() => navigate('/admin/leads?add=true')}
          className="flex items-center gap-2 bg-brandNavy text-white dark:bg-yellow-400 dark:text-brandNavy px-4 py-2 rounded-xl text-sm font-semibold hover:shadow-lg transition-all duration-200"
        >
          <Plus size={16} />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Stats Cards Grid (6 cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          icon={Users}
          label="Total Leads"
          value={countStats.totalLeads}
          gradient="stat-gradient-1"
          delay={0}
        />
        <StatCard
          icon={Calendar}
          label="Today's Leads"
          value={countStats.todayLeads}
          gradient="stat-gradient-2"
          delay={0.05}
        />
        <StatCard
          icon={BookOpen}
          label="B.Ed Leads"
          value={countStats.bedLeads}
          gradient="stat-gradient-3"
          delay={0.1}
        />
        <StatCard
          icon={GraduationCap}
          label="D.El.Ed Leads"
          value={countStats.deledLeads}
          gradient="stat-gradient-4"
          delay={0.15}
        />
        <StatCard
          icon={TrendingUp}
          label="B.P.Ed Leads"
          value={countStats.bpedLeads}
          gradient="stat-gradient-5"
          delay={0.2}
        />
        <StatCard
          icon={UserCheck}
          label="B.P.E.S Leads"
          value={countStats.bpesLeads}
          gradient="stat-gradient-6"
          delay={0.25}
        />
      </div>

      {/* Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Trend Area Chart */}
        <div className="lg:col-span-2 rounded-2xl border admin-card p-5 admin-glass shadow-sm">
          <h3 className="text-sm font-bold uppercase tracking-wider admin-text-muted mb-4">Leads Registration Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyLeads}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#072B63" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#072B63" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '13px'
                  }}
                />
                <Area type="monotone" dataKey="count" stroke="#072B63" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCount)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course distribution Donut chart */}
        <div className="rounded-2xl border admin-card p-5 admin-glass shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider admin-text-muted mb-4">Course Breakdown</h3>
          </div>
          <div className="h-56 relative flex items-center justify-center">
            {courseDistribution.length === 0 ? (
              <p className="text-xs admin-text-muted">No data available.</p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={courseDistribution}
                    innerRadius={55}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {courseDistribution.map((entry, index) => (
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
                </PieChart>
              </ResponsiveContainer>
            )}
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-2xl font-bold admin-text">{countStats.totalLeads}</span>
              <span className="text-[10px] admin-text-muted uppercase tracking-wider">Total</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-semibold admin-text-muted">
            {courseDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-1.5 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="truncate">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lower Row: Recent Leads & Conversion Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads Table / Cards */}
        <div className="lg:col-span-2 rounded-2xl border admin-card p-5 admin-glass shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider admin-text-muted">Recent Registrations</h3>
            <button
              onClick={() => navigate('/admin/leads')}
              className="text-xs font-bold text-brandNavy dark:text-yellow-400 flex items-center gap-0.5 hover:underline"
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>
          
          <div className="divide-y admin-border overflow-hidden">
            {recentLeads.length === 0 ? (
              <p className="py-8 text-center text-sm admin-text-muted">No recent registrations.</p>
            ) : (
              recentLeads.map((lead) => (
                <div 
                  key={lead._id}
                  onClick={() => navigate(`/admin/leads/${lead._id}`)}
                  className="py-3.5 flex items-center justify-between cursor-pointer hover:bg-black/5 dark:hover:bg-white/5 px-2 rounded-xl transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-brandNavy/5 text-brandNavy dark:bg-yellow-400/5 dark:text-yellow-400 flex items-center justify-center font-bold text-sm shrink-0">
                      {lead.name[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="text-sm font-semibold admin-text">{lead.name}</p>
                      <p className="text-xs admin-text-muted flex items-center gap-2">
                        <span>{lead.course}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-400" />
                        <span className="font-mono">{lead.phone}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <StatusBadge status={lead.status} />
                    <div className="hidden sm:flex gap-1">
                      <button
                        onClick={(e) => handleCall(e, lead.phone)}
                        className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 dark:text-emerald-400 dark:hover:bg-emerald-950/20 transition-colors"
                      >
                        <Phone size={14} />
                      </button>
                      <button
                        onClick={(e) => handleWhatsApp(e, lead.phone, lead.name)}
                        className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-950/20 transition-colors"
                      >
                        <MessageSquare size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Admission Funnel Conversion Card */}
        <div className="rounded-2xl border admin-card p-5 admin-glass shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider admin-text-muted mb-4">Admissions Conversion</h3>
            <p className="text-xs admin-text-muted mb-6">Percentage of successful admissions out of all registered leads.</p>
          </div>

          <div className="flex flex-col items-center justify-center my-6">
            <div className="w-28 h-28 rounded-full border-8 border-brandNavy/10 dark:border-yellow-400/10 flex flex-col items-center justify-center relative">
              <span className="text-2xl font-black text-brandNavy dark:text-yellow-400">{conversion.rate}%</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Rate</span>
              {/* Decorative indicator dots */}
              <span className="absolute top-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white dark:border-slate-900" style={{ transform: 'translateY(-50%)' }} />
            </div>
          </div>

          <div className="space-y-3 mt-4 text-xs">
            <div className="flex justify-between border-b admin-border pb-2">
              <span className="admin-text-muted">Total Leads Registered</span>
              <span className="font-bold admin-text">{conversion.totalLeads}</span>
            </div>
            <div className="flex justify-between border-b admin-border pb-2">
              <span className="admin-text-muted">Admissions Confirmed</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{conversion.admissionConfirmed}</span>
            </div>
            <div className="flex justify-between">
              <span className="admin-text-muted">Pipeline Efficiency</span>
              <span className="font-semibold text-brandNavy dark:text-yellow-400">High Performance</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
