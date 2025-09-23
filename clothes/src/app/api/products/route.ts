import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { name: "desc" }});
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const priceRaw = formData.get("price") as string | null;
    const file = formData.get("file") as File | null;

    if (!name || !description || !priceRaw) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const price = parseFloat(priceRaw);
    if (Number.isNaN(price)) {
      return NextResponse.json({ error: "Invalid price" }, { status: 400 });
    }

    let imageUrl: string | null = null;
    if (file && file.size > 0) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      const filePath = path.join(uploadsDir, fileName);
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(filePath, buffer);
      imageUrl = `/uploads/${fileName}`;
    }

    const product = await prisma.product.create({
      data: { name, description, price, imageUrl },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
