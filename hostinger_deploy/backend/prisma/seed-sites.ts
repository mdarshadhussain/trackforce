import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding sites...');
  
  // Clear existing sites to avoid duplicates
  await prisma.site.deleteMany({});

  const site1 = await prisma.site.create({
    data: {
      name: 'North Hub HQ',
      location: '123 Enterprise Way',
      managerName: 'Michael Chen',
      latitude: 0,
      longitude: 0
    }
  });

  const site2 = await prisma.site.create({
    data: {
      name: 'West Side Distribution',
      location: '456 Logistics Ave',
      managerName: 'Sarah Smith',
      latitude: 0,
      longitude: 0
    }
  });

  console.log(`Seeded 2 sites: ${site1.name} and ${site2.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
