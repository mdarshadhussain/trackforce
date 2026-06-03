import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import * as xlsx from 'xlsx';
import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs';
import cron from 'node-cron';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "*"],
      "frame-src": ["'self'", "http://localhost:5000", "http://localhost:5173"],
      "frame-ancestors": ["'self'", "http://localhost:5173"]
    }
  },
  frameguard: false // Disabling X-Frame-Options to allow CSP frame-ancestors to handle it
}));



const corsOptions = {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan('combined'));

// Static File Server
const UPLOADS_DIR = path.join(__dirname, '../uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/api/uploads', express.static(UPLOADS_DIR));

// Bypass LiteSpeed static interception
app.get('/api/media', (req, res) => {
  const filePath = req.query.path;
  if (!filePath || typeof filePath !== 'string') return res.status(400).send('Path required');
  
  // Prevent directory traversal
  const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');
  const absolutePath = path.join(UPLOADS_DIR, safePath);
  
  if (fs.existsSync(absolutePath)) {
    res.sendFile(absolutePath);
  } else {
    res.status(404).send('File not found');
  }
});


// Advanced Hierarchical Multer Configuration
const storage = multer.diskStorage({
  destination: async (req: any, file, cb) => {
    let folderId = 'unknown';

    // Gather all potential identifiers to find the employee
    const identifiers = [
      req.body.employeeId,
      req.params.employeeId,
      req.params.id,
      req.user?.id
    ].filter(Boolean);

        if (identifiers.length > 0) {
      for (const val of identifiers) {
        try {
          const emp = await prisma.employee.findFirst({
            where: {
              OR: [
                { id: val },
                { employeeId: val }
              ]
            }
          });
          if (emp) {
            folderId = emp.employeeId;
            break;
          }
        } catch (err) {
          console.error("Multer destination lookup error:", err);
        }
      }
    }

    let typeDir = 'documents';

    if (file.fieldname === 'avatar') typeDir = 'profile_picture';
    else if (file.fieldname === 'cv') typeDir = 'cv';
    else if (file.fieldname === 'idDoc') typeDir = 'passport_id';
    else if (file.fieldname === 'biometricProof') typeDir = 'attendance';
    else if (file.fieldname === 'receipt') typeDir = 'receipts';

    const userDir = path.join(UPLOADS_DIR, folderId, typeDir);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    cb(null, userDir);
  },
  filename: (req: any, file, cb) => {
    const sanitizedOriginal = file.originalname.replace(/[^a-z0-9.]/gi, '-').toLowerCase();
    let prefix = 'document';
    if (file.fieldname === 'avatar') prefix = 'profile';
    else if (file.fieldname === 'cv') prefix = 'resume';
    else if (file.fieldname === 'idDoc') prefix = 'id_proof';
    else if (file.fieldname === 'biometricProof') prefix = 'proof';
    else if (file.fieldname === 'receipt') prefix = 'receipt';

    cb(null, `${prefix}_${sanitizedOriginal}`);
  }
});

const upload = multer({ storage });
const employeeUploads = upload.fields([
  { name: 'avatar', maxCount: 1 },
  { name: 'cv', maxCount: 1 },
  { name: 'idDoc', maxCount: 1 }
]);

// 90-Day Purge Protocol
cron.schedule('0 0 * * *', () => {
  console.log('🔄 [Retention Protocol]: Initializing 90-Day Attendance Purge...');
  const ninetyDaysAgo = Date.now() - (90 * 24 * 60 * 60 * 1000);

  try {
    const users = fs.readdirSync(UPLOADS_DIR);
    users.forEach(userId => {
      const personalDir = path.join(UPLOADS_DIR, userId, 'personal_details', 'attendance');
      if (fs.existsSync(personalDir)) {
        const files = fs.readdirSync(personalDir);
        files.forEach(file => {
          const filePath = path.join(personalDir, file);
          const stats = fs.statSync(filePath);
          if (stats.mtimeMs < ninetyDaysAgo) {
            fs.unlinkSync(filePath);
          }
        });
      }
    });
  } catch (err) {
    console.error('❌ [Retention Protocol Error]:', err);
  }
});

// 15-Hour Auto-Checkout Protocol
// Runs every 30 minutes to find and automatically close sessions active for > 15 hours
cron.schedule('*/30 * * * *', async () => {
  console.log('🔄 [Auto-Checkout Protocol]: Scanning for sessions exceeding 15 hours...');
  const fifteenHoursAgo = new Date(Date.now() - (15 * 60 * 60 * 1000));

  try {
    const stalledSessions = await prisma.attendance.findMany({
      where: {
        clockOut: null,
        clockIn: {
          not: null,
          lt: fifteenHoursAgo
        }
      }
    });

    if (stalledSessions.length > 0) {
      console.log(`🚀 [Auto-Checkout Protocol]: Processing ${stalledSessions.length} stalled sessions...`);
      
      for (const session of stalledSessions) {
        // Automatically set clock-out to 8 hours after clock-in
        const autoClockOut = new Date(session.clockIn!.getTime() + (8 * 60 * 60 * 1000));
        
        await prisma.attendance.update({
          where: { id: session.id },
          data: {
            clockOut: autoClockOut,
            status: 'PRESENT',
            biometricProofOut: 'SYSTEM_AUTO_CHECKOUT'
          }
        });

        // Log a security alert for administrative visibility
        await prisma.securityAlert.create({
          data: {
            type: 'AUTO_CHECKOUT',
            message: `System auto-checkout: Session ${session.id.substring(0,8)}... exceeded 15 hours. Force-closed at 8 hours of duration.`,
            severity: 'LOW',
            employeeId: session.employeeId,
            siteId: session.siteId
          }
        });
      }
      console.log('✅ [Auto-Checkout Protocol]: Successfully synchronized all sessions.');
    }
  } catch (err) {
    console.error('❌ [Auto-Checkout Protocol Error]:', err);
  }
});

// 48-Hour Auto-Approval Protocol
// Runs every 30 minutes to automatically approve any PENDING attendance older than 48 hours
cron.schedule('*/30 * * * *', async () => {
  console.log('🔄 [Auto-Approval Protocol]: Scanning for pending attendance exceeding 48 hours...');
  const fortyEightHoursAgo = new Date(Date.now() - (48 * 60 * 60 * 1000));

  try {
    const pendingAttendances = await prisma.attendance.findMany({
      where: {
        status: 'PENDING',
        createdAt: {
          lt: fortyEightHoursAgo
        }
      }
    });

    if (pendingAttendances.length > 0) {
      console.log(`🚀 [Auto-Approval Protocol]: Auto-approving ${pendingAttendances.length} pending attendance records...`);
      
      for (const record of pendingAttendances) {
        await prisma.attendance.update({
          where: { id: record.id },
          data: {
            status: 'APPROVED'
          }
        });
      }
      console.log('✅ [Auto-Approval Protocol]: Successfully approved stalled/pending sessions.');
    }
  } catch (err) {
    console.error('❌ [Auto-Approval Protocol Error]:', err);
  }
});

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

const requireAdmin = (req: any, res: any, next: NextFunction) => {
  if (req.user.role !== 'ADMIN') return res.status(403).json({ error: 'Forbidden. Admin access required.' });
  next();
};

const requireManagement = (req: any, res: any, next: NextFunction) => {
  if (req.user.role !== 'ADMIN' && req.user.role !== 'MANAGER') return res.status(403).json({ error: 'Forbidden. Management access required.' });
  next();
};

// Helper: Haversine formula
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Helper: Calculate rounded duration in minutes
// Implements the "30-minute block" rule: any partial time < 30 mins is rounded down
function calculateRoundedDuration(
  clockIn: Date, 
  clockOut: Date, 
  breaks: any[] = [], 
  lunchStartTime?: string | null, 
  lunchEndTime?: string | null
) {
  let durationMs = clockOut.getTime() - clockIn.getTime();
  
  // Subtract break durations
  if (breaks && breaks.length > 0) {
    breaks.forEach(b => {
      if (b.startTime && b.endTime) {
        durationMs -= (new Date(b.endTime).getTime() - new Date(b.startTime).getTime());
      }
    });
  }

  // Subtract lunch break if overlap exists
  if (clockIn && clockOut) {
    const startOfDay = new Date(clockIn);
    startOfDay.setHours(0, 0, 0, 0);
    const [lS_HH, lS_MM] = (lunchStartTime || "12:00").split(":").map(Number);
    const [lE_HH, lE_MM] = (lunchEndTime || "13:00").split(":").map(Number);
    
    const lunchStart = new Date(startOfDay);
    lunchStart.setHours(lS_HH, lS_MM, 0, 0);
    
    const lunchEnd = new Date(startOfDay);
    lunchEnd.setHours(lE_HH, lE_MM, 0, 0);

    const overlapStart = new Date(Math.max(clockIn.getTime(), lunchStart.getTime()));
    const overlapEnd = new Date(Math.min(clockOut.getTime(), lunchEnd.getTime()));
    const overlapMs = Math.max(0, overlapEnd.getTime() - overlapStart.getTime());
    
    durationMs -= overlapMs;
  }

  const durationMins = Math.max(0, durationMs / (1000 * 60));
  // Round down to the nearest 30-minute block (e.g., 5:10 -> 5:00, 5:35 -> 5:30)
  return Math.floor(durationMins / 30) * 30;
}

