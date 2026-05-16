import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  User, 
  Search, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  Upload,
  UserCheck,
  AlertCircle,
  Shield,
  X
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, fetchAllLogs, submitManagerLog, fetchTodayLogs, clockIn, clockOut } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './ManagerAttendance.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const ManagerAttendance: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Personal Status State
  const [myTodayLogs, setMyTodayLogs] = useState<any[]>([]);
  const isMyClockedIn = myTodayLogs.length > 0 && !myTodayLogs[0].clockOut;
  const [personalStats, setPersonalStats] = useState({
    totalHours: 0,
    todayHours: '0h 0m',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [empList, attList] = await Promise.all([
        fetchEmployees(),
        fetchAllLogs()
      ]);
      
      // Filter for employees in manager's site (if manager)
      const siteId = user?.siteId;
      const filteredEmps = Array.isArray(empList) 
        ? empList.filter(e => e.role !== 'ADMIN' && (!siteId || e.siteId === siteId))
        : [];
        
      setEmployees(filteredEmps);
      setAttendance(Array.isArray(attList) ? attList : []);

      // Load personal data
      if (user) {
        const myLogs = await fetchTodayLogs(user.id);
        setMyTodayLogs(myLogs);
        
        // Calculate basic stats for the personal card
        const personalAll = Array.isArray(attList) ? attList.filter(l => l.employeeId === user.id) : [];
        let totalMins = 0;
        personalAll.forEach(log => {
          if (log.clockIn && log.clockOut) {
            const start = new Date(log.clockIn).getTime();
            const end = new Date(log.clockOut).getTime();
            totalMins += (end - start) / (1000 * 60);
          }
        });
        
        setPersonalStats({
          totalHours: totalMins / 60,
          todayHours: myLogs.length > 0 ? `${Math.floor(totalMins / 60)}h ${Math.round(totalMins % 60)}m` : '0h 0m'
        });
      }
    } catch (err) {
      console.error('Failed to load data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMyClockAction = async () => {
    if (!user) return;
    try {
      setSubmitting(true);
      
      // Managers get direct clock-in (no AI verification required as per user's earlier requirement for direct override)
      if (isMyClockedIn) {
        // Clock Out
        navigator.geolocation.getCurrentPosition(async (pos) => {
          await clockOut(user.id, pos.coords.latitude, pos.coords.longitude);
          await loadData();
        });
      } else {
        // Clock In
        navigator.geolocation.getCurrentPosition(async (pos) => {
          await clockIn(user.id, pos.coords.latitude, pos.coords.longitude);
          await loadData();
        });
      }
    } catch (err) {
      console.error('Personal clock action failed', err);
    } finally {
      setSubmitting(false);
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const s = searchTerm.toLowerCase();
    return `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(s) || 
           emp.employeeId?.toLowerCase().includes(s);
  });

  const getActiveSession = (empId: string) => {
    return attendance.find(a => a.employeeId === empId && !a.clockOut);
  };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (type: 'CLOCK_IN' | 'CLOCK_OUT') => {
    if (!selectedEmployee) return;
    
    try {
      setSubmitting(true);
      
      // Get location if possible
      let latitude = null, longitude = null;
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
      } catch (e) {
        console.warn('Location access denied');
      }

      const formData = new FormData();
      formData.append('employeeId', selectedEmployee.id);
      formData.append('type', type);
      if (latitude) formData.append('latitude', latitude.toString());
      if (longitude) formData.append('longitude', longitude.toString());
      if (photo) formData.append('biometricProof', photo);

      await submitManagerLog(formData);
      
      // Reset state and reload
      setPhoto(null);
      setPhotoPreview(null);
      setSelectedEmployee(null);
      await loadData();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to submit log');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="manager-att-loader">Initializing Biometric Node...</div>;



  return (
    <div className="enterprise-page manager-att-page">
      <header className="main-header-row">
        <div className="title-section">
          <button className="btn-back" onClick={() => navigate('/attendance')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1>Site Attendance</h1>
            <p>Proxy logging & workforce control</p>
          </div>
        </div>

        <div className="filter-controls">
          <div className="search-hub-premium">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Search personnel..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="matrix-search-input"
            />
          </div>

          <div className="filter-hub-premium">
            <User size={18} />
            <div className="site-select-premium-static">
              {user?.site?.name || 'All Sites'} ({filteredEmployees.length})
            </div>
          </div>

          <div className="date-picker-button daily-filter">
            <Clock size={16} />
            <span>{new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
          </div>
        </div>
      </header>

      <div className="manager-att-grid">
        <div className="emp-selection-card glass-card">
          <div className="emp-list">
            {filteredEmployees.map(emp => {
              const active = getActiveSession(emp.id);
              return (
                <div 
                  key={emp.id} 
                  className={`emp-item ${selectedEmployee?.id === emp.id ? 'selected' : ''}`}
                  onClick={() => setSelectedEmployee(emp)}
                >
                  <div className="emp-avatar">
                    {emp.avatar ? <img src={emp.avatar} alt="" /> : <User size={20} />}
                  </div>
                  <div className="emp-info">
                    <span className="name">{emp.firstName} {emp.lastName}</span>
                    <span className="id">{emp.employeeId || 'No ID'}</span>
                  </div>
                  <div className={`status-dot ${active ? 'online' : 'offline'}`} title={active ? 'Currently On-Site' : 'Off-Site'}></div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="action-control-card glass-card">
          <AnimatePresence mode="wait">
            {selectedEmployee ? (
              <motion.div 
                key={selectedEmployee.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="control-surface"
              >
                <div className="selected-header">
                  <UserCheck size={24} color="var(--primary)" />
                  <h3>Log Attendance for {selectedEmployee.firstName}</h3>
                </div>

                <div className="photo-capture-section">
                  <div className="photo-preview-box">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" />
                    ) : (
                      <div className="empty-photo">
                        <Camera size={40} />
                        <span>Visual Verification Required</span>
                      </div>
                    )}
                  </div>
                  <button className="btn-capture" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={18} /> {photo ? 'Replace Image' : 'Capture / Upload Photo'}
                  </button>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{ display: 'none' }} 
                    accept="image/*" 
                    capture="environment"
                    onChange={handlePhotoCapture} 
                  />
                </div>

                <div className="control-actions">
                  {!getActiveSession(selectedEmployee.id) ? (
                    <button 
                      className="btn-log-action check-in" 
                      disabled={submitting || !photo}
                      onClick={() => handleSubmit('CLOCK_IN')}
                    >
                      <CheckCircle size={20} />
                      <span>{submitting ? 'Processing...' : 'Record Check-In'}</span>
                    </button>
                  ) : (
                    <button 
                      className="btn-log-action check-out" 
                      disabled={submitting}
                      onClick={() => handleSubmit('CLOCK_OUT')}
                    >
                      <Clock size={20} />
                      <span>{submitting ? 'Processing...' : 'Record Check-Out'}</span>
                    </button>
                  )}
                </div>

                {!photo && !getActiveSession(selectedEmployee.id) && (
                  <p className="warning-text">
                    <AlertCircle size={14} />
                    Photo verification is mandatory for new check-ins.
                  </p>
                )}
              </motion.div>
            ) : (
              <div className="empty-control">
                <div className="pulse-icon">
                  <User size={48} />
                </div>
                <h3>Select Personnel</h3>
                <p>Choose an employee from the list to begin proxy attendance logging.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        <div className="personal-status-card glass-card">
          <div className="profile-card-mini">
            <div className="avatar-wrapper">
              <img 
                src={user?.avatar ? (user.avatar.startsWith('http') ? user.avatar : `${API_URL}${user.avatar}`) : "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"} 
                alt="Profile" 
                className="large-avatar" 
              />
              <span className="status-badge">{user?.role || 'Staff'}</span>
            </div>
            <h3>{user?.firstName} {user?.lastName}</h3>
            <p className="role-text">{user?.jobTitle || 'System Administrator'}</p>
            {user?.isBiometricEnrolled && (
              <div className="biometric-verified-badge">
                <Shield size={14} className="verified-icon" />
                <span>BIOMETRIC SECURED</span>
              </div>
            )}
          </div>

          <div className="personal-actions-sidebar">
            <div className={`status-indicator ${isMyClockedIn ? 'active' : 'inactive'}`}>
              {isMyClockedIn && <div className="pulse-dot"></div>}
              <span>{isMyClockedIn ? 'ON DUTY' : 'OFF DUTY'}</span>
            </div>
            
            <button 
              className={`btn-my-clock ${isMyClockedIn ? 'out' : 'in'}`}
              onClick={handleMyClockAction}
              disabled={submitting}
            >
              {isMyClockedIn ? <X size={18} /> : <Clock size={18} />}
              <span>{isMyClockedIn ? 'Clock Out Now' : 'Clock In Now'}</span>
            </button>
          </div>

          <div className="hours-summary-mini">
             <div className="hour-item">
               <Clock size={16} />
               <div className="v-stack">
                 <span className="val">{personalStats.totalHours.toFixed(2)}</span>
                 <span className="lab">Total hours</span>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerAttendance;
