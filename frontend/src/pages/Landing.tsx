import { motion } from 'framer-motion';
import { Shield, MapPin, Activity, CheckCircle2, ArrowRight, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="logo-text">TRACK<span>FORCE</span></div>
        
        <button className="landing-mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/login" className="btn btn-ghost" onClick={() => setMobileMenuOpen(false)}>Login</Link>
          <Link to="/register" className="btn btn-primary" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
        </div>
      </nav>

      <section className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="hero-content"
        >
          <span className="hero-badge">The Future of Workforce Management</span>
          <h1>Next-Gen Biometric <span>Attendance & Tracking</span></h1>
          <p>Secure your workforce with face-ID verification, real-time geo-tracking, and intelligent analytics. All in one premium platform.</p>
          <div className="hero-actions">
            <Link to="/dashboard" className="btn btn-primary btn-lg">
              Start Your Free Trial <ArrowRight size={20} />
            </Link>
            <div className="hero-trust">
              <div className="trust-icons">
                <Shield size={16} /> <MapPin size={16} /> <Activity size={16} />
              </div>
              <span>Trusted by 500+ enterprises worldwide</span>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="hero-preview"
        >
          <div className="glass-card preview-card">
            <div className="preview-header">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
            <div className="preview-img-placeholder">
              <div className="scanner-mock">
                <div className="scanner-line-mock"></div>
                <CheckCircle2 size={48} className="verified-icon" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <Shield className="feature-icon" />
          <h3>Biometric Security</h3>
          <p>Advanced face-recognition logic ensures the right person is at the right site.</p>
        </div>
        <div className="feature-card">
          <MapPin className="feature-icon" />
          <h3>Real-time GPS</h3>
          <p>Track field agents and site managers with precision geofencing.</p>
        </div>
        <div className="feature-card">
          <Activity className="feature-icon" />
          <h3>AI Analytics</h3>
          <p>Automatically calculate payroll and identify attendance patterns.</p>
        </div>
      </section>
    </div>
  );
};

export default Landing;
