import { motion } from 'framer-motion';
import { 
  Wallet, 
  TrendingUp, 
  Download, 
  CheckCircle2, 
  Clock, 
  DollarSign,
  ChevronRight,
  Filter,
  Search
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { fetchPayroll, processPayroll, fetchPayrollStats } from '../api/api';
import { exportToCSV } from '../utils/export';
import { useAuth } from '../context/AuthContext';
import './Payroll.css';

const StatCard = ({ icon, label, value, color }: any) => (
  <motion.div 
    whileHover={{ scale: 1.02 }}
    className="glass-card payroll-stat-card"
    style={{ '--accent-color': color } as any}
  >
    <div className="p-stat-icon">{icon}</div>
    <div className="p-stat-info">
      <span className="p-stat-label">{label}</span>
      <h3 className="p-stat-value">{value}</h3>
    </div>
  </motion.div>
);

const Payroll = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';
  const isManager = user?.role === 'MANAGER';
  const isManagement = isAdmin || isManager;

  const [payroll, setPayroll] = useState<any[]>([]);
  const [stats, setStats] = useState<any>({ totalPayout: 0, totalHours: 0, overtimeHours: 0 });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [payrollData, statsData] = await Promise.all([
          fetchPayroll(),
          isManagement ? fetchPayrollStats() : Promise.resolve(null)
        ]);
        
        if (isManagement) {
          setPayroll(payrollData);
          if (statsData) setStats(statsData);
        } else {
          setPayroll(payrollData.filter((p: any) => p.employeeId === user?.employeeId));
        }
      } catch (error) {
        console.error('Payroll Sync Error:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [isManagement, user]);

  const totalPayout = isManagement ? stats.totalPayout : payroll.reduce((acc, curr) => acc + curr.earnings, 0);
  const totalHours = isManagement ? stats.totalHours : payroll.reduce((acc, curr) => acc + curr.totalHours, 0);
  const overtimeCount = isManagement ? stats.overtimeHours : payroll.filter(p => p.overtimeHours > 0).length;

  const filteredPayroll = payroll.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    exportToCSV(payroll, 'Payroll_Report');
  };

  const handleProcessPayments = async () => {
    if (!window.confirm('Process all pending payments?')) return;
    try {
      await processPayroll();
      alert('Payments processed successfully!');
      setPayroll(payroll.map(p => ({ ...p, status: 'PAID' })));
    } catch (err) {
      alert('Failed to process payments');
    }
  };

  if (loading) return <div className="loading-state">Calculating payroll intelligence...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="payroll-container"
    >
      <header className="page-header-premium">
        <div className="header-text">
          <h1>Payroll & Compensation</h1>
          <p>Automated salary processing based on geofenced attendance logs.</p>
        </div>
        <div className="header-actions">
          {isManagement && (
            <>
              <button className="btn btn-ghost" onClick={handleExport}><Download size={18} /> Export Batch</button>
              <button className="btn btn-primary" onClick={handleProcessPayments}>Process All Payments</button>
            </>
          )}
        </div>
      </header>

      <section className="payroll-stats-grid">
        <StatCard 
          icon={<DollarSign size={20} />} 
          label="Total Pending Payout" 
          value={`$${totalPayout.toLocaleString()}`} 
          color="var(--primary)" 
        />
        <StatCard 
          icon={<Clock size={20} />} 
          label="Total Billable Hours" 
          value={`${totalHours.toFixed(1)}h`} 
          color="var(--accent)" 
        />
        <StatCard 
          icon={<TrendingUp size={20} />} 
          label="Overtime Sessions" 
          value={overtimeCount} 
          color="var(--primary)" 
        />
      </section>

      <div className="glass-card payroll-table-section">
        <div className="table-header-controls">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Filter by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="filter-btn"><Filter size={18} /> Filter Period</button>
        </div>

        <div className="enterprise-table-wrapper">
          <table className="enterprise-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Total Hours</th>
                <th>Overtime</th>
                <th>Base Salary</th>
                <th>Gross Earnings</th>
                <th>Status</th>
                {isManagement && <th></th>}
              </tr>
            </thead>
            <tbody>
              {filteredPayroll.map((item) => (
                <tr key={item.id}>
                  <td>
                    <div className="emp-brief">
                      <div className="emp-initials">{item.name.charAt(0)}</div>
                      <div className="v-stack">
                        <span className="name">{item.name}</span>
                        <span className="id">{item.employeeId}</span>
                      </div>
                    </div>
                  </td>
                  <td><span className="mono">{item.totalHours}h</span></td>
                  <td>
                    <span className={`ot-badge ${item.overtimeHours > 0 ? 'active' : ''}`}>
                      {item.overtimeHours}h
                    </span>
                  </td>
                  <td>${(item.totalHours - item.overtimeHours) * 25}</td>
                  <td>
                    <span className="gross-value">${item.earnings.toLocaleString()}</span>
                  </td>
                  <td>
                    <span className="status-pill pending">
                      <Clock size={12} /> {item.status}
                    </span>
                  </td>
                  {isManagement && (
                    <td>
                      <button className="icon-btn-small"><ChevronRight size={18} /></button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default Payroll;