function calculateAdjustedDuration(
  clockIn: Date, 
  clockOut: Date, 
  breaks: any[] = [], 
  workingStartTime?: string | null,
  lunchStartTime?: string | null,
  lunchEndTime?: string | null
) {
  if (!clockIn || isNaN(clockIn.getTime()) || !clockOut || isNaN(clockOut.getTime())) {
    return 0;
  }
  let start = new Date(clockIn);
  if (workingStartTime) {
    const expectedStart = new Date(clockIn);
    const [startHH, startMM] = workingStartTime.split(':').map(Number);
    expectedStart.setHours(startHH, startMM, 0, 0);

    if (clockIn > expectedStart) {
      const minsLate = (clockIn.getTime() - expectedStart.getTime()) / (1000 * 60);
      const blockNumber = Math.floor(minsLate / 30);
      const blockStartMs = expectedStart.getTime() + blockNumber * 30 * 60 * 1000;
      const offset = minsLate - blockNumber * 30;
      if (offset <= 10) {
        start = new Date(blockStartMs);
      } else {
        start = new Date(blockStartMs + 30 * 60 * 1000);
      }
    } else {
      // If clocked in early, count from official start time
      start = expectedStart;
    }
  }

  let durationMs = clockOut.getTime() - start.getTime();
  if (breaks && breaks.length > 0) {
    breaks.forEach(b => {
      if (b.startTime && b.endTime) {
        durationMs -= (new Date(b.endTime).getTime() - new Date(b.startTime).getTime());
      }
    });
  }

  // Subtract lunch break if overlap exists
  if (start && clockOut) {
    const startOfDay = new Date(start);
    startOfDay.setHours(0, 0, 0, 0);
    const [lS_HH, lS_MM] = (lunchStartTime || "12:00").split(":").map(Number);
    const [lE_HH, lE_MM] = (lunchEndTime || "13:00").split(":").map(Number);
    
    const lunchStart = new Date(startOfDay);
    lunchStart.setHours(lS_HH, lS_MM, 0, 0);
    
    const lunchEnd = new Date(startOfDay);
    lunchEnd.setHours(lE_HH, lE_MM, 0, 0);

    const overlapStart = new Date(Math.max(start.getTime(), lunchStart.getTime()));
    const overlapEnd = new Date(Math.min(clockOut.getTime(), lunchEnd.getTime()));
    const overlapMs = Math.max(0, overlapEnd.getTime() - overlapStart.getTime());
    
    durationMs -= overlapMs;
  }

  const durationMins = Math.max(0, durationMs / (1000 * 60));
  return Math.floor(durationMins / 30) * 30;
}



// --- Auth Routes ---

app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { employeeId, password } = req.body;
  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId },
      include: { site: true }
    });
    if (!employee) return res.status(400).json({ error: 'Invalid Employee ID or password' });
    const validPassword = await bcrypt.compare(password, employee.password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid Employee ID or password' });

    const token = jwt.sign({ 
      id: employee.id, 
      employeeId: employee.employeeId, 
      role: employee.role,
      siteId: employee.siteId // Include siteId for management filtering
    }, JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user: { ...employee, password: undefined } });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: 'Internal server error', details: String(error) });
  }
});

// --- Site Routes ---

app.get('/api/sites', authenticateToken, async (req, res) => {
  try {
    const sites = await prisma.site.findMany({ include: { _count: { select: { employees: true } } } });
    res.json(sites);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sites' });
  }
});

app.post('/api/sites', authenticateToken, requireAdmin, async (req, res) => {
  const { name, location, displayAddress, managerName, latitude, longitude, geofenceRadius, workingStartTime } = req.body;
  try {
    const site = await prisma.site.create({
      data: {
        name, location, displayAddress, managerName,
        latitude: parseFloat(latitude) || 0,
        longitude: parseFloat(longitude) || 0,
        geofenceRadius: parseFloat(geofenceRadius) || 500,
        workingStartTime: workingStartTime || "07:00"
      }
    });
    res.status(201).json(site);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create site' });
  }
});

