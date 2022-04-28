import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.role.createMany({
    data: [
      {
        id: 1,
        name: 'admin',
      },
      {
        id: 2,
        name: 'customer',
      },
      {
        id: 3,
        name: 'hotel-admin',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
