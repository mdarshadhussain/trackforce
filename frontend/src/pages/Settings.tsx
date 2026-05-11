import { 
  User, 
  Bell, 
  Shield, 
  Database, 
  Globe,
  Save,
  Moon,
  Sun,
  Camera,
  Sparkles
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { fetchConfig, updateConfig as syncConfig } from '../api/api';
import './Settings.css';

const Settings = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [avatar, setAvatar] = useState<string | null>(user?.avatar || null);
  const [loading, setLoading] = useState(true);
  
  // Settings States
  const [notifications, setNotifications] = useState(true);
  const [strictGeofence, setStrictGeofence] = useState(true);
  const [biometricRequired, setBiometricRequired] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await fetchConfig();
        setNotifications(data.notificationsEnabled);
        setStrictGeofence(data.strictGeofencing);
        setBiometricRequired(data.biometricRequired);
        setTheme(data.theme);
      } catch (error) {
        console.error('Failed to load system intelligence');
      } finally {
        setLoading(false);
      }
    };
    loadConfig();
  }, []);

  const persistConfig = async (updates: any) => {
    try {
      await syncConfig(updates);
    } catch (error) {
      alert('Failed to sync security node');
    }
  };

  const handleToggle = (type: string, value: boolean) => {
    if (type === 'geofence') {
      setStrictGeofence(value);
      persistConfig({ strictGeofencing: value });
    } else if (type === 'biometric') {
      setBiometricRequired(value);
      persistConfig({ biometricRequired: value });
    } else if (type === 'notify') {
      setNotifications(value);
      persistConfig({ notificationsEnabled: value });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    persistConfig({ theme: newTheme });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    persistConfig({ 
      notificationsEnabled: notifications,
      strictGeofencing: strictGeofence,
      biometricRequired: biometricRequired,
      theme: theme
    });
    alert('Enterprise Intelligence Synced Successfully!');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="settings-master-container"
    >
      <header className="page-header-premium" style={{ marginBottom: '40px' }}>
        <div className="header-text">
          <motion.h1 
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            style={{ fontSize: '42px', fontWeight: 900, background: 'linear-gradient(90deg, var(--primary), var(--accent))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            System Configuration
          </motion.h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)' }}>Orchestrate your enterprise workforce intelligence and security nodes.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-primary" 
          onClick={handleSave} 
          style={{ borderRadius: '16px', padding: '16px 32px', boxShadow: '0 10px 30px var(--primary-glow)' }}
        >
          <Sparkles size={18} /> Sync Intelligence
        </motion.button>
      </header>

      <div className="settings-single-column">
        {/* Profile Section */}
        <section className="settings-card" id="profile">
          <div className="card-header-icon">
            <div className="icon-circle-premium"><User size={24} /></div>
            <h3>Identity Hub</h3>
          </div>
          
          <div className="profile-edit-premium">
            <div className="avatar-uploader-premium">
              <motion.div whileHover={{ rotate: 5 }} className="avatar-circle" style={{ width: '100px', height: '100px', borderRadius: '30px' }}>
                {avatar ? <img src={avatar} alt="Profile" style={{ borderRadius: '30px' }} /> : <User size={48} />}
                <label htmlFor="settings-avatar" className="upload-btn" style={{ width: '32px', height: '32px' }}>
                  <Camera size={16} />
                </label>
              </motion.div>
              <input id="settings-avatar" type="file" hidden onChange={handleImageChange} />
              <div className="uploader-info">
                <h4 style={{ fontSize: '24px' }}>{user?.firstName} {user?.lastName}</h4>
                <p style={{ fontSize: '16px' }}>{user?.role} • Security Verified</p>
              </div>
            </div>

            <div className="settings-grid-2">
              <div className="form-group-premium">
                <label>Legal Name</label>
                <input type="text" defaultValue={`${user?.firstName} ${user?.lastName}`} />
              </div>
              <div className="form-group-premium">
                <label>Secure Email</label>
                <input type="email" defaultValue={user?.email} />
              </div>
              <div className="form-group-premium">
                <label>Current Designation</label>
                <input type="text" defaultValue={user?.designation || 'Lead Administrator'} />
              </div>
              <div className="form-group-premium">
                <label>Primary Site Branch</label>
                <input type="text" defaultValue={user?.site?.name || 'Global Headquarters'} />
              </div>
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="settings-card" id="appearance">
          <div className="card-header-icon">
            <div className="icon-circle-premium" style={{ color: 'var(--accent)', background: 'rgba(59, 130, 246, 0.1)' }}><Globe size={24} /></div>
            <h3>Visual Interface</h3>
          </div>
          <div className="settings-toggle-row">
            <div className="toggle-info">
              <span className="label">Environmental Mode</span>
              <p className="desc">Switch between Deep Space (Dark) and Azure Pearl (Light) aesthetics.</p>
            </div>
            <button className="theme-toggle-pill" onClick={toggleTheme}>
              <div className={`pill-slider ${theme}`}>
                {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
              </div>
              <span style={{ marginLeft: theme === 'dark' ? '0' : '40px' }}>{theme === 'dark' ? 'Deep Space' : 'Azure Pearl'}</span>
            </button>
          </div>
        </section>

        {/* Security Section */}
        <section className="settings-card" id="security">
          <div className="card-header-icon">
            <div className="icon-circle-premium" style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}><Shield size={24} /></div>
            <h3>Security Protocols</h3>
          </div>
          
          <div className="settings-toggle-row">
            <div className="toggle-info">
              <span className="label">Strict Geofencing Shield</span>
              <p className="desc">Hardware-level GPS enforcement. Rejects clock-ins beyond 300m threshold.</p>
            </div>
            <label className="switch-premium">
              <input type="checkbox" checked={strictGeofence} onChange={(e) => handleToggle('geofence', e.target.checked)} />
              <span className="slider-premium"></span>
            </label>
          </div>

          <div className="settings-toggle-row">
            <div className="toggle-info">
              <span className="label">Biometric Encryption Lock</span>
              <p className="desc">Mandatory facial hashing for all workforce enrollment and daily verification.</p>
            </div>
            <label className="switch-premium">
              <input type="checkbox" checked={biometricRequired} onChange={(e) => handleToggle('biometric', e.target.checked)} />
              <span className="slider-premium"></span>
            </label>
          </div>
        </section>

        {/* Notifications Section */}
        <section className="settings-card" id="notifications">
          <div className="card-header-icon">
            <div className="icon-circle-premium" style={{ color: '#8b5cf6', background: 'rgba(139, 92, 246, 0.1)' }}><Bell size={24} /></div>
            <h3>Intelligent Alerts</h3>
          </div>
          <div className="settings-toggle-row">
            <div className="toggle-info">
              <span className="label">Neural Push Notifications</span>
              <p className="desc">Instant telemetry for security breaches, spoofing attempts, and payroll status.</p>
            </div>
            <label className="switch-premium">
              <input type="checkbox" checked={notifications} onChange={(e) => handleToggle('notify', e.target.checked)} />
              <span className="slider-premium"></span>
            </label>
          </div>
        </section>

        {/* Data Section */}
        <section className="settings-card" id="data">
          <div className="card-header-icon">
            <div className="icon-circle-premium" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}><Database size={24} /></div>
            <h3>Nexus Data Management</h3>
          </div>
          <div className="data-actions-row">
            <button className="btn btn-ghost" style={{ flex: 1, borderRadius: '14px' }}>Export Intelligence Logs</button>
            <button className="btn btn-ghost" style={{ flex: 1, borderRadius: '14px' }}>Wipe Ephemeral Cache</button>
          </div>
        </section>
      </div>
    </motion.div>
  );
};

export default Settings;
