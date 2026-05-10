import { motion } from 'framer-motion';
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Filter,
  Download,
  CheckCircle2,
  XCircle,
  Clock
} from 'lucide-react';
import './Employees.css';

import { useEffect, useState } from 'react';
import { fetchEmployees } from '../api/api';

import AddEmployeeModal from '../components/AddEmployeeModal';

import { useAuth } from '../context/AuthContext';

const Employees = () => {
  const { user, isAdmin } = useAuth();
  const isManagement = isAdmin || user?.role === 'MANAGER';
  const [employees, setEmployees] = useState<any[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(emp => 
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (emp.designation || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const loadEmployees = async () => {
    try {
      const data = await fetchEmployees();
      setEmployees(data);
      setFilteredEmployees(data);
    } catch (err) {
      setError('Failed to load employees');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (newEmp: any) => {
    try {
      const created = await createEmployee(newEmp);
      setEmployees([...employees, created]);
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || 'Failed to add employee');
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this employee?')) return;
    
    try {
      await deleteEmployee(id);
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete employee');
    }
  };

  if (loading) return <div className="loading-state">Loading workforce...</div>;
  if (error) return <div className="error-state">{error}</div>;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="employees-container"
    >
      <header className="glass-card profile-header" style={{ marginBottom: 'var(--spacing-xl)' }}>
        <div className="profile-main">
          <div className="profile-avatar">
            <UserPlus size={24} />
          </div>
          <div className="profile-info">
            <h2>Workforce Management</h2>
            <p className="subtitle">Manage your {employees.length} active employees and site assignments</p>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn btn-ghost">
            <Download size={18} />
            Export CSV
          </button>
          {isManagement && (
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              + Add New Employee
            </button>
          )}
        </div>
      </header>

      <div className="glass-card table-controls">
        <div className="search-bar">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search by name, ID or department..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-actions">
          <button className="filter-btn">
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      <div className="glass-card table-container">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>ID</th>
              <th>Dept / Role</th>
              <th>Assigned Site</th>
              <th>Face ID</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>
                  <div className="emp-info">
                    <div className="emp-avatar">{emp.firstName.charAt(0)}</div>
                    <span>{emp.firstName} {emp.lastName}</span>
                  </div>
                </td>
                <td><span className="mono">{emp.employeeId}</span></td>
                <td>
                  <div className="dept-role">
                    <span className="dept">{emp.designation || 'General'}</span>
                    <span className="role">{emp.role}</span>
                  </div>
                </td>
                <td>{emp.site?.name || 'Unassigned'}</td>
                <td>
                  <span className="face-status enrolled">
                    <CheckCircle2 size={14} /> Enrolled
                  </span>
                </td>
                <td>
                  <span className={`status-pill ${emp.status.toLowerCase().replace('_', '-')}`}>
                    {emp.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    {isAdmin && (
                      <button className="icon-btn" onClick={() => handleDeleteEmployee(emp.id)} title="Delete Employee">
                        <XCircle size={18} color="var(--error)" />
                      </button>
                    )}
                    <button className="icon-btn">
                      <MoreHorizontal size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddEmployee}
      />
    </motion.div>
  );
};

export default Employees;

