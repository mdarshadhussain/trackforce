import { PrismaClient, Role, Status } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

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
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@trackforce.com',
      password: 'password123',
      role: Role.ADMIN,
      designation: 'Project Lead',
      siteId: mainSite.id,
    },
    {
      firstName: 'Sarah',
      lastName: 'Jenkins',
      email: 'sarah.j@trackforce.com',
      password: 'password123',
      role: Role.EMPLOYEE,
      designation: 'Field Agent',
      siteId: mainSite.id,
    },
    {
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'm.chen@trackforce.com',
      password: 'password123',
      role: Role.MANAGER,
      designation: 'Operations Manager',
      siteId: mainSite.id,
    },
  ];


  for (const emp of employees) {
    const user = await prisma.employee.upsert({
      where: { email: emp.email },
      update: {},
      create: emp,
    });
    console.log(`Created employee: ${user.firstName} ${user.lastName}`);
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
