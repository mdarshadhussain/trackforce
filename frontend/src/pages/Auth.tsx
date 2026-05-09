import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Shield } from 'lucide-react';

import { Link } from 'react-router-dom';
import './Auth.css';

export const Login = () => {
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

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Email Address</label>
              <div className="input-wrapper">
                <Mail size={18} />
                <input type="email" placeholder="name@company.com" />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input type="password" placeholder="••••••••" />
              </div>
            </div>

            <div className="auth-actions">
              <label className="checkbox-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot Password?</a>
            </div>

            <button className="btn btn-primary btn-block">
              Sign In <ArrowRight size={18} />
            </button>

          </form>

          <div className="auth-divider">
            <span>or continue with</span>
          </div>

          <button className="btn btn-ghost btn-block">
            <Shield size={18} /> Enterprise SSO
          </button>


          <p className="auth-footer">
            Don't have an account? <Link to="/register">Create one now</Link>
          </p>
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

export const Register = () => {
  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="auth-card glass-card"
        >
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Join 500+ enterprises managing workforce with TrackForce.</p>
          </div>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User size={18} />
                <input type="text" placeholder="Alex Rivera" />
              </div>
            </div>

            <div className="form-group">
              <label>Work Email</label>
              <div className="input-wrapper">
                <Mail size={18} />
                <input type="email" placeholder="alex@company.com" />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input type="password" placeholder="Create a strong password" />
              </div>
            </div>

            <button className="btn btn-primary btn-block">
              Create Account <ArrowRight size={18} />
            </button>


          </form>

          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign in</Link>
          </p>
        </motion.div>
      </div>
      <div className="auth-visual register-visual">
        <div className="visual-content">
          <h3>Build Your Workforce</h3>
          <p>Monitor, analyze, and optimize from anywhere in the world.</p>
        </div>
      </div>
    </div>
  );
};
