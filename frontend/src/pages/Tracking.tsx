import { motion } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Filter,
  Activity,
  AlertTriangle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchLiveTracking } from '../api/api';
import './Tracking.css';

// Fix for Leaflet marker icons in React
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
const siteIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const empIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const Tracking = () => {
  const [data, setData] = useState<{sites: any[], activeEmployees: any[]}>({ sites: [], activeEmployees: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrackingData();
    const interval = setInterval(loadTrackingData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const loadTrackingData = async () => {
    try {
      const result = await fetchLiveTracking();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Default center (use first site or fallback)
  const mapCenter: [number, number] = data.sites.length > 0 
    ? [data.sites[0].latitude || 0, data.sites[0].longitude || 0]
    : [20.5937, 78.9629]; // Center of India fallback

  return (
    <div className="tracking-page">
      <header className="page-header">
        <div>
          <h1>Live Workforce Tracking</h1>
          <p className="subtitle">Real-time GPS monitoring and site presence verification</p>
        </div>
        <div className="live-status">
          <div className="pulse-dot"></div>
          <span>LIVE FEED</span>
        </div>
      </header>

      <div className="tracking-layout">
        <div className="glass-card map-container">
          {!loading && (
            <MapContainer center={mapCenter} zoom={13} style={{ height: '100%', width: '100%', borderRadius: '16px' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* Render Sites */}
              {data.sites.map(site => (
                <Marker key={site.id} position={[site.latitude || 0, site.longitude || 0]} icon={siteIcon}>
                  <Popup>
                    <div className="map-popup">
                      <strong>Hub: {site.name}</strong><br/>
                      {site.location}
                    </div>
                  </Popup>
                </Marker>
              ))}

              {/* Render Active Employees */}
              {data.activeEmployees.map(log => (
                <Marker key={log.id} position={[log.latitude || 0, log.longitude || 0]} icon={empIcon}>
                  <Popup>
                    <div className="map-popup">
                      <strong>{log.employee.firstName} {log.employee.lastName}</strong><br/>
                      {log.employee.designation}<br/>
                      Status: Clocked In
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          )}
        </div>

        <div className="tracking-sidebar">
          <div className="glass-card active-list">
            <div className="list-header">
              <h3>Active Employees</h3>
              <span className="badge badge-active">{data.activeEmployees.length} Online</span>
            </div>
            <div className="employees-scroll">
              {data.activeEmployees.map((log) => (
                <div key={log.id} className="tracking-item">
                  <div className="tracking-item-header">
                    <div className="user-dot active"></div>
                    <span className="user-name">{log.employee.firstName} {log.employee.lastName}</span>
                  </div>
                  <div className="tracking-item-details">
                    <span>{log.employee.designation}</span>
                    <span>Clock-in: {new Date(log.clockIn).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>
              ))}
              {data.activeEmployees.length === 0 && (
                <p className="no-data">No active employees on site.</p>
              )}
            </div>
          </div>

          <div className="glass-card alert-panel">
            <div className="list-header">
              <h3>System Alerts</h3>
              <Activity size={18} color="var(--primary)" />
            </div>
            <div className="alert-item">
              <span className="alert-time">Today</span>
              <p>All sites operational. Tracking feed active.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
