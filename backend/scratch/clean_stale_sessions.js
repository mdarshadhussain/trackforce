const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Starting database clean-up of stale open sessions...");

  // Find all attendance records
  const allLogs = await prisma.attendance.findMany({
    orderBy: { clockIn: 'asc' }
  });

  // Map to track the latest log per employee
  const latestLogPerEmp = {};
  allLogs.forEach(log => {
    latestLogPerEmp[log.employeeId] = log.id;
  });

  let closedCount = 0;

  for (const log of allLogs) {
    if (log.clockOut === null) {
      // If this is NOT the latest log for the employee, OR if the clockIn was in the past (e.g. before May 23, 2026)
      // we set its clockOut to clockIn + 8 hours.
      const isLatest = latestLogPerEmp[log.employeeId] === log.id;
      const clockInDate = new Date(log.clockIn);
      const today = new Date("2026-05-23T00:00:00"); // Current simulation date is around May 23, 2026

      if (!isLatest || clockInDate < today) {
        const autoClockOut = new Date(clockInDate.getTime() + (8 * 60 * 60 * 1000)); // +8 hours
        await prisma.attendance.update({
          where: { id: log.id },
          data: {
            clockOut: autoClockOut,
            status: 'PRESENT',
            biometricProofOut: 'SYSTEM_CLEANUP'
          }
        });
        closedCount++;
      }
    }
  }

  console.log(`Successfully closed ${closedCount} stale open attendance sessions.`);
  
  // Clean up any extra Tracking points if they are excessive/fake
  const trackingCount = await prisma.tracking.count();
  console.log(`Current tracking points: ${trackingCount}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
