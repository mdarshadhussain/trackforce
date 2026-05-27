import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateAbsentRecords() {
  const now = new Date();
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  try {
    const updated = await prisma.attendance.updateMany({
      where: {
        status: 'ABSENT',
        date: { gte: start, lte: end },
        OR: [
          { clockIn: { not: null } },
          { clockOut: { not: null } }
        ]
      },
      data: {
        clockIn: null,
        clockOut: null
      }
    });
    console.log(`Updated ${updated.count} absent records for today, setting clockIn and clockOut to null.`);
  } catch (err) {
    console.error('Error updating absent records:', err);
  } finally {
    await prisma.$disconnect();
  }
}

updateAbsentRecords();
