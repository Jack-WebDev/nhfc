const PrismaClient = require("@prisma/client").PrismaClient;
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

function generateIdNumber() {
  const RSA_ID_NUMBER_LENGTH = 13;
  const RSA_ID_NUMBER_CHARS = "0123456789";
  let RSA_ID_NUMBER = "";

  for (let i = 0; i < RSA_ID_NUMBER_LENGTH; i++) {
    const randomIndex = Math.floor(Math.random() * RSA_ID_NUMBER_CHARS.length);
    RSA_ID_NUMBER += RSA_ID_NUMBER_CHARS[randomIndex];
  }
  return RSA_ID_NUMBER;
}

async function insertData() {
  await prisma.user.createMany({
    data: [
      {
        id: faker.string.uuid(),
        email: "jack@ndt.co.za",
        title: "Mr",
        firstName: "Jack",
        lastName: faker.person.lastName(),
        IdNumber: generateIdNumber(),
        phone: faker.phone.number(),
        password: bcrypt.hashSync("jack@123", 10),
        ethnicity: "Black",
        gender: "Male",
        status: "Active",
        role: "Client",
        createdAt: faker.date.recent(),
      },
      {
        id: faker.string.uuid(),
        email: "james@ndt.co.za",
        title: "Mr",
        firstName: "James",
        lastName: faker.person.lastName(),
        IdNumber: generateIdNumber(),
        phone: faker.phone.number(),
        password: bcrypt.hashSync("jack@123", 10),
        ethnicity: "Black",
        gender: "Male",
        status: "Active",
        role: "Admin",
        createdAt: faker.date.recent(),
      },
    ],
  });
}

insertData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
