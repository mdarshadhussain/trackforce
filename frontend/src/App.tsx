import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import { Login, Register } from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';
import Tracking from './pages/Tracking';
import Payroll from './pages/Payroll';
import Sites from './pages/Sites';
import Sidebar from './layout/Sidebar';
import Topbar from './layout/Topbar';
import './App.css';

import { RoleProvider, useRole } from './context/RoleContext';

// Simple Layout Wrapper
const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const { role, setRole } = useRole();

  return (
    <div className="app-container">
      <div className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`} onClick={() => setSidebarOpen(false)}></div>
      <div className={`sidebar-wrapper ${sidebarOpen ? 'mobile-open' : ''}`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
      <main className="main-stage">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <div className="content-area">
          {children}
        </div>
        
        <div className="role-badge-float" onClick={() => setRole(role === 'admin' ? 'user' : 'admin')}>
          Viewing as {role === 'admin' ? 'Super Admin' : 'Field Employee'} (Tap to Switch)
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <RoleProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private/Platform Routes */}
          <Route path="/dashboard" element={<PlatformLayout><Dashboard /></PlatformLayout>} />
          <Route path="/employees" element={<PlatformLayout><Employees /></PlatformLayout>} />
          <Route path="/attendance" element={<PlatformLayout><Attendance /></PlatformLayout>} />
          <Route path="/tracking" element={<PlatformLayout><Tracking /></PlatformLayout>} />
          <Route path="/payroll" element={<PlatformLayout><Payroll /></PlatformLayout>} />
          <Route path="/sites" element={<PlatformLayout><Sites /></PlatformLayout>} />

          {/* Redirect any other path to Landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </RoleProvider>
  );
}

export default App;