app.put('/api/sites/:id', authenticateToken, requireAdmin, async (req, res) => {
  const { name, location, displayAddress, managerName, geofenceRadius, latitude, longitude, workingStartTime } = req.body;
  try {
    const site = await prisma.site.update({
      where: { id: req.params.id },
      data: {
        name, location, displayAddress, managerName,
        geofenceRadius: geofenceRadius ? parseFloat(geofenceRadius) : undefined,
        latitude: latitude ? parseFloat(latitude) : undefined,
        longitude: longitude ? parseFloat(longitude) : undefined,
        workingStartTime: workingStartTime !== undefined ? workingStartTime : undefined
      }
    });
    res.json(site);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

app.delete('/api/sites/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.employee.updateMany({ where: { siteId: req.params.id }, data: { siteId: null } });
    await prisma.site.delete({ where: { id: req.params.id } });
    res.json({ message: 'Site deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

// --- Employee Routes ---

app.get('/api/employees', authenticateToken, async (req: any, res) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const isManager = req.user.role === 'MANAGER';
    
    // Safety Fallback: If siteId is missing from token (old session), fetch it from DB
    let currentSiteId = req.user.siteId;
    if (isManager && !currentSiteId) {
      const me = await prisma.employee.findUnique({ where: { id: req.user.id } });
      currentSiteId = me?.siteId;
    }

    // Logic: Admins see everyone. Managers see their site. Employees see themselves.
    let where: any = {};
    if (isAdmin) {
      where = {}; // Total visibility
    } else if (isManager) {
      where = { 
        siteId: currentSiteId,
        role: { not: 'ADMIN' }
      };
      if (!currentSiteId) where.id = req.user.id;
    } else {
      where = { id: req.user.id };
    }

    const employees = await prisma.employee.findMany({ 
      where,
      include: { site: true } 
    });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employees' });
  }
});


// Excel Import Route

// Excel Template with Dropdowns Route
app.get('/api/employees/template', authenticateToken, requireAdmin, async (req: any, res: Response) => {
  try {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Template');

    const headers = ['Full Name', 'Employee ID', 'Initial Password', 'Date of Birth', 'Phone Number', 'Passport Number', 'Passport Issue', 'Passport Expiry', 'Salary Per Hour', 'Overtime Protocol', 'Overtime Value', 'Access Level', 'Assigned Site', 'Designation', 'Bank Name', 'Account Number', 'Account Holder Name'];
    sheet.addRow(headers);

    // Format headers
    sheet.getRow(1).font = { bold: true };
    sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFD3D3D3' } };

    // Fetch sites
    const sites = await prisma.site.findMany({ select: { name: true } });
    
    // Create a hidden sheet for the site names because formula > 255 chars is forbidden in Excel list validation
    const siteSheet = workbook.addWorksheet('HiddenSites', { state: 'hidden' });
    sites.forEach((site, index) => {
      siteSheet.getCell(`A${index + 1}`).value = site.name;
    });

    const numSites = sites.length;
    const siteFormula = numSites > 0 ? `HiddenSites!$A$1:$A${numSites}` : '""';

    // Add 100 empty rows with data validation
    for (let i = 2; i <= 101; i++) {
      // Access Level (Column L)
      sheet.getCell(`L${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"ADMIN,MANAGER,EMPLOYEE"']
      };

      // Overtime Protocol (Column J)
      sheet.getCell(`J${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Multiplier,Fixed"']
      };

      // Assigned Site (Column M) using reference to hidden sheet
      if (numSites > 0) {
        sheet.getCell(`M${i}`).dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: [siteFormula]
        };
      }

      // Designation (Column N)
      sheet.getCell(`N${i}`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Supervisor,Foreman,Experience Worker,Engineer,Fresh Worker,Safety,Drawing,QA/QC,QS,Store keeper,Sr. Foreman"']
      };
    }

    // Add one sample row
    sheet.insertRow(2, ['John Doe', 'TF001', '12345678', '01-01-1990', '+15550000000', 'A12345678', '01-01-2020', '01-01-2030', '50000', 'Multiplier', '1.5', 'EMPLOYEE', sites[0]?.name || '', 'Specialist', 'Vietcombank', '0123456789', 'JOHN DOE']);

    // Set column widths
    sheet.columns.forEach(column => {
      column.width = 20;
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=Employee_Import_Template.xlsx');
    
    await workbook.xlsx.write(res);
    res.end();
  } catch (err: any) {
    console.error('Template generation error:', err);
    res.status(500).json({ error: 'Failed to generate template' });
  }
});

app.post('/api/employees/import', authenticateToken, requireAdmin, multer({ storage: multer.memoryStorage() }).single('file'), async (req: any, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    let successCount = 0;
    let errors: string[] = [];

    for (const row of data as any[]) {
      try {
        const employeeId = row['Employee ID'];
        const fullName = row['Full Name'] || '';
        const nameParts = String(fullName).trim().split(' ');
        const firstName = nameParts[0] || 'Unknown';
        const lastName = nameParts.slice(1).join(' ') || '.';
        
        const role = row['Access Level'] || 'EMPLOYEE';
        
        if (!employeeId || !fullName) {
          errors.push(`Row missing required fields (Employee ID, Full Name)`);
          continue;
        }
        
        const existing = await prisma.employee.findUnique({ where: { employeeId: String(employeeId) } });
        if (existing) {
          errors.push(`Employee ID ${employeeId} already exists`);
          continue;
        }

        const passwordStr = row['Initial Password'] ? String(row['Initial Password']) : '123456';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordStr, salt);
        
        let siteId = null;
        if (row['Assigned Site']) {
           const site = await prisma.site.findFirst({ where: { name: String(row['Assigned Site']) } });
           if (site) siteId = site.id;
        }

        // Parse dates safely
        const parseDate = (dString: any) => {
          if (!dString) return null;
          const parsed = new Date(dString);
          return isNaN(parsed.getTime()) ? null : parsed;
        };

        await prisma.employee.create({
          data: {
            employeeId: String(employeeId),
            firstName: firstName,
            lastName: lastName,
            phone: row['Phone Number'] ? String(row['Phone Number']) : null,
            role: String(role).toUpperCase(),
            designation: row['Designation'] ? String(row['Designation']) : null,
            password: hashedPassword,
            plainPassword: passwordStr,
            hourlyRate: row['Salary Per Hour'] ? parseFloat(row['Salary Per Hour']) : 0,
            siteId: siteId,
            dob: parseDate(row['Date of Birth']),
            passportNumber: row['Passport Number'] ? String(row['Passport Number']) : null,
            passportIssue: parseDate(row['Passport Issue']),
            passportExpiry: parseDate(row['Passport Expiry']),
            overtimeType: row['Overtime Protocol'] ? String(row['Overtime Protocol']).toUpperCase() : 'MULTIPLIER',
            overtimeValue: row['Overtime Value'] ? parseFloat(row['Overtime Value']) : 1.5,
            bankName: row['Bank Name'] ? String(row['Bank Name']) : null,
            accountNumber: row['Account Number'] ? String(row['Account Number']) : null,
            accountHolderName: row['Account Holder Name'] ? String(row['Account Holder Name']) : null
          }
        });
        successCount++;
      } catch (err: any) {
         errors.push(`Error processing row for ${row['Employee ID']}: ${err.message}`);
      }
    }
    
    res.status(200).json({
      message: `Successfully imported ${successCount} employees`,
      successCount,
      errors
    });
  } catch (error: any) {
    console.error('Excel import error:', error);
    res.status(500).json({ error: 'Failed to process Excel file', details: error.message });
  }
});

app.post('/api/employees', authenticateToken, requireAdmin, employeeUploads, async (req: any, res: Response) => {
  const { 
    employeeId, fullName, phone, password, role, designation, siteId, 
    hourlyRate, overtimeType, overtimeValue, 
    passportNumber, passportExpiry, passportIssue, dob,
    bankName, accountNumber, accountHolderName, swiftCode
  } = req.body;
  try {
    const nameParts = fullName ? fullName.split(' ') : ['', ''];
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : ' ';
    let avatar = null, cvPath = null, idDocPath = null;
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files.avatar) avatar = `/api/media?path=${employeeId}/profile_picture/${files.avatar[0].filename}`;
      if (files.cv) cvPath = `/api/media?path=${employeeId}/cv/${files.cv[0].filename}`;
      if (files.idDoc) idDocPath = `/api/media?path=${employeeId}/passport_id/${files.idDoc[0].filename}`;

    }
    const parseDate = (d: any) => {
      if (!d || d === '' || d === 'null' || d === 'undefined') return null;
      const parsed = new Date(d);
      return isNaN(parsed.getTime()) ? null : parsed;
    };

    const hashedPassword = await bcrypt.hash(password || 'password123', 10);
    const newEmployee = await prisma.employee.create({
      data: {
        employeeId, firstName, lastName, phone, password: hashedPassword, plainPassword: password || 'password123', role: role || 'EMPLOYEE', designation, 
        siteId: (siteId === '' || siteId === 'null' || siteId === 'undefined') ? null : siteId, 
        avatar, cvPath, idDocPath,
        hourlyRate: parseFloat(hourlyRate as any) || 0.0, overtimeType: overtimeType || 'MULTIPLIER', overtimeValue: parseFloat(overtimeValue as any) || 1.5,
        passportNumber, 
        passportExpiry: parseDate(passportExpiry), 
        passportIssue: parseDate(passportIssue), 
        dob: parseDate(dob),
        bankName, accountNumber, accountHolderName, swiftCode
      } as any
    });
    res.status(201).json({ ...newEmployee, password: undefined });
  } catch (error) {
    res.status(400).json({ error: 'Failed to create employee. Site might already be assigned.' });
  }
});

app.get('/api/employees/:id', authenticateToken, async (req: any, res) => {
  try {
    const employee = await prisma.employee.findUnique({ where: { id: req.params.id }, include: { site: true } });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    
    // Security Check: Manager can only see their site employees
    if (req.user.role === 'MANAGER' && employee.siteId !== req.user.siteId) {
      return res.status(403).json({ error: 'Forbidden. This employee is not in your assigned site.' });
    }

    res.json({ ...employee, password: 'Encoded' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch employee' });
  }
});

app.get('/api/employees/:id/full-profile', authenticateToken, async (req: any, res) => {
  try {
    const employee = await prisma.employee.findUnique({
      where: { id: req.params.id },
      include: { site: true, attendance: { orderBy: { date: 'desc' }, include: { breaks: true } } }
    });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    
    const holidays = await prisma.holiday.findMany();
    let totalMinutes = 0, totalEarnings = 0;
    const rate = employee.hourlyRate || 0;
    
    employee.attendance.forEach(log => {
      if (log.clockIn && log.clockOut) {
        const d = calculateAdjustedDuration(new Date(log.clockIn), new Date(log.clockOut), log.breaks, employee.site?.workingStartTime, employee.site?.lunchStartTime, employee.site?.lunchEndTime);
        totalMinutes += d;

        const logDate = new Date(log.date || log.clockIn);
        const isSunday = logDate.getDay() === 0;
        const isHoliday = holidays.some(h => {
          const hDate = new Date(h.date);
          return hDate.getFullYear() === logDate.getFullYear() &&
                 hDate.getMonth() === logDate.getMonth() &&
                 hDate.getDate() === logDate.getDate();
        });

        let regMins = 0, otMins = 0;
        if (isSunday || isHoliday) {
          otMins = d;
        } else {
          regMins = Math.min(480, d);
          otMins = Math.max(0, d - 480);
        }

        const rh = regMins / 60, oh = otMins / 60;
        let dayEarnings = rh * rate;
        const overtimeRate = employee.overtimeType === 'MULTIPLIER' ? rate * (employee.overtimeValue || 1.5) : rate + (employee.overtimeValue || 0);
        dayEarnings += oh * overtimeRate;
        totalEarnings += dayEarnings;
      }
    });

    res.json({ employee: { ...employee, password: 'Encoded' }, attendance: employee.attendance, stats: { totalHours: (totalMinutes / 60).toFixed(1), totalEarnings: totalEarnings.toFixed(2), totalDays: employee.attendance.length } });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch full profile' });
  }
});

app.put('/api/employees/:id', authenticateToken, employeeUploads, async (req: any, res: Response) => {
  const { id } = req.params;
  const isSelf = req.user.id === id;
  const isManagement = req.user.role === 'ADMIN' || req.user.role === 'MANAGER';

  if (!isSelf && !isManagement) {
    return res.status(403).json({ error: 'Forbidden. Access denied.' });
  }

  let data = { ...req.body };

  // If not management, strip sensitive fields to prevent self-elevation or salary modification
  if (!isManagement) {
    const allowedFields = ['firstName', 'lastName', 'phone', 'password', 'avatar', 'dob', 'bankName', 'accountNumber', 'accountHolderName', 'swiftCode'];
    const filteredData: any = {};
    allowedFields.forEach(field => {
      if (data[field] !== undefined) filteredData[field] = data[field];
    });
    data = filteredData;
  }

  try {
    const existing = await prisma.employee.findUnique({ where: { id } });
    if (!existing) return res.status(404).json({ error: 'Employee not found' });
    if (data.password) {
      data.plainPassword = data.password;
      data.password = await bcrypt.hash(data.password, 10);
    }
    if (req.files) {
      const files = req.files as { [fieldname: string]: Express.Multer.File[] };
      if (files.avatar) data.avatar = `/api/media?path=${existing.employeeId}/profile_picture/${files.avatar[0].filename}`;
      if (files.cv) data.cvPath = `/api/media?path=${existing.employeeId}/cv/${files.cv[0].filename}`;
      if (files.idDoc) data.idDocPath = `/api/media?path=${existing.employeeId}/passport_id/${files.idDoc[0].filename}`;
    }
    const parseDate = (d: any) => {
      if (!d || d === '' || d === 'null' || d === 'undefined') return null;
      const parsed = new Date(d);
      return isNaN(parsed.getTime()) ? null : parsed;
    };

    if (data.dob !== undefined) data.dob = parseDate(data.dob);
    if (data.passportExpiry !== undefined) data.passportExpiry = parseDate(data.passportExpiry);
    if (data.passportIssue !== undefined) data.passportIssue = parseDate(data.passportIssue);
    
    if (data.siteId === '' || data.siteId === 'null' || data.siteId === 'undefined') {
      data.siteId = null;
    }

    if (data.fullName) {
      const nameParts = data.fullName.split(' ');
      data.firstName = nameParts[0] || '';
      data.lastName = nameParts.slice(1).join(' ') || ' ';
      delete data.fullName;
    }
    
    if (data.hourlyRate !== undefined) {
      data.hourlyRate = (data.hourlyRate === '' || data.hourlyRate === null) ? null : parseFloat(data.hourlyRate);
    }
    if (data.overtimeValue !== undefined) {
      data.overtimeValue = (data.overtimeValue === '' || data.overtimeValue === null) ? null : parseFloat(data.overtimeValue);
    }

    const updated = await prisma.employee.update({ where: { id }, data: data as any });
    res.json({ ...updated, password: undefined });
  } catch (error: any) {
    console.error("PUT employee error details:", error);
    res.status(400).json({ error: `Update failed: ${error.message || error}` });
  }
});

app.delete('/api/employees/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.employee.delete({ where: { id: req.params.id } });
    res.json({ message: 'Employee deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

app.post('/api/employees/:id/enroll', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await prisma.employee.findFirst({
      where: {
        OR: [
          { id },
          { employeeId: id }
        ]
      }
    });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    const updated = await prisma.employee.update({
      where: { id: employee.id },
      data: { isBiometricEnrolled: true, biometricToken: JSON.stringify(req.body.faceDescriptor) }
    });
    res.json({ ...updated, password: undefined });
  } catch (error) {
    res.status(400).json({ error: 'Enrollment failed' });
  }
});

// --- Attendance Routes ---

app.post('/api/attendance/clock-in/:id', authenticateToken, upload.single('biometricProof'), async (req: any, res: Response) => {
  const { id } = req.params;
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) return res.status(400).json({ error: 'Location required' });
  try {
    const employee = await prisma.employee.findFirst({
      where: {
        OR: [
          { id },
          { employeeId: id }
        ]
      },
      include: { site: true }
    });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    if (!employee.site) return res.status(400).json({ error: 'No operational site assigned to your profile. Please contact admin.' });

    // Restrict to max 2 clock-ins per day
    const todayStr = new Date().toISOString().split('T')[0];
    const todayLogsCount = await prisma.attendance.count({
      where: {
        employeeId: employee.id,
        date: {
          gte: new Date(todayStr)
        }
      }
    });
    if (todayLogsCount >= 2) {
      return res.status(400).json({ error: 'Daily clock-in limit reached. You can only clock in up to two times per day.' });
    }
    
    const distance = getDistance(parseFloat(latitude), parseFloat(longitude), employee.site.latitude || 0, employee.site.longitude || 0);
    const radius = employee.site.geofenceRadius || 500;
    if (distance > radius && req.user.role !== 'ADMIN') {
      await prisma.securityAlert.create({ data: { type: 'GEOFENCE_VIOLATION', message: `${employee.firstName} clocked in from ${Math.round(distance)}m away.`, severity: 'MEDIUM', employeeId: employee.id, siteId: employee.siteId } });
      return res.status(403).json({ error: `Out of bounds (${Math.round(distance)}m away from ${employee.site.name})` });
    }
    
    let biometricProof = null;
    if (req.file) {
      biometricProof = `/api/media?path=${employee.employeeId}/attendance/${req.file.filename}`;
    } else if (req.body.biometricProof && req.body.biometricProof.startsWith('data:image')) {
      try {
        const base64Data = req.body.biometricProof.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `proof_${employee.employeeId}_${Date.now()}.jpg`;
        const userDir = path.join(UPLOADS_DIR, employee.employeeId, 'attendance');
        if (!fs.existsSync(userDir)) {
          fs.mkdirSync(userDir, { recursive: true });
        }
        const filePath = path.join(userDir, filename);
        fs.writeFileSync(filePath, buffer);
        biometricProof = `/api/media?path=${employee.employeeId}/attendance/${filename}`;
      } catch (err) {
        console.error("Base64 clock-in biometricProof save error:", err);
      }
    }
    
    const attendance = await prisma.attendance.create({ 
      data: { 
        employeeId: employee.id, 
        siteId: employee.siteId, 
        clockInLat: parseFloat(latitude), 
        clockInLong: parseFloat(longitude), 
        status: 'PENDING',
        biometricProof
      } 
    });
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ error: 'Clock-in failed' });
  }
});

app.post('/api/attendance/clock-out/:id', authenticateToken, upload.single('biometricProof'), async (req: any, res: Response) => {
  const { id } = req.params;
  try {
    const { latitude, longitude } = req.body;
    const employee = await prisma.employee.findFirst({
      where: {
        OR: [
          { id },
          { employeeId: id }
        ]
      }
    });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    const active = await prisma.attendance.findFirst({ where: { employeeId: employee.id, clockOut: null }, orderBy: { createdAt: 'desc' } });
    if (!active) return res.status(400).json({ error: 'No active clock-in' });
    
    const now = new Date();
    if (now.getHours() >= 17) {
      if (active.clockIn && new Date(active.clockIn).getHours() >= 17) {
        return res.status(400).json({ error: 'Cannot clock out: you must have clocked in before 5 PM.' });
      }
    }

    let biometricProofOut = null;
    if (req.file) {
      biometricProofOut = `/api/media?path=${employee.employeeId}/attendance/${req.file.filename}`;
    } else if (req.body.biometricProof && req.body.biometricProof.startsWith('data:image')) {
      try {
        const base64Data = req.body.biometricProof.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `proof_out_${employee.employeeId}_${Date.now()}.jpg`;
        const userDir = path.join(UPLOADS_DIR, employee.employeeId, 'attendance');
        if (!fs.existsSync(userDir)) {
          fs.mkdirSync(userDir, { recursive: true });
        }
        const filePath = path.join(userDir, filename);
        fs.writeFileSync(filePath, buffer);
        biometricProofOut = `/api/media?path=${employee.employeeId}/attendance/${filename}`;
      } catch (err) {
        console.error("Base64 clock-out biometricProof save error:", err);
      }
    }

    const updated = await prisma.attendance.update({ 
      where: { id: active.id }, 
      data: { 
        clockOut: new Date(), 
        clockOutLat: latitude ? parseFloat(latitude) : null, 
        clockOutLong: longitude ? parseFloat(longitude) : null,
        biometricProofOut
      } 
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Clock-out failed' });
  }
});

const autoMarkAbsents = async () => {
  try {
    const now = new Date();
    if (now.getDay() === 0) return; // Skip Sundays
    if (now.getHours() >= 17) {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(23, 59, 59, 999);

      const employees = await prisma.employee.findMany({
        where: { role: { not: 'ADMIN' } }
      });

      for (const emp of employees) {
        const hasLog = await prisma.attendance.findFirst({
          where: {
            employeeId: emp.id,
            date: {
              gte: todayStart,
              lte: todayEnd
            }
          }
        });

        if (!hasLog) {
          const defaultClock = new Date();
          defaultClock.setHours(17, 0, 0, 0);
          await prisma.attendance.create({
            data: {
              employeeId: emp.id,
              siteId: emp.siteId,
              date: todayStart,
              clockIn: null,
              clockOut: null,
              status: 'ABSENT',
              biometricProof: 'AUTO_ABSENT'
            }
          });
          console.log(`[Auto-Absent] Marked ${emp.firstName} ${emp.lastName} as absent for today.`);
        }
      }
    }
  } catch (err) {
    console.error("autoMarkAbsents calculation error:", err);
  }
};

app.get('/api/attendance/today/:id', authenticateToken, async (req, res) => {
  try {
    await autoMarkAbsents();
    const employee = await prisma.employee.findUnique({ where: { id: req.params.id } });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    const logs = await prisma.attendance.findMany({ where: { employeeId: employee.id, date: { gte: new Date(new Date().setHours(0,0,0,0)) } }, orderBy: { createdAt: 'desc' }, include: { breaks: true } });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Fetch failed' });
  }
});

app.get('/api/attendance', authenticateToken, async (req: any, res) => {
  try {
    await autoMarkAbsents();
    const isAdmin = req.user.role === 'ADMIN';
    const isManager = req.user.role === 'MANAGER';
    
    let where = {};
    if (isManager) {
      where = { siteId: req.user.siteId };
    } else if (!isAdmin) {
      where = { employeeId: req.user.id };
    }
    
    const logs = await prisma.attendance.findMany({
      where: {
        ...where,
        employee: {
          role: { not: 'ADMIN' }
        }
      },
      include: { employee: true, breaks: true, site: true },
      orderBy: { date: 'desc' }
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch attendance' });
  }
});

app.patch('/api/attendance/:id', authenticateToken, requireManagement, async (req, res) => {
  try {
    const updated = await prisma.attendance.update({ where: { id: req.params.id }, data: { status: req.body.status } });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Update failed' });
  }
});

app.put('/api/attendance/:id', authenticateToken, requireManagement, upload.single('biometricProof'), async (req: any, res) => {
  const { clockIn, clockOut } = req.body;
  try {
    const existing = await prisma.attendance.findUnique({
      where: { id: req.params.id },
      include: { employee: true }
    });
    if (!existing) return res.status(404).json({ error: 'Record not found' });

    let dataToUpdate: any = {
      clockIn: clockIn ? new Date(clockIn) : undefined,
      clockOut: clockOut ? new Date(clockOut) : null,
    };

    if (req.file) {
      dataToUpdate.biometricProof = `/api/media?path=${existing.employee.employeeId}/attendance/${req.file.filename}`;
      if (existing.status === 'ABSENT') {
        dataToUpdate.status = 'PRESENT';
      }
    }

    const updated = await prisma.attendance.update({
      where: { id: req.params.id },
      data: dataToUpdate
    });
    res.json(updated);
  } catch (error) {
    console.error("PUT attendance error:", error);
    res.status(400).json({ error: 'Manual update failed' });
  }
});

app.delete('/api/attendance/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.break.deleteMany({ where: { attendanceId: req.params.id } });
    await prisma.attendance.delete({ where: { id: req.params.id } });
    res.json({ message: 'Deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Delete failed' });
  }
});

app.post('/api/attendance/manager-log', authenticateToken, requireManagement, upload.single('biometricProof'), async (req: any, res: Response) => {
  const { employeeId, type, latitude, longitude } = req.body;
  try {
    const employee = await prisma.employee.findFirst({
      where: {
        OR: [
          { id: employeeId },
          { employeeId: employeeId }
        ]
      },
      include: { site: true }
    });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    
    // Security check: Manager can only log for their site
    if (req.user.role === 'MANAGER' && employee.siteId !== req.user.siteId) {
      return res.status(403).json({ error: 'Forbidden. This employee is not in your assigned site.' });
    }

    let proofPath = null;
    if (req.file) {
      proofPath = `/api/media?path=${employee.employeeId}/attendance/${req.file.filename}`;
    } else if (req.body.biometricProof && req.body.biometricProof.startsWith('data:image')) {
      try {
        const base64Data = req.body.biometricProof.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, 'base64');
        const filename = `proof_manager_${employee.employeeId}_${Date.now()}.jpg`;
        const userDir = path.join(UPLOADS_DIR, employee.employeeId, 'attendance');
        if (!fs.existsSync(userDir)) {
          fs.mkdirSync(userDir, { recursive: true });
        }
        const filePath = path.join(userDir, filename);
        fs.writeFileSync(filePath, buffer);
        proofPath = `/api/media?path=${employee.employeeId}/attendance/${filename}`;
      } catch (err) {
        console.error("Base64 manager-log biometricProof save error:", err);
      }
    }

    if (type === 'CLOCK_IN') {
      const att = await prisma.attendance.create({
        data: {
          employeeId: employee.id,
          siteId: employee.siteId,
          clockInLat: latitude ? parseFloat(latitude) : null,
          clockInLong: longitude ? parseFloat(longitude) : null,
          biometricProof: proofPath || 'MANAGER_LOG',
          status: 'PRESENT'
        }
      });
      return res.status(201).json(att);
    } else {
      const active = await prisma.attendance.findFirst({ where: { employeeId: employee.id, clockOut: null }, orderBy: { createdAt: 'desc' } });
      if (!active) return res.status(400).json({ error: 'No active session found for this employee.' });
      
      const updated = await prisma.attendance.update({
        where: { id: active.id },
        data: {
          clockOut: new Date(),
          clockOutLat: latitude ? parseFloat(latitude) : null,
          clockOutLong: longitude ? parseFloat(longitude) : null,
          biometricProofOut: proofPath || 'MANAGER_LOG',
          status: 'PRESENT'
        }
      });
      return res.json(updated);
    }
  } catch (error) {
    console.error('Manager Log Error:', error);
    res.status(500).json({ error: 'Internal system error during manager logging.' });
  }
});

app.post('/api/attendance/manual', authenticateToken, requireManagement, async (req: any, res: Response) => {
  const { employeeId, siteId, clockIn, clockOut, date, status, biometricProof, biometricProofOut } = req.body;
  
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Unauthorized: Only Administrators can create manual log records.' });
  }

  try {
    const employee = await prisma.employee.findUnique({ where: { id: employeeId } });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });

    let checkInPath = 'MANUAL';
    if (biometricProof) {
      if (biometricProof.startsWith('data:image')) {
        try {
          const base64Data = biometricProof.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Buffer.from(base64Data, 'base64');
          const filename = `manual_in_${employee.employeeId}_${Date.now()}.jpg`;
          const userDir = path.join(UPLOADS_DIR, employee.employeeId, 'attendance');
          if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
          }
          const filePath = path.join(userDir, filename);
          fs.writeFileSync(filePath, buffer);
          checkInPath = `/api/media?path=${employee.employeeId}/attendance/${filename}`;
        } catch (err) {
          console.error("Manual check-in save error:", err);
        }
      } else {
        try {
          const urlObj = new URL(biometricProof);
          checkInPath = urlObj.pathname;
        } catch (e) {
          checkInPath = biometricProof;
        }
      }
    }

    let checkOutPath = null;
    if (biometricProofOut) {
      if (biometricProofOut.startsWith('data:image')) {
        try {
          const base64Data = biometricProofOut.replace(/^data:image\/\w+;base64,/, "");
          const buffer = Buffer.from(base64Data, 'base64');
          const filename = `manual_out_${employee.employeeId}_${Date.now()}.jpg`;
          const userDir = path.join(UPLOADS_DIR, employee.employeeId, 'attendance');
          if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir, { recursive: true });
          }
          const filePath = path.join(userDir, filename);
          fs.writeFileSync(filePath, buffer);
          checkOutPath = `/api/media?path=${employee.employeeId}/attendance/${filename}`;
        } catch (err) {
          console.error("Manual check-out save error:", err);
        }
      } else {
        try {
          const urlObj = new URL(biometricProofOut);
          checkOutPath = urlObj.pathname;
        } catch (e) {
          checkOutPath = biometricProofOut;
        }
      }
    }

    const active = await prisma.attendance.findFirst({
      where: { employeeId, clockOut: null },
      orderBy: { createdAt: 'desc' }
    });

    if (active) {
      const updated = await prisma.attendance.update({
        where: { id: active.id },
        data: {
          clockIn: new Date(clockIn),
          clockOut: clockOut ? new Date(clockOut) : null,
          biometricProof: checkInPath !== 'MANUAL' ? checkInPath : active.biometricProof,
          biometricProofOut: checkOutPath || active.biometricProofOut,
          status: status || active.status
        }
      });
      return res.json(updated);
    }

    const att = await prisma.attendance.create({ 
      data: { 
        employeeId, 
        siteId, 
        clockIn: new Date(clockIn), 
        clockOut: clockOut ? new Date(clockOut) : null, 
        date: new Date(clockIn), 
        status: status || 'PRESENT', 
        biometricProof: checkInPath,
        biometricProofOut: checkOutPath
      } 
    });
    res.status(201).json(att);
  } catch (error) {
    console.error('Manual log failed:', error);
    res.status(400).json({ error: 'Log failed' });
  }
});

