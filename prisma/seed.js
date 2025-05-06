const { PrismaClient } = require("@prisma/client");
const doctors = require("./doctors.json");
const prisma = new PrismaClient();

async function main() {
  for (const doctor of doctors) {
    await prisma.doctor.create({
      data: doctor,
    });
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
