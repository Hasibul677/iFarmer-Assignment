'use client';

import { useAppSelector } from '@/lib/store';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductDetails({ id }: { id: number }) {
  const { products, loading, error } = useAppSelector((state) => state.products);
  const product = products.find(p => p.id === id);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!product) return <div className="text-center py-8">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <Link
          href="/assignment-2"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Back to List
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Images</h2>
            <div className="grid grid-cols-2 gap-2">
              {product.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-48 object-cover rounded-md"
                  width={500}
                  height={300}
                  unoptimized
                />
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Details</h2>
            <div className="mt-2 space-y-2">
              <p><span className="font-medium">Price:</span> ${product.price}</p>
              <p><span className="font-medium">Category:</span> {product.category.name}</p>
            </div>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="mt-2 text-gray-700">{product.description}</p>
          </div>

          <div className="flex space-x-3">
            <Link
              href={`/assignment-2/edit/${product.id}`}
              className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            >
              Edit Product
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}