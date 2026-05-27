const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const tracking = await prisma.tracking.findMany({
    include: { employee: true }
  });
  console.log("--- Tracking Points ---");
  tracking.forEach(t => {
    console.log(`[Tracking ID: ${t.id}] Emp: ${t.employee?.firstName} ${t.employee?.lastName} (${t.employee?.employeeId}) Coords: ${t.latitude}, ${t.longitude} Time: ${t.timestamp}`);
  });
  
  const activeAttendance = await prisma.attendance.findMany({
    where: { clockOut: null },
    include: { employee: true }
  });
  console.log("\n--- Active Attendance (clockOut is null) ---");
  activeAttendance.forEach(a => {
    console.log(`[Attendance ID: ${a.id}] Emp: ${a.employee?.firstName} ${a.employee?.lastName} (${a.employee?.employeeId}) In: ${a.clockIn} Out: ${a.clockOut}`);
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
