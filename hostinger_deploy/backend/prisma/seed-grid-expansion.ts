
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting grid expansion seed via Raw SQL...');

  const names = [
    { first: 'Lenny', last: 'Summers', id: 'TF116' },
    { first: 'Sean', last: 'MacGuire', id: 'TF117' },
  ];

  for (const name of names) {
    // Check if exists
    const existing = await prisma.$queryRaw`SELECT id FROM Employee WHERE employeeId = ${name.id} LIMIT 1`;
    let empId;

    if ((existing as any[]).length === 0) {
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      await prisma.$executeRaw`
        INSERT INTO Employee (id, employeeId, firstName, lastName, password, role, designation, status, hourlyRate, createdAt, updatedAt)
        VALUES (${id}, ${name.id}, ${name.first}, ${name.last}, 'password123', 'EMPLOYEE', 'Field Specialist', 'ACTIVE', 25.0, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;
      empId = id;
      console.log(`✅ Created Employee: ${name.first} ${name.last}`);
    } else {
      empId = (existing as any[])[0].id;
      console.log(`ℹ️ Employee exists: ${name.first} ${name.last}`);
    }

    // Add attendance for May 2026 (Days 1 to 15)
    const year = 2026;
    const month = 5; // May
    
    for (let day = 1; day <= 15; day++) {
      const dayStr = day.toString().padStart(2, '0');
      const dateStr = `${year}-05-${dayStr}`;
      const date = new Date(`${dateStr}T12:00:00Z`);
      
      // Skip Sundays
      if (date.getDay() === 0) continue;

      // Randomize attendance
      const rand = Math.random();
      let status = 'PRESENT';
      if (rand > 0.9) status = 'ABSENT';
      else if (rand > 0.7) status = 'PENDING';

      const clockIn = `${dateStr} 08:${Math.floor(Math.random() * 30).toString().padStart(2, '0')}:00`;
      const clockOut = status === 'PRESENT' ? `${dateStr} 17:${Math.floor(Math.random() * 30).toString().padStart(2, '0')}:00` : null;

      const attId = Math.random().toString(36).substring(2, 15);
      await prisma.$executeRaw`
        INSERT INTO Attendance (id, employeeId, date, clockIn, clockOut, status, createdAt, updatedAt)
        VALUES (${attId}, ${empId}, ${date.toISOString()}, ${clockIn}, ${clockOut}, ${status}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;
    }
    console.log(`📊 Added attendance logs for ${name.first}`);
  }

  console.log('✨ Seed complete! 10 users added via Raw SQL.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
