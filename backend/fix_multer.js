const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'index.ts');
let content = fs.readFileSync(filePath, 'utf8');

const targetStr = `    if (identifiers.length > 0) {
      try {
        // Query the database to find the employee using either UUID (id) or human-readable employeeId
        const emp = await prisma.employee.findFirst({
          where: {
            OR: identifiers.flatMap(val => [
              { id: val },
              { employeeId: val }
            ])
          }
        });
        if (emp) {
          folderId = emp.employeeId;
        }
      } catch (err) {
        console.error("Multer destination lookup error:", err);
      }
    }`;

const replacementStr = `    if (identifiers.length > 0) {
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

// use replace with a more robust regex if exact match fails
const rx = /if \(identifiers\.length > 0\) \{[\s\S]*?console\.error\("Multer destination lookup error:", err\);\s*\}\s*\}/;
if (rx.test(content)) {
  content = content.replace(rx, replacementStr);
  fs.writeFileSync(filePath, content);
  console.log("Successfully replaced multer logic!");
} else {
  console.log("Could not find target string.");
}
