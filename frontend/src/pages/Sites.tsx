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
import './Sites.css';

import { useEffect, useState } from 'react';
import { fetchSites, updateSiteCoordinates } from '../api/api';

const Sites = () => {
  const [sites, setSites] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    try {
      const data = await fetchSites();
      setSites(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSetLocation = async (siteId: string) => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        await updateSiteCoordinates(siteId, latitude, longitude);
        alert("Hub location updated successfully!");
        loadSites(); // Refresh data
      } catch (err: any) {
        alert(err.message);
      }
    }, (error) => {
      alert("Please allow location access to set hub coordinates.");
    });
  };

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
                    <span className="status-dot active"></span>
                    ACTIVE
                  </div>
                  <button className="icon-btn-small"><MoreVertical size={16} /></button>
                </div>
                
                <div className="site-card-body">
                  <h3>{site.name}</h3>
                  <p className="address">{site.location}</p>
                  
                  <div className="site-stats-row">
                    <div className="site-stat">
                      <Users size={14} />
                      <span>{site._count?.employees || 0} Employees</span>
                    </div>
                    <div className="site-stat">
                      <Shield size={14} />
                      <span>300m Fence</span>
                    </div>
                  </div>
                  
                  {site.latitude && site.latitude !== 0 ? (
                    <div className="coord-badge">
                      📍 {site.latitude.toFixed(4)}, {site.longitude.toFixed(4)}
                    </div>
                  ) : (
                    <div className="coord-badge warning">
                      ⚠️ No Geofence Set
                    </div>
                  )}
                </div>

                <div className="site-card-footer">
                  <button className="btn-text" onClick={() => handleSetLocation(site.id)}>
                    <MapPin size={14} /> Set Hub Location
                  </button>
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
