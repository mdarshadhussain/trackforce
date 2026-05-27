import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function markAbsentForToday() {
  const now = new Date();
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  try {
    const employees = await prisma.employee.findMany({
      where: { role: { not: 'ADMIN' } }
    });

    for (const emp of employees) {
      const hasLog = await prisma.attendance.findFirst({
        where: {
          employeeId: emp.id,
          date: { gte: todayStart, lte: todayEnd }
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
            clockIn: defaultClock,
            clockOut: null,
            status: 'ABSENT',
            biometricProof: 'AUTO_ABSENT'
          }
        });
        console.log(`[Auto-Absence] Created absent record for ${emp.firstName} ${emp.lastName}`);
      }
    }
  } catch (err) {
    console.error('Error marking absent for today:', err);
  } finally {
    await prisma.$disconnect();
  }
}

markAbsentForToday();
