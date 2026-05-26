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
  Loader2,
  Filter,
  MapPin
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import { loadFaceApiModels, areModelsLoaded } from '../utils/aiModels';
import { fetchEmployees, fetchAllLogs, submitManagerLog, fetchTodayLogs, clockIn, clockOut, createSecurityAlert, fetchSites } from '../api/api';
import { useAuth } from '../context/AuthContext';
import './ManagerAttendance.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
  const R = 6371e3; // meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

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

const SearchableSiteDropdown = ({ 
  sites, 
  selectedSiteId, 
  onSelectSite 
}: { 
  sites: any[]; 
  selectedSiteId: string; 
  onSelectSite: (id: string) => void; 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedSite = selectedSiteId === 'all' 
    ? { id: 'all', name: 'All Sites' } 
    : sites.find(s => s.id === selectedSiteId) || { id: 'all', name: 'All Sites' };

  const filteredSites = sites.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="searchable-dropdown" ref={dropdownRef}>
      <button 
        type="button" 
        className={"dropdown-trigger-btn " + (isOpen ? "active" : "")}
        onClick={() => setIsOpen(!isOpen)}
        style={{ border: 'none', background: 'transparent' }}
      >
        <Filter size={14} className="trigger-icon" />
        <span>{selectedSite.name}</span>
        <span className="dropdown-arrow">▼</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="dropdown-overlay-deck"
          >
            <div className="dropdown-search-box" onClick={(e) => e.stopPropagation()}>
              <Search size={14} className="search-icon-inside" />
              <input 
                type="text" 
                placeholder="Search sites..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>

            <div className="dropdown-list-scroller">
              <button 
                type="button"
                className={"dropdown-list-item " + (selectedSiteId === 'all' ? 'active' : '')}
                onClick={() => {
                  onSelectSite('all');
                  setIsOpen(false);
                  setSearchQuery('');
                }}
              >
                All Sites ({sites.length})
              </button>
              
              {filteredSites.length > 0 ? (
                filteredSites.map(site => (
                  <button 
                    key={site.id}
                    type="button"
                    className={"dropdown-list-item " + (selectedSiteId === site.id ? 'active' : '')}
                    onClick={() => {
                      onSelectSite(site.id);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                  >
                    {site.name}
                  </button>
                ))
              ) : (
                <div className="dropdown-no-results">No sites found</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ManagerAttendance: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [employees, setEmployees] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [sites, setSites] = useState<any[]>([]);
  const [selectedSite, setSelectedSite] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
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

  // Stepper State for Proxy Attendance Log
  const [step, setStep] = useState<'idle' | 'checking_location' | 'location_success' | 'location_failed' | 'facial_scanning' | 'complete' | 'failed'>('idle');
  const [statusMessage, setStatusMessage] = useState("");
  const [errorDetail, setErrorDetail] = useState("");
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [locationName, setLocationName] = useState("");

  // Personal Status State
  const [myTodayLogs, setMyTodayLogs] = useState<any[]>([]);
  const isMyClockedIn = myTodayLogs.length > 0 && !myTodayLogs[0].clockOut;
  const [personalStats, setPersonalStats] = useState({
    totalHours: 0,
    todayHours: '0h 0m',
  });
  const [myElapsedTime, setMyElapsedTime] = useState<string>("");

  useEffect(() => {
    let intervalId: any;
    if (isMyClockedIn && myTodayLogs[0]?.clockIn) {
      const updateElapsed = () => {
        const diff = Date.now() - new Date(myTodayLogs[0].clockIn).getTime();
        if (diff > 0) {
          const mins = Math.floor(diff / 60000) % 60;
          const hrs = Math.floor(diff / 3600000);
          setMyElapsedTime(`${hrs}h ${mins}m`);
        } else {
          setMyElapsedTime("0h 0m");
        }
      };
      updateElapsed();
      intervalId = setInterval(updateElapsed, 60000);
    } else {
      setMyElapsedTime("");
    }
    return () => clearInterval(intervalId);
  }, [isMyClockedIn, myTodayLogs]);

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
    setStep('idle');
    setStatusMessage("");
    setErrorDetail("");
    setCoords(null);
    setLocationName("");
    return () => stopCamera();
  }, [selectedEmployee]);

  // Auto-start verification if manager selects themselves
  useEffect(() => {
    if (selectedEmployee && user && selectedEmployee.id === user.id && step === 'idle') {
      handleStartVerification();
    }
  }, [selectedEmployee, user, step]);

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

  const handleStartVerification = async () => {
    if (!selectedEmployee || submitting) return;
    setStep('checking_location');
    setStatusMessage("Acquiring GPS coordinates...");
    setErrorDetail("");

    let currentCoords: {lat: number, lng: number} | null = null;
    
    if (navigator.geolocation) {
      try {
        const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { 
            enableHighAccuracy: false, 
            timeout: 15000, 
            maximumAge: 60000 
          });
        });
        currentCoords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setCoords(currentCoords);
      } catch (e: any) {
        console.error("Geolocation error", e);
        let errorMsg = "Unable to acquire GPS location.";
        if (e.code === 1) {
          errorMsg = "Location permission denied. Please allow location access in your browser settings.";
        } else if (e.code === 2) {
          errorMsg = "Location unavailable. Please make sure your device's location/GPS settings are turned on.";
        } else if (e.code === 3) {
          errorMsg = "Location request timed out. Please check your network connection and try again.";
        }
        setStep('location_failed');
        setErrorDetail(errorMsg);
        return;
      }
    } else {
      setStep('location_failed');
      setErrorDetail("Your browser does not support geolocation.");
      return;
    }

    try {
      setStatusMessage("Checking operational boundaries...");
      
      const employeeSite = sites.find(s => s.id === selectedEmployee.siteId);
      
      if (!employeeSite) {
        setStep('location_failed');
        setErrorDetail("No operational site assigned to this employee's profile.");
        return;
      }

      const distance = getDistance(
        currentCoords.lat, 
        currentCoords.lng, 
        employeeSite.latitude || 0, 
        employeeSite.longitude || 0
      );
      const radius = employeeSite.geofenceRadius || 500;

      if (distance > radius && user?.role === 'MANAGER') {
        await createSecurityAlert({
          type: 'GEOFENCE_VIOLATION',
          message: `Proxy Log Warning: Manager logged ${selectedEmployee.firstName} from ${Math.round(distance)}m away from ${employeeSite.name}.`,
          severity: 'MEDIUM',
          employeeId: selectedEmployee.id,
          siteId: selectedEmployee.siteId
        });
        
        setStep('location_failed');
        setErrorDetail(`Out of bounds. You are ${Math.round(distance)}m away from site "${employeeSite.name}". Allowed radius is ${radius}m.`);
        return;
      }

      setStep('location_success');
      setStatusMessage(`Within boundary of "${employeeSite.name}"!`);
      setLocationName(`Zone: ${currentCoords.lat.toFixed(4)}, ${currentCoords.lng.toFixed(4)}`);

      setTimeout(() => {
        setStep('facial_scanning');
        setStatusMessage("Initializing camera for biometric verification...");
        startCamera(facingMode);
      }, 1500);

    } catch (err: any) {
      console.error("Verification error", err);
      setStep('location_failed');
      setErrorDetail(err.message || "Failed to verify location with operational server.");
    }
  };

  const handleSimulateGPS = async () => {
    if (!selectedEmployee) return;
    setStep('checking_location');
    setStatusMessage("Simulating GPS coordinates...");
    setErrorDetail("");
    
    try {
      const employeeSite = sites.find(s => s.id === selectedEmployee.siteId);
      if (!employeeSite) {
        setStep('location_failed');
        setErrorDetail("No operational site assigned to this employee. Cannot simulate GPS.");
        return;
      }
      
      const simulatedCoords = {
        lat: employeeSite.latitude || 10.762,
        lng: employeeSite.longitude || 106.682
      };
      
      setCoords(simulatedCoords);
      setStep('location_success');
      setStatusMessage(`[SIMULATED] Located at "${employeeSite.name}"`);
      setLocationName(`Zone: ${simulatedCoords.lat.toFixed(4)}, ${simulatedCoords.lng.toFixed(4)} (Simulated)`);
      
      setTimeout(() => {
        setStep('facial_scanning');
        setStatusMessage("Initializing camera for biometric verification...");
        startCamera(facingMode);
      }, 1500);
      
    } catch (err: any) {
      console.error("Simulation error", err);
      setStep('location_failed');
      setErrorDetail("Failed to retrieve site coordinates for simulation.");
    }
  };

  const resetVerification = () => {
    stopCamera();
    setStep('idle');
    setPhotoPreview(null);
    setStatusMessage("");
    setErrorDetail("");
    setCoords(null);
    setLocationName("");
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
    setStep('verifying_face');
    setStatusMessage("Analyzing face biometrics...");
    setSubmitting(true);

    try {
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
      if (coords?.lat) formData.append('latitude', coords.lat.toString());
      if (coords?.lng) formData.append('longitude', coords.lng.toString());
      if (proofBlob) {
        formData.append('biometricProof', proofBlob, `manager-verification-${selectedEmployee.id}-${Date.now()}.jpg`);
      }

      await submitManagerLog(formData);
      
      setStep('complete');
      setStatusMessage(type === 'CLOCK_IN' ? 'Clock In Success!' : 'Clock Out Success!');
      
      // Reset state and reload
      setTimeout(async () => {
        setSelectedEmployee(null);
        await loadData();
      }, 2000);
    } catch (err: any) {
      setStep('failed');
      setErrorDetail(err.message || 'Verification and log submission failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [empList, attList, sitesList] = await Promise.all([
        fetchEmployees(),
        fetchAllLogs(),
        fetchSites()
      ]);
      
      // Filter for employees in manager's site (if manager)
      const siteId = user?.siteId;
      const isAdmin = user?.role === 'ADMIN';
      const filteredEmps = Array.isArray(empList) 
        ? empList.filter(e => e.role !== 'ADMIN' && e.id !== user?.id && (isAdmin || !siteId || e.siteId === siteId))
        : [];
        
      setEmployees(filteredEmps);
      setSites(Array.isArray(sitesList) ? sitesList : []);
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

  const handleMyClockAction = () => {
    if (!user) return;
    setSelectedEmployee(user);
  };

  const filteredEmployees = employees.filter(emp => {
    const s = searchTerm.toLowerCase();
    const matchesSearch = `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(s) || 
           emp.employeeId?.toLowerCase().includes(s);
    const matchesSite = selectedSite === 'all' || emp.siteId === selectedSite;
    return matchesSearch && matchesSite;
  });

  const getActiveSession = (empId: string) => {
    return attendance.find(a => a.employeeId === empId && !a.clockOut);
  };

  const handleRetake = () => {
    setPhotoPreview(null);
    setVerificationStatus('idle');
    setStep('facial_scanning');
    startCamera(facingMode);
  };

  const selectedEmpLogs = selectedEmployee ? attendance.filter(log => {
    const dateObj = new Date(log.date || log.clockIn);
    const logDateStr = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj.getDate().toString().padStart(2, '0')}`;
    const todayStr = selectedDate;
    return log.employeeId === selectedEmployee.id && logDateStr === todayStr;
  }) : [];

  const activeSessionForSelected = selectedEmployee ? selectedEmpLogs.find(l => !l.clockOut) : null;

  if (loading) return <div className="manager-att-loader">Initializing Biometric Node...</div>;



  return (
    <div className="enterprise-page manager-att-page">
      <header className="main-header-row">
        <div className="title-section">
          <div>
            <h1>Site Attendance</h1>
            <p>Proxy logging & workforce control</p>
          </div>
        </div>

        <div className="filter-controls">
          

          

          {/* Date picker button removed */}
        </div>
      </header>

      <div className={`manager-att-grid ${selectedEmployee ? 'has-selected' : ''}`}>
        <div className="emp-selection-card glass-card">
          <div className="search-employee">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="matrix-search-input"
            />
          </div>
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
                    {emp.avatar ? <img src={emp.avatar.startsWith('http') ? emp.avatar : `${API_URL}${emp.avatar}`} alt="" /> : <User size={20} />}
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
                  <h3>Attendance for {selectedEmployee.firstName}</h3>
                </div>

                {step === 'idle' ? (
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%', gap: '16px' }}>
                    {/* Today's Shift Record Summary */}
                    <div className="selected-employee-status-box" style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px', 
                      background: 'var(--highlight)', 
                      padding: '16px', 
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      width: '100%'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                          {selectedDate === new Date().toISOString().split('T')[0] 
                            ? "TODAY'S SHIFT RECORD" 
                            : `${new Date(selectedDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }).toUpperCase()}'S SHIFT RECORD`
                          }
                        </span>
                        <span className={`status-badge-premium ${activeSessionForSelected ? 'online' : 'offline'}`} style={{ 
                          fontSize: '10px', 
                          padding: '2px 8px', 
                          borderRadius: '12px',
                          background: activeSessionForSelected ? 'var(--success-bg)' : 'var(--border)',
                          color: activeSessionForSelected ? 'var(--success)' : 'var(--text-tertiary)',
                          fontWeight: 700
                        }}>
                          {activeSessionForSelected ? 'ON DUTY' : 'OFF DUTY'}
                        </span>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-tertiary)' }}>Clock In</label>
                          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                            {selectedEmpLogs.length > 0 && selectedEmpLogs[selectedEmpLogs.length - 1].clockIn 
                              ? new Date(selectedEmpLogs[selectedEmpLogs.length - 1].clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : '--:--'}
                          </strong>
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-tertiary)' }}>Clock Out</label>
                          <strong style={{ fontSize: '14px', color: 'var(--text-primary)' }}>
                            {selectedEmpLogs.length > 0 && selectedEmpLogs[0].clockOut
                              ? new Date(selectedEmpLogs[0].clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : activeSessionForSelected 
                              ? 'Active Session' 
                              : '--:--'}
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* Today's Clocking Logs History */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px', 
                      background: 'var(--highlight)', 
                      padding: '16px', 
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      width: '100%',
                      maxHeight: '160px',
                      overflowY: 'auto'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <Clock size={14} color="var(--primary)" />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                          {selectedDate === new Date().toISOString().split('T')[0] 
                            ? "TODAY'S CLOCKING LOGS" 
                            : `${new Date(selectedDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short' }).toUpperCase()}'S CLOCKING LOGS`
                          }
                        </span>
                        <span style={{ 
                          fontSize: '10px', 
                          background: 'rgba(255,255,255,0.04)', 
                          padding: '2px 8px', 
                          borderRadius: '8px', 
                          marginLeft: 'auto', 
                          color: 'var(--text-secondary)', 
                          fontWeight: 700 
                        }}>
                          {selectedEmpLogs.length} / 5 limit
                        </span>
                      </div>

                      {selectedEmpLogs.length === 0 ? (
                        <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', textAlign: 'center', padding: '12px 0' }}>
                          No attendance logs recorded for today.
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {selectedEmpLogs.map((log, idx) => (
                            <div key={log.id || idx} style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between', 
                              padding: '8px 12px', 
                              background: 'rgba(255, 255, 255, 0.02)', 
                              border: '1px solid var(--border)', 
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span style={{ color: 'var(--text-tertiary)', fontWeight: 700 }}>#{selectedEmpLogs.length - idx}</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                                  {log.clockIn ? new Date(log.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '--:--'}
                                </span>
                                <span style={{ color: 'var(--text-tertiary)' }}>→</span>
                                <span style={{ color: log.clockOut ? 'var(--text-primary)' : '#10b981', fontWeight: 600 }}>
                                  {log.clockOut ? new Date(log.clockOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Active Session'}
                                </span>
                              </div>
                              {log.verified && (
                                <span style={{ fontSize: '10px', color: '#10b981', background: 'rgba(16, 185, 129, 0.08)', padding: '2px 6px', borderRadius: '6px', fontWeight: 700 }}>
                                  VERIFIED
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Workplace details */}
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '8px', 
                      background: 'var(--highlight)', 
                      padding: '16px', 
                      borderRadius: '12px',
                      border: '1px solid var(--border)',
                      width: '100%'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={14} color="var(--primary)" />
                        <span style={{ fontSize: '11px', fontWeight: 800, color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>ASSIGNED WORKPLACE</span>
                      </div>
                      <div style={{ marginTop: '2px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {sites.find(s => s.id === selectedEmployee.siteId)?.name || 'No Site Assigned'}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', display: 'flex', gap: '8px' }}>
                          <span>Geofence: {sites.find(s => s.id === selectedEmployee.siteId)?.geofenceRadius || 500}m</span>
                          <span>•</span>
                          <span>Lat: {sites.find(s => s.id === selectedEmployee.siteId)?.latitude || '0.00'}, Lng: {sites.find(s => s.id === selectedEmployee.siteId)?.longitude || '0.00'}</span>
                        </div>
                      </div>
                    </div>



                    <div style={{ width: '100%', marginTop: 'auto', paddingTop: '10px' }}>
                      <button 
                        className="btn-start-camera" 
                        onClick={handleStartVerification}
                        disabled={submitting}
                        style={{ width: '100%', height: '52px', fontSize: '15px' }}
                      >
                        <MapPin size={18} />
                        <span>Verify Location & Start Log</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="inline-verification-stepper">
                    <div className="stepper-header">
                      <span className="stepper-title">VERIFICATION: CLOCK-{activeSessionForSelected ? 'OUT' : 'IN'}</span>
                      <button className="stepper-cancel-btn" onClick={resetVerification}>Cancel</button>
                    </div>

                    <div className="stepper-progress">
                      <div className={`step-dot ${step !== 'checking_location' && step !== 'location_failed' ? 'active' : 'current'}`}>
                        1
                      </div>
                      <div className="step-line"></div>
                      <div className={`step-dot ${step === 'facial_scanning' || step === 'complete' || (step === 'failed' && errorDetail.toLowerCase().includes('camera')) ? 'current' : ''} ${step === 'complete' ? 'active' : ''}`}>
                        2
                      </div>
                    </div>

                    <div className="stepper-content" style={{ minHeight: '260px' }}>
                      {step === 'checking_location' && (
                        <div className="step-body location-checking-flow">
                          <div className="radar-animation">
                            <div className="radar-circle"></div>
                            <MapPin size={24} className="radar-pin" />
                          </div>
                          <p className="step-status">{statusMessage}</p>
                        </div>
                      )}

                      {step === 'location_success' && (
                        <div className="step-body success-flow animate-fade-in">
                          <div className="pulse-success-ring">
                            <UserCheck size={24} />
                          </div>
                          <p className="step-status success-txt">{statusMessage}</p>
                        </div>
                      )}

                      {step === 'location_failed' && (
                        <div className="step-body error-flow animate-fade-in">
                          <div className="error-triangle-icon">⚠️</div>
                          <p className="step-status error-txt">Location Check Failed</p>
                          <p className="step-detail">{errorDetail}</p>
                          <div className="stepper-actions">
                            <button className="btn-stepper-retry" onClick={handleStartVerification}>Retry GPS Check</button>
                            {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                              <button className="btn-stepper-simulate" onClick={handleSimulateGPS}>Simulate GPS</button>
                            )}
                            <button className="btn-stepper-cancel" onClick={resetVerification}>Cancel</button>
                          </div>
                        </div>
                      )}

                      {step === 'facial_scanning' && (
                        <div className="step-body camera-inline-flow">
                          <div className="camera-inline-frame" style={{ width: '150px', height: '150px' }}>
                            <video 
                              ref={videoRef} 
                              autoPlay 
                              playsInline 
                              muted 
                              style={{ transform: facingMode === 'user' ? 'scaleX(-1)' : 'none' }}
                            />
                            <div className="camera-laser-scanner"></div>
                          </div>
                          <p className="step-status" style={{ fontSize: '13px', margin: '4px 0' }}>{statusMessage}</p>
                          <div className="stepper-actions" style={{ gap: '8px' }}>
                            <button className="btn-stepper-retry" onClick={handleCaptureAndVerify} disabled={submitting}>
                              {submitting ? 'Verifying...' : `Capture & Verify`}
                            </button>
                            <button className="btn-stepper-cancel" onClick={handleFlipCamera}>Flip Camera</button>
                          </div>
                        </div>
                      )}

                      {step === 'verifying_face' && (
                        <div className="step-body success-flow animate-fade-in">
                          <Loader2 size={36} className="spinner" />
                          <p className="step-status">{statusMessage}</p>
                        </div>
                      )}

                      {step === 'complete' && (
                        <div className="step-body success-flow animate-fade-in">
                          <div className="pulse-success-ring">
                            <UserCheck size={24} />
                          </div>
                          <p className="step-status success-txt">{statusMessage}</p>
                        </div>
                      )}

                      {step === 'failed' && (
                        <div className="step-body error-flow animate-fade-in">
                          <div className="error-triangle-icon">❌</div>
                          <p className="step-status error-txt">Verification Failed</p>
                          <p className="step-detail">{errorDetail}</p>
                          <div className="stepper-actions">
                            <button className="btn-stepper-retry" onClick={() => {
                              setStep('facial_scanning');
                              setStatusMessage("Initializing biometric camera...");
                              startCamera(facingMode);
                            }}>Retry Scan</button>
                            <button className="btn-stepper-cancel" onClick={resetVerification}>Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {!selectedEmployee.avatar && step === 'facial_scanning' && (
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
            <div className="profile-details-mini">
              <h3>{user?.firstName} {user?.lastName}</h3>
              <p className="role-text">{user?.jobTitle || 'System Administrator'}</p>
              {user?.isBiometricEnrolled && (
                <div className="biometric-verified-badge">
                  <Shield size={14} className="verified-icon" />
                  <span>BIOMETRIC SECURED</span>
                </div>
              )}
            </div>
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

                {isMyClockedIn && myTodayLogs[0] && (
                  <div className="manager-duty-info" style={{
                    width: '100%',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '16px',
                    padding: '16px',
                    marginTop: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>CLOCKED IN TIME</span>
                      <strong style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                        {new Date(myTodayLogs[0].clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: '10px' }}>
                      <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>CURRENT SHIFT TIME</span>
                      <strong style={{ fontSize: '13px', color: 'var(--primary)' }}>
                        {myElapsedTime || "0h 0m"}
                      </strong>
                    </div>
                  </div>
                )}
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
