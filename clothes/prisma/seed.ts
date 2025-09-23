import { PrismaClient, Prisma } from "../src/prisma";

const prisma = new PrismaClient();

const productData: Prisma.ProductCreateInput[] = [
  {
    name: "Áo thun basic",
    description: "Áo thun cotton thoáng mát, phù hợp đi chơi hoặc mặc nhà.",
    price: 150000,
    imageUrl: "/uploads/tshirt.jpg",
  },
  {
    name: "Quần jean slimfit",
    description: "Quần jean phong cách, dễ phối đồ.",
    price: 350000,
    imageUrl: "/uploads/jeans.jpg",
  },
  {
    name: "Áo khoác bomber",
    description: "Áo khoác bomber cá tính, giữ ấm tốt.",
    price: 450000,
    imageUrl: "/uploads/bomber.jpg",
  },
];
export async function main() {
  for (const u of productData) {
    await prisma.product.create({ data: u });
  }
}

main();