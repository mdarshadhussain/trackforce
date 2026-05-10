import { motion } from 'framer-motion';
import { User, Lock, ArrowRight, Shield, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/api';
import './Auth.css';

export const Login = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginUser(employeeId, password);
      login(data.user, data.token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="auth-card glass-card"
        >
          <div className="auth-header">
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access the hub.</p>
          </div>

          {error && (
            <div className="auth-error">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Employee ID</label>
              <div className="input-wrapper">
                <User size={18} />
                <input 
                  type="text" 
                  placeholder="e.g. TF001" 
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="auth-actions">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Authenticating...' : 'Sign In'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button className="btn btn-ghost btn-block">
            <Shield size={18} /> Enterprise SSO
          </button>
        </motion.div>
      </div>
      <div className="auth-visual">
        <div className="visual-content">
          <h3>TrackForce Enterprise</h3>
          <p>Secure. Scalable. Sophisticated.</p>
        </div>
      </div>
    </div>
  );
};
