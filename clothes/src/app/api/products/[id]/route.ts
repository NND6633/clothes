import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../../lib/prisma";
import { writeFile } from "fs/promises";
import path from "path";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json(product);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const contentType = req.headers.get("content-type") || "";
    let data: any = {};
    let imageUrl: string | undefined;

    if (contentType.startsWith("multipart/form-data")) {
      const formData = await req.formData();
      data.name = formData.get("name") as string | null;
      data.description = formData.get("description") as string | null;
      const priceRaw = formData.get("price") as string | null;
      data.price = priceRaw ? parseFloat(priceRaw) : undefined;

      const file = formData.get("file") as File | null;
      if (file && file.size > 0) {
        const uploadsDir = path.join(process.cwd(), "public", "uploads");
        const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
        const filePath = path.join(uploadsDir, fileName);
        const buffer = Buffer.from(await file.arrayBuffer());
        await writeFile(filePath, buffer);
        imageUrl = `/uploads/${fileName}`;
      }
    } else {
      data = await req.json();
    }

    const updateData: any = {};
    if (data.name) updateData.name = data.name;
    if (data.description) updateData.description = data.description;
    if (typeof data.price === "number") updateData.price = data.price;
    if (imageUrl) updateData.imageUrl = imageUrl;

    const updated = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 400 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    await prisma.product.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Delete failed" }, { status: 400 });
  }
}
