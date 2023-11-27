import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // ** Generate fake data for Todo model
  // await prisma.todo.createMany({
  //   data: Array.from({ length: 25 }, () => ({
  //     title: faker.lorem.words({ min: 2, max: 5 }),
  //     body: faker.lorem.words({ min: 1, max: 10 }),
  //     // TODO replace the id below with your own user id after logging
  //     user_id: "656422b1ce3129c5481f3710",
  //   })),
  // });
  // ** Generate fake data for User model
  // await prisma.user.createMany({
  //   data: Array.from({ length: 25 }, () => ({
  //     email: faker.internet.email(),
  //     name: faker.internet.userName(),
  //     address: {
  //       street: faker.location.street(),
  //       city: faker.location.city(),
  //       state: faker.location.state(),
  //       zip: faker.location.zipCode(),
  //     },
  //   })),
  // });
}

main()
  .catch(async e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