// --- Break Routes ---

app.post('/api/attendance/break-start/:id', authenticateToken, async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({ where: { id: req.params.id } });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    const active = await prisma.attendance.findFirst({ where: { employeeId: employee.id, clockOut: null }, orderBy: { createdAt: 'desc' } });
    if (!active) return res.status(400).json({ error: 'Not clocked in' });
    const b = await prisma.break.create({ data: { attendanceId: active.id } });
    res.json(b);
  } catch (error) {
    res.status(500).json({ error: 'Break start failed' });
  }
});

app.post('/api/attendance/break-end/:id', authenticateToken, async (req, res) => {
  try {
    const employee = await prisma.employee.findUnique({ where: { id: req.params.id } });
    if (!employee) return res.status(404).json({ error: 'Employee not found' });
    const active = await prisma.attendance.findFirst({ where: { employeeId: employee.id, clockOut: null }, include: { breaks: { where: { endTime: null } } } });
    if (!active?.breaks[0]) return res.status(400).json({ error: 'No active break' });
    const updated = await prisma.break.update({ where: { id: active.breaks[0].id }, data: { endTime: new Date() } });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Break end failed' });
  }
});

// --- Payroll Routes ---

app.get('/api/payroll', authenticateToken, async (req: any, res: Response) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const isManager = req.user.role === 'MANAGER';
    
    // Fallback for siteId if missing from token
    let currentSiteId = req.user.siteId;
    if (isManager && !currentSiteId) {
      const me = await prisma.employee.findUnique({ where: { id: req.user.id } });
      currentSiteId = me?.siteId;
    }

    let where: any = { role: { not: 'ADMIN' } };
    if (isManager) {
      where = { 
        siteId: currentSiteId,
        role: { not: 'ADMIN' }
      };
      if (!currentSiteId) where = { id: req.user.id, role: { not: 'ADMIN' } };
    } else if (!isAdmin) {
      where = { id: req.user.id };
    }

    const employees = await prisma.employee.findMany({ 
      where, 
      include: { 
        site: true,
        attendance: { where: { clockOut: { not: null } }, include: { breaks: true } } 
      } 
    });

    const holidays = await prisma.holiday.findMany();

    const data = employees.map(emp => {
      let regMins = 0, otMins = 0, rate = emp.hourlyRate || 25;
      emp.attendance.forEach(log => {
        if (!log.clockIn || !log.clockOut) return;
        const d = calculateAdjustedDuration(new Date(log.clockIn), new Date(log.clockOut), log.breaks, emp.site?.workingStartTime, emp.site?.lunchStartTime, emp.site?.lunchEndTime);
        
        const logDate = new Date(log.date || log.clockIn!);
        const isSunday = logDate.getDay() === 0;
        const isHoliday = holidays.some(h => {
          const hDate = new Date(h.date);
          return hDate.getFullYear() === logDate.getFullYear() &&
                 hDate.getMonth() === logDate.getMonth() &&
                 hDate.getDate() === logDate.getDate();
        });

        if (isSunday || isHoliday) {
          otMins += d;
        } else {
          regMins += Math.min(480, d);
          otMins += Math.max(0, d - 480);
        }
      });

      const rh = regMins / 60, oh = otMins / 60, th = rh + oh;
      let earn = rh * rate;
      earn += (emp.overtimeType === 'MULTIPLIER' ? oh * rate * (emp.overtimeValue || 1.5) : oh * (emp.overtimeValue || 20));
      const status = emp.attendance.length > 0 && emp.attendance.every(log => log.status === 'PAID') ? 'PAID' : 'PENDING';
      return { id: emp.id, employee: emp, regularHours: rh.toFixed(1), overtimeHours: oh.toFixed(1), totalHours: th.toFixed(1), earnings: earn.toFixed(2), status };
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Payroll failed' });
  }
});

