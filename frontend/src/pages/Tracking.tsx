import { motion } from 'framer-motion';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Filter,
  Activity,
  AlertTriangle
} from 'lucide-react';
import './Tracking.css';

const activeEmployees = [
  { id: 1, name: 'Marcus Chen', site: 'North Hub', battery: '84%', speed: 'Walking', lastUpdate: 'Just now', color: '#57f1db' },
  { id: 2, name: 'Elena Rodriguez', site: 'West Site', battery: '42%', speed: 'Stationary', lastUpdate: '3m ago', color: '#d0bcff' },
  { id: 3, name: 'Li Wei', site: 'South Park', battery: '91%', speed: 'Driving', lastUpdate: '1m ago', color: '#38bdf8' },
];

const Tracking = () => {
  return (
    <div className="tracking-page">
      <header className="page-header">
        <div>
          <h1>Live Workforce Tracking</h1>
          <p className="subtitle">Real-time GPS monitoring and site presence verification</p>
        </div>
      </header>

      <div className="tracking-layout">
        <div className="glass-card map-container">
          <div className="map-mock">
            <div className="map-overlay-top">
              <div className="map-search">
                <Search size={16} />
                <input type="text" placeholder="Search employee or site..." />
              </div>
              <div className="map-filters">
                <button className="map-tool"><Filter size={16} /></button>
                <button className="map-tool"><Activity size={16} /></button>
              </div>
            </div>

            {/* Simulated Map Pins */}
            <div className="pin pin-1" style={{ top: '30%', left: '40%' }}>
              <div className="pin-pulse" style={{ backgroundColor: '#57f1db' }}></div>
              <MapPin size={24} color="#57f1db" fill="#003731" />
              <div className="pin-label">Marcus Chen</div>
            </div>
            
            <div className="pin pin-2" style={{ top: '60%', left: '70%' }}>
              <div className="pin-pulse" style={{ backgroundColor: '#d0bcff' }}></div>
              <MapPin size={24} color="#d0bcff" fill="#3c0091" />
              <div className="pin-label">Elena Rodriguez</div>
            </div>

            <div className="geo-fence" style={{ top: '25%', left: '35%', width: '150px', height: '150px' }}>
              <span className="fence-label">North Hub</span>
            </div>

            <div className="map-controls">
              <button>+</button>
              <button>-</button>
              <button><Navigation size={16} /></button>
            </div>
          </div>
        </div>

        <div className="tracking-sidebar">
          <div className="glass-card active-list">
            <div className="list-header">
              <h3>Active Employees</h3>
              <span className="badge badge-active">3 Online</span>
            </div>
            <div className="employees-scroll">
              {activeEmployees.map((emp) => (
                <div key={emp.id} className="tracking-item">
                  <div className="tracking-item-header">
                    <div className="user-dot" style={{ backgroundColor: emp.color }}></div>
                    <span className="user-name">{emp.name}</span>
                    <span className="user-site">{emp.site}</span>
                  </div>
                  <div className="tracking-item-details">
                    <span>{emp.speed}</span>
                    <span>Battery: {emp.battery}</span>
                    <span>{emp.lastUpdate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card alert-panel">
            <div className="list-header">
              <h3>Recent Violations</h3>
              <AlertTriangle size={18} color="#fb7185" />
            </div>
            <div className="alert-item">
              <span className="alert-time">10:45 AM</span>
              <p><strong>James Wilson</strong> exited <strong>West Site</strong> unauthorized.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
