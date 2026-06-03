const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const indexPath = path.join(__dirname, 'src', 'index.ts');
  let content = fs.readFileSync(indexPath, 'utf8');

  // 1. Fix Multer Destination Logic
  const oldMulterLogic = `    // Gather all potential identifiers to find the employee
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
    }`;

  const newMulterLogic = `    // Use provided IDs immediately without querying DB (which fails for new employees)
    let folderId = req.body.employeeId || req.params.employeeId || req.params.id;
    if (!folderId && req.user?.id) {
       try {
         const emp = await prisma.employee.findUnique({ where: { id: req.user.id } });
         if (emp) folderId = emp.employeeId;
       } catch (err) { console.error(err); }
    }
    if (!folderId) folderId = 'unknown';`;

  content = content.replace(oldMulterLogic, newMulterLogic);

  // 2. Replace /api/media?path= with /api/uploads/ in clock-in, clock-out, and employee routes
  content = content.replace(/`\/api\/media\?path=\$\{employee\.employeeId\}\/attendance\/\$\{req\.file\.filename\}`/g, 
                            '`/api/uploads/${employee.employeeId}/attendance/${req.file.filename}`');
                            
  content = content.replace(/`\/api\/media\?path=\$\{employee\.employeeId\}\/attendance\/\$\{filename\}`/g, 
                            '`/api/uploads/${employee.employeeId}/attendance/${filename}`');

  content = content.replace(/`\/api\/media\?path=\$\{employeeId\}\/profile_picture\/\$\{files\.avatar\[0\]\.filename\}`/g, 
                            '`/api/uploads/${employeeId}/profile_picture/${files.avatar[0].filename}`');

  fs.writeFileSync(indexPath, content);
  console.log("Updated index.ts multer and media routes");

  // 3. Migrate database records
  const attendances = await prisma.attendance.findMany({
    where: { biometricProof: { startsWith: '/api/media?path=' } }
  });
  
  let count = 0;
  for (const att of attendances) {
    const newPath = att.biometricProof.replace('/api/media?path=', '/api/uploads/');
    await prisma.attendance.update({
      where: { id: att.id },
      data: { biometricProof: newPath }
    });
    count++;
  }
  console.log(`Migrated ${count} attendance biometricProof records.`);

  const attendancesOut = await prisma.attendance.findMany({
    where: { biometricProofOut: { startsWith: '/api/media?path=' } }
  });
  
  let countOut = 0;
  for (const att of attendancesOut) {
    const newPath = att.biometricProofOut.replace('/api/media?path=', '/api/uploads/');
    await prisma.attendance.update({
      where: { id: att.id },
      data: { biometricProofOut: newPath }
    });
    countOut++;
  }
  console.log(`Migrated ${countOut} attendance biometricProofOut records.`);

  const employees = await prisma.employee.findMany({
    where: { avatar: { startsWith: '/api/media?path=' } }
  });
  
  let empCount = 0;
  for (const emp of employees) {
    const newPath = emp.avatar.replace('/api/media?path=', '/api/uploads/');
    await prisma.employee.update({
      where: { id: emp.id },
      data: { avatar: newPath }
    });
    empCount++;
  }
  console.log(`Migrated ${empCount} employee avatar records.`);
  
}

main().catch(console.error);