app.post('/api/payroll/process', authenticateToken, requireManagement, async (req, res) => {
  try {
    await prisma.attendance.updateMany({ 
      where: { 
        status: { in: ['PENDING', 'PRESENT', 'APPROVED'] } 
      }, 
      data: { status: 'PAID' } 
    });
    res.json({ message: 'Processed' });
  } catch (error) {
    res.status(500).json({ error: 'Process failed' });
  }
});

app.post('/api/payroll/generate/:employeeId', authenticateToken, requireManagement, async (req, res) => {
  try {
    const { employeeId } = req.params;
    await prisma.attendance.updateMany({ 
      where: { 
        employeeId,
        status: { in: ['PENDING', 'PRESENT', 'APPROVED'] } 
      }, 
      data: { status: 'PAID' } 
    });
    res.json({ message: 'Generated' });
  } catch (error) {
    res.status(500).json({ error: 'Generate failed' });
  }
});

app.post('/api/payroll/payslips/generate', authenticateToken, requireManagement, async (req, res) => {
  try {
    const { 
      employeeId, month, regularHours, overtimeHours, grossPay, netPay,
      foodAllowance, otherAllowance, taxRate, taxAmount, insurance,
      advancePayment, otherDeductions
    } = req.body;

    const payslip = await prisma.payslip.upsert({
      where: {
        employeeId_month: { employeeId, month }
      },
      update: {
        regularHours: parseFloat(regularHours) || 0,
        overtimeHours: parseFloat(overtimeHours) || 0,
        grossPay: parseFloat(grossPay) || 0,
        netPay: parseFloat(netPay) || 0,
        foodAllowance: parseFloat(foodAllowance) || 0,
        otherAllowance: parseFloat(otherAllowance) || 0,
        taxRate: parseFloat(taxRate) || 0,
        taxAmount: parseFloat(taxAmount) || 0,
        insurance: parseFloat(insurance) || 0,
        advancePayment: parseFloat(advancePayment) || 0,
        otherDeductions: parseFloat(otherDeductions) || 0,
        status: 'GENERATED'
      },
      create: {
        employeeId,
        month,
        regularHours: parseFloat(regularHours) || 0,
        overtimeHours: parseFloat(overtimeHours) || 0,
        grossPay: parseFloat(grossPay) || 0,
        netPay: parseFloat(netPay) || 0,
        foodAllowance: parseFloat(foodAllowance) || 0,
        otherAllowance: parseFloat(otherAllowance) || 0,
        taxRate: parseFloat(taxRate) || 0,
        taxAmount: parseFloat(taxAmount) || 0,
        insurance: parseFloat(insurance) || 0,
        advancePayment: parseFloat(advancePayment) || 0,
        otherDeductions: parseFloat(otherDeductions) || 0,
        status: 'GENERATED'
      }
    });

    res.json(payslip);
  } catch (error) {
    console.error("Generate payslip error:", error);
    res.status(500).json({ error: 'Failed to generate payslip' });
  }
});

