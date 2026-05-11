import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import * as faceapi from 'face-api.js';
import { 
  Check, 
  X, 
  FileText,
  Calendar, 
  ChevronLeft, 
  Clock,
  Scan,
  CheckCircle2,
  Camera,
  MapPin,
  Shield
} from 'lucide-react';
import { clockIn, fetchTodayLogs, fetchAllLogs, updateAttendanceStatus, clockOut, startBreak, endBreak, enrollBiometric, createSecurityAlert } from '../api/api';
import { exportToCSV } from '../utils/export';
import { useAuth } from '../context/AuthContext';

import './Attendance.css';


const Attendance = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const isAdmin = user?.role === 'ADMIN';
  const isManager = user?.role === 'MANAGER';
  const isManagement = isAdmin || isManager;

  const [selectedProof, setSelectedProof] = useState<string | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'idle' | 'scanning' | 'success'>('idle');
  const [showScanner, setShowScanner] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [logs, setLogs] = useState<any[]>([]);
  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const isClockedIn = logs.length > 0 && !logs[0].clockOut;

  useEffect(() => {
    const loadModels = async () => {
      try {
        const MODEL_URL = '/models';
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
          faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
          faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
        ]);
        setModelsLoaded(true);
      } catch (err) {
        console.error("Error loading models:", err);
      }
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (showScanner) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [showScanner]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      streamRef.current = stream;
    } catch (err) {
      console.error("Error accessing camera:", err);
      // alert("Could not access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchTodayLogs(user.id).then(setLogs).catch(console.error);
      if (isManagement) {
        fetchAllLogs().then(setAllLogs).catch(console.error);
      }
    }
  }, [user, isManagement]);

  useEffect(() => {
    // Check if user is on break from the latest log
    if (isClockedIn && logs[0].breaks) {
      const activeBreak = logs[0].breaks.find((b: any) => !b.endTime);
      setIsOnBreak(!!activeBreak);
    }
  }, [logs, isClockedIn]);

  const handleStatusUpdate = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await updateAttendanceStatus(id, status);
      setAllLogs(allLogs.map(l => l.id === id ? { ...l, status } : l));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const handleExport = () => {
    exportToCSV(allLogs, 'Attendance_Report');
  };
  const handleClockOut = async () => {
    if (!user) return;
    
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          await clockOut(user.id, latitude, longitude);
          alert("Clocked out successfully! Final location logged.");
          const updatedLogs = await fetchTodayLogs(user.id);
          setLogs(updatedLogs);
          setShowScanner(false);
        } catch (err: any) {
          alert(err.message);
        }
      },
      (error) => {
        alert("Please enable location access to clock out.");
      },
      { enableHighAccuracy: true }
    );
  };

  const handleToggleBreak = async () => {
    if (!user) return;
    try {
      if (isOnBreak) {
        await endBreak(user.id);
        alert("Break ended!");
      } else {
        await startBreak(user.id);
        alert("Break started!");
      }
      const updatedLogs = await fetchTodayLogs(user.id);
      setLogs(updatedLogs);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const captureFrame = () => {
    if (!videoRef.current) return null;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL('image/jpeg', 0.6); // 60% quality to save space
  };

  const handleEnrollment = async () => {
    if (!user || !user.avatar) {
      alert("Reference photo not found. Please contact Admin.");
      return;
    }
    
    setIsScanning(true);
    setScanStatus('scanning');

    try {
      const biometricProof = captureFrame();
      if (!biometricProof) throw new Error("Capture failed");

      // Load reference (Admin Photo) and capture
      const referenceImg = await faceapi.fetchImage(user.avatar);
      const capturedImg = await faceapi.fetchImage(biometricProof);

      const refDetection = await faceapi.detectSingleFace(referenceImg).withFaceLandmarks().withFaceDescriptor();
      const capDetection = await faceapi.detectSingleFace(capturedImg).withFaceLandmarks().withFaceDescriptor();

      if (refDetection?.descriptor && capDetection?.descriptor) {
        const distance = faceapi.euclideanDistance(refDetection.descriptor, capDetection.descriptor);
        if (distance < 0.6) {
          // Success! Mark as enrolled in DB
          await enrollBiometric(user.id, Array.from(capDetection.descriptor));
          setScanStatus('success');
          alert(t('enrollmentSuccess'));
          window.location.reload(); // Refresh to update user context
        } else {
          // Log Security Incident
          await createSecurityAlert({
            type: 'BIOMETRIC_MISMATCH',
            message: `Enrollment Failed: Biometric mismatch for ${user.firstName} ${user.lastName}. Possible identity spoofing.`,
            severity: 'HIGH',
            employeeId: user.id
          });
          alert(t('identityMismatch'));
          setScanStatus('idle');
        }
      } else {
        alert("Face not clearly detected. Try again in better lighting.");
        setScanStatus('idle');
      }
    } catch (err: any) {
      alert(err.message || "Enrollment failed");
      setScanStatus('idle');
    } finally {
      setIsScanning(false);
    }
  };

  const handleClockAction = async () => {
    if (!user) return;
    
    // If user is not enrolled, they should be using handleEnrollment instead
    if (!user.isBiometricEnrolled) {
      handleEnrollment();
      return;
    }

    setIsScanning(true);
    setScanStatus('scanning');
    
    // 1. Capture the "Biometric Proof" snapshot
    const biometricProof = captureFrame();
    if (!biometricProof) {
      alert("Failed to capture image");
      setIsScanning(false);
      setScanStatus('idle');
      return;
    }

    // --- AI FACIAL MATCHING LOGIC (Against Admin Photo) ---
    let isMatch = false;
    if (modelsLoaded && user?.avatar) {
      try {
        const referenceImg = await faceapi.fetchImage(user.avatar);
        const capturedImg = await faceapi.fetchImage(biometricProof);

        const refDetection = await faceapi.detectSingleFace(referenceImg).withFaceLandmarks().withFaceDescriptor();
        const capDetection = await faceapi.detectSingleFace(capturedImg).withFaceLandmarks().withFaceDescriptor();

        if (refDetection?.descriptor && capDetection?.descriptor) {
          const distance = faceapi.euclideanDistance(refDetection.descriptor, capDetection.descriptor);
          isMatch = distance < 0.6;
          console.log(`Live Matching Distance: ${distance}`);
        }
      } catch (err) {
        console.error("Verification error:", err);
      }
    }

    if (!isMatch) {
      // Log Security Incident
      await createSecurityAlert({
        type: 'BIOMETRIC_MISMATCH',
        message: `Clock-in Failed: Biometric mismatch for ${user.firstName} ${user.lastName}.`,
        severity: 'MEDIUM',
        employeeId: user.id,
        siteId: user.siteId
      });
      alert("Biometric mismatch! Identity could not be verified.");
      setScanStatus('idle');
      setIsScanning(false);
      return;
    }

    // 2. Get Current Location
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      setScanStatus('idle');
      setIsScanning(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // 3. Attempt Clock In with Coordinates AND Biometric Proof
          await clockIn(user.id, latitude, longitude, biometricProof);
          setScanStatus('success');
          const updatedLogs = await fetchTodayLogs(user.id);
          setLogs(updatedLogs);
        } catch (err: any) {
          alert(err.message);
          setScanStatus('idle');
        } finally {
          setTimeout(() => {
            setIsScanning(false);
            setScanStatus('idle');
          }, 2000);
        }
      },
      (error) => {
        alert("Please enable location access to clock in.");
        setScanStatus('idle');
        setIsScanning(false);
      },
      { enableHighAccuracy: true }
    );
  };

  if (!isManagement) {
    return (
      <div className="enterprise-page user-view">
        
        <div className="user-attendance-grid">
          {/* Biometric Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card scanner-card"
          >
            {!showScanner ? (
              <div className="verification-placeholder">
                <div className="placeholder-icon">
                  <Shield size={48} color={user?.isBiometricEnrolled ? 'var(--primary)' : 'var(--error)'} />
                </div>
                <h3>{user?.isBiometricEnrolled ? (isClockedIn ? t('status') + ': ' + t('active') : t('verificationRequired')) : t('enrollmentRequired')}</h3>
                <p>
                  {!user?.isBiometricEnrolled 
                    ? t('enrollmentSubtext')
                    : isClockedIn 
                      ? `${t('clockedInAt')} ${new Date(logs[0].clockIn).toLocaleTimeString()}.`
                      : t('verificationInstruction')}
                </p>
                
                <div className="action-stack" style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                  {!user?.isBiometricEnrolled ? (
                    <button 
                      className="btn btn-primary btn-lg btn-block"
                      onClick={() => {
                        setIsEnrolling(true);
                        setShowScanner(true);
                      }}
                    >
                      {t('beginEnrollment')}
                    </button>
                  ) : !isClockedIn ? (
                      <button 
                        className="btn btn-primary btn-lg btn-block"
                        onClick={() => {
                          setIsEnrolling(false);
                          setShowScanner(true);
                        }}
                      >
                        {t('startSecureVerification')}
                      </button>
                  ) : (
                    <>
                      <button 
                        className={`btn ${isOnBreak ? 'btn-primary' : 'btn-outline'} btn-lg btn-block`}
                        onClick={handleToggleBreak}
                      >
                        {isOnBreak ? 'End Break' : 'Start Break'}
                      </button>
                      <button 
                        className="btn btn-danger btn-lg btn-block"
                        onClick={handleClockOut}
                        style={{ backgroundColor: '#ef4444', color: 'white', border: 'none' }}
                      >
                        {t('clockOut')}
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <>
                <div className="scanner-header">
                  <h3>{isEnrolling ? t('beginEnrollment') : t('secureVerification')}</h3>
                  <p>{isEnrolling ? t('matchingWithAdminPhoto') : t('positionFaceFrame')}</p>
                </div>

                <div className="biometric-viewport">
                  <div className={`scan-ring ${scanStatus}`}></div>
                  <div className="camera-sim">
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="camera-video"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }}
                    />
                    <div className="scanner-line"></div>
                    <AnimatePresence mode="wait">
                      {scanStatus === 'scanning' ? (
                        <motion.div key="scan" className="overlay"><Scan size={48} className="pulse" /></motion.div>
                      ) : scanStatus === 'success' ? (
                        <motion.div key="success" className="overlay success"><CheckCircle2 size={64} /></motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="verification-info">
                  <div className="v-item"><MapPin size={14} /> {user?.site?.name || 'Assigned Hub'}</div>
                  <div className="v-item"><Shield size={14} /> Biometric Secure</div>
                </div>

                <button 
                  className={`btn btn-primary btn-block btn-lg ${isScanning ? 'loading' : ''}`}
                  onClick={isEnrolling ? handleEnrollment : handleClockAction}
                  disabled={isScanning}
                >
                  {isScanning ? t('verifying') : (isEnrolling ? t('beginEnrollment') : t('clockIn'))}
                </button>
                <button className="btn btn-ghost btn-block" onClick={() => setShowScanner(false)}>
                  {t('cancel')}
                </button>
              </>
            )}
          </motion.div>

          {/* Personal Stats & Timeline */}
          <div className="user-stats-container">
            <div className="stats-row">
              <div className="glass-card s-card">
                <span className="label">{t('todayHours')}</span>
                <h2 className="value">06:42:15</h2>
              </div>
              <div className="glass-card s-card">
                <span className="label">{t('weeklyProgress')}</span>
                <h2 className="value">32.5h / 40h</h2>
              </div>
            </div>

            <div className="glass-card personal-timeline">
              <div className="card-header">
                <h3>{t('history')}</h3>
                <button className="btn-ghost btn-sm">{t('requestCorrection')}</button>
              </div>
              <div className="mini-table">
                {logs.length > 0 ? logs.map((log, i) => (
                  <div key={i} className="mini-row">
                    <span className="m-date">{new Date(log.date).toLocaleDateString()}</span>
                    <span className="m-time">
                      {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - 
                      {log.clockOut ? new Date(log.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : t('active')}
                    </span>
                    <span className={`m-status ${log.clockOut ? 'approved' : 'pending'}`}>
                      {log.clockOut ? t('completed') : t('onSite')}
                    </span>
                  </div>
                )) : (
                  <div className="no-logs">{t('noLogs')}</div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }

  // Admin View
  return (
    <div className="enterprise-page">
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
              <h1>{t('workforceAttendance')}</h1>
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
              <div className="s-item"><span className="dot approved"></span> {t('approved')}: 92 hrs</div>
              <div className="s-item"><span className="dot rejected"></span> {t('rejected')}: 0 hrs</div>
              <div className="s-item"><span className="dot pending"></span> {t('pending')}: 0 hrs</div>
            </div>
          </section>

          <div className="action-bar">
            <div className="toggle-group">
              <button className="toggle-btn active"><FileText size={14} /> {t('timecard')}</button>
              <button className="toggle-btn"><Clock size={14} /> {t('timeline')}</button>
            </div>
            <div className="btn-row">
              <button className="btn-outline" onClick={handleExport}>{t('exportReport')}</button>
              <button className="btn btn-primary" onClick={() => alert('Batch approval feature coming soon!')}>{t('approveAll')}</button>
            </div>
          </div>

          <div className="table-container glass-card">
            <table className="enterprise-table">
              <thead>
                <tr>
                  <th>{t('employee')}</th>
                  <th>{t('date')}</th>
                  <th>{t('checkin')}</th>
                  <th>{t('checkout')}</th>
                  <th>{t('verification')}</th>
                  <th>{t('status')}</th>
                  <th>{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {allLogs.map((log, idx) => (
                  <tr key={log.id || idx}>
                    <td className="emp-cell">
                      <div className="tiny-avatar">{log.employee?.firstName?.charAt(0) || 'E'}</div>
                      <span>{log.employee?.firstName} {log.employee?.lastName}</span>
                    </td>
                    <td>{new Date(log.date).toLocaleDateString()}</td>
                    <td>{log.clockIn ? new Date(log.clockIn).toLocaleTimeString() : '---'}</td>
                    <td>{log.clockOut ? new Date(log.clockOut).toLocaleTimeString() : '---'}</td>
                    <td>
                      {log.biometricProof ? (
                        <button className="btn-proof" onClick={() => setSelectedProof(log.biometricProof)}>
                          <Camera size={14} /> {t('viewProof')}
                        </button>
                      ) : (
                        <span className="no-proof">{t('noImage')}</span>
                      )}
                    </td>
                    <td><span className={`badge badge-${log.status?.toLowerCase()}`}>{t(log.status?.toLowerCase())}</span></td>
                    <td>
                      {log.status === 'PENDING' && (
                        <div className="approval-actions">
                          <button className="status-btn approve" onClick={() => handleStatusUpdate(log.id, 'APPROVED')} title="Approve"><Check size={14} /></button>
                          <button className="status-btn reject" onClick={() => handleStatusUpdate(log.id, 'REJECTED')} title="Reject"><X size={14} /></button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {selectedProof && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="proof-modal-overlay"
            onClick={() => setSelectedProof(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="proof-modal-content"
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{t('biometricSnapshot')}</h3>
                <button className="close-btn" onClick={() => setSelectedProof(null)}><X size={20} /></button>
              </div>
              <div className="proof-image-container">
                <img src={selectedProof} alt="Biometric Proof" />
              </div>
              <div className="modal-footer">
                <p>{t('capturedDuring')}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Attendance;
