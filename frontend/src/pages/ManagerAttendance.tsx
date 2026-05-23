import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, 
  User, 
  Search, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  UserCheck,
  AlertCircle,
  Shield,
  X,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import { loadFaceApiModels, areModelsLoaded } from '../utils/aiModels';
import { fetchEmployees, fetchAllLogs, submitManagerLog, fetchTodayLogs, clockIn, clockOut, createSecurityAlert } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './ManagerAttendance.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const base64ToBlob = (base64: string) => {
  const byteString = atob(base64.split(',')[1]);
  const mimeString = base64.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

const ManagerAttendance: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [modelsLoaded, setModelsLoaded] = useState(areModelsLoaded());

  // Camera & Face Verification States
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('user');
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'failed'>('idle');
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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

  // Load AI Models
  useEffect(() => {
    if (!modelsLoaded) {
      loadFaceApiModels()
        .then(() => setModelsLoaded(true))
        .catch(err => {
          console.error("AI load error:", err);
        });
    }
  }, [modelsLoaded]);

  // Start/Stop Camera on Employee Selection
  useEffect(() => {
    setPhotoPreview(null);
    setVerificationStatus('idle');
    setIsCameraActive(false);
    return () => stopCamera();
  }, [selectedEmployee]);

  const startCamera = async (mode: 'user' | 'environment') => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
      setIsCameraActive(true);
    } catch (err) {
      console.error("Camera access failed:", err);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const handleFlipCamera = () => {
    const nextMode = facingMode === 'user' ? 'environment' : 'user';
    setFacingMode(nextMode);
    if (selectedEmployee) {
      startCamera(nextMode);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return null;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.6);
  };

  const handleCaptureAndVerify = async () => {
    if (!selectedEmployee) return;

    const capturedFrame = captureFrame();
    if (!capturedFrame) {
      alert("Failed to capture photo from video feed.");
      return;
    }

    setPhotoPreview(capturedFrame);
    stopCamera();
    setVerificationStatus('verifying');
    setSubmitting(true);

    try {
      // Get location
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

      const proofBlob = base64ToBlob(capturedFrame);

      // Verify selected employee
      let isMatch = true; // Default to true if employee does not have an avatar to compare
      if (selectedEmployee.avatar && modelsLoaded) {
        try {
          const avatarUrl = selectedEmployee.avatar.startsWith('http') ? selectedEmployee.avatar : `${API_URL}${selectedEmployee.avatar}`;
          const referenceImg = await faceapi.fetchImage(avatarUrl);
          const capturedImg = await faceapi.fetchImage(capturedFrame);

          const refDetection = await faceapi.detectSingleFace(referenceImg).withFaceLandmarks().withFaceDescriptor();
          const capDetection = await faceapi.detectSingleFace(capturedImg).withFaceLandmarks().withFaceDescriptor();

          if (refDetection?.descriptor && capDetection?.descriptor) {
            const distance = faceapi.euclideanDistance(refDetection.descriptor, capDetection.descriptor);
            isMatch = distance < 0.6;
          } else {
            throw new Error("Could not detect face in reference or captured image.");
          }
        } catch (err: any) {
          console.error("AI Face Verification error:", err);
          throw new Error("AI Face Verification failed: " + (err.message || "Face not detected"));
        }
      }

      if (!isMatch) {
        // Log biometric mismatch to security alerts
        await createSecurityAlert({
          type: 'BIOMETRIC_MISMATCH',
          message: `Proxy Log Failed: Biometric mismatch for ${selectedEmployee.firstName} ${selectedEmployee.lastName}.`,
          severity: 'HIGH',
          employeeId: selectedEmployee.id,
          siteId: selectedEmployee.siteId
        });
        throw new Error("Biometric Mismatch: Identity could not be verified.");
      }

      // Submit attendance
      const type = getActiveSession(selectedEmployee.id) ? 'CLOCK_OUT' : 'CLOCK_IN';
      const formData = new FormData();
      formData.append('employeeId', selectedEmployee.id);
      formData.append('type', type);
      if (latitude) formData.append('latitude', latitude.toString());
      if (longitude) formData.append('longitude', longitude.toString());
      if (proofBlob) {
        formData.append('biometricProof', proofBlob, `manager-verification-${selectedEmployee.id}-${Date.now()}.jpg`);
      }

      await submitManagerLog(formData);
      
      setVerificationStatus('success');
      
      // Reset state and reload
      setSelectedEmployee(null);
      await loadData();
    } catch (err: any) {
      setVerificationStatus('failed');
      alert(err.message || 'Verification and log submission failed.');
      // Restart camera for retry
      startCamera(facingMode);
    } finally {
      setSubmitting(false);
    }
  };

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

  const handleRetake = () => {
    setPhotoPreview(null);
    setVerificationStatus('idle');
    startCamera(facingMode);
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
                    {isCameraActive ? (
                      <div className="camera-viewport">
                        <video 
                          ref={videoRef} 
                          autoPlay 
                          playsInline 
                          muted 
                          className="camera-video"
                          style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
                        />
                        <div className="scanner-line"></div>
                      </div>
                    ) : photoPreview ? (
                      <div className="captured-preview">
                        <img src={photoPreview} alt="Preview" />
                        {verificationStatus === 'verifying' && (
                          <div className="verification-overlay">
                            <Loader2 size={36} className="spinner" />
                            <span>Verifying Identity...</span>
                          </div>
                        )}
                        {verificationStatus === 'success' && (
                          <div className="verification-overlay success">
                            <CheckCircle size={36} />
                            <span>Verified!</span>
                          </div>
                        )}
                        {verificationStatus === 'failed' && (
                          <div className="verification-overlay failed">
                            <AlertCircle size={36} />
                            <span>Verification Failed</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="empty-photo">
                        <Camera size={40} />
                        <span>Visual Verification Required</span>
                      </div>
                    )}
                  </div>

                  <div className="camera-controls-row">
                    {!isCameraActive && !photoPreview && (
                      <button 
                        className="btn-start-camera" 
                        onClick={() => startCamera(facingMode)}
                        disabled={submitting}
                      >
                        <Camera size={18} />
                        <span>Start Camera & Verify</span>
                      </button>
                    )}

                    {isCameraActive && (
                      <>
                        <button 
                          className="btn-capture-verify" 
                          onClick={handleCaptureAndVerify}
                          disabled={submitting}
                        >
                          {submitting ? (
                            <>
                              <Loader2 size={18} className="spinner" />
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Camera size={18} />
                              <span>Capture & Verify {getActiveSession(selectedEmployee.id) ? 'Clock-Out' : 'Clock-In'}</span>
                            </>
                          )}
                        </button>
                        <button 
                          className="btn-flip" 
                          onClick={handleFlipCamera}
                          title="Flip Camera"
                          disabled={submitting}
                        >
                          <RefreshCw size={18} />
                        </button>
                      </>
                    )}

                    {photoPreview && verificationStatus !== 'verifying' && (
                      <button 
                        className="btn-retake" 
                        onClick={handleRetake}
                        disabled={submitting}
                      >
                        <RefreshCw size={18} />
                        <span>Retake Photo</span>
                      </button>
                    )}
                  </div>
                </div>

                {!selectedEmployee.avatar && (
                  <p className="warning-text">
                    <AlertCircle size={14} />
                    No reference photo enrolled for this employee. Clocking will bypass facial verification.
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

          {user?.role !== 'ADMIN' ? (
            <>
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
            </>
          ) : (
            <div className="admin-exemption-badge">
              <Shield size={24} color="var(--primary)" />
              <strong>Duty Exempt</strong>
              <span>System administrators are exempt from site-wide clocking requirements.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerAttendance;
