import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.$executeRawUnsafe("UPDATE Employee SET siteId = NULL WHERE role = 'ADMIN'");
    console.log(`Successfully updated ${count} ADMIN records to have no assigned site.`);
  } catch (error) {
    console.error("Failed to update ADMIN records:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
