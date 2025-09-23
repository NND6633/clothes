"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
  id: string;
}

export default function ProductActions({ id }: ProductActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });

      if (res.ok) {
        alert("Deleted successfully");
        router.push("/"); // về trang Home
        router.refresh(); // reload danh sách
      } else {
        const err = await res.json();
        alert(`Delete failed: ${err.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed: Network error");
    }
  };

  return (
    <div className="mt-4 flex gap-2">
      <a
        href={`/products/${id}/edit`}
        className="px-3 py-2 bg-yellow-500 text-white rounded cursor-pointer"
      >
        Edit
      </a>
      <button
        onClick={handleDelete}
        className="px-3 py-2 bg-red-600 text-white rounded cursor-pointer"
      >
        Delete
      </button>
    </div>
  );
}
