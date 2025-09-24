"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setMessage("Tạo sản phẩm thành công!");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1200);
      } else {
        const error = await res.json();
        setMessage(`Tạo thất bại: ${error.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Tạo thất bại: Lỗi kết nối");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-md mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Mô tả</label>
          <textarea
            name="description"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Giá</label>
          <input
            type="number"
            name="price"
            required
            step="0.01"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-1">Ảnh sản phẩm</label>
          <input
            type="file"
            id="file"
            name="file"
            accept="image/*"
            className="hidden"
          />
          <label
            htmlFor="file"
            className="inline-block px-4 py-2 bg-blue-600 text-white font-medium rounded cursor-pointer hover:bg-blue-700"
          >
            📂 Chọn ảnh
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Đang tạo..." : "Tạo sản phẩm"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </main>
  );
}
