import { 
  Shield, 
  Lock, 
  User, 
  RefreshCw,
  Globe,
  Moon,
  Sun,
  Sparkles,
  CreditCard,
  Smartphone,
  Calendar,
  Landmark,
  Eye,
  EyeOff,
  Briefcase,
  Fingerprint,
  DollarSign,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { 
  updateEmployee, 
  fetchEmployeeFullProfile
} from '../api/api';
import Toast from '../components/Toast';
import type { ToastType } from '../components/Toast';
import './Profile.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const { i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();

  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<any[]>([]);
  const [fullProfile, setFullProfile] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const isAdmin = user?.role === 'ADMIN';


  const addToast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    loadProfileData();
  }, [user?.id]);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      if (user?.id) {
        const data = await fetchEmployeeFullProfile(user.id);
        setFullProfile(data);
      }
    } catch (err) {
      console.error('Failed to load profile', err);
      addToast('Failed to load profile data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      addToast('Password must be at least 6 characters long.', 'error');
      return;
    }
    try {
      await updateEmployee(user.id, { password: newPassword });
      addToast('Password updated successfully', 'success');
      setIsEditingPassword(false);
      setNewPassword('');
      loadProfileData();
    } catch (error) {
      addToast('Failed to update password', 'error');
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      try {
        const formData = new FormData();
        formData.append('avatar', file);
        formData.append('employeeId', user.employeeId);
        formData.append('fullName', `${user.firstName} ${user.lastName}`);
        
        const updated = await updateEmployee(user.id, formData);
        updateUser(updated);
        addToast('Profile Picture Updated Successfully!', 'success');
      } catch (err) {
        addToast('Failed to update profile avatar', 'error');
      }
    }
  };

  if (loading) return (
    <div className="profile-page loading-state">
      <RefreshCw className="animate-spin" size={40} />
    </div>
  );

  return (
    <div className="profile-page">
      <div className="premium-toast-container">
        <AnimatePresence>
          {toasts.map((t) => (
            <Toast key={t.id} {...t} onClose={removeToast} />
          ))}
        </AnimatePresence>
      </div>

      {/* TOP HEADER HERO SECTION: Clean Dashboard Header Banner */}
      {!isAdmin && (
        <div className="profile-hero-section">
          <div className="hero-background-mesh"></div>
          <div className="hero-content">
            
            {/* Left: Identity Details */}
            <div className="hero-identity-text">
              <div className="badge-row" style={{ marginBottom: '8px' }}>
                <span className="badge-premium role">{fullProfile?.employee?.role || user?.role}</span>
                <span className="badge-premium id">ID: #{fullProfile?.employee?.employeeId || user?.employeeId}</span>
              </div>
              <h1 style={{ margin: 0 }}>{fullProfile?.employee?.firstName || user?.firstName} {fullProfile?.employee?.lastName || user?.lastName}</h1>
            </div>

            {/* Middle: Work Metrics Indicators */}
            <div className="hero-quick-indicators">
              <div className="hero-indicator-card">
                <label>Assigned Work Site</label>
                <span>{fullProfile?.employee?.site?.name || 'Mobile Force'}</span>
              </div>
              <div className="hero-indicator-card">
                <label>Biometric Enrollment</label>
                <span className={`status-indicator-badge ${(fullProfile?.employee?.isBiometricEnrolled ?? user?.isBiometricEnrolled) ? 'verified' : 'pending'}`}>
                  {(fullProfile?.employee?.isBiometricEnrolled ?? user?.isBiometricEnrolled) ? 'Verified' : 'Pending'}
                </span>
              </div>
              <div className="hero-indicator-card manager-card">
                <div className="manager-header">
                  <User size={11} />
                  <label>{(fullProfile?.employee?.role || user?.role) === 'MANAGER' ? 'Appointed By' : 'Assigned Manager'}</label>
                </div>
                <span>{(fullProfile?.employee?.role || user?.role) === 'MANAGER' ? 'System Admin' : (fullProfile?.employee?.site?.managerName || 'System Admin')}</span>
              </div>
            </div>

            {/* Right: Profile Avatar */}
            <div className="profile-avatar-wrapper">
              <div className="avatar-main">
                {(fullProfile?.employee?.avatar || user?.avatar) ? (
                  <img src={(fullProfile?.employee?.avatar || user?.avatar).startsWith('http') ? (fullProfile?.employee?.avatar || user?.avatar) : `${API_URL}${fullProfile?.employee?.avatar || user?.avatar}`} alt="Profile" />
                ) : (
                  <User size={50} />
                )}
              </div>
              <div className="avatar-status-ring"></div>
            </div>
          </div>
        </div>
      )}

      {/* Main Details Grid: Simplified, Uniform Corporate Rows */}
      {!isAdmin && (
        <div className="profile-grid">
          <section className="profile-section">
          <div className="section-header">
            <Fingerprint size={20} />
            <h3>Personal details</h3>
          </div>
          <div className="info-grid-creative" style={{ marginTop: '16px' }}>
            <DetailsRow icon={<User size={16} />} label="Login Username" value={fullProfile?.employee?.employeeId || user?.employeeId} />
            <DetailsRow icon={<Smartphone size={16} />} label="Phone Number" value={fullProfile?.employee?.phone || 'Not Linked'} />
            <DetailsRow icon={<Calendar size={16} />} label="Date of Birth" value={fullProfile?.employee?.dob ? new Date(fullProfile?.employee?.dob).toLocaleDateString() : 'Classified'} />
            <DetailsRow icon={<Briefcase size={16} />} label="Job Designation" value={fullProfile?.employee?.designation || 'Specialist'} />
          </div>
          </section>

          <section className="profile-section">
            <div className="section-header">
              <Landmark size={20} />
              <h3>Payout Settlement</h3>
            </div>
            <div className="info-grid-creative" style={{ marginTop: '16px' }}>
              <DetailsRow icon={<Landmark size={16} />} label="Settlement Bank" value={fullProfile?.employee?.bankName || 'Awaiting Link'} />
              <DetailsRow icon={<CreditCard size={16} />} label="Account Number" value={fullProfile?.employee?.accountNumber || 'X-XXXX-XXXX'} />
              <DetailsRow icon={<User size={16} />} label="Beneficiary Holder" value={fullProfile?.employee?.accountHolderName || 'N/A'} />
              <DetailsRow icon={<DollarSign size={16} />} label="Payment Per Hour" value={fullProfile?.employee?.hourlyRate ? `$${fullProfile.employee.hourlyRate.toFixed(2)} / hr` : '$0.00 / hr'} />
            </div>
          </section>
        </div>
      )}

      {/* Preferences & Security settings */}
      <section className="profile-section settings-wide">
        <div className="section-header">
          <Shield size={20} />
          <h3>Security & Preferences</h3>
        </div>
        
        <div className="settings-list-creative">
          <div className="settings-item-node">
            <div className="item-label">
              <Lock size={16} />
              <span>Shift Account Password</span>
            </div>
            {isEditingPassword ? (
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="password-mask-node" style={{ width: '200px' }}>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password" 
                    autoFocus
                  />
                  <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button className="btn btn-primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px' }} onClick={handleSavePassword}>
                  Save
                </button>
                <button className="btn btn-ghost" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', border: '1px solid var(--border)' }} onClick={() => setIsEditingPassword(false)}>
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <div className="password-mask-node">
                  <input type={showPassword ? "text" : "password"} value={fullProfile?.employee?.plainPassword || "••••••••"} readOnly />
                  <button onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button className="btn btn-primary" style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', background: 'var(--surface-hover)', border: '1px solid var(--border)', color: 'var(--text-primary)' }} onClick={() => setIsEditingPassword(true)}>
                  Change
                </button>
              </div>
            )}
          </div>

          <div className="settings-item-node">
            <div className="item-label">
              <Globe size={16} />
              <span>Portal Display Language</span>
            </div>
            <select className="creative-select" value={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)}>
              <option value="en">English (UK)</option>
              <option value="vi">Vietnamese (VN)</option>
            </select>
          </div>

          <div className="settings-item-node">
            <div className="item-label">
              {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              <span>Visual Comfort Dark Theme</span>
            </div>
            <button className={`creative-toggle ${theme === 'dark' ? 'active' : ''}`} onClick={toggleTheme}>
              <div className="toggle-knob"></div>
            </button>
          </div>
        </div>
      </section>



      <div className="profile-footer-meta">
        <Sparkles size={14} />
        <span>TrackForce Portal v3.0</span>
      </div>
    </div>
  );
};

const DetailsRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <div className="info-node-creative">
    <div className="node-icon">{icon}</div>
    <div className="node-text">
      <label>{label}</label>
      <span>{value}</span>
    </div>
  </div>
);

export default Profile;
