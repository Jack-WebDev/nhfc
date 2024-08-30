const PrismaClient = require("@prisma/client").PrismaClient;
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

function generateUniqueId(length = 5) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return `RR-${result}`;
}

function riskPriority() {
  const riskPriority = ["low", "moderate", "high"];
  return riskPriority[Math.floor(Math.random() * riskPriority.length)];
}

function randomNumber() {
  const number = Math.floor(Math.random() * 100);
  return `${number}%`;
}
function randomAmount() {
  const amount = Math.floor(Math.random() * 1000000);
  return `R${amount}`;
}

async function insertData() {
  const riskRegister = Array.from({ length: 20 }).map(() => {
    return {
      id: generateUniqueId(),
      priority: riskPriority(),
      riskType: faker.commerce.productName(),
      description: faker.lorem.sentences(1),
      riskOwner: faker.person.fullName(),
      startDate: "2023-06-12",
      endDate: "2024-09-22",
      progress: randomNumber(),
      budget: randomAmount(),
    };
  });

  await prisma.eRM.createMany({ data: riskRegister });
}

insertData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
