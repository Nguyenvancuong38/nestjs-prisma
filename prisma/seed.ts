import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Tạo department
  await prisma.department.create({
    data: {
      name: 'TE',
      description: 'Department test product',
      users: {
        create: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          code: '91205250',
          password: await bcrypt.hash("91205250", 10),
          role: 'admin', // or 'user' depending on your requirement
          updateAt: new Date(),
          requests: {
            create: {
              title: 'Create Product first',
              description: 'Request create room discuss',
              updateAt: new Date(),
              product: {
                create: {
                  name: 'HDT565',
                  updateAt: new Date()
                }
              },
            }
          }
        },
      },
    },
  });

  await prisma.requestDetail.create({
    data: {
      title: 'Create request the detail first',
      content: 'Description create the request detail first',
      toEmail: 'a@gmail.com',
      requestId: 1,
      authorId: 1,
      updateAt: new Date(),
      isSendEMail: true
    }
  })

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
