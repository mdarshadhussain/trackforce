import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Auth Middleware
const authenticateToken = (req: any, res: any, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token.' });
    req.user = user;
    next();
  });
};

// Admin Check Middleware
const requireAdmin = (req: any, res: any, next: NextFunction) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Forbidden. Admin access required.' });
  }
  next();
};

// Helper: Haversine formula to calculate distance between two points in meters
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // returns distance in meters
}

// --- Auth Routes ---

// Login (Updated to use employeeId)
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { employeeId, password } = req.body;

  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId },
      include: { site: true }
    });

    if (!employee) {
      return res.status(400).json({ error: 'Invalid Employee ID or password' });
    }

    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid Employee ID or password' });
    }

    const token = jwt.sign(
      { id: employee.id, employeeId: employee.employeeId, role: employee.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    const { password: _, ...userWithoutPassword } = employee;
    res.json({
      token,
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Admin Management Routes ---

// Add new employee (Admin only)
app.post('/api/employees', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const { employeeId, firstName, lastName, email, password, role, designation, siteId } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password || 'password123', 10);
    const newEmployee = await prisma.employee.create({
      data: {
        employeeId,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: role || 'EMPLOYEE',
        designation,
        siteId
      }
    });
    const { password: _, ...userWithoutPassword } = newEmployee;
    res.status(201).json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create employee. ID or Email might already exist.' });
  }
});

// Update employee (Admin only)
app.put('/api/employees/:id', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updated = await prisma.employee.update({
      where: { id },
      data
    });
    const { password: _, ...userWithoutPassword } = updated;
    res.json(userWithoutPassword);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update employee' });
  }
});

// Delete employee (Admin only)
app.delete('/api/employees/:id', authenticateToken, requireAdmin, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.employee.delete({ where: { id } });
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete employee' });
  }
});

// Get all sites
app.get('/api/sites', authenticateToken, async (req, res) => {
  try {
    const sites = await prisma.site.findMany({
      include: {
        _count: {
          select: { employees: true }
        }
      }
    });
    res.json(sites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
});

// Create new site (Admin only)
app.post('/api/sites', authenticateToken, requireAdmin, async (req, res) => {
  const { name, location, managerName, latitude, longitude } = req.body;
  try {
    const site = await prisma.site.create({
      data: {
        name,
        location,
        managerName,
        latitude: latitude || 0,
        longitude: longitude || 0
      }
    });
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create site' });
  }
});

// Update site coordinates (Admin and Manager)
app.put('/api/sites/:id/coordinates', authenticateToken, async (req: any, res: Response) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;

  if (req.user.role !== 'ADMIN' && req.user.role !== 'MANAGER') {
    return res.status(403).json({ error: 'Forbidden. Management access required.' });
  }

  try {
    const updated = await prisma.site.update({
      where: { id },
      data: { latitude, longitude }
    });
    res.json(updated);
  } catch (error) {
    console.error('BACKEND_ERROR [UpdateSiteCoords]:', error);
    res.status(400).json({ error: 'Failed to update site coordinates' });
  }
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'TrackForce Backend is running' });
});

