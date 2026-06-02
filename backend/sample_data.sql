
-- Insert Sites
INSERT INTO Site (id, name, location, displayAddress, latitude, longitude, geofenceRadius, managerName, createdAt, updatedAt)
VALUES ('571f1e76-b71a-4bb8-ac06-8b625d8863dc', 'Lakeside Logistics Hub', 'Chicago, IL', '100 Lake St, Chicago IL', 34.0522, -118.2437, 300, 'James Wilson', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO Site (id, name, location, displayAddress, latitude, longitude, geofenceRadius, managerName, createdAt, updatedAt)
VALUES ('f81bb985-cf74-4156-a7b5-24fecccf6454', 'Skyline Corporate Park', 'New York, NY', '200 Sky Ave, NY', 40.7128, -74.0060, 500, 'Maria Garcia', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Insert Sample Manager & Employees (Password for all: password123)
INSERT INTO Employee (id, employeeId, firstName, lastName, email, password, plainPassword, role, siteId, hourlyRate, designation, status, isBiometricEnrolled, createdAt, updatedAt)
VALUES ('e3d04cad-65be-47fd-9416-1691c63ae061', 'TF002', 'James', 'Wilson', 'james.wilson@trackforce.com', '$2b$10$DE5TNXAQclMSCJ9fgpdQ2.JWXzc1YTeVEs7uwjU6SeOWxPYrr4ob6', 'password123', 'MANAGER', '571f1e76-b71a-4bb8-ac06-8b625d8863dc', 85.0, 'Site Manager', 'ACTIVE', 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO Employee (id, employeeId, firstName, lastName, email, password, plainPassword, role, siteId, hourlyRate, designation, status, isBiometricEnrolled, createdAt, updatedAt)
VALUES ('059542fa-275d-47fa-9874-e2ba02533367', 'TF003', 'John', 'Smith', 'john.smith@trackforce.com', '$2b$10$DE5TNXAQclMSCJ9fgpdQ2.JWXzc1YTeVEs7uwjU6SeOWxPYrr4ob6', 'password123', 'EMPLOYEE', '571f1e76-b71a-4bb8-ac06-8b625d8863dc', 25.0, 'Field Technician', 'ACTIVE', 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO Employee (id, employeeId, firstName, lastName, email, password, plainPassword, role, siteId, hourlyRate, designation, status, isBiometricEnrolled, createdAt, updatedAt)
VALUES ('0ad9e86b-8d00-47c8-8985-20a467e70669', 'TF004', 'Emily', 'Davis', 'emily.davis@trackforce.com', '$2b$10$DE5TNXAQclMSCJ9fgpdQ2.JWXzc1YTeVEs7uwjU6SeOWxPYrr4ob6', 'password123', 'EMPLOYEE', 'f81bb985-cf74-4156-a7b5-24fecccf6454', 30.0, 'Inventory Specialist', 'ACTIVE', 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Insert Sample Attendance
INSERT INTO Attendance (id, employeeId, siteId, date, clockIn, clockOut, status, createdAt, updatedAt)
VALUES ('2d3cc744-a0e5-43b8-974c-b31c0be1cbd0', '059542fa-275d-47fa-9874-e2ba02533367', '571f1e76-b71a-4bb8-ac06-8b625d8863dc', '2026-06-01 08:00:00.000', '2026-06-01 08:05:00.000', '2026-06-01 17:00:00.000', 'PRESENT', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO Attendance (id, employeeId, siteId, date, clockIn, clockOut, status, createdAt, updatedAt)
VALUES ('3e98ef4f-3ff6-4e57-b38f-906ff59ea0c5', '0ad9e86b-8d00-47c8-8985-20a467e70669', 'f81bb985-cf74-4156-a7b5-24fecccf6454', '2026-06-01 09:15:00.000', '2026-06-01 09:15:00.000', '2026-06-01 17:30:00.000', 'LATE', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Insert Security Alerts
INSERT INTO SecurityAlert (id, type, message, severity, employeeId, siteId, timestamp)
VALUES ('bb30b6fb-884b-411a-8b23-7d85e5136b46', 'GEOFENCE_VIOLATION', 'Employee John Smith triggered a threshold alert.', 'HIGH', '059542fa-275d-47fa-9874-e2ba02533367', '571f1e76-b71a-4bb8-ac06-8b625d8863dc', CURRENT_TIMESTAMP(3));

-- Insert Tracking data
INSERT INTO Tracking (id, employeeId, latitude, longitude, timestamp)
VALUES ('7d8eaef1-8bc5-46b1-b11f-42c1d0b03f2a', '059542fa-275d-47fa-9874-e2ba02533367', 34.0532, -118.2447, CURRENT_TIMESTAMP(3));

-- Insert Holiday
INSERT INTO Holiday (id, date, name, createdAt, updatedAt)
VALUES ('e45ce7c8-591d-475b-b994-273a7f83d837', '2026-07-04 00:00:00.000', 'Independence Day', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Insert Sample Payslip
INSERT INTO Payslip (id, employeeId, month, regularHours, overtimeHours, grossPay, netPay, foodAllowance, otherAllowance, taxRate, taxAmount, insurance, advancePayment, otherDeductions, status, createdAt, updatedAt)
VALUES ('c988c758-dc8d-4bef-b55a-b4f5e1367eaa', '059542fa-275d-47fa-9874-e2ba02533367', '2026-05', 160.0, 10.0, 4250.0, 3600.0, 100.0, 50.0, 15.0, 637.5, 100.0, 0.0, 0.0, 'GENERATED', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));
