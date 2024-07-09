
const PrismaClient = require('@prisma/client').PrismaClient;
const bcrypt = require("bcrypt");


const prisma = new PrismaClient();

async function insertData() {
  
 
  const dakalo = await prisma.user.upsert({
    where: {email: "dakalom@ndt.co.za"},
    update:{},
    create: {
      email: "dakalom@ndt.co.za",
      title: "Mr",
      firstName: "Dakalo",
      lastName: "Mbulaheni",
      ethnicity: "Black",
      phone: "0721344014",
      IdNumber: "6521478956324",
      role: "Admin",
      password: bcrypt.hashSync("dk970329", 10),
      status: "Active",
      nextPasswordChangedAt: new Date(Date.now()  + 7 * 24 * 60 * 60 * 1000)
    }
  })

  console.log(dakalo)
}

insertData()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });