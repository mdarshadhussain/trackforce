const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const payslips = await prisma.payslip.findMany();
  console.log(payslips);
}
main().finally(() => prisma.$disconnect());