app.post('/api/payroll/payslips/finalize', authenticateToken, requireManagement, async (req, res) => {
  try {
    const { payslipId } = req.body;
    const payslip = await prisma.payslip.update({
      where: { id: payslipId },
      data: { status: 'FINALIZED' }
    });
    res.json(payslip);
  } catch (error) {
    console.error("Finalize payslip error:", error);
    res.status(500).json({ error: 'Failed to finalize payslip' });
  }
});

app.post('/api/payroll/payslips/pay', authenticateToken, requireManagement, upload.single('receipt'), async (req: any, res) => {
  try {
    const { payslipId, transactionId } = req.body;
    if (!transactionId) {
      return res.status(400).json({ error: 'Transaction ID is required' });
    }

    const existingPayslip = await prisma.payslip.findUnique({
      where: { id: payslipId },
      include: { employee: true }
    });

    if (!existingPayslip) {
      return res.status(404).json({ error: 'Payslip not found' });
    }

    let receiptPath = null;
    if (req.file) {
      receiptPath = `/api/media?path=${existingPayslip.employee.employeeId}/receipts/${req.file.filename}`;
    }

    const payslip = await prisma.payslip.update({
      where: { id: payslipId },
      data: {
        status: 'PAID',
        transactionId,
        receiptPath: receiptPath || undefined
      }
    });

    // Update all attendance records of the employee for that month to PAID
    const startOfMonth = new Date(`${payslip.month}-01T00:00:00`);
    const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0, 23, 59, 59, 999);

    await prisma.attendance.updateMany({
      where: {
        employeeId: payslip.employeeId,
        date: {
          gte: startOfMonth,
          lte: endOfMonth
        },
        status: { in: ['PENDING', 'PRESENT', 'APPROVED', 'LATE'] }
      },
      data: { status: 'PAID' }
    });

    res.json(payslip);
  } catch (error) {
    console.error("Pay payslip error:", error);
    res.status(500).json({ error: 'Failed to process payslip payment' });
  }
});

