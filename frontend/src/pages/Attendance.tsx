import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  X, 
  Edit2, 
  FileText, 
  Calendar, 
  ChevronLeft, 
  Clock,
  Coffee,
  Scan,
  CheckCircle2,
  Camera,
  MapPin,
  Shield
} from 'lucide-react';
import { useEffect } from 'react';
import { fetchEmployees, fetchStats, clockIn, fetchTodayLogs } from '../api/api';
import { useRole } from '../context/RoleContext';

import './Attendance.css';


const Attendance = () => {
  const { role } = useRole();
  const [isScanning, setIsScanning] = useState(false);

  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');

  const adminLogs = [
    { date: '1st Jun 2022', checkin: '09:00 AM', checkout: '09:00 PM', break: '1:00 hrs', work: '8.00 hrs', overtime: '4.00 hrs', status: 'approved' },
    { date: '2nd Jun 2022', checkin: '08:01 AM', checkout: '07:02 PM', break: '1:00 hrs', work: '8.00 hrs', overtime: '3.00 hrs', status: 'pending' },
    { date: '3rd Jun 2022', checkin: '08:00 AM', checkout: '04:00 PM', break: '1:00 hrs', work: '8.00 hrs', overtime: 'N/A', status: 'approved' },
  ];

  const [logs, setLogs] = useState<any[]>([]);
  const MOCK_EMP_ID = "emp_123"; // This will come from Auth later

  useEffect(() => {
    fetchTodayLogs(MOCK_EMP_ID).then(setLogs).catch(console.error);
  }, []);

  const handleClockAction = async () => {
    setIsScanning(true);
    setScanStatus('scanning');
    
    try {
      await clockIn(MOCK_EMP_ID);
      setScanStatus('success');
      // Refresh logs after clock in
      const updatedLogs = await fetchTodayLogs(MOCK_EMP_ID);
      setLogs(updatedLogs);
    } catch (err) {
      console.error(err);
      setScanStatus('idle');
    }

    setTimeout(() => {
      setIsScanning(false);
      setScanStatus('idle');
    }, 2000);
  };


  if (role === 'user') {
    return (
      <div className="enterprise-page user-view">
        
        <div className="user-attendance-grid">
          {/* Biometric Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card scanner-card"
          >
            <div className="scanner-header">
              <h3>Secure Verification</h3>
              <p>Position your face within the frame to clock in.</p>
            </div>

            <div className="biometric-viewport">
              <div className={`scan-ring ${scanStatus}`}></div>
              <div className="camera-sim">
                <AnimatePresence mode="wait">
                  {scanStatus === 'scanning' ? (
                    <motion.div key="scan" className="overlay"><Scan size={48} className="pulse" /></motion.div>
                  ) : scanStatus === 'success' ? (
                    <motion.div key="success" className="overlay success"><CheckCircle2 size={64} /></motion.div>
                  ) : (
                    <motion.div key="idle" className="overlay"><Camera size={48} /></motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="verification-info">
              <div className="v-item"><MapPin size={14} /> North Hub - Building A</div>
              <div className="v-item"><Shield size={14} /> Biometric Secure</div>
            </div>

            <button 
              className={`btn btn-primary btn-block btn-lg ${isScanning ? 'loading' : ''}`}
              onClick={handleClockAction}
              disabled={isScanning}
            >
              {isScanning ? 'Verifying...' : 'Clock In Now'}
            </button>
          </motion.div>

          {/* Personal Stats & Timeline */}
          <div className="user-stats-container">
            <div className="stats-row">
              <div className="glass-card s-card">
                <span className="label">Today's Hours</span>
                <h2 className="value">06:42:15</h2>
              </div>
              <div className="glass-card s-card">
                <span className="label">Weekly Progress</span>
                <h2 className="value">32.5h / 40h</h2>
              </div>
            </div>

            <div className="glass-card personal-timeline">
              <div className="card-header">
                <h3>My Attendance History</h3>
                <button className="btn-ghost btn-sm">Request Correction</button>
              </div>
              <div className="mini-table">
                {logs.length > 0 ? logs.map((log, i) => (
                  <div key={i} className="mini-row">
                    <span className="m-date">{new Date(log.date).toLocaleDateString()}</span>
                    <span className="m-time">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {log.clockOut ? new Date(log.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active'}
                    </span>
                    <span className={`m-status ${log.clockOut ? 'approved' : 'pending'}`}>
                      {log.clockOut ? 'Completed' : 'On Site'}
                    </span>
                  </div>
                )) : (
                  <div className="no-logs">No attendance logs for today.</div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin View (Existing code with role switcher)
  return (
    <div className="enterprise-page">
      <div className="role-badge-float" onClick={() => setRole('user')}>
        Viewing as Admin (Switch to User)
      </div>
      <div className="attendance-layout">
        {/* Left Profile Sidebar */}
        <aside className="profile-sidebar glass-card">
          <div className="profile-card-mini">
            <div className="avatar-wrapper">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Ralph" alt="Profile" className="large-avatar" />
              <span className="status-badge">Hourly</span>
            </div>
            <h3>Ralph Edwards</h3>
            <p className="role-text">Product Designer</p>
          </div>

          <div className="hours-summary">
            <div className="total-hours-main">
              <Clock size={18} />
              <div className="v-stack">
                <span className="value">264.00</span>
                <span className="label">Total hours</span>
              </div>
            </div>
            <div className="hours-grid">
              <div className="h-item"><span>172 hrs</span><small>Regular</small></div>
              <div className="h-item"><span>24 hrs</span><small>Overtime</small></div>
              <div className="h-item"><span>00.00 hrs</span><small>PTO</small></div>
              <div className="h-item"><span>20 hrs</span><small>Holiday</small></div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="attendance-main">
          <header className="main-header-row">
            <div className="title-section">
              <button className="btn-back"><ChevronLeft size={20} /></button>
              <h1>Workforce Attendance</h1>
            </div>
            <div className="date-picker-button">
              <Calendar size={16} />
              <span>1st Jun - 31st Jul 2022</span>
            </div>
          </header>

          <section className="breakdown-banner glass-card">
            <div className="breakdown-info">
              <div className="b-text">
                <span className="label">Global Efficiency</span>
                <h2 className="value">94.2%</h2>
              </div>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div className="breakdown-stats">
              <div className="s-item"><span className="dot approved"></span> Approved: 92 hrs</div>
              <div className="s-item"><span className="dot rejected"></span> Rejected: 0 hrs</div>
              <div className="s-item"><span className="dot pending"></span> Pending: 0 hrs</div>
            </div>
          </section>

          <div className="action-bar">
            <div className="toggle-group">
              <button className="toggle-btn active"><FileText size={14} /> Timecard</button>
              <button className="toggle-btn"><Clock size={14} /> Timeline</button>
            </div>
            <div className="btn-row">
              <button className="btn-outline">Export Report</button>
              <button className="btn btn-primary">Approve All Pending</button>
            </div>
          </div>

          <div className="table-container glass-card">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Checkin</th>
                  <th>Checkout</th>
                  <th>Break</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {adminLogs.map((log, idx) => (
                  <tr key={idx}>
                    <td className="emp-cell">
                      <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`} alt="" className="tiny-avatar" />
                      <span>Employee #{idx + 101}</span>
                    </td>
                    <td>{log.date}</td>
                    <td>{log.checkin}</td>
                    <td>{log.checkout}</td>
                    <td>{log.break}</td>
                    <td><span className={`badge badge-${log.status}`}>{log.status}</span></td>
                    <td>
                      <div className="approval-actions">
                        <button className="status-btn approve"><Check size={14} /></button>
                        <button className="status-btn reject"><X size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Attendance;
