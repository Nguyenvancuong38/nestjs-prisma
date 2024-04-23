import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Tạo department
  await prisma.department.create({
    data: {
      name: 'TE',
      description: 'Responsible for managing TE infrastructure',
      user: {
        create: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          code: '9120567',
          password: await bcrypt.hash("9120567", 10),
          role: 'user', // or 'user' depending on your requirement
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

  // Tạo user, productWithUsers, request và requestDetail
  const user = await prisma.user.create({
    data: {
      name: 'cuong',
      email: 'alice@example.com',
      code: '91205250',
      password: await bcrypt.hash("91205250", 10),
      role: 'admin',
      updateAt: new Date(),
      department: {
        connect: { id: 4 }, // kết nối với department có id là 1
      },
      products: {
        create: {
          product: {
            connect: { id: 3 }, // kết nối với product có id là 1
          },
        },
      },
      request: {
        create: {
          title: 'Request title',
          updateAt: new Date(),
          product: {
            connect: { id: 3 }
          },
          requestDetail: {
            create: {
              title: 'Request detail title',
              content: 'Request detail content',
              toEmail: 'recipient@example.com',
              isSendEMail: false,
              updateAt: new Date(),
            },
          },
        },
      },
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
