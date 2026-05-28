import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createSampleSlips() {
  try {
    const employee = await prisma.employee.findUnique({
      where: { employeeId: 'TF003' }
    });

    if (!employee) {
      console.error('Employee TF003 not found.');
      return;
    }

    console.log(`Found employee: ${employee.firstName} ${employee.lastName} (ID: ${employee.id})`);

    const samples = [
      {
        month: '2026-04',
        regularHours: 168.0,
        overtimeHours: 12.5,
        grossPay: 7200000,
        foodAllowance: 600000,
        otherAllowance: 300000,
        taxRate: 10,
        taxAmount: 720000,
        insurance: 350000,
        advancePayment: 0,
        otherDeductions: 100000,
        netPay: 6930000,
        status: 'FINALIZED'
      },
      {
        month: '2026-03',
        regularHours: 160.0,
        overtimeHours: 20.0,
        grossPay: 7400000,
        foodAllowance: 600000,
        otherAllowance: 400000,
        taxRate: 10,
        taxAmount: 740000,
        insurance: 350000,
        advancePayment: 500000,
        otherDeductions: 0,
        netPay: 6810000,
        status: 'PAID',
        transactionId: 'TXN-98218201',
        receiptPath: '/uploads/receipts/sample_receipt.png'
      },
      {
        month: '2026-02',
        regularHours: 152.5,
        overtimeHours: 8.0,
        grossPay: 6300000,
        foodAllowance: 600000,
        otherAllowance: 200000,
        taxRate: 10,
        taxAmount: 630000,
        insurance: 350000,
        advancePayment: 0,
        otherDeductions: 0,
        netPay: 6120000,
        status: 'PAID',
        transactionId: 'TXN-87162981'
      },
      {
        month: '2026-01',
        regularHours: 172.0,
        overtimeHours: 15.0,
        grossPay: 7800000,
        foodAllowance: 600000,
        otherAllowance: 500000,
        taxRate: 10,
        taxAmount: 780000,
        insurance: 350000,
        advancePayment: 0,
        otherDeductions: 0,
        netPay: 7770000,
        status: 'PAID',
        transactionId: 'TXN-71520931'
      }
    ];

    for (const sample of samples) {
      await prisma.payslip.upsert({
        where: {
          employeeId_month: {
            employeeId: employee.id,
            month: sample.month
          }
        },
        update: sample,
        create: {
          employeeId: employee.id,
          ...sample
        }
      });
      console.log(`Created/Updated payslip for ${sample.month}`);
    }

    console.log('Sample payslips creation complete!');
  } catch (error) {
    console.error('Error creating sample payslips:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createSampleSlips();
