import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create a default Site
  const mainSite = await prisma.site.upsert({
    where: { id: 'default-site' },
    update: {},
    create: {
      id: 'default-site',
      name: 'Main Office',
      location: 'New Delhi, India',
      managerName: 'Rajesh Kumar',
    },
  });

  console.log('Site created:', mainSite.name);

  // Create some dummy employees
  const employees = [
    {
      employeeId: 'TF001',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@trackforce.com',
      password: hashedPassword,
      role: 'ADMIN',
      designation: 'Project Lead',
      siteId: mainSite.id,
      phone: '+91 98765 43210',
    },
    {
      employeeId: 'TF002',
      firstName: 'Sarah',
      lastName: 'Jenkins',
      email: 'sarah.j@trackforce.com',
      password: hashedPassword,
      role: 'EMPLOYEE',
      designation: 'Field Agent',
      siteId: mainSite.id,
      phone: '+91 87654 32109',
    },
    {
      employeeId: 'TF003',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'm.chen@trackforce.com',
      password: hashedPassword,
      role: 'MANAGER',
      designation: 'Operations Manager',
      siteId: mainSite.id,
      phone: '+91 76543 21098',
    },
  ];


  for (const emp of employees) {
    const user = await prisma.employee.upsert({
      where: { employeeId: emp.employeeId },
      update: { 
        password: hashedPassword,
        phone: emp.phone
      },
      create: emp,
    });
    console.log(`Created/Updated employee: ${user.firstName} ${user.lastName}`);
  }

  console.log('Seed finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
