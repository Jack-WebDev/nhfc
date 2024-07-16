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

function randomApplicatType() {
  const applicantTypes = ["Individual", "Organization/Business"];
  return applicantTypes[Math.floor(Math.random() * applicantTypes.length)];
}

function applicationType() {
  const applicationTypes = ["Loan", "Investment"];
  return applicationTypes[Math.floor(Math.random() * applicationTypes.length)];
}

function investmentType() {
  const investmentTypes = ["Quasi Equity", "Equity", "Loan"];
  return investmentTypes[Math.floor(Math.random() * investmentTypes.length)];
}

function loanStatus() {
  const loanStatus = ["Pending", "Approved", "Rejected"];
  return loanStatus[Math.floor(Math.random() * loanStatus.length)];
}

function loanType() {
  const loanTypes = [
    "Social Housing Finance",
    "Private Rental Housing Finance",
    "Contract Bridging Finance",
    "Affordable Housing Bridging Finance",
    "Incremental Housing Finance",
  ];
  return loanTypes[Math.floor(Math.random() * loanTypes.length)];
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
  const applications = Array.from({ length: 20 }).map(() => ({
    id: generateUniqueId(),
    IdNumber: generateIdNumber(),
    ProjectName: faker.company.name(),
    ApplicantType: randomApplicatType(),
    ApplicationType: applicationType(),
    InvestmentType: investmentType(),
    LoanType: loanType(),
    NameOfCompany: faker.company.name(),
    ContactPerson: faker.person.fullName(),
    Email: faker.internet.email(),
    EquityAmount: faker.finance.amount({
      min: 10000,
      max: 1000000,
      decimalPlaces: 0,
      symbols: "R",
    }),
    PhoneNumber: faker.phone.number(),
    Address: faker.location.streetAddress(),
    City: faker.location.city(),
    Province: provinces(),
    PostalCode: faker.location.zipCode(),
    LoanAmount: faker.finance.amount({
      min: 10000,
      max: 100000000,
      decimalPlaces: 0,
      symbols: "R",
    }),
    LoanStatus: loanStatus(),
    Country: faker.location.country(),
    createdAt: faker.date.recent(),
  }));

  await prisma.applications.createMany({ data: applications });
}

insertData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
