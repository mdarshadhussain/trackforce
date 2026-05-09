import React, { useState } from 'react';
import { X, User, Briefcase, MapPin, Shield, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (employee: any) => void;
}

const AddEmployeeModal = ({ isOpen, onClose, onAdd }: AddEmployeeModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: '',
    role: 'USER',
    siteId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card modal-content"
          >
            <div className="modal-header">
              <h3>Add New Employee</h3>
              <button onClick={onClose} className="icon-btn"><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <div className="input-with-icon">
                    <User size={16} />
                    <input 
                      type="text" 
                      required 
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      placeholder="John" 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <div className="input-with-icon">
                    <User size={16} />
                    <input 
                      type="text" 
                      required 
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      placeholder="Doe" 
                    />
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john.doe@company.com" 
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Designation</label>
                  <div className="input-with-icon">
                    <Briefcase size={16} />
                    <input 
                      type="text" 
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                      placeholder="Security Officer" 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Access Level</label>
                  <div className="input-with-icon">
                    <Shield size={16} />
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                    >
                      <option value="USER">Standard Employee</option>
                      <option value="ADMIN">Administrator</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label>Default Assignment (Site)</label>
                <div className="input-with-icon">
                  <MapPin size={16} />
                  <select 
                    value={formData.siteId}
                    onChange={(e) => setFormData({...formData, siteId: e.target.value})}
                  >
                    <option value="">Select a hub...</option>
                    <option value="site_1">North Hub HQ</option>
                    <option value="site_2">West Side Distribution</option>
                  </select>
                </div>
              </div>

              <div className="face-enrollment-box">
                <Camera size={24} />
                <div>
                  <h4>Face ID Enrollment</h4>
                  <p>Employee will be prompted to enroll biometric data on first login.</p>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={onClose} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary">Create Employee Profile</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AddEmployeeModal;
