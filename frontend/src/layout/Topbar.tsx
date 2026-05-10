import { Search, Bell, User, Sun, Moon, LogOut, Menu } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Topbar.css';

import { useAuth } from '../context/AuthContext';

const Topbar = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="topbar">
      <button className="mobile-menu-btn" onClick={onMenuClick}>
        <Menu size={24} />
      </button>
      <div className="search-container">

        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search employees, sites, or reports..." />
      </div>

      <div className="topbar-actions">
        <button className="action-btn" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="action-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <button className="action-btn logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={20} />
        </button>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user ? `${user.firstName} ${user.lastName}` : 'Guest'}</span>
            <span className="user-role">{user?.role || 'Guest'}</span>
          </div>
          <div className="avatar">
            <User size={20} />
          </div>
        </div>
      </div>
    </header>
  );
};



export default Topbar;
