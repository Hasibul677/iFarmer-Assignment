'use client';

import ProductForm from '@/components/assignment-2/ProductForm';
import { useAppSelector } from '@/lib/store';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface Props {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: Props) {
  const { id } = use(params); 
  const { products } = useAppSelector((state) => state.products);
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  return (
    <div className="container mx-auto p-4">
      <ProductForm initialData={product} />
    </div>
  );
}
