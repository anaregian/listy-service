import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function seed() {
  const data = [
    {
      name: "Milliliter",
      symbol: "ml"
    },
    {
      name: "Liter",
      symbol: "l"
    },
    {
      name: "Gram",
      symbol: "g"
    },
    {
      name: "Kilogram",
      symbol: "kg"
    },
    {
      name: "Pound",
      symbol: "lb"
    },
    {
      name: "Piece",
      symbol: "pc"
    }
  ];

  for (const unit of data) {
    await db.unit.create({ data: unit });
  }
}

seed()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
