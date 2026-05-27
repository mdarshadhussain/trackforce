import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Linking employees to new sites...');
  
  // 1. Find the new North Hub
  const northHub = await prisma.site.findFirst({
    where: { name: 'North Hub HQ' }
  });

  if (!northHub) {
    console.error('North Hub not found! Run the seed-sites.ts script first.');
    return;
  }

  // 2. Assign test employees to this hub
  await prisma.employee.updateMany({
    where: {
      employeeId: { in: ['TF001', 'TF002', 'TF003', 'TF004'] }
    },
    data: {
      siteId: northHub.id
    }
  });

  console.log(`Successfully linked test employees to ${northHub.name} (ID: ${northHub.id})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
