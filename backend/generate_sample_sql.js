const fs = require('fs');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

async function main() {
    console.log("Hashing password for sample users...");
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    const siteId1 = crypto.randomUUID();
    const siteId2 = crypto.randomUUID();
    
    const empId1 = crypto.randomUUID();
    const empId2 = crypto.randomUUID();
    const empId3 = crypto.randomUUID();

    const sql = `
-- Insert Sites
INSERT INTO Site (id, name, location, displayAddress, latitude, longitude, geofenceRadius, managerName, createdAt, updatedAt)
VALUES ('${siteId1}', 'Lakeside Logistics Hub', 'Chicago, IL', '100 Lake St, Chicago IL', 34.0522, -118.2437, 300, 'James Wilson', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO Site (id, name, location, displayAddress, latitude, longitude, geofenceRadius, managerName, createdAt, updatedAt)
VALUES ('${siteId2}', 'Skyline Corporate Park', 'New York, NY', '200 Sky Ave, NY', 40.7128, -74.0060, 500, 'Maria Garcia', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Insert Sample Manager & Employees (Password for all: password123)
INSERT INTO Employee (id, employeeId, firstName, lastName, email, password, plainPassword, role, siteId, hourlyRate, designation, status, isBiometricEnrolled, createdAt, updatedAt)
VALUES ('${empId1}', 'TF002', 'James', 'Wilson', 'james.wilson@trackforce.com', '${hashedPassword}', 'password123', 'MANAGER', '${siteId1}', 85.0, 'Site Manager', 'ACTIVE', 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO Employee (id, employeeId, firstName, lastName, email, password, plainPassword, role, siteId, hourlyRate, designation, status, isBiometricEnrolled, createdAt, updatedAt)
VALUES ('${empId2}', 'TF003', 'John', 'Smith', 'john.smith@trackforce.com', '${hashedPassword}', 'password123', 'EMPLOYEE', '${siteId1}', 25.0, 'Field Technician', 'ACTIVE', 1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO Employee (id, employeeId, firstName, lastName, email, password, plainPassword, role, siteId, hourlyRate, designation, status, isBiometricEnrolled, createdAt, updatedAt)
VALUES ('${empId3}', 'TF004', 'Emily', 'Davis', 'emily.davis@trackforce.com', '${hashedPassword}', 'password123', 'EMPLOYEE', '${siteId2}', 30.0, 'Inventory Specialist', 'ACTIVE', 0, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Insert Sample Attendance
INSERT INTO Attendance (id, employeeId, siteId, date, clockIn, clockOut, status, createdAt, updatedAt)
VALUES ('${crypto.randomUUID()}', '${empId2}', '${siteId1}', '2026-06-01 08:00:00.000', '2026-06-01 08:05:00.000', '2026-06-01 17:00:00.000', 'PRESENT', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

INSERT INTO Attendance (id, employeeId, siteId, date, clockIn, clockOut, status, createdAt, updatedAt)
VALUES ('${crypto.randomUUID()}', '${empId3}', '${siteId2}', '2026-06-01 09:15:00.000', '2026-06-01 09:15:00.000', '2026-06-01 17:30:00.000', 'LATE', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Insert Security Alerts
INSERT INTO SecurityAlert (id, type, message, severity, employeeId, siteId, timestamp)
VALUES ('${crypto.randomUUID()}', 'GEOFENCE_VIOLATION', 'Employee John Smith triggered a threshold alert.', 'HIGH', '${empId2}', '${siteId1}', CURRENT_TIMESTAMP(3));

-- Insert Tracking data
INSERT INTO Tracking (id, employeeId, latitude, longitude, timestamp)
VALUES ('${crypto.randomUUID()}', '${empId2}', 34.0532, -118.2447, CURRENT_TIMESTAMP(3));

-- Insert Holiday
INSERT INTO Holiday (id, date, name, createdAt, updatedAt)
VALUES ('${crypto.randomUUID()}', '2026-07-04 00:00:00.000', 'Independence Day', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));

-- Insert Sample Payslip
INSERT INTO Payslip (id, employeeId, month, regularHours, overtimeHours, grossPay, netPay, foodAllowance, otherAllowance, taxRate, taxAmount, insurance, advancePayment, otherDeductions, status, createdAt, updatedAt)
VALUES ('${crypto.randomUUID()}', '${empId2}', '2026-05', 160.0, 10.0, 4250.0, 3600.0, 100.0, 50.0, 15.0, 637.5, 100.0, 0.0, 0.0, 'GENERATED', CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));
`;

    fs.writeFileSync('sample_data.sql', sql);
    console.log("sample_data.sql generated successfully!");
}

main().catch(console.error);
