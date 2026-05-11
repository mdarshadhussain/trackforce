import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  X, 
  User, 
  Briefcase, 
  MapPin, 
  Shield, 
  Camera, 
  Lock, 
  ChevronLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchSites, createEmployee } from '../api/api';
import './AddEmployee.css';

const AddEmployee = () => {
  const { isAdmin } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [hubs, setHubs] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    designation: '',
    role: 'EMPLOYEE',
    siteId: '',
    avatar: null as string | null
  });

  useEffect(() => {
    fetchSites().then(setHubs).catch(console.error);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await createEmployee(formData);
      navigate('/employees');
    } catch (err: any) {
      setError(err.message || 'Failed to create employee');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="add-employee-page"
    >
      <header className="page-header">
        <div className="header-left">
          <button className="btn-icon-ghost" onClick={() => navigate('/employees')}>
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1>{t('addNewEmployee')}</h1>
            <p>{t('createEmployeeProfileSubtext', 'Set up a new workforce member with biometric access.')}</p>
          </div>
        </div>
      </header>

      <div className="glass-card form-container-premium">
        <form onSubmit={handleSubmit} className="premium-form">
          {error && (
            <div className="error-banner">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <div className="form-section">
            <div className="section-header">
              <User size={20} />
              <h3>{t('basicInformation', 'Basic Information')}</h3>
            </div>
            
            <div className="avatar-upload-premium">
              <div className="avatar-preview-lg">
                {formData.avatar ? (
                  <img src={formData.avatar} alt="Preview" />
                ) : (
                  <User size={48} />
                )}
                <label htmlFor="avatar-page-upload" className="upload-badge-lg">
                  <Camera size={20} />
                </label>
              </div>
              <input 
                id="avatar-page-upload"
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
              <div className="upload-text">
                <h4>{t('profilePicture')}</h4>
                <p>{t('uploadPhotoInfo')}</p>
              </div>
            </div>

            <div className="form-grid-3">
              <div className="form-group">
                <label>{t('employeeID')}</label>
                <input 
                  type="text" 
                  required 
                  value={formData.employeeId}
                  onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
                  placeholder="e.g. TF005" 
                />
              </div>
              <div className="form-group">
                <label>{t('firstName')}</label>
                <input 
                  type="text" 
                  required 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="John" 
                />
              </div>
              <div className="form-group">
                <label>{t('lastName')}</label>
                <input 
                  type="text" 
                  required 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Doe" 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <Lock size={20} />
              <h3>{t('securityAuth', 'Security & Authentication')}</h3>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label>{t('emailAddress')}</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john.doe@trackforce.com" 
                />
              </div>
              <div className="form-group">
                <label>{t('initialPassword')}</label>
                <input 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="••••••••" 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <Briefcase size={20} />
              <h3>{t('assignmentRole', 'Assignment & Role')}</h3>
            </div>
            <div className="form-grid-3">
              <div className="form-group">
                <label>{t('designation')}</label>
                <input 
                  type="text" 
                  value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  placeholder="Security Officer" 
                />
              </div>
              <div className="form-group">
                <label>{t('accessLevel')}</label>
                {isAdmin ? (
                  <select 
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="EMPLOYEE">Standard Employee</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                ) : (
                  <select disabled value="EMPLOYEE">
                    <option value="EMPLOYEE">Standard Employee</option>
                  </select>
                )}
              </div>
              <div className="form-group">
                <label>{t('defaultAssignment', 'Default Assignment')}</label>
                <select 
                  required
                  value={formData.siteId}
                  onChange={(e) => setFormData({...formData, siteId: e.target.value})}
                >
                  <option value="">Select a hub...</option>
                  {hubs.map(hub => (
                    <option key={hub.id} value={hub.id}>{hub.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="enrollment-notice">
            <CheckCircle2 size={24} />
            <div>
              <h4>Face ID Enrollment Ready</h4>
              <p>The employee will be required to scan their face during their first login to complete biometric enrollment.</p>
            </div>
          </div>

          <div className="form-actions-premium">
            <button type="button" onClick={() => navigate('/employees')} className="btn btn-ghost">
              {t('cancel')}
            </button>
            <button type="submit" className="btn btn-primary btn-lg" disabled={isSubmitting}>
              {isSubmitting ? t('processing', 'Processing...') : t('createProfile')}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddEmployee;
