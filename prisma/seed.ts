// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  // create two dummy user
  const user1 = await prisma.user.upsert({
    where: { code: '9120111' },
    update: {},
    create: {
      code: '9120111',
      userName: 'Ruan wen A',
      email: 'a@gmail.com',
      password: '123456',
      role: "admin"
    }
  });

  const user2 = await prisma.user.upsert({
    where: { code: '9120978' },
    update: {},
    create: {
      code: '9120978',
      userName: 'Ruan wen B',
      email: 'b@gmail.com',
      password: '123456',
      role: "user"
    }
  });

  console.log({ user1, user2 });
}

// execute the main function
main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });