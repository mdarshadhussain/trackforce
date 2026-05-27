import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function fixTodayAbsent() {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    // Delete existing absent records for today (to avoid invalid clock times)
    const deleteResult = await prisma.attendance.deleteMany({
      where: {
        status: 'ABSENT',
        date: { gte: start, lte: end }
      }
    });
    console.log(`Deleted ${deleteResult.count} existing absent records for today.`);

    // Recreate proper absent entries with null clockIn/clockOut
    const employees = await prisma.employee.findMany({
      where: { role: { not: 'ADMIN' } }
    });

    for (const emp of employees) {
      await prisma.attendance.create({
        data: {
          employeeId: emp.id,
          siteId: emp.siteId,
          date: start,
          clockIn: null,
          clockOut: null,
          status: 'ABSENT',
          biometricProof: 'AUTO_ABSENT'
        }
      });
    }
    console.log(`Recreated absent records for ${employees.length} employees.`);
  } catch (err) {
    console.error('Error fixing today absent records:', err);
  } finally {
    await prisma.$disconnect();
  }
}

fixTodayAbsent();