app.get('/api/payroll/payslips/:employeeId', authenticateToken, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const payslips = await prisma.payslip.findMany({
      where: { employeeId }
    });
    res.json(payslips);
  } catch (error) {
    console.error("Fetch payslips error:", error);
    res.status(500).json({ error: 'Failed to fetch payslips' });
  }
});

app.post('/api/payroll/payslips/update-status', authenticateToken, requireManagement, async (req, res) => {
  try {
    const { payslipId, status } = req.body;
    const payslip = await prisma.payslip.update({
      where: { id: payslipId },
      data: { status }
    });

    if (status === 'PAID') {
      const startOfMonth = new Date(`${payslip.month}-01T00:00:00`);
      const endOfMonth = new Date(startOfMonth.getFullYear(), startOfMonth.getMonth() + 1, 0, 23, 59, 59, 999);

      await prisma.attendance.updateMany({
        where: {
          employeeId: payslip.employeeId,
          date: {
            gte: startOfMonth,
            lte: endOfMonth
          },
          status: { in: ['PENDING', 'PRESENT', 'APPROVED', 'LATE'] }
        },
        data: { status: 'PAID' }
      });
    }

    res.json(payslip);
  } catch (error) {
    console.error("Update payslip status error:", error);
    res.status(500).json({ error: 'Failed to update payslip status' });
  }
});


app.get('/api/payroll/stats', authenticateToken, async (req: any, res: Response) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const isManager = req.user.role === 'MANAGER';
    
    let currentSiteId = req.user.siteId;
    if (isManager && !currentSiteId) {
      const me = await prisma.employee.findUnique({ where: { id: req.user.id } });
      currentSiteId = me?.siteId;
    }

    const where = isAdmin ? { clockOut: { not: null } } : 
                  isManager ? { clockOut: { not: null }, siteId: currentSiteId, employee: { role: { not: 'ADMIN' } } } : 
                  { clockOut: { not: null }, employeeId: req.user.id };

    const logs = await prisma.attendance.findMany({ 
      where, 
      include: { employee: { include: { site: true } }, breaks: true } 
    });

    const holidays = await prisma.holiday.findMany();

    let cost = 0, hours = 0;
    logs.forEach(l => {
      if (!l.employee || !l.clockIn || !l.clockOut) return;
      const d = calculateAdjustedDuration(new Date(l.clockIn), new Date(l.clockOut), l.breaks, l.employee.site?.workingStartTime, l.employee.site?.lunchStartTime, l.employee.site?.lunchEndTime);
      
      const logDate = new Date(l.date || l.clockIn);
      const isSunday = logDate.getDay() === 0;
      const isHoliday = holidays.some(h => {
        const hDate = new Date(h.date);
        return hDate.getFullYear() === logDate.getFullYear() &&
               hDate.getMonth() === logDate.getMonth() &&
               hDate.getDate() === logDate.getDate();
      });

      let regMins = 0;
      let otMins = 0;

      if (isSunday || isHoliday) {
        otMins = d;
      } else {
        regMins = Math.min(480, d);
        otMins = Math.max(0, d - 480);
      }

      const rh = regMins / 60, oh = otMins / 60;
      hours += (rh + oh);

      const rate = l.employee.hourlyRate || 25;
      cost += (rh * rate);
      cost += (l.employee.overtimeType === 'MULTIPLIER' ? oh * rate * (l.employee.overtimeValue || 1.5) : oh * (l.employee.overtimeValue || 20));
    });

    const activeEmployeeIds = new Set(logs.map(l => l.employeeId));
    res.json({ 
      totalPayout: cost.toFixed(2), 
      totalHours: hours.toFixed(1), 
      activeRecipients: (isAdmin || isManager) ? activeEmployeeIds.size : 1 
    });
  } catch (error) {
    res.status(500).json({ error: 'Stats failed' });
  }
});

// --- System Routes ---

