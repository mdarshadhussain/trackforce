import { Search, Bell, User, Sun, Moon, LogOut, Menu, X, Shield, LayoutDashboard, Users, Clock, MapPin, Wallet, Building2, Settings, Calendar } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useRole } from '../context/RoleContext';
import './Sidebar.css';

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { role } = useRole();
  const isAdmin = role === 'admin';

  const menuItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    ...(isAdmin ? [{ icon: <Users size={20} />, label: 'Employees', path: '/employees' }] : []),
    { icon: <Calendar size={20} />, label: 'Attendance', path: '/attendance' },
    ...(isAdmin ? [{ icon: <MapPin size={20} />, label: 'Live Tracking', path: '/tracking' }] : []),
    { icon: <Wallet size={20} />, label: 'Payroll', path: '/payroll' },
    { icon: <Building2 size={20} />, label: 'Sites', path: '/sites' },
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
      </div>
    </aside>
  );
};

export default Sidebar;
