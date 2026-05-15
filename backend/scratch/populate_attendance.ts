import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting attendance population...');

  // Get employees (excluding admins)
  const employees = await prisma.employee.findMany({
    where: { role: { not: 'ADMIN' } }
  });

  const site = await prisma.site.findFirst();
  if (!site) {
    console.log('No site found. Please run seed first.');
    return;
  }

  // Generate logs for May 2026 (Days 1 to 15)
  const daysToGenerate = 15;
  const year = 2026;
  const month = 4; // May (0-indexed)

  for (const emp of employees) {
    for (let day = 1; day <= daysToGenerate; day++) {
      // Randomly skip some days to show "Absent" (20% chance)
      if (Math.random() < 0.2) continue;

      const dateObj = new Date(year, month, day, 12, 0, 0);
      
      // Random status
      const statuses = ['APPROVED', 'PENDING', 'PRESENT'];
      const status = statuses[Math.floor(Math.random() * statuses.length)];

      const clockIn = new Date(year, month, day, 8 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60));
      const clockOut = new Date(year, month, day, 16 + Math.floor(Math.random() * 2), Math.floor(Math.random() * 60));

      await prisma.attendance.create({
        data: {
          employeeId: emp.id,
          siteId: site.id,
          date: dateObj,
          clockIn: clockIn,
          clockOut: clockOut,
          status: status,
          createdAt: clockIn
        }
      });
    }
  }

  console.log(`Population finished for ${employees.length} employees.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