app.get('/api/stats', authenticateToken, async (req: any, res: Response) => {
  try {
    const isAdmin = req.user.role === 'ADMIN';
    const isManager = req.user.role === 'MANAGER';
    const isMgmt = isAdmin || isManager;
    
    // 1. Core Counts
    const totalEmployees = await prisma.employee.count({ 
      where: isManager ? { siteId: req.user.siteId } : (isAdmin ? {} : { id: req.user.id }) 
    });
    const activeNow = await prisma.attendance.count({ 
      where: { 
        clockOut: null, 
        status: { not: 'ABSENT' },
        ...(isManager ? { siteId: req.user.siteId } : (isAdmin ? {} : { employeeId: req.user.id })) 
      } 
    });
    const totalSites = isAdmin ? await prisma.site.count() : (isManager ? 1 : 0);

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const presentToday = await prisma.attendance.groupBy({
      by: ['employeeId'],
      where: {
        date: { gte: todayStart, lte: todayEnd },
        status: { not: 'ABSENT' },
        ...(isManager ? { siteId: req.user.siteId } : (isAdmin ? {} : { employeeId: req.user.id }))
      }
    }).then(groups => groups.length);

    const absentToday = await prisma.attendance.groupBy({
      by: ['employeeId'],
      where: {
        date: { gte: todayStart, lte: todayEnd },
        status: 'ABSENT',
        ...(isManager ? { siteId: req.user.siteId } : (isAdmin ? {} : { employeeId: req.user.id }))
      }
    }).then(groups => groups.length);
    
    // 2. Site Performance (Active employees per site with names)
    const activeAttendances = await prisma.attendance.findMany({
      where: {
        clockOut: null,
        status: { not: 'ABSENT' },
        ...(isManager ? { siteId: req.user.siteId } : (isAdmin ? {} : { employeeId: req.user.id }))
      },
      include: {
        employee: true,
        site: true
      }
    });

    const siteGroups: { [key: string]: { name: string; count: number; activeEmployees: string[] } } = {};
    activeAttendances.forEach(att => {
      const siteId = att.siteId || 'mobile';
      const siteName = att.site?.name || 'Mobile Operations';
      const empName = att.employee ? `${att.employee.firstName} ${att.employee.lastName}` : 'Unknown Employee';

      if (!siteGroups[siteId]) {
        siteGroups[siteId] = {
          name: siteName,
          count: 0,
          activeEmployees: []
        };
      }
      
      if (!siteGroups[siteId].activeEmployees.includes(empName)) {
        siteGroups[siteId].activeEmployees.push(empName);
        siteGroups[siteId].count += 1;
      }
    });

    const sitePerformance = Object.values(siteGroups);

    // 3. Weekly Trend (Last 7 days)
    const trend = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const start = new Date(date.setHours(0,0,0,0));
      const end = new Date(date.setHours(23,59,59,999));
      
      if (isMgmt) {
        const count = await prisma.attendance.count({
          where: {
            date: { gte: start, lte: end },
            ...(isManager ? { siteId: req.user.siteId } : {})
          }
        });
        trend.push({
          name: start.toLocaleDateString('en-US', { weekday: 'short' }),
          attendance: count
        });
      } else {
        const employee = await prisma.employee.findUnique({ where: { id: req.user.id }, include: { site: true } });
        const dayLogs = await prisma.attendance.findMany({
          where: {
            employeeId: req.user.id,
            date: { gte: start, lte: end }
          },
          include: { breaks: true }
        });
        const dayMins = dayLogs.reduce((acc, curr) => acc + (curr.clockOut && curr.clockIn ? calculateAdjustedDuration(new Date(curr.clockIn), new Date(curr.clockOut), curr.breaks, employee?.site?.workingStartTime, employee?.site?.lunchStartTime, employee?.site?.lunchEndTime) : 0), 0);
        const dayHours = dayMins / 60;
        
        trend.push({
          name: start.toLocaleDateString('en-US', { weekday: 'short' }),
          attendance: parseFloat(dayHours.toFixed(1))
        });
      }
    }

    // 4. Recent Activity/Logs
    const recentLogs: any[] = [];
    if (isMgmt) {
      const alerts = await prisma.securityAlert.findMany({ take: 5, orderBy: { timestamp: 'desc' } });
      alerts.forEach(a => {
        recentLogs.push({
          type: 'ALERT',
          title: a.type,
          message: a.message,
          time: a.timestamp
        });
      });
    } else {
      const personalLogs = await prisma.attendance.findMany({
        where: { employeeId: req.user.id },
        take: 5,
        orderBy: { createdAt: 'desc' }
      });
      personalLogs.forEach(l => {
        recentLogs.push({
          type: 'LOG',
          title: l.clockOut ? 'Shift Completed' : 'Session Active',
          message: `Check-in recorded at ${l.clockIn ? new Date(l.clockIn).toLocaleTimeString() : 'N/A'}`,
          time: l.createdAt
        });
      });
    }

    // 5. Employee specific metrics
    let employeeMetrics: any = {};
    if (!isMgmt) {
      const employee = await prisma.employee.findUnique({ where: { id: req.user.id }, include: { site: true } });
      const attendance = await prisma.attendance.findMany({ 
        where: { employeeId: req.user.id },
        include: { breaks: true }
      });
      const hourlyRate = employee?.hourlyRate || 25.00;

      // Calculate weekly hours (shifts started in the last 7 days)
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      const weeklyLogs = attendance.filter(l => l.clockIn && new Date(l.date || l.clockIn) >= sevenDaysAgo);
      const weeklyMins = weeklyLogs.reduce((acc, curr) => acc + (curr.clockOut && curr.clockIn ? calculateAdjustedDuration(new Date(curr.clockIn), new Date(curr.clockOut), curr.breaks, employee?.site?.workingStartTime, employee?.site?.lunchStartTime, employee?.site?.lunchEndTime) : 0), 0);
      const weeklyHoursVal = weeklyMins / 60;

      // Calculate monthly hours (shifts started in the current calendar month)
      const now = new Date();
      const currentMonthLogs = attendance.filter(l => {
        if (!l.clockIn) return false;
        const d = new Date(l.date || l.clockIn);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      });
      const monthlyMins = currentMonthLogs.reduce((acc, curr) => acc + (curr.clockOut && curr.clockIn ? calculateAdjustedDuration(new Date(curr.clockIn), new Date(curr.clockOut), curr.breaks, employee?.site?.workingStartTime, employee?.site?.lunchStartTime, employee?.site?.lunchEndTime) : 0), 0);
      const monthlyHoursVal = monthlyMins / 60;

      // Calculate actual earnings for current month (with OT rates!)
      const holidays = await prisma.holiday.findMany();
      let monthlyEarnings = 0;
      currentMonthLogs.forEach(l => {
        if (l.clockIn && l.clockOut) {
          const d = calculateAdjustedDuration(new Date(l.clockIn), new Date(l.clockOut), l.breaks, employee?.site?.workingStartTime, employee?.site?.lunchStartTime, employee?.site?.lunchEndTime);
          const logDate = new Date(l.date || l.clockIn);
          const isSunday = logDate.getDay() === 0;
          const isHoliday = holidays.some(h => {
            const hDate = new Date(h.date);
            return hDate.getFullYear() === logDate.getFullYear() &&
                   hDate.getMonth() === logDate.getMonth() &&
                   hDate.getDate() === logDate.getDate();
          });

          let regMins = 0, otMins = 0;
          if (isSunday || isHoliday) {
            otMins = d;
          } else {
            regMins = Math.min(480, d);
            otMins = Math.max(0, d - 480);
          }

          const rh = regMins / 60, oh = otMins / 60;
          let dayEarnings = rh * hourlyRate;
          const overtimeRate = employee?.overtimeType === 'MULTIPLIER' ? hourlyRate * (employee.overtimeValue || 1.5) : hourlyRate + (employee?.overtimeValue || 0);
          dayEarnings += oh * overtimeRate;
          monthlyEarnings += dayEarnings;
        }
      });

      // Calculate reliability (Present days / Total days logged this month, or default 98.4%)
      let reliability = 98.4;
      if (currentMonthLogs.length > 0) {
        const presentDays = currentMonthLogs.filter(l => l.status === 'APPROVED' || l.status === 'PRESENT' || l.status === 'PAID').length;
        reliability = parseFloat(((presentDays / currentMonthLogs.length) * 100).toFixed(1));
      }

      employeeMetrics = {
        weeklyHours: weeklyHoursVal.toFixed(1),
        monthlyHours: monthlyHoursVal.toFixed(1),
        efficiency: reliability,
        earnings: Math.round(monthlyEarnings),
        currencySymbol: '₫',
        hourlyRate: hourlyRate
      };
    }

    res.json({
      totalEmployees,
      activeNow,
      presentToday,
      absentToday,
      sites: totalSites,
      sitePerformance,
      weeklyTrend: trend,
      recentLogs,
      ...employeeMetrics
    });
  } catch (error) {
    console.error("Stats aggregation error:", error);
    res.status(500).json({ error: 'Stats intelligence failure' });
  }
});

app.get('/api/tracking/live', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const sites = await prisma.site.findMany();
    const active = await prisma.attendance.findMany({ where: { clockOut: null }, include: { employee: true } });
    res.json({ sites, activeEmployees: active });
  } catch (error) {
    res.status(500).json({ error: 'Tracking failed' });
  }
});

app.get('/api/security/alerts', authenticateToken, async (req, res) => {
  try {
    const alerts = await prisma.securityAlert.findMany({ orderBy: { timestamp: 'desc' }, take: 20 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: 'Alerts failed' });
  }
});

app.post('/api/security/alerts', authenticateToken, async (req, res) => {
  try {
    const a = await prisma.securityAlert.create({ data: req.body });
    res.status(201).json(a);
  } catch (error) {
    res.status(400).json({ error: 'Alert failed' });
  }
});

let systemConfig = { strictGeofencing: true, biometricRequired: true, notificationsEnabled: true, theme: 'dark' };
app.get('/api/config', authenticateToken, (req, res) => res.json(systemConfig));
app.post('/api/config', authenticateToken, requireAdmin, (req, res) => { systemConfig = { ...systemConfig, ...req.body }; res.json(systemConfig); });

// --- Holiday Routes ---
app.get('/api/holidays', authenticateToken, async (req, res) => {
  try {
    const holidays = await prisma.holiday.findMany({ orderBy: { date: 'asc' } });
    res.json(holidays);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch holidays' });
  }
});

app.post('/api/holidays', authenticateToken, requireAdmin, async (req, res) => {
  const { date, name } = req.body;
  if (!date) return res.status(400).json({ error: 'Date is required' });
  try {
    const parsedDate = new Date(date);
    parsedDate.setHours(0, 0, 0, 0);
    const holiday = await prisma.holiday.create({
      data: { date: parsedDate, name }
    });
    res.status(201).json(holiday);
  } catch (error: any) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'A holiday on this date already exists.' });
    }
    res.status(400).json({ error: 'Failed to create holiday' });
  }
});

app.delete('/api/holidays/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    await prisma.holiday.delete({ where: { id: req.params.id } });
    res.json({ message: 'Holiday deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete holiday' });
  }
});

app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
