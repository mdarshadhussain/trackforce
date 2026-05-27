const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const employees = await prisma.employee.count();
  const sites = await prisma.site.count();
  const attendance = await prisma.attendance.count();
  const tracking = await prisma.tracking.count();
  const alerts = await prisma.securityAlert.count();
  console.log(`Employees: ${employees}`);
  console.log(`Sites: ${sites}`);
  console.log(`Attendance logs: ${attendance}`);
  console.log(`Tracking points: ${tracking}`);
  console.log(`Security alerts: ${alerts}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
