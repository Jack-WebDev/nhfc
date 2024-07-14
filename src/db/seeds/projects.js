const PrismaClient = require("@prisma/client").PrismaClient;
const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

function generateUniqueId(length = 10) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
}

function loanStatus() {
  const loanStatus = ["In Planning", "Active", "Closed"];
  return loanStatus[Math.floor(Math.random() * loanStatus.length)];
}

function provinces() {
  const provinces = [
    "Gauteng",
    "Western Cape",
    "KwaZulu-Natal",
    "Eastern Cape",
    "Mpumalanga",
    "Limpopo",
    "North West",
    "Northern Cape",
    "Western Cape",
  ];
  return provinces[Math.floor(Math.random() * provinces.length)];
}

async function insertData() {
  const projects = Array.from({ length: 10 }).map(() => ({
    projectName: faker.company.catchPhrase(),
    projectCode: generateUniqueId(),
    programme: faker.company.buzzPhrase(),
    projectStatus: loanStatus(),
    province: provinces(),
    municipality: faker.location.county(),
    ward: faker.location.countryCode(),
    address: faker.location.streetAddress(),
    gpscoordinates:
      faker.location.latitude() + "," + faker.location.longitude(),
    projectOwner: faker.person.fullName(),
    developer: faker.person.fullName(),
    projectLiason: faker.person.fullName(),
    materialSupplier: faker.person.fullName(),
    contractor: faker.person.fullName(),
    deliverablesSummary: faker.lorem.sentences(7),
    skilledWorkers: faker.number.int({ min: 10, max: 100 }),
    unskilledWorkers: faker.number.int({ min: 10, max: 100 }),
    schools: faker.number.int({ min: 10, max: 100 }),
    clinics: faker.number.int({ min: 10, max: 100 }),
    communityHalls: faker.number.int({ min: 10, max: 100 }),
    sportsField: faker.number.int({ min: 10, max: 100 }),
    implementationPartners: faker.company.name()
  }));

  await prisma.projects.createMany({ data: projects });
}

insertData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
