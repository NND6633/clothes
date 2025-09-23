import Link from "next/link";
import prisma from "../../lib/prisma";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { name: "desc" },
  });

  return (
    <main className="p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clothing Store</h1>
        <Link
          href="/add-product"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          + Add product
        </Link>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p) => (
          <Link key={p.id} href={`/products/${p.id}`} className="block">
            <article className="border rounded p-4 hover:shadow-lg cursor-pointer transition">
              {p.imageUrl ? (
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-48 object-cover mb-3 rounded"
                />
              ) : (
                <div className="h-48 bg-gray-100 mb-3" />
              )}
              <h2 className="font-semibold">{p.name}</h2>
              <p className="text-sm text-gray-600">{p.description}</p>
              <div className="mt-2 flex justify-between items-center">
                <strong>{p.price.toLocaleString()}₫</strong>
                <span className="text-blue-600 underline">View</span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
}
