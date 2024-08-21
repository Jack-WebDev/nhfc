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

function generateWardNumber() {
  return (Math.floor(Math.random() * 99) + 1).toString();
}


const provinceMunicipalities = {
  "Eastern Cape": [
    "Buffalo City",
    "Nelson Mandela Bay",
    "Alfred Nzo",
    "Amathole",
    "Chris Hani",
  ],
  "Free State": [
    "Mangaung",
    "Fezile Dabi",
    "Lejweleputswa",
    "Thabo Mofutsanyane",
    "Xhariep",
  ],
  Gauteng: [
    "City of Johannesburg",
    "City of Tshwane",
    "Ekurhuleni",
    "Sedibeng",
    "West Rand",
  ],
  "KwaZulu-Natal": [
    "eThekwini",
    "uMgungundlovu",
    "uThukela",
    "Zululand",
    "King Cetshwayo",
  ],
  Limpopo: ["Polokwane", "Capricorn", "Mopani", "Sekhukhune", "Vhembe"],
  Mpumalanga: [
    "Ehlanzeni",
    "Gert Sibande",
    "Nkangala",
    "Steve Tshwete",
    "Mbombela",
  ],
  "North West": [
    "Bojanala Platinum",
    "Ngaka Modiri Molema",
    "Dr Kenneth Kaunda",
    "Dr Ruth Segomotsi Mompati",
    "Madibeng",
  ],
  "Northern Cape": [
    "Frances Baard",
    "John Taolo Gaetsewe",
    "Namakwa",
    "Pixley ka Seme",
    "ZF Mgcawu",
  ],
  "Western Cape": [
    "City of Cape Town",
    "Cape Winelands",
    "Garden Route",
    "Overberg",
    "West Coast",
  ],
};

function getProvinceAndMunicipality() {
  const provinceNames = Object.keys(provinceMunicipalities);
  const randomProvince =
    provinceNames[Math.floor(Math.random() * provinceNames.length)];
  const municipalities = provinceMunicipalities[randomProvince];
  const randomMunicipality =
    municipalities[Math.floor(Math.random() * municipalities.length)];
  return { province: randomProvince, municipality: randomMunicipality };
}

function getRandomOwnership() {
  return Math.random() > 0.5;
}


async function insertData() {
  const projects = Array.from({ length: 20 }).map(() => {
    const { province, municipality } = getProvinceAndMunicipality();

    return {
      projectName: faker.company.catchPhrase(),
      projectCode: generateUniqueId(),
      programme: faker.company.buzzPhrase(),
      projectStatus: loanStatus(),
      province,
      municipality,
      ward:  generateWardNumber(),
      address: faker.location.streetAddress(),
      gpscoordinates:
        faker.location.latitude() + "," + faker.location.longitude(),
      projectOwner: faker.person.fullName(),
      developer: faker.person.fullName(),
      projectLiason: faker.person.fullName(),
      materialSupplier: faker.person.fullName(),
      hasOwner: getRandomOwnership(),
      contractor: faker.person.fullName(),
      deliverablesSummary: faker.lorem.sentences(5),
      skilledWorkers: faker.number.int({ min: 10, max: 100 }).toString(),
      unskilledWorkers: faker.number.int({ min: 10, max: 100 }).toString(),
      schools: faker.number.int({ min: 10, max: 100 }).toString(),
      clinics: faker.number.int({ min: 10, max: 100 }).toString(),
      communityHalls: faker.number.int({ min: 10, max: 100 }).toString(),
      sportsField: faker.number.int({ min: 10, max: 100 }).toString(),
      implementationPartners: faker.company.name(),
    };
  });

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
