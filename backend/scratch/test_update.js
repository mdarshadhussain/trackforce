const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const id = 'd03bf1c3-cd3f-465f-9ec8-2c568b23c582';
  try {
    console.log("Attempting prisma update with passportExpiry = Invalid Date...");
    const updated = await prisma.employee.update({
      where: { id },
      data: {
        passportExpiry: new Date("")
      }
    });
    console.log("Prisma update successful!", updated);
  } catch (error) {
    console.error("Prisma update failed with error:", error);
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
