const { execSync } = require('child_process');
const fs = require('fs');
const bcrypt = require('bcryptjs');

async function main() {
    console.log("Generating MySQL schema...");
    const schemaSql = execSync('npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script').toString();

    console.log("Hashing password for ELE001...");
    const hashedPassword = await bcrypt.hash('Elemecs@825314', 10);
    
    // uuid v4 for id
    const { v4: uuidv4 } = require('crypto');
    const crypto = require('crypto');
    const adminId = crypto.randomUUID();

    const insertSql = `
-- Insert Custom Admin User (ELE001)
INSERT INTO Employee (id, employeeId, firstName, lastName, email, password, plainPassword, role, status, isBiometricEnrolled, updatedAt) 
VALUES ('${adminId}', 'ELE001', 'Admin', 'Elemecs', 'ELE001', '${hashedPassword}', 'Elemecs@825314', 'ADMIN', 'ACTIVE', 0, CURRENT_TIMESTAMP(3));
`;

    fs.writeFileSync('setup.sql', schemaSql + '\n\n' + insertSql);
    console.log("Done! File saved as setup.sql");
}

main().catch(console.error);
