const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'index.ts');
let content = fs.readFileSync(filePath, 'utf8');

// Add import if not exists
if (!content.includes("import * as xlsx from 'xlsx';")) {
  content = content.replace(
    "import multer from 'multer';",
    "import multer from 'multer';\nimport * as xlsx from 'xlsx';"
  );
}

const importRoute = `
// Excel Import Route
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
        const firstName = row['First Name'];
        const lastName = row['Last Name'];
        const role = row['Role'] || 'EMPLOYEE';
        
        if (!employeeId || !firstName || !lastName) {
          errors.push(\`Row missing required fields (Employee ID, First Name, Last Name)\`);
          continue;
        }
        
        const existing = await prisma.employee.findUnique({ where: { employeeId: String(employeeId) } });
        if (existing) {
          errors.push(\`Employee ID \${employeeId} already exists\`);
          continue;
        }

        const passwordStr = row['Password'] ? String(row['Password']) : '123456';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordStr, salt);
        
        let siteId = null;
        if (row['Site ID']) {
           const site = await prisma.site.findUnique({ where: { id: String(row['Site ID']) } });
           if (site) siteId = site.id;
        }

        await prisma.employee.create({
          data: {
            employeeId: String(employeeId),
            firstName: String(firstName),
            lastName: String(lastName),
            email: row['Email'] ? String(row['Email']) : null,
            phone: row['Phone'] ? String(row['Phone']) : null,
            role: String(role).toUpperCase(),
            designation: row['Designation'] ? String(row['Designation']) : null,
            password: hashedPassword,
            plainPassword: passwordStr,
            hourlyRate: row['Hourly Rate'] ? parseFloat(row['Hourly Rate']) : 0,
            siteId: siteId
          }
        });
        successCount++;
      } catch (err: any) {
         errors.push(\`Error processing row for \${row['Employee ID']}: \${err.message}\`);
      }
    }
    
    res.status(200).json({
      message: \`Successfully imported \${successCount} employees\`,
      successCount,
      errors
    });
  } catch (error: any) {
    console.error('Excel import error:', error);
    res.status(500).json({ error: 'Failed to process Excel file', details: error.message });
  }
});

`;

if (!content.includes("app.post('/api/employees/import'")) {
  content = content.replace(
    "app.post('/api/employees', authenticateToken, requireAdmin, employeeUploads, async (req: any, res: Response) => {",
    importRoute + "app.post('/api/employees', authenticateToken, requireAdmin, employeeUploads, async (req: any, res: Response) => {"
  );
  fs.writeFileSync(filePath, content);
  console.log("Successfully added Excel import route.");
} else {
  console.log("Route already exists.");
}
