import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const employees = await prisma.employee.findMany({
    include: { site: true }
  });
  console.log('Employees in DB:', JSON.stringify(employees, null, 2));

  const sites = await prisma.site.findMany();
  console.log('Sites in DB:', JSON.stringify(sites, null, 2));

  const attendanceCount = await prisma.attendance.count();
  console.log('Total Attendance records:', attendanceCount);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
