import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Coupons, orders and quotes start empty — they're created at runtime.
  // This seed just confirms the schema is wired up correctly.
  const count = await prisma.order.count();
  console.log(`Database ready. Existing orders: ${count}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
