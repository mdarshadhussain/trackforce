const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const deleted = await prisma.tracking.deleteMany({});
  console.log(`Successfully deleted ${deleted.count} tracking records.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
