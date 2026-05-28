import React from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from './AdminDashboard';
import EmployeeDashboard from './EmployeeDashboard';

const Dashboard = () => {
  const { user } = useAuth();
  
  if (user?.role === 'ADMIN' || user?.role === 'MANAGER') {
    return <AdminDashboard />;
  }
  
  return <EmployeeDashboard />;
};

export default Dashboard;
