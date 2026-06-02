const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Migrating Employee table paths...');
  const employees = await prisma.employee.findMany();
  for (const emp of employees) {
    const updateData = {};
    if (emp.avatar && (emp.avatar.includes('/uploads/') || emp.avatar.includes('/api/uploads/'))) {
      updateData.avatar = emp.avatar.replace(/\/api\/uploads\/|\/uploads\//, '/api/media?path=');
    }
    if (emp.cvPath && (emp.cvPath.includes('/uploads/') || emp.cvPath.includes('/api/uploads/'))) {
      updateData.cvPath = emp.cvPath.replace(/\/api\/uploads\/|\/uploads\//, '/api/media?path=');
    }
    if (emp.idDocPath && (emp.idDocPath.includes('/uploads/') || emp.idDocPath.includes('/api/uploads/'))) {
      updateData.idDocPath = emp.idDocPath.replace(/\/api\/uploads\/|\/uploads\//, '/api/media?path=');
    }
    if (Object.keys(updateData).length > 0) {
      await prisma.employee.update({ where: { id: emp.id }, data: updateData });
    }
  }

  console.log('Migrating Attendance table paths...');
  const attendances = await prisma.attendance.findMany();
  for (const att of attendances) {
    const updateData = {};
    if (att.biometricProof && (att.biometricProof.includes('/uploads/') || att.biometricProof.includes('/api/uploads/'))) {
      updateData.biometricProof = att.biometricProof.replace(/\/api\/uploads\/|\/uploads\//, '/api/media?path=');
    }
    if (att.biometricProofOut && (att.biometricProofOut.includes('/uploads/') || att.biometricProofOut.includes('/api/uploads/'))) {
      updateData.biometricProofOut = att.biometricProofOut.replace(/\/api\/uploads\/|\/uploads\//, '/api/media?path=');
    }
    if (Object.keys(updateData).length > 0) {
      await prisma.attendance.update({ where: { id: att.id }, data: updateData });
    }
  }

  console.log('Migrating Payslip table paths...');
  const payslips = await prisma.payslip.findMany();
  for (const pay of payslips) {
    const updateData = {};
    if (pay.receiptPath && (pay.receiptPath.includes('/uploads/') || pay.receiptPath.includes('/api/uploads/'))) {
      updateData.receiptPath = pay.receiptPath.replace(/\/api\/uploads\/|\/uploads\//, '/api/media?path=');
    }
    if (Object.keys(updateData).length > 0) {
      await prisma.payslip.update({ where: { id: pay.id }, data: updateData });
    }
  }

  console.log('Migration complete.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