// Get all employees
app.get('/api/employees', authenticateToken, async (req, res) => {
  try {
    const employees = await prisma.employee.findMany({
      include: { site: true }
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});

// Get Dashboard Stats
app.get('/api/stats', authenticateToken, async (req, res) => {
  try {
    const totalEmployees = await prisma.employee.count();
    const activeAttendance = await prisma.attendance.count({
      where: { clockOut: null }
    });
    const totalSites = await prisma.site.count();
    
    res.json({
      totalEmployees,
      activeNow: activeAttendance,
      onSite: activeAttendance,
      violations: 0,
      sites: totalSites
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});


// Live Tracking Data (Admin only)
app.get('/api/tracking/live', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const sites = await prisma.site.findMany();
    const activeAttendance = await prisma.attendance.findMany({
      where: {
        clockOut: null,
        date: {
          gte: new Date(new Date().setHours(0, 0, 0, 0))
        }
      },
      include: {
        employee: {
          select: {
            firstName: true,
            lastName: true,
            designation: true,
            employeeId: true
          }
        }
      }
    });

    res.json({
      sites,
      activeEmployees: activeAttendance
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tracking data' });
  }
});

// Clock In with Geofencing
app.post('/api/attendance/clock-in/:employeeId', authenticateToken, async (req, res) => {
  const { employeeId } = req.params;
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Location data is required to clock in.' });
  }

  try {
    // 1. Get Employee and their assigned Site
    const employee = await prisma.employee.findUnique({
      where: { id: employeeId },
      include: { site: true }
    });

    if (!employee || !employee.site) {
      return res.status(400).json({ error: 'Employee or assigned site not found.' });
    }

    // 2. Check distance (Site lat/long vs Employee lat/long)
    const siteLat = employee.site.latitude || 0;
    const siteLong = employee.site.longitude || 0;
    
    // Calculate distance
    const distance = getDistance(latitude, longitude, siteLat, siteLong);
    const ALLOWED_RADIUS = 300; // 300 meters

    if (distance > ALLOWED_RADIUS) {
      return res.status(403).json({ 
        error: `Out of Bounds. You are ${Math.round(distance)}m away from the site. Must be within ${ALLOWED_RADIUS}m.`,
        distance: Math.round(distance)
      });
    }

    // 3. Create Attendance Record
    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        latitude,
        longitude,
        status: 'PRESENT'
      }
    });

    res.json(attendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to clock in' });
  }
});

// Get today's attendance for an employee
app.get('/api/attendance/today/:employeeId', authenticateToken, async (req, res) => {
  const { employeeId } = req.params;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    const logs = await prisma.attendance.findMany({
      where: {
        employeeId,
        date: {
          gte: today
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// Clock Out
app.get('/api/attendance/clock-out/:employeeId', authenticateToken, async (req, res) => {
  const { employeeId } = req.params;
  try {
    // Find the latest record that hasn't been clocked out yet
    const latestAttendance = await prisma.attendance.findFirst({
      where: {
        employeeId,
        clockOut: null
      },
      orderBy: { createdAt: 'desc' }
    });

    if (!latestAttendance) {
      return res.status(400).json({ error: 'No active clock-in found' });
    }

    const updated = await prisma.attendance.update({
      where: { id: latestAttendance.id },
      data: { clockOut: new Date() }
    });
    
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to clock out' });
  }
});

// Start Break
app.post('/api/attendance/break-start/:employeeId', authenticateToken, async (req, res) => {
  const { employeeId } = req.params;
  try {
    const activeAttendance = await prisma.attendance.findFirst({
      where: { employeeId, clockOut: null },
      orderBy: { createdAt: 'desc' }
    });

    if (!activeAttendance) return res.status(400).json({ error: 'Must be clocked in to take a break' });

    const newBreak = await prisma.break.create({
      data: { attendanceId: activeAttendance.id }
    });
    res.json(newBreak);
  } catch (error) {
    res.status(500).json({ error: 'Failed to start break' });
  }
});

// End Break
app.post('/api/attendance/break-end/:employeeId', authenticateToken, async (req, res) => {
  const { employeeId } = req.params;
  try {
    const activeAttendance = await prisma.attendance.findFirst({
      where: { employeeId, clockOut: null },
      orderBy: { createdAt: 'desc' },
      include: { breaks: { where: { endTime: null } } }
    });

    const activeBreak = activeAttendance?.breaks[0];
    if (!activeBreak) return res.status(400).json({ error: 'No active break found' });

    const updatedBreak = await prisma.break.update({
      where: { id: activeBreak.id },
      data: { endTime: new Date() }
    });
    res.json(updatedBreak);
  } catch (error) {
    res.status(500).json({ error: 'Failed to end break' });
  }
});

app.listen(PORT, () => {




  console.log(`Server is running on port ${PORT}`);
});

