const fs = require('fs');
const path = require('path');

// --- Frontend Update ---
const frontendFile = path.join(__dirname, 'frontend', 'src', 'pages', 'Employees.tsx');
let frontendContent = fs.readFileSync(frontendFile, 'utf8');

const oldHeaders = "const headers = ['Employee ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Role', 'Designation', 'Password', 'Site ID', 'Hourly Rate'];";
const oldSample = "const sample = ['EMP001', 'John', 'Doe', 'john@example.com', '+1234567890', 'EMPLOYEE', 'Engineer', '123456', '', '25'];";

const newHeaders = "const headers = ['Full Name', 'Employee ID', 'Initial Password', 'Date of Birth', 'Phone Number', 'Passport Number', 'Passport Issue', 'Passport Expiry', 'Salary Per Hour', 'Overtime Protocol', 'Overtime Value', 'Access Level', 'Assigned Site ID', 'Designation', 'Bank Name', 'Account Number', 'Account Holder Name'];";
const newSample = "const sample = ['John Doe', 'TF001', '12345678', '01-01-1990', '+15550000000', 'A12345678', '01-01-2020', '01-01-2030', '50000', 'Multiplier', '1.5', 'EMPLOYEE', '', 'Site Manager', 'Vietcombank', '0123456789', 'JOHN DOE'];";

frontendContent = frontendContent.replace(oldHeaders, newHeaders);
frontendContent = frontendContent.replace(oldSample, newSample);

fs.writeFileSync(frontendFile, frontendContent);

// --- Backend Update ---
const backendFile = path.join(__dirname, 'backend', 'src', 'index.ts');
let backendContent = fs.readFileSync(backendFile, 'utf8');

// I will use regex to replace the loop body
const loopRegex = /for \(const row of data as any\[\]\) \{[\s\S]*?successCount\+\+;\s*\} catch \(err: any\) \{/m;

const newLoopBody = `for (const row of data as any[]) {
      try {
        const employeeId = row['Employee ID'];
        const fullName = row['Full Name'] || '';
        const nameParts = String(fullName).trim().split(' ');
        const firstName = nameParts[0] || 'Unknown';
        const lastName = nameParts.slice(1).join(' ') || '.';
        
        const role = row['Access Level'] || 'EMPLOYEE';
        
        if (!employeeId || !fullName) {
          errors.push(\`Row missing required fields (Employee ID, Full Name)\`);
          continue;
        }
        
        const existing = await prisma.employee.findUnique({ where: { employeeId: String(employeeId) } });
        if (existing) {
          errors.push(\`Employee ID \${employeeId} already exists\`);
          continue;
        }

        const passwordStr = row['Initial Password'] ? String(row['Initial Password']) : '123456';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordStr, salt);
        
        let siteId = null;
        if (row['Assigned Site ID']) {
           const site = await prisma.site.findUnique({ where: { id: String(row['Assigned Site ID']) } });
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
      } catch (err: any) {`;

backendContent = backendContent.replace(loopRegex, newLoopBody);

fs.writeFileSync(backendFile, backendContent);

console.log("Successfully updated template formats.");
