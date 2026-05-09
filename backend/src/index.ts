import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'TrackForce Backend is running' });
});

// Get all employees
app.get('/api/employees', async (req, res) => {
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
app.get('/api/stats', async (req, res) => {
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


// Clock In
app.get('/api/attendance/clock-in/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  try {
    const attendance = await prisma.attendance.create({
      data: {
        employeeId,
        date: new Date(),
      }
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Failed to clock in' });
  }
});

// Get today's attendance for an employee
app.get('/api/attendance/today/:employeeId', async (req, res) => {
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
app.get('/api/attendance/clock-out/:employeeId', async (req, res) => {
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
app.post('/api/attendance/break-start/:employeeId', async (req, res) => {
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
app.post('/api/attendance/break-end/:employeeId', async (req, res) => {
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

