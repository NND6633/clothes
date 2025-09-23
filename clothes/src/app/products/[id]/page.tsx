import prisma from "../../../../lib/prisma";
import Link from "next/link";
import ProductActions from "../../components/ProductActions";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // cần await params trước khi dùng
  const { id } = await params;

  const product = await prisma.product.findUnique({ where: { id } });

  if (!product) {
    return (
      <p className="p-6 text-center text-red-600">
        Product not found
      </p>
    );
  }

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <Link href="/">← Back</Link>

      <h1 className="text-2xl font-bold mt-4">{product.name}</h1>

      {product.imageUrl && (
        <img
          src={product.imageUrl}
          alt={product.name}
          className="my-4 w-full max-h-96 object-cover"
        />
      )}

      <p>{product.description}</p>
      <p className="font-bold mt-2">
        {product.price.toLocaleString()}₫
      </p>

      {/* Client Component */}
      <ProductActions id={product.id} />
    </main>
  );
}
