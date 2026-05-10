import { Search, Bell, User, Sun, Moon, LogOut, Menu, X, Shield, LayoutDashboard, Users, Clock, MapPin, Wallet, Building2, Settings, Calendar } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { user, isAdmin, logout } = useAuth();
  const isManager = user?.role === 'MANAGER' || isAdmin;

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    // Admins and Managers can see the employee list
    ...(isManager ? [{ icon: <Users size={20} />, label: 'Employees', path: '/employees' }] : []),
    // Admins and Managers see full Attendance
    { icon: <Calendar size={20} />, label: 'Attendance', path: '/attendance' },
    // Only Admins see Live Tracking (GPS)
    ...(isAdmin ? [{ icon: <MapPin size={20} />, label: 'Live Tracking', path: '/tracking' }] : []),
    // Admins and Managers see Payroll
    ...(isManager ? [{ icon: <Wallet size={20} />, label: 'Payroll', path: '/payroll' }] : []),
    // Sites are for management
    ...(isManager ? [{ icon: <Building2 size={20} />, label: 'Sites', path: '/sites' }] : []),
  ];

  return (
    <aside className="sidebar">
      <div className="logo-section">
        <Shield className="logo-icon" size={32} color="var(--primary)" />
        <span className="logo-text">Track<span>Force</span></span>
        <button className="mobile-close-btn" onClick={onClose}>
          <X size={24} />
        </button>
      </div>



      <nav className="nav-menu">
        {menuItems.map((item) => (
          <NavLink 
            key={item.path} 
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/settings" className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
        <button onClick={logout} className="nav-item logout-btn-sidebar" style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}>
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
