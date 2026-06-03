const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'index.ts');
let content = fs.readFileSync(filePath, 'utf8');

if (!content.includes("import ExcelJS from 'exceljs';")) {
  content = content.replace(
    "import * as xlsx from 'xlsx';",
    "import * as xlsx from 'xlsx';\nimport ExcelJS from 'exceljs';"
  );
}

const templateRoute = `
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
      siteSheet.getCell(\`A\${index + 1}\`).value = site.name;
    });

    const numSites = sites.length;
    const siteFormula = numSites > 0 ? \`HiddenSites!$A$1:$A$\${numSites}\` : '""';

    // Add 100 empty rows with data validation
    for (let i = 2; i <= 101; i++) {
      // Access Level (Column L)
      sheet.getCell(\`L\${i}\`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"ADMIN,MANAGER,EMPLOYEE"']
      };

      // Overtime Protocol (Column J)
      sheet.getCell(\`J\${i}\`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Multiplier,Fixed"']
      };

      // Assigned Site (Column M) using reference to hidden sheet
      if (numSites > 0) {
        sheet.getCell(\`M\${i}\`).dataValidation = {
          type: 'list',
          allowBlank: true,
          formulae: [siteFormula]
        };
      }

      // Designation (Column N)
      sheet.getCell(\`N\${i}\`).dataValidation = {
        type: 'list',
        allowBlank: true,
        formulae: ['"Experience Worker,Fresh Worker,Store Keeper,Sr Foreman,QA/QC,Specialist"']
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

`;

if (!content.includes("app.get('/api/employees/template'")) {
  content = content.replace(
    "app.post('/api/employees/import'",
    templateRoute + "app.post('/api/employees/import'"
  );
}

// Update the import logic for "Assigned Site" instead of "Assigned Site ID"
const oldSiteLogic = `        let siteId = null;
        if (row['Assigned Site ID']) {
           const site = await prisma.site.findUnique({ where: { id: String(row['Assigned Site ID']) } });
           if (site) siteId = site.id;
        }`;

const newSiteLogic = `        let siteId = null;
        if (row['Assigned Site']) {
           const site = await prisma.site.findFirst({ where: { name: String(row['Assigned Site']) } });
           if (site) siteId = site.id;
        }`;

content = content.replace(oldSiteLogic, newSiteLogic);

fs.writeFileSync(filePath, content);
console.log("Successfully updated backend with exceljs template and site logic.");
