import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar,
  Wallet,
  User,
  UserCheck,
  Building2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import './MobileNav.css';

const MobileNav = () => {
  const { user, isAdmin } = useAuth();
  const location = useLocation();
  const { t } = useTranslation();
  const isEmployee = user?.role === 'EMPLOYEE';
  const isManager = user?.role === 'MANAGER' || isAdmin;

  // Build tabs based on role — max 5 tabs
  const tabs = isEmployee
    ? [
        { icon: <LayoutDashboard size={22} />, label: t('dashboard'), path: '/dashboard' },
        { icon: <Calendar size={22} />, label: t('attendance'), path: '/attendance' },
        { icon: <Wallet size={22} />, label: t('payrollHistory'), path: '/payroll' },
        { icon: <Building2 size={22} />, label: t('sites'), path: '/sites' },
        { icon: <User size={22} />, label: t('profile'), path: '/profile' },
      ]
    : user?.role === 'MANAGER'
    ? [
        { icon: <Calendar size={22} />, label: t('attendance'), path: '/attendance' },
        { icon: <UserCheck size={22} />, label: t('siteAttendance'), path: '/attendance/manager' },
        { icon: <Building2 size={22} />, label: t('sites'), path: '/sites' },
        { icon: <User size={22} />, label: t('profile'), path: '/profile' },
      ]
    : [
        { icon: <LayoutDashboard size={22} />, label: t('dashboard'), path: '/dashboard' },
        { icon: <UserCheck size={22} />, label: t('siteAttendance'), path: '/attendance/manager' },
        { icon: <Calendar size={22} />, label: t('attendance'), path: '/attendance' },
        { icon: <Wallet size={22} />, label: t('payroll'), path: '/payroll' },
        { icon: <User size={22} />, label: t('profile'), path: '/profile' },
      ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      {tabs.map(tab => {
        const isActive = location.pathname === tab.path || 
          (tab.path !== '/dashboard' && location.pathname.startsWith(tab.path));
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`mobile-nav-tab ${isActive ? 'active' : ''}`}
            aria-label={tab.label}
          >
            <div className="mobile-nav-icon">
              {tab.icon}
              {isActive && <span className="nav-active-dot" />}
            </div>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileNav;
