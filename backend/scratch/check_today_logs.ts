import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const now = new Date();
  const todayStart = new Date();
  todayStart.setHours(0,0,0,0);
  const todayEnd = new Date();
  todayEnd.setHours(23,59,59,999);

  console.log("Current server time:", now.toString());
  console.log("Querying date range:", todayStart.toISOString(), "to", todayEnd.toISOString());

  const employees = await prisma.employee.findMany({ where: { role: { not: 'ADMIN' } } });
  console.log("Total Employees:", employees.length);

  const todayLogs = await prisma.attendance.findMany({
    where: {
      date: {
        gte: todayStart,
        lte: todayEnd
      }
    },
    include: { employee: true }
  });

  console.log("Today's logs in database:", todayLogs.length);
  for (const log of todayLogs) {
    console.log(`- ${log.employee.firstName} ${log.employee.lastName}: ${log.status} (clockIn: ${log.clockIn}, clockOut: ${log.clockOut})`);
  }

  const employeesWithNoLogs = employees.filter(emp => !todayLogs.some(l => l.employeeId === emp.id));
  console.log("Employees with NO logs today:", employeesWithNoLogs.length);
  for (const emp of employeesWithNoLogs) {
    console.log(`- ${emp.firstName} ${emp.lastName} (siteId: ${emp.siteId})`);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
