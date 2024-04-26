import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Tạo department
  await prisma.department.create({
    data: {
      name: 'TE',
      description: 'Department test product',
      user: {
        create: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          code: '91205250',
          password: await bcrypt.hash("91205250", 10),
          role: 'admin', // or 'user' depending on your requirement
          updateAt: new Date(),
        },
      },
    },
  });

  // Tạo product
  await prisma.product.create({
    data: {
      name: 'HDT565',
      updateAt: new Date(),
    },
  });

  console.log('Seed data inserted successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
