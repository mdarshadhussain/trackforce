const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const employees = await prisma.employee.findMany();
  for (const emp of employees) {
    // Check if they already have payslips
    const existing = await prisma.payslip.findFirst({ where: { employeeId: emp.id } });
    if (!existing) {
      await prisma.payslip.create({
        data: {
          employeeId: emp.id,
          month: '2026-05',
          regularHours: 160,
          overtimeHours: 10,
          grossPay: 5000000,
          netPay: 4500000,
          foodAllowance: 200000,
          otherAllowance: 100000,
          taxRate: 10,
          taxAmount: 500000,
          insurance: 100000,
          advancePayment: 0,
          otherDeductions: 0,
          status: 'PAID'
        }
      });
      console.log(`Created payslip for ${emp.firstName} (${emp.id})`);
    }
  }
  console.log('Seeding complete.');
}
main().finally(() => prisma.$disconnect());
