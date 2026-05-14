import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting Vietnamese Sample Data Seed...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // 1. Create a Vietnamese Site
  const vietnamSite = await prisma.site.upsert({
    where: { id: 'vietnam-site-01' },
    update: {},
    create: {
      id: 'vietnam-site-01',
      name: 'Crystal Bay Site',
      location: 'Da Nang City, Vietnam',
      latitude: 16.0544,
      longitude: 108.2022,
      geofenceRadius: 500,
      managerName: 'Le Hoang Nam',
    },
  });

  console.log('✅ Site created:', vietnamSite.name);

  // 2. Create a Vietnamese Employee on that site
  const employee = await prisma.employee.upsert({
    where: { employeeId: 'TF005' },
    update: {
      siteId: vietnamSite.id,
      password: hashedPassword,
      plainPassword: 'password123',
    },
    create: {
      employeeId: 'TF005',
      firstName: 'Nguyen',
      lastName: 'Van A',
      email: 'nguyen.vana@trackforce.vn',
      password: hashedPassword,
      plainPassword: 'password123',
      role: 'EMPLOYEE',
      designation: 'Civil Engineer',
      phone: '0901234567',
      siteId: vietnamSite.id,
      hourlyRate: 150000, // 150k VND per hour
      overtimeType: 'MULTIPLIER',
      overtimeValue: 1.5,
    },
  });

  console.log(`✅ Employee created: ${employee.firstName} ${employee.lastName} (ID: ${employee.employeeId})`);

  // 3. Create the Manager as an actual Employee record
  const manager = await prisma.employee.upsert({
    where: { employeeId: 'TF006' },
    update: {
      siteId: vietnamSite.id,
      password: hashedPassword,
      plainPassword: 'password123',
    },
    create: {
      employeeId: 'TF006',
      firstName: 'Hoang Nam',
      lastName: 'Le',
      email: 'nam.le@trackforce.vn',
      password: hashedPassword,
      plainPassword: 'password123',
      role: 'MANAGER',
      designation: 'Site Manager',
      phone: '0907654321',
      siteId: vietnamSite.id,
      hourlyRate: 250000,
    },
  });

  console.log(`✅ Manager created: ${manager.firstName} ${manager.lastName} (ID: ${manager.employeeId})`);
  console.log('🎉 Vietnamese Sample Data Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
