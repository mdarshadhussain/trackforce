import { motion } from 'framer-motion';
import { 
  MapPin, 
  Plus, 
  Search, 
  Activity, 
  Shield, 
  Settings,
  MoreVertical,
  Users
} from 'lucide-react';
import { useState } from 'react';
import './Sites.css';

const mockSites = [
  { id: 'site_1', name: 'North Hub HQ', address: '123 Enterprise Way', employees: 42, status: 'ACTIVE', radius: '500m', alerts: 0 },
  { id: 'site_2', name: 'West Side Distribution', address: '456 Logistics Ave', employees: 28, status: 'ACTIVE', radius: '800m', alerts: 2 },
  { id: 'site_3', name: 'South Park Facility', address: '789 Industry Blvd', employees: 15, status: 'MAINTENANCE', radius: '300m', alerts: 0 },
];

const Sites = () => {
  const [sites, setSites] = useState(mockSites);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="sites-page">
      <header className="page-header-premium">
        <div className="header-text">
          <h1>Operational Hubs</h1>
          <p>Configure geo-fencing and manage site-specific workforce assignments.</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} /> Add New Site
        </button>
      </header>

      <div className="sites-layout">
        <div className="sites-list-section">
          <div className="glass-card search-filter-card">
            <div className="search-box">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Find a site..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="sites-grid">
            {sites.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map((site) => (
              <motion.div 
                key={site.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card site-card"
              >
                <div className="site-card-header">
                  <div className="site-icon-wrapper">
                    <MapPin size={20} />
                  </div>
                  <div className="site-status">
                    <span className={`status-dot ${site.status.toLowerCase()}`}></span>
                    {site.status}
                  </div>
                  <button className="icon-btn-small"><MoreVertical size={16} /></button>
                </div>
                
                <div className="site-card-body">
                  <h3>{site.name}</h3>
                  <p className="address">{site.address}</p>
                  
                  <div className="site-stats-row">
                    <div className="site-stat">
                      <Users size={14} />
                      <span>{site.employees} Employees</span>
                    </div>
                    <div className="site-stat">
                      <Shield size={14} />
                      <span>{site.radius} Fence</span>
                    </div>
                  </div>
                </div>

                <div className="site-card-footer">
                  <button className="btn-text">
                    <Settings size={14} /> Configure Geofence
                  </button>
                  {site.alerts > 0 && (
                    <span className="alert-badge">{site.alerts} Alerts</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="map-preview-section">
          <div className="glass-card map-preview-card">
            <div className="map-header">
              <h3>Geofence Visualization</h3>
              <div className="map-legend">
                <span className="legend-item active">Active</span>
                <span className="legend-item fence">Fence</span>
              </div>
            </div>
            <div className="map-visual-mock">
              {/* Abstract Map Visualization */}
              <div className="visual-circle main-hub"></div>
              <div className="visual-circle sub-hub-1"></div>
              <div className="visual-circle sub-hub-2"></div>
              <div className="map-grid-overlay"></div>
              
              <div className="map-label h1" style={{ top: '40%', left: '45%' }}>HQ</div>
              <div className="map-label h2" style={{ top: '20%', left: '70%' }}>West</div>
              <div className="map-label h3" style={{ top: '70%', left: '20%' }}>South</div>
            </div>
            <div className="map-footer-info">
              <Activity size={16} color="var(--primary)" />
              <span>Real-time GPS data streaming active for all hubs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sites;
