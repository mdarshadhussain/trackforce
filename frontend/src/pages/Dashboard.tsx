import { motion } from 'framer-motion';
import { 
  Users, 
  MapPin, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  Activity
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import './Dashboard.css';

const data = [
  { name: 'Mon', attendance: 400, expected: 450 },
  { name: 'Tue', attendance: 420, expected: 450 },
  { name: 'Wed', attendance: 380, expected: 450 },
  { name: 'Thu', attendance: 440, expected: 450 },
  { name: 'Fri', attendance: 430, expected: 450 },
  { name: 'Sat', attendance: 120, expected: 150 },
  { name: 'Sun', attendance: 80, expected: 100 },
];

import { useEffect, useState } from 'react';
import { fetchStats } from '../api/api';

const StatCard = ({ icon, label, value, trend, color }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="glass-card stat-card-premium"
    style={{ '--accent-color': color } as any}
  >
    <div className="stat-card-glow"></div>
    <div className="stat-icon-wrapper">
      {icon}
    </div>
    <div className="stat-info">
      <span className="stat-label">{label}</span>
      <h2 className="stat-value">{value}</h2>
      {trend && (
        <span className={`stat-trend ${trend > 0 ? 'up' : 'down'}`}>
          {trend > 0 ? <TrendingUp size={14} /> : <TrendingUp size={14} style={{ transform: 'rotate(90deg)' }} />}
          {trend}% vs last month
        </span>
      )}
    </div>
  </motion.div>
);

import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    fetchStats().then(setStats).catch(console.error);
  }, []);

  const isAdmin = user?.role === 'ADMIN';
  const isManager = user?.role === 'MANAGER';
  const isManagement = isAdmin || isManager;

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header-premium">
        <div className="header-text">
          <h1>
            {isAdmin ? 'Workforce Intelligence' : isManager ? 'Hub Operations' : 'My Performance'}
          </h1>
          <p>
            {isAdmin 
              ? 'Real-time insights and performance metrics across all hubs.' 
              : isManager 
                ? 'Managing site efficiency and workforce attendance.' 
                : 'Track your daily progress and shift efficiency.'}
          </p>
        </div>
        <div className="header-actions">
          {isManagement && <button className="btn btn-ghost">Download Report</button>}
          <button className="btn btn-primary">{isManagement ? 'Configuration' : 'Request Shift'}</button>
        </div>
      </header>

      <section className="stats-grid-premium">
        <StatCard 
          icon={<Users size={24} />} 
          label={isAdmin ? "Total Workforce" : isManager ? "Site Workforce" : "My Weekly Hours"} 
          value={isAdmin ? (stats?.totalEmployees || 0) : isManager ? (stats?.totalEmployees || 0) : "38.5h"} 
          trend={12.5} 
          color="var(--accent)" 
        />
        <StatCard 
          icon={<Activity size={24} />} 
          label={isManagement ? "Current Attendance" : "My Efficiency"} 
          value={isManagement ? `${stats?.activeNow || 0}%` : "94%"} 
          trend={3.2} 
          color="var(--primary)" 
        />
        <StatCard 
          icon={<MapPin size={24} />} 
          label={isAdmin ? "Operational Sites" : isManager ? "Current Hub" : "Active Site"} 
          value={isAdmin ? (stats?.sites || 0) : "North Hub"} 
          color="var(--accent)" 
        />
        <StatCard 
          icon={<Clock size={24} />} 
          label={isManagement ? "Avg. Shift Duration" : "Total Earnings"} 
          value={isManagement ? "8.4h" : "$1,240"} 
          trend={-1.2} 
          color="var(--primary)" 
        />
      </section>



      {isManagement && (
        <div className="main-content-grid">
          <div className="glass-card main-chart">
            <div className="card-header">
              <h3>Attendance Efficiency</h3>
              <div className="chart-legend">
                <span className="dot"></span> Target (90%)
              </div>
            </div>
            <div className="chart-h-400">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--text-dim)" axisLine={false} tickLine={false} dy={10} />
                  <YAxis stroke="var(--text-dim)" axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', boxShadow: 'var(--shadow)' }}
                    itemStyle={{ color: 'var(--text-main)' }}
                  />
                  <Area type="monotone" dataKey="attendance" stroke="var(--primary)" fill="url(#chartGradient)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="glass-card side-list">
            <div className="card-header">
              <h3>Hub Performance</h3>
            </div>
            <div className="performance-list">
              {['North Hub', 'South Terminal', 'East Wing'].map((hub, idx) => (
                <div key={idx} className="performance-item">
                  <div className="hub-info">
                    <span className="hub-name">{hub}</span>
                    <div className="progress-bar-premium">
                      <div className="progress-fill-premium" style={{ width: `${90 - idx * 10}%` }}></div>
                    </div>
                  </div>
                  <span className="hub-value">{90 - idx * 10}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};



const User = ({ size }: { size: number }) => (
  <div style={{ backgroundColor: '#1e293b', padding: '8px', borderRadius: '50%', color: '#57f1db' }}>
    <Clock size={size} />
  </div>
);

export default Dashboard;
