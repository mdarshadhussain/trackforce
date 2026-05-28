import { 
  User, 
  RefreshCw,
  Sparkles,
  CreditCard,
  Smartphone,
  Calendar,
  Landmark,
  Briefcase,
  Fingerprint,
  DollarSign,
  LogOut,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import { fetchEmployeeFullProfile } from '../api/api';
import Toast from '../components/Toast';
import type { ToastType } from '../components/Toast';
import './Profile.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Profile = () => {
  const { user, logout } = useAuth();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [toasts, setToasts] = useState<any[]>([]);
  const [fullProfile, setFullProfile] = useState<any>(null);

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
      addToast(t('failedLoadWorkforce'), 'error');
    } finally {
      setLoading(false);
    }
  };


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file && user) {
  //     try {
  //       const formData = new FormData();
  //       formData.append('avatar', file);
  //       formData.append('employeeId', user.employeeId);
  //       formData.append('fullName', `${user.firstName} ${user.lastName}`);
  //       
  //       const updated = await updateEmployee(user.id, formData);
  //       updateUser(updated);
  //       addToast(t('siteConfigUpdated'), 'success');
  //     } catch (err) {
  //       addToast(t('actionFailed'), 'error');
  //     }
  //   }
  // };

  const getDesignationLabel = (title: string) => {
    if (!title) return t('specialist');
    const normalized = title.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalized === 'experienceworker') return t('experienceWorker');
    if (normalized === 'freshworker') return t('freshWorker');
    if (normalized === 'storekeeper') return t('storeKeeper');
    if (normalized === 'srforeman') return t('srForeman');
    if (normalized === 'qaqc') return t('qaqc');
    return t(normalized) || title;
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
                <span className="badge-premium role">{t(fullProfile?.employee?.role?.toLowerCase() || user?.role?.toLowerCase())}</span>
                <span className="badge-premium id">ID: #{fullProfile?.employee?.employeeId || user?.employeeId}</span>
              </div>
              <h1 style={{ margin: 0 }}>{fullProfile?.employee?.firstName || user?.firstName} {fullProfile?.employee?.lastName || user?.lastName}</h1>
            </div>

            {/* Middle: Work Metrics Indicators */}
            <div className="hero-quick-indicators">
              <div className="hero-indicator-card">
                <label>{t('assignedSite')}</label>
                <span>{fullProfile?.employee?.site?.name || t('unassigned')}</span>
              </div>
              <div className="hero-indicator-card">
                <label>{t('biometricStatus')}</label>
                <span className={`status-indicator-badge ${(fullProfile?.employee?.isBiometricEnrolled ?? user?.isBiometricEnrolled) ? 'verified' : 'pending'}`}>
                  {(fullProfile?.employee?.isBiometricEnrolled ?? user?.isBiometricEnrolled) ? t('verified') : t('pendingLabel')}
                </span>
              </div>
              <div className="hero-indicator-card manager-card">
                <div className="manager-header">
                  <User size={11} />
                  <label>{t('roleStatus')}</label>
                </div>
                <span>{fullProfile?.employee?.site?.managerName || t('admin')}</span>
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
            <h3>{t('profile')}</h3>
          </div>
          <div className="info-grid-creative" style={{ marginTop: '16px' }}>
            <DetailsRow icon={<User size={16} />} label={t('employeeID')} value={fullProfile?.employee?.employeeId || user?.employeeId} />
            <DetailsRow icon={<Smartphone size={16} />} label={t('phoneNum')} value={fullProfile?.employee?.phone || t('noCustomHolidays')} />
            <DetailsRow icon={<Calendar size={16} />} label={t('dobLabel')} value={fullProfile?.employee?.dob ? new Date(fullProfile?.employee?.dob).toLocaleDateString(i18n.language === 'vi' ? 'vi-VN' : undefined) : t('noCustomHolidays')} />
            <DetailsRow icon={<Briefcase size={16} />} label={t('designation')} value={getDesignationLabel(fullProfile?.employee?.designation)} />
          </div>
          </section>

          <section className="profile-section">
            <div className="section-header">
              <Landmark size={20} />
              <h3>{t('bankAccounts')}</h3>
            </div>
            <div className="info-grid-creative" style={{ marginTop: '16px' }}>
              <DetailsRow icon={<Landmark size={16} />} label={t('bankNameLabel')} value={fullProfile?.employee?.bankName || t('noCustomHolidays')} />
              <DetailsRow icon={<CreditCard size={16} />} label={t('accountNumberLabel')} value={fullProfile?.employee?.accountNumber || t('noCustomHolidays')} />
              <DetailsRow icon={<User size={16} />} label={t('accountHolderNameLabel')} value={fullProfile?.employee?.accountHolderName || 'N/A'} />
              <DetailsRow icon={<DollarSign size={16} />} label={t('salaryPerHour')} value={fullProfile?.employee?.hourlyRate ? `${fullProfile.employee.hourlyRate.toLocaleString()} ₫ / hr` : '0 ₫ / hr'} />
            </div>
          </section>
        </div>
      )}

      <div className="logout-section" style={{ padding: '20px' }}>
        <button 
          onClick={handleLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            padding: '16px',
            borderRadius: '16px',
            border: 'none',
            background: '#fee2e2',
            color: '#ef4444',
            fontSize: '14px',
            fontWeight: 800,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(239, 68, 68, 0.1)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          <LogOut size={18} />
          {t('logout') || 'Logout'}
        </button>
      </div>


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
